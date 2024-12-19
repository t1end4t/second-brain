```dataview
TABLE file.mtime AS "Last Modified" WHERE contains(file.folder, this.file.folder) AND file.name != this.file.name SORT file.mtime DESC
```
