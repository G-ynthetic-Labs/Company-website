import os
import re

base_dir = os.path.dirname(os.path.abspath(__file__))

def get_all_html_files(directory):
    html_files = []
    for root, _, files in os.walk(directory):
        if 'assets\\cubexgui' in root:
            continue
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    return html_files

html_files = get_all_html_files(base_dir)

# Read index.html to get reference nav
with open(os.path.join(base_dir, 'index.html'), 'r', encoding='utf-8') as f:
    index_content = f.read()
    nav_match = re.search(r'<nav[^>]*>.*?</nav>', index_content, flags=re.DOTALL)
    if not nav_match:
        print("Could not find nav in index.html")
        exit(1)
    ref_nav = nav_match.group(0)

# Normalize spaces for comparison
def normalize(text):
    return re.sub(r'\s+', ' ', text).strip()

ref_nav_norm = normalize(ref_nav)
inconsistent_files = []

for file_path in html_files:
    if os.path.basename(file_path) == 'index.html':
        continue
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            nav_match = re.search(r'<nav[^>]*>.*?</nav>', content, flags=re.DOTALL)
            
            if not nav_match:
                print(f"No <nav> in {os.path.basename(file_path)}")
                continue
            
            nav_norm = normalize(nav_match.group(0))
            if nav_norm != ref_nav_norm:
                inconsistent_files.append(file_path)
    except Exception as e:
        print(f"Error reading {file_path}: {e}")

if inconsistent_files:
    print(f"Found {len(inconsistent_files)} with inconsistent navigation.")
    for f in inconsistent_files[:5]:
        print(" -", os.path.basename(f))
else:
    print("All HTML files possess identical navigation structures.")
