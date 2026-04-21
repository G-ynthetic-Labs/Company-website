# LLM_Config_launcher.py

import os
import json
from pathlib import Path
from PySide6.QtWidgets import QFileDialog, QMainWindow, QWidget, QMessageBox
from PySide6.QtCore import QTimer

from ui.newEngine import Ui_MainWindow
from ui.template_editor_controller import TemplateEditorController
from ui.assistant_creator import create_and_save_assistant
from custom_widgets.clickable_image_label import ClickableImageLabel
from gynthetic_core_manager import gynthetic_coreManager
from llm_helpers.openai_interface import send_message_to_assistant, ping_assistant
from ui.enter_key_filter import EnterKeyFilter


class LLMConfigWindow:
    def __init__(self, ui, window):
        self.ui = ui
        self.window = window  # real QMainWindow passed from main.py
        self._connect_signals()


    def _connect_signals(self):
        self.ui.middleAgent_updateBtn.clicked.connect(lambda: self.handle_create_agent(role="composer"))
        self.ui.decomposer_UpdateBtn.clicked.connect(lambda: self.handle_create_agent(role="decomposer"))
        self.ui.conductor_UpdateBtn.clicked.connect(lambda: self.handle_create_agent(role="conductor"))

        self.ui.decomposer_SendBtn.clicked.connect(lambda: self.handle_send(role="decomposer"))
        self.ui.conductor_SendBtn.clicked.connect(lambda: self.handle_send(role="conductor"))
        self.ui.middleAgent_SendBtn.clicked.connect(lambda: self.handle_send(role="composer"))

        self.ui.middleAgent_PingBtn.clicked.connect(lambda: self.ping_agent(role="composer"))
        self.ui.decomposer_PingBtn.clicked.connect(lambda: self.ping_agent(role="decomposer"))
        self.ui.conductor_PingBtn.clicked.connect(lambda: self.ping_agent(role="conductor"))


        # Top persistent navigation bar
        self.ui.DashboardBtn.clicked.connect(lambda: self.ui.mainStackedWidget.setCurrentWidget(self.ui.dashboardPage))
        self.ui.TemplateEditorBtn.clicked.connect(lambda: self.ui.mainStackedWidget.setCurrentWidget(self.ui.template_EditorPage))
        self.ui.LLMConfigPushBtn.clicked.connect(lambda: self.ui.mainStackedWidget.setCurrentWidget(self.ui.LLM_ConfigPage))
        self.ui.EngineBtn.clicked.connect(lambda: self.ui.mainStackedWidget.setCurrentWidget(self.ui.mainEnginePage))
        self.ui.AuditsBtn.clicked.connect(lambda: self.ui.mainStackedWidget.setCurrentWidget(self.ui.auditsPage))

  

    def run_full_conductor(self):
        from gynthetic_core_manager import gynthetic_coreManager
        try:
            manager = gynthetic_coreManager.get()
            if manager.triad_controller:
                manager.triad_controller.run_conductor_for_all_arcs()
                print("🚀 Full Conductor run triggered!")
            else:
                print("⚠️ No TriadController found — cannot run.")
        except Exception as e:
            print(f"❌ Error during full Conductor run: {e}")

    def handle_send(self, role):
        if role == "composer":
            prompt = self.ui.middleAgent_UserInputTE.toPlainText().strip()
            output = self.ui.middleAgent_ResponseWindowTE
            env_path = Path("secrets/composer.env")

        elif role == "decomposer":
            prompt = self.ui.decomposer_UserInputTE.toPlainText().strip()
            output = self.ui.decomposer_ResponseWindowTE
            env_path = Path("secrets/decomposer.env")

        elif role == "conductor":
            prompt = self.ui.conductor_UserInputTE.toPlainText().strip()
            output = self.ui.conductor_ResponseWindowTE
            env_path = Path("secrets/conductor.env")

        else:
            QMessageBox.warning(self.window, "Unknown Role", f"Role '{role}' not recognized.")
            return

        if not prompt:
            output.setPlainText("⚠️ Please enter a prompt.")
            return

        try:
            response = send_message_to_assistant(env_path, prompt)
            output.setPlainText(response)
        except Exception as e:
            output.setPlainText(f"❌ Error: {e}")
            print(f"❌ {role.title()} error: {e}")

    def handle_output_send(self):
        prompt = self.ui.outputLLM_UserInputTE.toPlainText().strip()
        if not prompt:
            self.ui.outputLLM_ResponseWindowTE.setPlainText("❌ Cannot send empty message.")
            return
        try:
            response = send_message_to_assistant(Path("secrets/composer.env"), prompt)
            self.ui.outputLLM_ResponseWindowTE.setPlainText(response)
        except Exception as e:
            self.ui.outputLLM_ResponseWindowTE.setPlainText(f"❌ Error: {e}")
            print(f"❌ Composer error: {e}")

    def load_dataset(self):
        template_dir = os.path.join(os.getcwd(), "templates")
        os.makedirs(template_dir, exist_ok=True)

        file_path, _ = QFileDialog.getOpenFileName(
            parent=self.window,
            caption="Load Template Dataset",
            dir=template_dir,
            filter="JSON Files (*.json)"
        )

        if not file_path:
            return

        try:
            with open(file_path, "r", encoding="utf-8") as f:
                dataset = json.load(f)
        except Exception as e:
            QMessageBox.critical(None, "Error", f"Failed to load JSON:\n{str(e)}")
            return

        # Initialize template controller using unified UI and QMainWindow
        # GOOD
        self.template_controller = TemplateEditorController(
            self.window.ui.template_EditorPage,  # <-- pass the PAGE WIDGET
            self.window                           # <-- pass the real MainWindow
        )
        self.template_controller.populate_ui_from_template(dataset)

        # Replace UploadImageLabels with ClickableImageLabel
        template_name = dataset.get("metadata", {}).get("template_name") or \
                        os.path.splitext(os.path.basename(file_path))[0]

        for phase_key in ["input", "identity", "inception"]:
            label_name = f"{phase_key}Phase_UploadImageLabel"
            existing_label = getattr(self.ui, label_name, None)
            if existing_label:
                parent = existing_label.parent()
                layout = parent.layout() if parent else None
                if layout:
                    layout.removeWidget(existing_label)
                    existing_label.deleteLater()

                    clickable = ClickableImageLabel(
                        save_folder=os.path.join("templates", template_name, f"{phase_key}_phase")
                    )
                    clickable.setMinimumSize(existing_label.minimumSize())
                    clickable.setObjectName(existing_label.objectName())
                    layout.addWidget(clickable)
                    setattr(self.ui, label_name, clickable)

        # Switch to Template Editor page
        index = self.ui.mainStackedWidget.indexOf(self.ui.template_EditorPage)
        if index != -1:
            self.ui.mainStackedWidget.setCurrentIndex(index)


    def open_dashboard(self):
        self.dashboard_window = QWidget()
        self.dashboard_window.show()



    def center_editor_diagram(self):
        try:
            scroll_area = self.editor_ui.scrollArea
            canvas = scroll_area.widget()
            if not canvas:
                return
            h_scroll = scroll_area.horizontalScrollBar()
            v_scroll = scroll_area.verticalScrollBar()
            h_scroll.setValue((canvas.width() - scroll_area.viewport().width()) // 2)
            v_scroll.setValue((canvas.height() - scroll_area.viewport().height()) // 2)
        except Exception as e:
            print(f"❌ Centering error: {e}")

    def populate_gynthetic_core_fields(self, ui, data):
        ui.essenceTE.setPlainText(data.get("Essence", ""))
        ui.formTE.setPlainText(data.get("Form", ""))
        ui.actionTE.setPlainText(data.get("Function", ""))
        ui.frameTE.setPlainText(data.get("Context", ""))
        ui.intentTE.setPlainText(data.get("Intent", ""))
        ui.relationTE.setPlainText(data.get("Relation", ""))
        ui.valueTE.setPlainText(data.get("Value", ""))

    def ping_agent(self, role):
        if role == "composer":
            api_key = self.ui.middleAgent_API_KeyLE.text().strip()
            label = self.ui.middleAgent_StatusLabel
        elif role == "decomposer":
            api_key = self.ui.decomposer_API_KeyLE.text().strip()
            label = self.ui.decomposer_StatusLabel
        elif role == "conductor":
            api_key = self.ui.conductor_API_KeyLE.text().strip()
            label = self.ui.conductor_StatusLabel
        else:
            QMessageBox.warning(self.window, "Invalid Role", f"Unknown role: {role}")
            return

        if not api_key:
            label.setText("❌ No API Key")
            return

        try:
            import openai
            openai.api_key = api_key
            _ = openai.models.list()  # light ping
            label.setText("✅ OK")
            print(f"✅ Ping to {role} succeeded.")
        except Exception as e:
            label.setText("❌ Failed")
            print(f"❌ Ping to {role} failed: {e}")

    def handle_create_agent(self, role="composer"):
        if role == "composer":
            name = self.ui.middleAgent_AgentNameLE.text().strip()
            api_key = self.ui.middleAgent_API_KeyLE.text().strip()
            prompt = self.ui.middleAgent_SystemPromptTE.toPlainText().strip()
            id_field = self.ui.middleAgent_AgentID_LE
        elif role == "decomposer":
            name = self.ui.decomposerAgent_NameLE.text().strip()
            api_key = self.ui.decomposer_API_KeyLE.text().strip()
            prompt = self.ui.decomposer_SystemPromptTE.toPlainText().strip()
            id_field = self.ui.decomposer_ID_LE
        elif role == "conductor":
            name = self.ui.conductor_AgentNameLE.text().strip()
            api_key = self.ui.conductor_API_KeyLE.text().strip()
            prompt = self.ui.conductor_SystemPromptTE.toPlainText().strip()
            id_field = self.ui.conductor_AgentID_LE
        else:
            QMessageBox.warning(self.window, "Unknown Role", f"Role '{role}' is not recognized.")
            return

        if not all([name, api_key, prompt]):
            QMessageBox.warning(self.window, "Missing Info", f"All fields must be filled for {role}.")
            return

        try:
            agent_id = create_and_save_assistant(api_key, role, name, prompt)
            id_field.setText(agent_id)
            QMessageBox.information(self.window, "Agent Created", f"{role.title()} ID: {agent_id}")
            print(f"✅ {role.title()} assistant created: {agent_id}")
        except Exception as e:
            QMessageBox.critical(self.window, "Creation Failed", str(e))
            print(f"❌ Failed to create {role} agent: {e}")
