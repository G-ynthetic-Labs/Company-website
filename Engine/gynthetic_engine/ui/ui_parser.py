import os
from xml.etree import ElementTree as ET

# Absolute path to the UI file
ui_path = "/home/will/Desktop/New_folder/G-ynthetic_engine/ui/newEngine.ui"

# Check that the file exists
if not os.path.exists(ui_path):
    raise FileNotFoundError(f"UI file not found at: {ui_path}")

# Parse the .ui file
tree = ET.parse(ui_path)
root = tree.getroot()

# Extract widget class and name
widgets = [(elem.attrib.get('class'), elem.attrib.get('name')) for elem in root.iter('widget')]

# Pretty print
print("Widget Type         Object Name")
print("-" * 40)
for cls, name in sorted(widgets):
    print(f"{cls:<20} {name}")
