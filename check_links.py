import os
import re
from urllib.parse import urlparse

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

broken_links = []
missing_assets = []

for file_path in html_files:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        continue

    # Find hrefs
    hrefs = re.findall(r'href="([^"]+)"', content)
    for href in hrefs:
        if href.startswith('http') or href.startswith('mailto:') or href.startswith('#'):
            continue
        
        # Strip hash fragments from local links
        link_path = href.split('#')[0]
        if not link_path:
            continue
            
        target_path = os.path.join(os.path.dirname(file_path), link_path)
        target_path = os.path.normpath(target_path)
        
        if not os.path.exists(target_path):
            broken_links.append((file_path, href))

    # Find srcs
    srcs = re.findall(r'src="([^"]+)"', content)
    for src in srcs:
        if src.startswith('http') or src.startswith('data:'):
            continue
            
        target_path = os.path.join(os.path.dirname(file_path), src)
        target_path = os.path.normpath(target_path)
        
        if not os.path.exists(target_path):
            missing_assets.append((file_path, src))

print(f"Checked {len(html_files)} HTML files.")

if broken_links:
    print("\nBroken Links:")
    for file, link in broken_links[:20]:
        print(f"  {os.path.basename(file)} -> {link}")
    if len(broken_links) > 20:
        print(f"  ... and {len(broken_links) - 20} more")
else:
    print("\nNo broken links found!")

if missing_assets:
    print("\nMissing Assets:")
    for file, src in missing_assets[:20]:
        print(f"  {os.path.basename(file)} -> {src}")
    if len(missing_assets) > 20:
        print(f"  ... and {len(missing_assets) - 20} more")
else:
    print("\nNo missing assets found!")
