import sys
import os
from PySide6.QtWidgets import QApplication

# ✅ Add the root project path so Python can find your engine modules
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from tavern_gui import TavernWindow
from synthesis_engine import run_synthesis_from_ui
from pipelines.transform_loader import TransformLoader
from gynthetic_core_manager import gynthetic_coreManager


def tavern_engine_handler(user_input, character_name, memory_context):
    template_data = TransformLoader().load()  # Uses the default from the engine root
    controller = gynthetic_coreManager.get().initialize(ui=None, template_data=template_data)

    controller.get_priority_map_from_gui = lambda: {
        "essence": 1, "form": 2, "action": 3, "frame": 4,
        "intent": 5, "relation": 6, "value": 7
    }

    combined_prompt = f"Memory so far:\n{memory_context}\n\nYou now say: {user_input}"

    controller.template_data["manual_arcs"] = {
        "essence": f"The mood shifts as {character_name} speaks.",
        "form": character_name,
        "action": "Words ripple across the table.",
        "frame": "Inside the Whispering Flask tavern",
        "intent": combined_prompt,
        "relation": "All listen in silence...",
        "value": "The night deepens."
    }

    result = run_synthesis_from_ui(controller)
    return result.get("final_output", "[No Output]")

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = TavernWindow(synthesis_callback=tavern_engine_handler)
    window.show()
    sys.exit(app.exec())