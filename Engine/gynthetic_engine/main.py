# main.py

import sys
import os
import json
from PySide6.QtWidgets import QApplication, QMainWindow
from ui.newEngine import Ui_MainWindow
from PySide6.QtCore import QTimer
from gynthetic_core_controller import gynthetic_coreController
from triad_controller import TriadController
from ui.template_editor_controller import TemplateEditorController
from LLM_Config_launcher import LLMConfigWindow
from ui.gpt2_controller import GPT2FloatingWindow  # <- Add this near your other imports
from pipelines.transform_loader import TransformLoader


def main():
    app = QApplication(sys.argv)

    # Load the unified UI
    window = QMainWindow()
    ui = Ui_MainWindow()
    ui.setupUi(window)
    # Show the Template Editor page first
    ui.mainStackedWidget.setCurrentWidget(ui.template_EditorPage)

    window.setWindowTitle("Trililiquarium Engine")
    window.showMaximized()
   
    # === Launch GPT2 Floating Window ===
    gpt2_window = GPT2FloatingWindow()
    gpt2_window.show()


    # === Load fallback template ===
    fallback_path = os.path.join("templates", "test_dataset", "working_transform_template.json")
    if os.path.exists(fallback_path):
        with open(fallback_path, "r", encoding="utf-8") as f:
            template_data = json.load(f)
    else:
        loader = TransformLoader()
        template_data = loader.load()

    # GOOD (Scoped to page widgets)
    self_controller = gynthetic_coreController(
        ui=ui.mainEnginePage,  # <-- SCOPE TO mainEnginePage
        template_data=template_data,
        asset_base_path="templates/test_dataset"
    )

    self_template_editor_controller = TemplateEditorController(
        ui=ui.template_EditorPage,  # <-- SCOPE TO template_EditorPage
        window=window
    )

    self_controller.populate_modifier_lists(template_data)
    self_controller.setup_modifier_weight_comboboxes()
    self_controller.select_phase("input", 0)

    # === Triadic Controller ===
    self_triad_controller = TriadController(
        ui=ui,
        controller=self_controller
    )


    for phase in ["input", "identity", "inception"]:
        self_template_editor_controller.setup_clickable_image(ui, phase)

    llm_launcher = LLMConfigWindow(ui, window)
    llm_launcher.template_controller = self_template_editor_controller

    # === Show Main Window ===
    window.show()
    sys.exit(app.exec())

if __name__ == "__main__":
    main()
