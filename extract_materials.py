import os
import pypdf

def extract_all_materials():
    base_dir = "materials"
    out_dir = "materials_extracted"
    os.makedirs(out_dir, exist_ok=True)
    
    summary = {}

    for root, dirs, files in os.walk(base_dir):
        rel_path = os.path.relpath(root, base_dir)
        if rel_path == ".":
            continue
            
        subject_folder = rel_path
        out_sub_dir = os.path.join(out_dir, subject_folder)
        os.makedirs(out_sub_dir, exist_ok=True)
        
        extracted_files = []

        for f in files:
            file_path = os.path.join(root, f)
            if f.lower().endswith(".pdf"):
                txt_filename = os.path.splitext(f)[0] + ".txt"
                out_txt_path = os.path.join(out_sub_dir, txt_filename)
                
                try:
                    reader = pypdf.PdfReader(file_path)
                    text_content = []
                    for page_num, page in enumerate(reader.pages):
                        text = page.extract_text() or ""
                        text_content.append(f"--- PAGE {page_num + 1} ---\n{text}\n")
                    
                    full_text = "\n".join(text_content)
                    with open(out_txt_path, "w", encoding="utf-8") as out_f:
                        out_f.write(full_text)
                    
                    extracted_files.append((f, len(reader.pages), len(full_text)))
                    print(f"Extracted {f}: {len(reader.pages)} pages, {len(full_text)} chars")
                except Exception as e:
                    print(f"Error extracting {f}: {e}")
            elif f.lower().endswith(".txt") and f != "README.md":
                with open(file_path, "r", encoding="utf-8", errors="ignore") as in_f:
                    content = in_f.read()
                out_txt_path = os.path.join(out_sub_dir, f)
                with open(out_txt_path, "w", encoding="utf-8") as out_f:
                    out_f.write(content)
                extracted_files.append((f, 1, len(content)))
                print(f"Copied text file {f}: {len(content)} chars")

        summary[subject_folder] = extracted_files

    print("\nExtraction Summary:")
    for subj, flist in summary.items():
        print(f"[{subj}]: {len(flist)} files extracted")

if __name__ == "__main__":
    extract_all_materials()
