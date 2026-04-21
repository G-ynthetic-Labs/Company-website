# trililiquarium_controller.py

from PySide6.QtWidgets import QListWidget, QMessageBox, QSpinBox, QListWidgetItem, QPushButton, QGroupBox, QComboBox, QStackedWidget, QLabel
from PySide6.QtGui import QFont, QPixmap
from ui.assistant_creator import create_and_save_assistant

from PySide6.QtCore import Qt
import os

class gynthetic_coreController:
    def __init__(self, ui, template_data, asset_base_path="templates"):
        self.ui = ui
        self.template_data = template_data
        self.asset_base_path = asset_base_path
        # First find phasesGB
        self.phasesGB = self.ui.findChild(QGroupBox, "phasesGB")

        # Then find buttons inside phasesGB
        self.input_phase_btn = self.phasesGB.findChild(QPushButton, "inputPhaseBtn")
        self.identity_phase_btn = self.phasesGB.findChild(QPushButton, "identityPhaseBtn")
        self.inception_phase_btn = self.phasesGB.findChild(QPushButton, "inceptionPhaseBtn")

        # Connect
        self.input_phase_btn.clicked.connect(lambda: self.select_phase("input", 0))
        self.identity_phase_btn.clicked.connect(lambda: self.select_phase("identity", 1))
        self.inception_phase_btn.clicked.connect(lambda: self.select_phase("inception", 2))


    def append_triads_to_rank_textedit(self, arc_name: str, triads: list[str], phase_name: str):
        """
        Appends a phase's triadic output to the correct rank text edit,
        while removing duplicates across runs.
        """
        priority_map = self.get_priority_map_from_gui()
        rank_index = priority_map.get(arc_name)
        if rank_index is None:
            print(f"⚠️ Arc '{arc_name}' not ranked.")
            return

        text_edit_name = f"rank{rank_index}TE"
        text_edit = getattr(self.ui, text_edit_name, None)

        if not text_edit:
            print(f"❌ Could not find QTextEdit: {text_edit_name}")
            return

        # Format new triad block
        new_block = f"[{phase_name.title()} Phase]\n" + " ".join(triads)

        # Get current text and split into blocks
        existing_blocks = text_edit.toPlainText().strip().split("\n\n")
        normalized = lambda block: block.strip().lower()

        # Check for duplicate (case-insensitive match)
        if normalized(new_block) in map(normalized, existing_blocks):
            print(f"⚠️ Duplicate triad block skipped for {phase_name.title()} Phase on arc '{arc_name}'.")
            return

        # Append if unique
        existing_blocks.append(new_block)
        text_edit.setPlainText("\n\n".join(existing_blocks).strip())

    def populate_modifier_lists(self, template_data):
        for phase_index, phase_name in enumerate(["input", "identity", "inception"]):
            transform = template_data["transforms"][phase_index]
            modifiers = transform["modifiers"]

            for mod_index, pillar_name in enumerate(["Input", "Identity", "Inception"]):
                stack_widget_name = f"{phase_name}PhaseStackedWidget"
                page_list_name = f"{phase_name}PhasePage0{mod_index+1}_List"

                list_widget = getattr(self.ui, page_list_name, None)
                if list_widget:
                    list_widget.clear()
                    header_item = QListWidgetItem(f"{pillar_name} Pillar")
                    header_item.setFlags(Qt.ItemFlag.ItemIsEnabled)
                    header_item.setTextAlignment(Qt.AlignmentFlag.AlignCenter)
                    list_widget.addItem(header_item)

                    for element in modifiers[mod_index]["elements"]:
                        item = QListWidgetItem(element)
                        item.setFont(QFont("Segoe UI", 12))
                        list_widget.addItem(item)


    def setup_modifier_weight_comboboxes(self):
        self.modifier_input_cb = self.ui.findChild(QComboBox, "modifierInputCB")
        self.modifier_identity_cb = self.ui.findChild(QComboBox, "modifieridentityCB")
        self.modifier_inception_cb = self.ui.findChild(QComboBox, "modifierInceptionCB")

        if self.modifier_input_cb:
            self.modifier_input_cb.setCurrentIndex(0)
        if self.modifier_identity_cb:
            self.modifier_identity_cb.setCurrentIndex(0)
        if self.modifier_inception_cb:
            self.modifier_inception_cb.setCurrentIndex(0)


    # File: trililiquarium_controller.py

    def select_phase(self, phase_name: str, index: int):
        print(f"🔀 Switching to {phase_name.title()} Phase (index {index})")

        self.transforms_stacked_widget = self.ui.findChild(QStackedWidget, "transformsStackedWidget")
        self.input_phase_stacked_widget = self.ui.findChild(QStackedWidget, "inputPhaseStackedWidget")
        self.identity_phase_stacked_widget = self.ui.findChild(QStackedWidget, "identityPhaseStackedWidget")
        self.inception_phase_stacked_widget = self.ui.findChild(QStackedWidget, "inceptionPhaseStackedWidget")

        if self.transforms_stacked_widget:
            self.transforms_stacked_widget.setCurrentIndex(index)
        if self.input_phase_stacked_widget:
            self.input_phase_stacked_widget.setCurrentIndex(index)
        if self.identity_phase_stacked_widget:
            self.identity_phase_stacked_widget.setCurrentIndex(index)
        if self.inception_phase_stacked_widget:
            self.inception_phase_stacked_widget.setCurrentIndex(index)

        phase_data = self.template_data["transforms"][index]
        modifiers = phase_data["modifiers"]

        self.modifier_input_label = self.ui.findChild(QLabel, "modifierInputLabel")
        self.modifier_identity_label = self.ui.findChild(QLabel, "modifierIdentityLabel")
        self.modifier_inception_label = self.ui.findChild(QLabel, "modifierInceptionLabel")

        if self.modifier_input_label:
            self.modifier_input_label.setText(modifiers[0]["name"])
        if self.modifier_identity_label:
            self.modifier_identity_label.setText(modifiers[1]["name"])
        if self.modifier_inception_label:
            self.modifier_inception_label.setText(modifiers[2]["name"])

        # Load image and description
        image_label = getattr(self.ui, f"{phase_name}Phase_TransformDynamicLabel", None)
        text_edit = getattr(self.ui, f"{phase_name}Phase_TransformDynamicTE", None)

        phase_folder = os.path.join(self.asset_base_path, f"{phase_name}_phase")
        image_path = os.path.join(phase_folder, "image.png")
        text_path = os.path.join(phase_folder, "description.txt")

        if os.path.exists(image_path) and image_label:
            pixmap = QPixmap(image_path)
            image_label.setPixmap(pixmap.scaled(
                image_label.width(),
                image_label.height(),
                Qt.AspectRatioMode.KeepAspectRatio,
                Qt.TransformationMode.SmoothTransformation
            ))

        if os.path.exists(text_path) and text_edit:
            with open(text_path, "r", encoding="utf-8") as f:
                text_edit.setPlainText(f.read())


    def run_final_synthesis(self):
        print("🌀 Final synthesis triggered.")
        # Placeholder: replace with your pipeline assembly logic
        pass

    # File: trililiquarium_controller.py

    def get_priority_map_from_gui(self) -> dict:
        """
        Returns a mapping of arc name → spinbox value (rank 1–7),
        with spinBox_1 = value, spinBox_7 = essence.
        """
        arc_order = [
            "essence",
            "form",
            "action",
            "frame",
            "intent",
            "relation",
            "value"
        ]
        arc_order.reverse()  # Match reverse order: spinBox_1 is for value

        priority_map = {}

        for i, arc in enumerate(arc_order):
            spinbox_name = f"spinBox_{i + 1}"
            spinbox = getattr(self.ui, spinbox_name, None)
            if spinbox:
                priority_map[arc] = spinbox.value()
            else:
                print(f"❌ Missing spinbox: {spinbox_name} for arc: {arc}")

        return priority_map



    def assign_arcs_to_pipelines(self, decomposed_arcs: dict) -> dict:
        """
        Assigns each rhetorical arc to one of 7 pipeline slots based on spinbox values.
        
        Args:
            decomposed_arcs (dict): Mapping of arc names to decomposed text content.
                Example: { "essence": "foo", "form": "bar", ... }

        Returns:
            dict: Ordered mapping of pipeline index (1–7) to arc name and content.
        """
        arc_spinboxes = {
            "essence": self.ui.firstArcSB,
            "form": self.ui.secondArcSB,
            "function": self.ui.thirdArcSB,
            "context": self.ui.fourthArcSB,
            "intent": self.ui.fifthArcSB,
            "relation": self.ui.sixthArcSB,
            "value": self.ui.seventhArcSB
        }

        # Build reverse mapping: rank number → arc name
        pipeline_assignment = {}
        for arc_name, spinbox in arc_spinboxes.items():
            rank = spinbox.value()
            if rank in pipeline_assignment:
                print(f"⚠️ Duplicate ranking: {rank} already assigned to {pipeline_assignment[rank]}")
            pipeline_assignment[rank] = arc_name

        # Ensure we have exactly 7 unique ranks
        if set(pipeline_assignment.keys()) != set(range(1, 8)):
            raise ValueError("Each arc must be assigned a unique rank 1–7 via spinboxes.")

        # Output ordered pipeline mapping: index 1 → 7
        ordered_pipelines = {}
        for i in range(1, 8):
            arc = pipeline_assignment[i]
            ordered_pipelines[i] = {
                "arc": arc,
                "content": decomposed_arcs.get(arc, "")
            }

        print(f"🧭 Assigned Arcs to Pipelines:\n{ordered_pipelines}")
        return ordered_pipelines
        
    def get_arc_inputs_per_phase(self, arc_name: str) -> dict:
        """
        Pulls triadic influence for a given arc from the currently visible pillars
        in inputPhaseStackedWidget, identityPhaseStackedWidget, inceptionPhaseStackedWidget.
        """

        phase_widgets = {
            "input": self.ui.inputPhaseStackedWidget,
            "identity": self.ui.identityPhaseStackedWidget,
            "inception": self.ui.inceptionPhaseStackedWidget
        }

        result = {}

        for phase_name, stacked_widget in phase_widgets.items():
            current_page_index = stacked_widget.currentIndex()
            page = stacked_widget.widget(current_page_index)

            if page is None:
                print(f"❌ No page found in {phase_name} stacked widget at index {current_page_index}")
                continue

            # Find QListWidget inside page
            list_widget = page.findChild(QListWidget)

            if list_widget is None:
                print(f"❌ No QListWidget found in {phase_name} page {current_page_index}")
                continue

            # Try to get selected item
            selected_item = list_widget.currentItem()

            if selected_item is None or selected_item.text().strip() == "":
                # fallback: pick second item (first is header)
                if list_widget.count() > 1:
                    selected_item = list_widget.item(1)
                else:
                    print(f"⚠️ No selectable item in {phase_name} for arc '{arc_name}'.")
                    continue

            element_text = selected_item.text()

            result[phase_name] = {
                "pillar": f"Pillar {current_page_index + 1}",  # optional: label
                "element": element_text,
                "weight": self.get_modifier_weight_for_phase(phase_name, "")
            }

        return result


        def get_modifier_weight_for_phase(self, phase_name: str, pillar_le_name: str) -> str:
            """
            Determines the assigned weight ("Risk", "Reward", "Relation", or "None")
            for a given pillar during a phase.

            Args:
                phase_name (str): 'input', 'identity', or 'inception'
                pillar_le_name (str): QLineEdit widget object name

            Returns:
                str: Weight name
            """

            phase_to_combobox = {
                "input": self.ui.modifierInputCB,
                "identity": self.ui.modifieridentityCB,
                "inception": self.ui.modifierInceptionCB
            }

            combobox = phase_to_combobox.get(phase_name)
            if combobox is None:
                return "None"

            return combobox.currentText() or "None"

    def get_all_arc_inputs(self) -> dict:
        """
        Retrieves all triadic data for all 7 arcs across input, identity, and inception phases.

        Returns:
            dict: {
                "Essence": {"input": {...}, "identity": {...}, "inception": {...}},
                "Form": {...},
                ...
            }
        """
        arc_inputs = {}

        arc_names = [
            "Essence",
            "Form",
            "Function",
            "Context",
            "Intent",
            "Relation",
            "Value"
        ]

        for arc in arc_names:
            arc_data = self.get_arc_inputs_per_phase(arc)
            if arc_data and len(arc_data) == 3:
                arc_inputs[arc] = arc_data
            else:
                print(f"⚠️ Incomplete triad data for arc: {arc}")

        return arc_inputs
