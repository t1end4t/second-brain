#!/usr/bin/env python3
import argparse
import json
import re
import sys
import time
import urllib.error
import urllib.request
from datetime import date
from pathlib import Path

VENUE_MAP = {
    "neurips": ("nips", "nips"),
    "nips": ("nips", "nips"),
    "iclr": ("iclr", "iclr"),
    "icml": ("icml", "icml"),
    "cvpr": ("cvpr", "cvpr"),
    "emnlp": ("emnlp", "emnlp"),
    "acl": ("acl", "acl"),
}

ACCEPTED_STATUSES = {
    "Poster",
    "Spotlight",
    "Oral",
    "ICLR 2026 ConditionalPoster",
    "ICLR 2026 ConditionalOral",
}

DOMAIN_PRESETS = {
    "llm-science": {
        "required_any": [
            [
                "llm",
                "large language model",
                "language model",
                "foundation model",
                "agentic",
                "ai agent",
                "ai scientist",
            ],
            [
                "scientific",
                "science",
                "scientific discovery",
                "scientific reasoning",
                "drug discovery",
                "materials science",
                "genomics",
                "biology",
                "chemistry",
                "physics",
                "hypothesis",
                "laboratory",
                "knowledge graph",
                "paper summarization",
                "experimental design",
                "climate",
                "molecular",
                "protein",
                "cell",
                "catalysis",
            ],
        ]
    }
}


def fetch_papers(venue, year):
    venue_lower = venue.lower()
    if venue_lower not in VENUE_MAP:
        print(
            f"Unknown venue '{venue}'. Supported: {', '.join(sorted(VENUE_MAP.keys()))}"
        )
        sys.exit(1)
    folder, prefix = VENUE_MAP[venue_lower]
    url = f"https://raw.githubusercontent.com/Papercopilot/paperlists/main/{folder}/{prefix}{year}.json"
    print(f"Fetching {url} ...")
    with urllib.request.urlopen(url, timeout=30) as r:
        return json.load(r)


def paper_text(p, include_abstract=False):
    text = p.get("title", "") + " " + " ".join(p.get("keywords") or [])
    if include_abstract:
        text += " " + (p.get("abstract") or "")
    return text.lower()


def score_composite(p, required_any_groups):
    scores = []
    t = paper_text(p, include_abstract=True)
    for group in required_any_groups:
        group_score = sum(1 for term in group if term in t)
        if group_score == 0:
            return 0
        scores.append(group_score)
    return sum(scores)


def filter_papers(papers, keywords=None, composite_filter=None):
    accepted = [p for p in papers if p.get("status") in ACCEPTED_STATUSES]

    if composite_filter:
        preset = DOMAIN_PRESETS.get(composite_filter)
        if not preset:
            print(f"Unknown composite filter: {composite_filter}")
            print(f"Available presets: {', '.join(DOMAIN_PRESETS.keys())}")
            sys.exit(1)
        scored = [(score_composite(p, preset["required_any"]), p) for p in accepted]
        scored = [(s, p) for s, p in scored if s > 0]
        scored.sort(key=lambda x: -x[0])
        return [p for _, p in scored]

    if not keywords:
        return accepted

    kw_lower = [kw.lower() for kw in keywords]
    return [
        p
        for p in accepted
        if any(kw in paper_text(p, include_abstract=False) for kw in kw_lower)
    ]


def get_openreview_id(paper):
    site = paper.get("site", "")
    match = re.search(r"id=([A-Za-z0-9_-]+)", site)
    return match.group(1) if match else None


def download_pdf(openreview_id, retries=3):
    pdf_url = f"https://openreview.net/pdf?id={openreview_id}"
    for attempt in range(retries):
        try:
            req = urllib.request.Request(pdf_url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=90) as r:
                data = r.read()
            if data[:8].startswith(b"%PDF"):
                return data
            print(f"  Invalid PDF (no %%PDF header), skipping")
            return None
        except urllib.error.HTTPError as e:
            if e.code == 429:
                wait = 60 * (attempt + 1)
                print(f"  Rate limited, waiting {wait}s ...")
                time.sleep(wait)
            elif e.code == 404:
                return None
            else:
                print(f"  HTTP {e.code}: {e.reason}")
                return None
        except Exception as e:
            print(f"  Error: {e}")
            if attempt < retries - 1:
                time.sleep(5)
    return None


