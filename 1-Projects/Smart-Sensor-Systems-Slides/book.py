import fitz
import re
import os

def split_pdf_by_chapters(input_pdf):
    if not os.path.exists(input_pdf):
        print("Không tìm thấy file!")
        return

    doc = fitz.open(input_pdf)
    toc = doc.get_toc()

    if not toc:
        print("File không có mục lục!")
        return

    output_dir = r'C:\Users\admin\OneDrive\Desktop\RL\chapter'
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for i, entry in enumerate(toc):
        level, title, start_page = entry
        
        # Chỉ lấy level 1 (Chương chính)
        if level != 1:
            continue

        # CHỈNH SỬA QUAN TRỌNG: 
        # 1. Loại bỏ mọi ký tự không phải chữ cái, số hoặc khoảng trắng
        # 2. Xóa các ký tự xuống dòng (\n) hay gặp trong PDF
        clean_title = re.sub(r'[^a-zA-Z0-9 ]', '', title.replace('\n', ' ').replace('\r', ''))
        clean_title = ' '.join(clean_title.split()) # Xóa khoảng trắng thừa
        
        # Nếu tên chương quá ngắn hoặc rỗng sau khi lọc, đặt tên theo số thứ tự
        if len(clean_title) < 2:
            clean_title = f"Chapter_{i+1}"

        # Xác định trang cuối
        end_page = len(doc)
        for next_entry in toc[i+1:]:
            if next_entry[0] == 1:
                end_page = next_entry[2] - 1
                break

        # ÉP ĐỊNH DẠNG PDF: Sử dụng tên file đơn giản để kiểm tra
        file_name = f"{i+1:02d}_{clean_title[:50]}.pdf"
        output_path = os.path.join(output_dir, file_name)

        try:
            new_doc = fitz.open()
            new_doc.insert_pdf(doc, from_page=start_page-1, to_page=end_page-1)
            
            # Lưu với thiết lập chuẩn hóa
            new_doc.save(output_path, garbage=3, deflate=True)
            new_doc.close()
            print(f"Thành công: {file_name}")
        except Exception as e:
            print(f"Lỗi chương {i+1}: {e}")

    doc.close()

path = r"C:\Users\admin\Downloads\Gerard Meijer, Michiel Pertijs, Kofi Makinwa - Smart Sensor Systems_ Emerging Technologies and Applications-Wiley (2014).pdf"
split_pdf_by_chapters(path)