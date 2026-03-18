import sys
import os

# Try to import pypdf, since we'll install it
try:
    from pypdf import PdfReader
except ImportError:
    print("pypdf not installed.")
    sys.exit(1)

directory = r"C:\Users\user\Desktop\portfolio\doc_site\website\assets\business docs"
for filename in os.listdir(directory):
    if filename.endswith(".pdf") or filename.endswith(".PDF"):
        path = os.path.join(directory, filename)
        print(f"\n==================== {filename} ====================")
        try:
            reader = PdfReader(path)
            # Only read the first 3 pages of each PDF to avoid overwhelming output, usually business info is at the top
            for i, page in enumerate(reader.pages):
                if i >= 3:
                    print("... (truncated)")
                    break
                text = page.extract_text()
                if text:
                    print(text)
        except Exception as e:
            print(f"Error reading {filename}: {e}")