def safe_filename(title):
    name = re.sub(r'[<>:"/\\|?*]', "", title[:60])
    return f"{name.strip().replace(' ', '_')}.pdf"


def append_sources_index(papers, venue, year, raw_dir):
    sources_path = Path("3-Resources/wiki/_sources.md")
    sources_path.parent.mkdir(parents=True, exist_ok=True)
    today = date.today().isoformat()
    with open(sources_path, "a") as f:
        for p in papers:
            fname = safe_filename(p["title"])
            tldr = (p.get("abstract") or "")[:120]
            keywords = ", ".join(p.get("keywords") or [])
            f.write(
                f"\n### {fname}\n"
                f"- **Type:** paper\n"
                f"- **Venue:** {venue} {year}\n"
                f"- **Status:** {p.get('status', 'Accepted')}\n"
                f"- **Date added:** {today}\n"
                f"- **Summary:** {tldr}\n"
                f"- **Key topics:** {keywords}\n"
                f"- **Wiki articles:** \n"
            )


def main():
    parser = argparse.ArgumentParser(
        description="Download accepted papers from ML/NLP/CV conferences"
    )
    parser.add_argument(
        "venue", help="Conference name (e.g., NeurIPS, ICLR, ICML, CVPR, EMNLP, ACL)"
    )
    parser.add_argument("year", type=int, help="Conference year (e.g., 2025)")
    parser.add_argument(
        "-k",
        "--keywords",
        nargs="+",
        help="Filter by keywords (title + keywords field)",
    )
    parser.add_argument(
        "--composite-filter",
        choices=sorted(DOMAIN_PRESETS.keys()),
        help="Ranked preset filter requiring matches from multiple term groups",
    )
    parser.add_argument("-n", "--max-papers", type=int, help="Max papers to download")
    parser.add_argument(
        "-o",
        "--output-dir",
        default="3-Resources/raw",
        help="Output directory (default: 3-Resources/raw)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="List matching papers without downloading",
    )
    parser.add_argument(
        "--no-index", action="store_true", help="Skip updating _sources.md"
    )
    args = parser.parse_args()

    papers = fetch_papers(args.venue, args.year)
    filtered = filter_papers(papers, args.keywords, args.composite_filter)
    print(f"Found {len(filtered)} matching papers")

    if not filtered:
        return

    to_download = filtered[: args.max_papers] if args.max_papers else filtered

    if args.dry_run:
        for i, p in enumerate(to_download, 1):
            print(f"  {i}. [{p.get('status')}] {p['title']}")
        return

    raw_dir = Path(args.output_dir)
    raw_dir.mkdir(parents=True, exist_ok=True)

    downloaded = []
    for i, p in enumerate(to_download, 1):
        or_id = get_openreview_id(p)
        if not or_id:
            print(f"  {i}. Skip (no OpenReview ID): {p['title'][:60]}")
            continue

        fname = safe_filename(p["title"])
        if (raw_dir / fname).exists():
            print(f"  {i}. Already exists: {fname}")
            downloaded.append(p)
            continue

        print(f"  {i}. Downloading: {fname}")
        pdf = download_pdf(or_id)
        if pdf:
            (raw_dir / fname).write_bytes(pdf)
            downloaded.append(p)
            print(f"     OK ({len(pdf)} bytes)")
        else:
            print(f"     FAILED")
        time.sleep(2)

    print(f"\nDownloaded {len(downloaded)}/{len(to_download)} papers to {raw_dir}")

    if downloaded and not args.no_index:
        append_sources_index(downloaded, args.venue, args.year, raw_dir)
        print(f"Updated 3-Resources/wiki/_sources.md")


if __name__ == "__main__":
    main()
