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

count_title = 0
count_og = 0

for file_path in html_files:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        original_content = content
        
        # 1. Title tags
        content = re.sub(r'<title>\[WIP\]\s*', '<title>', content)
        content = re.sub(r'<meta property="og:title"\s+content="\[WIP\]\s*', '<meta property="og:title" content="', content)
        
        # 2. OG tags
        content = content.replace('//anastasisconsulting.github.io/portfolio/', '//g-ynthetic-labs.github.io/Company-website/')
        
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            count_title += 1
            
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

print(f"Updated {count_title} files for titles and OG tags.")
