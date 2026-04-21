# trililiquarium_manager.py

from gynthetic_core_controller import gynthetic_coreController
from triad_controller import TriadController


class gynthetic_coreManager:
    _instance = None

    def __init__(self):
        self.ui = None                    # shared Ui_MainWindow instance
        self.controller = None           # TrililiquariumController
        self.triad_controller = None     # TriadController

    @classmethod
    def get(cls):
        if cls._instance is None:
            cls._instance = gynthetic_coreManager()
        return cls._instance

    def initialize(self, ui, template_data, asset_base_path="templates"):
        """
        Reconnect Trililiquarium system into provided unified UI.
        """
        self.ui = ui

        # Hook core logic
        self.controller = gynthetic_coreController(
            ui=ui,
            template_data=template_data,
            asset_base_path=asset_base_path
        )

        self.controller.populate_modifier_lists(template_data)
        self.controller.setup_modifier_weight_comboboxes()
        self.controller.select_phase("input", 0)

        # Wire arc selection and compute buttons
        self.triad_controller = TriadController(
            ui=ui,
            controller=self.controller
        )

        return self.controller
