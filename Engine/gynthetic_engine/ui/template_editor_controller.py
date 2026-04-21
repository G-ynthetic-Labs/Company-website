# template_editor_controller.py

import os
import json
from PySide6.QtWidgets import QFileDialog, QMessageBox, QWidget, QStackedWidget, QPushButton, QLineEdit
from PIL import Image
from custom_widgets.clickable_image_label import ClickableImageLabel
from gynthetic_core_manager import gynthetic_coreManager
from PySide6.QtCore import QObject
from ui.newEngine import Ui_MainWindow
from page_switcher import DebugPageSwitcher


class TemplateEditorController:
    def __init__(self, ui, window):
        self.ui = ui                 # <- Ui_MainWindow (contains buttons, fields)
        self.window = window         # <- QMainWindow (actual widget tree with findChild)
        self.apply_btn = self.ui.findChild(QPushButton, "applyBtn")
        self.load_btn = self.ui.findChild(QPushButton, "loadDatasetBtn")
        self.save_btn = self.ui.findChild(QPushButton, "saveBtn")
        self.reset_btn = self.ui.findChild(QPushButton, "resetBtn")

        try:
            self.apply_btn.clicked.disconnect()
        except Exception:
            pass

        self.apply_btn.clicked.connect(self.apply_template)
        if self.load_btn:
            self.load_btn.clicked.connect(self.load_template)
        else:
            print("❌ loadDatasetBtn not found in controlsWidget")
        self.save_btn.clicked.connect(self.save_template)
        self.reset_btn.clicked.connect(self.reset_template)


        
    def load_template(self):
        """
        Load template data from a file and populate the UI with its content.
        """
        file_path, _ = QFileDialog.getOpenFileName(
            parent=self.window,
            caption="Open Template",
            dir=os.path.join(os.getcwd(), "templates"),
            filter="JSON Files (*.json)"
        )
        if not file_path:
            return

        try:
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
            self.populate_ui_from_template(data)
        except Exception as e:
            QMessageBox.critical(None, "Load Error", f"Failed to load template: {e}")
        try:
            manager = gynthetic_coreManager.get()
            manager.initialize(self.window.ui, data)
            print("✅ Loaded template wired into TrililiquariumEngine.")
        except Exception as e:
            print(f"❌ Failed to initialize engine with template: {e}")

    def save_template(self):
        """
        Save the current UI data into a template file.
        """
        data = self.extract_template_from_ui()

        file_path, _ = QFileDialog.getSaveFileName(
            parent=self.window,
            caption="Save Template",
            dir=os.path.join(os.getcwd(), "templates"),
            filter="JSON Files (*.json)"
        )
        if not file_path:
            return

        try:
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)
            self.current_file = file_path
        except Exception as e:
            QMessageBox.critical(None, "Save Error", f"Failed to save template: {e}")

    def reset_template(self):
        """
        Reset the UI fields in the Template Editor to their default state.
        """
        # Clear all fields (e.g., line edits, text edits)
        for phase_key in ["input", "identity", "inception"]:
            phase_prefix = f"{phase_key}Phase"

            transform_le = getattr(self.ui, f"{phase_prefix}TransformLE", None)
            if transform_le:
                transform_le.clear()

            for mod_idx, pillar_key in enumerate(["Input", "Identity", "Inception"]):
                pillar_prefix = f"{phase_prefix}_{pillar_key}Pillar"
                mod_le = getattr(self.ui, f"{pillar_prefix}ModLE", None)

                if mod_le:
                    mod_le.clear()

                for ele_idx in range(7):
                    ele_name = f"{pillar_prefix}Ele_{ele_idx + 1}"
                    ele_field = getattr(self.ui, ele_name, None)
                    if ele_field:
                        ele_field.clear()

    def populate_ui_from_template(self, data):
        # Step down the correct hierarchy path manually
        central = self.window.findChild(QWidget, "centralwidget")
        stack = central.findChild(QWidget, "mainStackedWidget")
        editor = stack.findChild(QWidget, "template_EditorPage")
        scroll = editor.findChild(QWidget, "scrollArea")
        parent = scroll.findChild(QWidget, "scrollAreaWidgetContents")

        for phase_idx, phase_key in enumerate(["input", "identity", "inception"]):
            transform = data["transforms"][phase_idx]
            phase_prefix = f"{phase_key}Phase"

            transform_le = parent.findChild(QLineEdit, f"{phase_prefix}TransformLE")
            if transform_le:
                transform_le.setText(transform.get("name", ""))
            else:
                print(f"❌ Missing: {phase_prefix}TransformLE")

            for mod_idx, pillar_key in enumerate(["Input", "Identity", "Inception"]):
                pillar_prefix = f"{phase_prefix}_{pillar_key}Pillar"
                mod_le = parent.findChild(QLineEdit, f"{pillar_prefix}ModLE")
                modifier = transform["modifiers"][mod_idx]

                if mod_le:
                    mod_le.setText(modifier.get("name", ""))
                else:
                    print(f"❌ Missing: {pillar_prefix}ModLE")

                for ele_idx in range(7):
                    ele_name = f"{pillar_prefix}Ele_{ele_idx + 1}"
                    ele_field = parent.findChild(QLineEdit, ele_name)
                    if ele_field:
                        ele_field.setText(modifier["elements"][ele_idx])
                    else:
                        print(f"❌ Missing: {ele_name}")

                        
    def extract_template_from_ui(self):
        central = self.window.findChild(QWidget, "centralwidget")
        stack = central.findChild(QWidget, "mainStackedWidget")
        editor = stack.findChild(QWidget, "template_EditorPage")
        scroll = editor.findChild(QWidget, "scrollArea")
        parent = scroll.findChild(QWidget, "scrollAreaWidgetContents")

        result = {"transforms": []}

        for phase_key in ["input", "identity", "inception"]:
            phase_prefix = f"{phase_key}Phase"

            transform_le = parent.findChild(QLineEdit, f"{phase_prefix}TransformLE")
            transform_name = transform_le.text() if transform_le else ""

            transform_data = {
                "phase": phase_key,
                "name": transform_name,
                "modifiers": []
            }

            for pillar_key in ["Input", "Identity", "Inception"]:
                pillar_prefix = f"{phase_prefix}_{pillar_key}Pillar"

                mod_le = parent.findChild(QLineEdit, f"{pillar_prefix}ModLE")
                modifier_name = mod_le.text() if mod_le else ""

                elements = []
                for ele_idx in range(7):
                    ele_field = parent.findChild(QLineEdit, f"{pillar_prefix}Ele_{ele_idx + 1}")
                    elements.append(ele_field.text() if ele_field else "")

                transform_data["modifiers"].append({
                    "name": modifier_name,
                    "elements": elements
                })

            result["transforms"].append(transform_data)

        return result

    def apply_template(self):
        data = self.extract_template_from_ui()

        file_path, _ = QFileDialog.getSaveFileName(
            parent=self.window,
            caption="Save and Apply Template",
            dir=os.path.join(os.getcwd(), "templates"),
            filter="JSON Files (*.json)"
        )
        if not file_path:
            return

        try:
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)
            self.current_file = file_path
        except Exception as e:
            QMessageBox.critical(None, "Save Error", f"Failed to save template: {e}")
            return

        asset_path = os.path.dirname(file_path)
        template_name = os.path.splitext(os.path.basename(file_path))[0]

        # Ensure subfolders and placeholder assets
        for phase_key in ["input_phase", "identity_phase", "inception_phase"]:
            phase_folder = os.path.join(asset_path, phase_key)
            os.makedirs(phase_folder, exist_ok=True)

            img_path = os.path.join(phase_folder, "image.png")
            txt_path = os.path.join(phase_folder, "description.txt")

            if not os.path.exists(img_path):
                Image.new("RGB", (300, 100), color=(200, 200, 200)).save(img_path)
            if not os.path.exists(txt_path):
                with open(txt_path, "w", encoding="utf-8") as f:
                    f.write(f"{phase_key.replace('_', ' ').title()} summary for {template_name}.\n")

        # ✅ Only now inject it into the engine
        self.apply_to_engine(data, asset_path)
        # Manually switch to mainEnginePage

        print(f"✅ Template '{template_name}' applied to Trililiquarium.")

        # Switch to mainEnginePage (index 3)
        main_stack = self.window.findChild(QWidget, "mainStackedWidget")
        main_engine_page = self.window.findChild(QWidget, "mainEnginePage")

        if main_stack and main_engine_page:
            index = main_stack.indexOf(main_engine_page)
            if index != -1:
                main_stack.setCurrentIndex(index)
                print("✅ Switched to Main Engine Page.")
            else:
                print("❌ mainEnginePage not in stack.")
        else:
            print("❌ Could not locate mainStackedWidget or mainEnginePage.")


        # Ensure DebugPageSwitcher stays open and raised
        self.ensure_debug_switcher_stays_on_top()

    def ensure_debug_switcher_stays_on_top(self):
        """
        Ensure the DebugPageSwitcher stays visible and on top after applying the template.
        """
        # ✅ Correctly reference the EXISTING DebugPageSwitcher
        debug_switcher = getattr(self.window, "debug_switcher", None)
        if debug_switcher:
            debug_switcher.show()
            debug_switcher.raise_()
            debug_switcher.activateWindow()

    def apply_to_engine(self, template_data, asset_base_path):
        from gynthetic_core_manager import gynthetic_coreManager

        engine = gynthetic_coreManager.get()

        if engine is None:
            print("❌ TrililiquariumManager instance is None.")
            return

        engine.initialize(
            ui=self.window.ui.mainEnginePage,  # ✅ This is now correct
            template_data=template_data,
            asset_base_path=asset_base_path
        )

        print("✅ Template applied successfully to Trililiquarium Engine.")




    def setup_clickable_image(self, ui, phase_key):
        label_name = f"{phase_key}Phase_UploadImageLabel"
        old_label = getattr(ui, label_name, None)
        parent = old_label.parent() if old_label else None
        layout = parent.layout() if parent else None

        new_label = ClickableImageLabel(
            save_folder=os.path.join("templates", "active_template", f"{phase_key}_phase")
        )
        setattr(ui, label_name, new_label)

        if layout and old_label:
            layout.replaceWidget(old_label, new_label)
            old_label.deleteLater()
