"""
Copyright (c) 2025 William Wallace
G-Synthetic Project

Usage of this code is subject to the MIT license + G-Synthetic Addendum + Patent Notice.
See LICENSE file for full terms.
"""


import json
import re
import os
import sys
import numpy as np
from pathlib import Path
from typing import Dict, List, Optional, Any, Callable, Iterable
from dataclasses import dataclass, field
from concurrent.futures import ThreadPoolExecutor


from llm_tank.adapters.ollama_adapter import LLMClient as OllamaLLMClient
from llm_tank.adapters.llama_cpp_adapter import LlamaCppClient as LlamaCppLLMClient
from llm_tank.llm_core import LLMManager

from .memory import write_memory_from_reply, LatticeMemoryStore, read_memory_for_prompt, write_memory_from_reply
from .timeline_store import next_page_for, save_x_up, save_y_up

from PySide6.QtCore import QObject, Signal, Slot, QRunnable, QThreadPool

def _triad_sign(x: float) -> int:
    # map [-3..3] to -1/0/1 with a small dead-zone
    if x > 0.15: return 1
    if x < -0.15: return -1
    return 0

# Canonical Arc Order
RHETORICAL_ARCS = ("essence", "form", "action", "frame", "intent", "relation", "value")

# The 3 Macro-Temporal Phases 
MACRO_PHASES = ("Input", "Identity", "Inception")

@dataclass
class RhetoricalArcs:
    """The 7 canonical rhetorical arcs for decomposition."""
    essence: str = ""
    form: str = ""
    action: str = ""
    frame: str = ""
    intent: str = ""
    relation: str = ""
    value: str = ""

    def to_dict(self) -> dict:
        return self.__dict__

    @staticmethod
    def from_dict(data: dict) -> "RhetoricalArcs":
        return RhetoricalArcs(**{k: data.get(k, "") for k in RHETORICAL_ARCS})
    

class LLMInterface:
    """
    A unified interface for the engine to interact with different LLM backends.
    This class routes calls to the appropriate methods of each LLM client and
    offloads scoring to the Coral accelerator when available.
    """
    def __init__(self, llm_manager: LLMManager, provider: str, config: Dict = {}):
        self.provider = provider
        self.llm_manager = llm_manager
        self.adapter = None
        
        # Access the CoralInterface instance from the manager
        self.coral_interface = self.llm_manager.get_coral_interface()

        if provider == "Ollama":
            # ... (Ollama adapter initialization)
            pass
        elif provider == "Llama.cpp":
            # ... (Llama.cpp adapter initialization)
            pass
        else:
            raise ValueError(f"Unsupported LLM provider: {provider}")

    def decompose_input(self, user_input: str) -> Dict[str, dict]:
        """
        Calls the decomposition LLM agent to break down user input.
        This uses a chat-based decomposition prompt.
        """
        if self.adapter is None:
            raise RuntimeError("LLM adapter is not initialized.")
        
        # --- FIX: Define messages at the start of the function ---
        system_prompt = "You are a decomposition agent. Decompose the following input into its 7 rhetorical arcs: essence, form, action, frame, intent, relation, and value. Your response must be a JSON object with these 7 keys and a 'text' field for the decomposed text and a 'magnitude' field for the token count."
        messages = [{"role": "system", "content": system_prompt}, {"role": "user", "content": f"Input: '{user_input}'"}]
        # --- End of fix ---

        full_response = ""
        # Use isinstance to check the object type, which Pylance can correctly analyze.
        if isinstance(self.adapter, OllamaLLMClient):
            full_response = self.adapter.chat_messages(messages)

        elif isinstance(self.adapter, LlamaCppLLMClient):
            if not self.adapter.is_loaded:
                raise RuntimeError("Llama.cpp model is not loaded.")
            
            # Use the streaming method and collect the full response
            stream = self.adapter.stream_chat_completion(messages=messages, hyperparameters={"max_tokens": 2048})
            for chunk in stream:
                # Add explicit checks to satisfy the Pylance type checker
                if isinstance(chunk, dict):
                    choices = chunk.get("choices")
                    if choices and isinstance(choices, list) and len(choices) > 0:
                        delta = choices[0].get("delta")
                        if delta and isinstance(delta, dict):
                            content = delta.get("content")
                            if isinstance(content, str):
                                full_response += content
        else:
            raise ValueError(f"Unsupported LLM provider: {self.provider}")

        try:
            # The LLM's raw output needs to be parsed as JSON
            response_json = json.loads(full_response)
        except json.JSONDecodeError:
            print("Warning: LLM response was not valid JSON. Trying to find JSON in the response string.")
            # Fallback to finding a JSON block if the model wraps it in text.
            match = re.search(r'\{.*\}', full_response, re.DOTALL)
            if match:
                response_json = json.loads(match.group(0))
            else:
                raise RuntimeError("LLM response could not be parsed as JSON.")

        # The decomposition LLM should return the data in the expected format.
        arc_data = {}
        for arc, text in response_json.items():
            if arc in RHETORICAL_ARCS:
                token_count = len(str(text).split())
                arc_data[arc] = {"text": str(text), "magnitude": token_count}
        
        return arc_data
    
   
    def score_relevance(self, arc_text: str, user_input: str, template_text: str) -> float:
        """
        Calculates relevance using a Coral-accelerated sentence encoder if available,
        otherwise returns a neutral score.
        """
        # The CoralInterface handles whether it is loaded.
        if not self.coral_interface.is_loaded:
            print("Coral model not loaded. Scoring is skipped.")
            return 0.0

        sentences_to_embed = [arc_text, template_text]

        embeddings = self.coral_interface.embed(sentences_to_embed)
        arc_embedding = embeddings[0]
        template_embedding = embeddings[1]

        # Use numpy for calculations. Since we know coral_interface.is_loaded is True,
        # we can assume numpy is also available because it's a core dependency of pycoral.
        dot_product = np.dot(arc_embedding, template_embedding)
        norm_product = np.linalg.norm(arc_embedding) * np.linalg.norm(template_embedding)
        
        if norm_product == 0:
            return 0.0

        cosine_similarity = dot_product / norm_product
        
        # Scale the [-1, 1] cosine similarity to your [-3, 3] scoring scale
        scaled_score = cosine_similarity * 3.0
        return scaled_score


    def synthesize_output(self, prompt_stack: List[Dict[str, Any]]) -> str:
        """
        Calls the final synthesis LLM to generate the character response.
        This represents the Synthesis LLM (LLM 4).
        """
        if self.adapter is None:
            raise RuntimeError("LLM adapter is not initialized.")

        # --- FIX: Define formatted_input and messages here ---
        formatted_input = "\n\n".join(
            (f"[ARC: {item['arc'].upper()} | RANK: {item['rank']} | SCORES: {item['scores']} | MAGNITUDE: {item['magnitude']}]\n"
            f"{item['compiled_prompt']}") for item in prompt_stack)
        
        messages = [{"role": "user", "content": f"Synthesize a response based on the following ranked and scored rhetorical arcs:\n\n{formatted_input}"}]
        # --- End of fix ---
        
        full_response = ""
        if isinstance(self.adapter, OllamaLLMClient):
            full_response = self.adapter.chat_messages(messages)
        elif isinstance(self.adapter, LlamaCppLLMClient):
            if not self.adapter.is_loaded:
                raise RuntimeError("Llama.cpp model is not loaded.")
            
            # --- FIX: Add type hint to stream to satisfy Pylance ---
            stream: Iterable[Any] = self.adapter.stream_chat_completion(messages=messages, hyperparameters={})
            for chunk in stream:
                if isinstance(chunk, dict):
                    choices = chunk.get("choices")
                    if choices and isinstance(choices, list) and len(choices) > 0:
                        delta = choices[0].get("delta")
                        if delta and isinstance(delta, dict):
                            content = delta.get("content")
                            if isinstance(content, str):
                                full_response += content
        else:
            raise ValueError(f"Unsupported LLM provider: {self.provider}")
            
        return full_response

# --- 3. TEMPLATE & MODIFIER HIERARCHY ---

class TemplateLoader:
    """Loads plug-and-play domain templates."""
    def __init__(self, character: str, base_dir: str = "main_app/engine/templates"):
        self.base_dir = Path(base_dir)
        # Use a real file path based on the character
        self.filepath = self._get_filepath(character)

    def _get_filepath(self, character: str) -> Path:
        # Placeholder logic to find the correct template file
        if character.lower() == "emily":
            return self.base_dir / "geo_char_story_template.json"
        # Add more logic here for other characters if needed
        return self.base_dir / "default_transform_template.json"

    def load(self) -> Dict:
        if not self.filepath.exists():
            raise FileNotFoundError(f"Template file not found: {self.filepath}")
        with self.filepath.open("r") as f:
            data = json.load(f)
        return data

class ModifierMatrix:
    """Manages the 3x3 grid of elements from a loaded template."""
    def __init__(self, template_data: Dict):
        self.grid: List[List[List[str]]] = self._build_matrix(template_data)

    def _build_matrix(self, data: Dict) -> List[List[List[str]]]:
        matrix = []
        # Expects a list of transforms, each with a list of modifiers
        for transform in data.get("transforms", []):
            row = []
            for modifier in transform.get("modifiers", []):
                elements = modifier.get("elements", [])
                row.append(elements)
            matrix.append(row)
        return matrix

    def get_element(self, phase_index: int, mod_index: int, rank_index: int) -> str:
        try:
            elements = self.grid[phase_index][mod_index]
            index = rank_index - 1
            if 0 <= index < len(elements):
                return elements[index]
            else:
                return "[Missing Element]"
        except IndexError:
            return "[Missing Element]"

# --- 4. PHASE PROCESSORS & ANALYZERS (REAL IMPLEMENTATION) ---

class PhaseProcessor:
    """Processes a single macro temporal phase for all 7 pipelines."""
    def __init__(self, llm_interface: LLMInterface, matrix: ModifierMatrix, user_input: str):
        self.llm_interface = llm_interface
        self.matrix = matrix
        self.user_input = user_input
        
    def process(self, phase_index: int, arc_data: Dict[str, dict]) -> Dict[str, dict]:
        processed_arcs = {}
        with ThreadPoolExecutor(max_workers=7) as executor:
            future_to_arc = {
                executor.submit(self._evaluate_single_arc, phase_index, arc_name, data): arc_name
                for arc_name, data in arc_data.items()
            }
            for future in future_to_arc:
                arc_name = future_to_arc[future]
                processed_arcs[arc_name] = future.result()
        return processed_arcs
    

            
    def _evaluate_single_arc(self, phase_index: int, arc_name: str, data: Dict[str, Any]) -> Dict[str, Any]:
        scores = []
        triad_elements = []
        for mod_index in range(3):
            element_text = self.matrix.get_element(phase_index, mod_index, RHETORICAL_ARCS.index(arc_name) + 1)
            score = self.llm_interface.score_relevance(data['text'], self.user_input, element_text)
            scores.append(score)
            triad_elements.append(element_text)
        final_score = sum(scores) / len(scores) if scores else 0.0
        return {
            "text": data.get('text', ""),
            "magnitude": data.get('magnitude', 0),
            "triad_elements": triad_elements,
            "micro_scores": scores,
            "final_score": final_score,
            "triad_sign": _triad_sign(final_score)  # NEW
        }

# --- 5. THE MAIN ENGINE ORCHESTRATOR (REAL IMPLEMENTATION) ---

class SymbolicEngine(QObject):
    """
    The main class that orchestrates the entire cognitive pipeline.
    This class is designed to be run as a QRunnable in a separate thread.
    """
    def __init__(self, llm_manager: Any, character: str = "default"):
        super().__init__()
        # Use the real LLMManager from the llm_tank
        self.llm_manager = llm_manager
        self.character = character
        self.memory_store = LatticeMemoryStore() 


    def run_pipeline(self, user_input: str, coord_prefix: tuple[int,int,int] = (0,0,0)) -> str:
        print("🌀 Starting REAL Engine Orchestration...")

        # active provider + config
        llm_provider = self.llm_manager.get_name()
        llm_config = self.llm_manager.config
        # FIX: pass (llm_manager, provider, config) to LLMInterface
        llm_interface = LLMInterface(self.llm_manager, llm_provider, llm_config)

        # timeline coord + x_up
        coord = next_page_for(coord_prefix)
        save_x_up(coord, user_input)

        # Step 1: Decompose
        print("  1) Decomposing input...")
        arc_data = llm_interface.decompose_input(user_input)

        # Step 2: Template + Matrix
        template = TemplateLoader(self.character).load()
        modifier_matrix = ModifierMatrix(template)

        # Step 3: Phase processing
        print("  2) Processing arcs through 3 phases...")
        all_phase_results: dict[str, dict] = {}
        for phase_index, phase_name in enumerate(MACRO_PHASES):
            processor = PhaseProcessor(llm_interface, modifier_matrix, user_input)
            results = processor.process(phase_index, arc_data)
            all_phase_results[phase_name] = results

        # ---- Memory retrieval (BEFORE ranking) ----
        print("  3) Retrieving memory context...")
        # build transforms list and selection for the 3 phases
        # support either list-style or dict-style template
        if isinstance(template.get("transforms"), dict):
            transforms = list(template["transforms"].keys())
        else:
            transforms = [t.get("name", f"T{i}") for i, t in enumerate(template.get("transforms", []))]
        transforms = (transforms or ["T0","T1","T2"])[:3]

        selection = {
            "Phase1": {"transform": transforms[0]},
            "Phase2": {"transform": transforms[1] if len(transforms) > 1 else transforms[0]},
            "Phase3": {"transform": transforms[2] if len(transforms) > 2 else transforms[-1]},
        }
        # schedule = (phase_index, pillar_idx) – we’ll diagonal through X,Y,Z
        schedule = [(0,0),(1,1),(2,2)]
        mem_context = read_memory_for_prompt(
            store=self.memory_store,
            schedule=schedule,
            selection=selection,
            transforms=transforms
        )

        # Step 4: Final prompt assembly with ranking
        print("  4) Assembling ranked prompt...")
        # compute total per-arc score = magnitude + sum(phase final_scores)
        arc_scores_total = {}
        for arc_name in RHETORICAL_ARCS:
            s = 0.0
            for phase_name in MACRO_PHASES:
                s += all_phase_results[phase_name][arc_name]["final_score"]
            arc_scores_total[arc_name] = arc_data[arc_name]["magnitude"] + s

        ranked_arcs = sorted(RHETORICAL_ARCS, key=lambda a: arc_scores_total[a], reverse=True)

        final_prompt_stack = []
        y_payload = {}  # for y_up.json
        for rank_idx, arc_name in enumerate(ranked_arcs, start=1):
            compiled_triads = []
            final_scores_str = []
            triad_signs = []

            for phase_name in MACRO_PHASES:
                arc_result = all_phase_results[phase_name][arc_name]
                compiled_triads.append(" ".join(arc_result['triad_elements']))
                final_scores_str.append(f"{phase_name}:{arc_result['final_score']:.2f}")
                triad_signs.append(arc_result["triad_sign"])

            text = all_phase_results['Input'][arc_name]['text']
            magnitude = all_phase_results['Input'][arc_name]['magnitude']

            final_prompt_stack.append({
                "arc": arc_name,
                "rank": rank_idx,
                "scores": ', '.join(final_scores_str),
                "magnitude": magnitude,
                "triad": triad_signs,  # [-1/0/1] per phase
                "compiled_prompt": f"Text: {text}\nTriads: {' | '.join(compiled_triads)}"
            })

            y_payload[arc_name] = {
                "magnitude": magnitude,
                "triad": {
                    "Input": triad_signs[0],
                    "Identity": triad_signs[1],
                    "Inception": triad_signs[2],
                },
                "score_total": arc_scores_total[arc_name]
            }

        # persist y_up
        save_y_up(coord, y_payload)

        # Build the final message to the synthesis LLM
        formatted_input = "\n\n".join(
            f"[ARC:{item['arc'].upper()} | RANK:{item['rank']} | TRIAD:{item['triad']} | MAG:{item['magnitude']} | SCORES:{item['scores']}]\n{item['compiled_prompt']}"
            for item in final_prompt_stack
        )
        preface = "Use the temporal triad to weight presence across the 3 phases (Input, Identity, Inception)."
        if mem_context:
            formatted_input = (mem_context + "\n\n" + preface + "\n\n" + formatted_input)
        else:
            formatted_input = (preface + "\n\n" + formatted_input)

        # Step 5: Synthesis
        print("  5) Submitting to final Synthesis LLM...")
        messages = [{"role": "user", "content": f"Synthesize a response based on the following ranked and scored rhetorical arcs:\n\n{formatted_input}"}]
        full_response = ""
        if isinstance(llm_interface.adapter, OllamaLLMClient):
            full_response = llm_interface.adapter.chat_messages(messages)
        elif isinstance(llm_interface.adapter, LlamaCppLLMClient):
            stream = llm_interface.adapter.stream_chat_completion(messages=messages, hyperparameters={})
            for chunk in stream:
                if isinstance(chunk, dict):
                    choices = chunk.get("choices")
                    if choices and isinstance(choices, list):
                        delta = (choices[0].get("delta") or {})
                        content = delta.get("content")
                        if isinstance(content, str):
                            full_response += content
        else:
            raise RuntimeError("Unsupported LLM adapter for synthesis.")

        # ---- Memory write-back (AFTER synthesis) ----
        try:
            # Construct 3x3 cue grid from the template matrix so persist_pass_writes can tag cells
            cue_grids = {}
            for idx, arc_name in enumerate(RHETORICAL_ARCS):
                grid = [[ "", "", "" ], [ "", "", "" ], [ "", "", "" ]]
                for p in range(3):
                    for q in range(3):
                        grid[p][q] = modifier_matrix.get_element(p, q, idx+1) or ""
                cue_grids[arc_name.capitalize()] = grid  # memory.py uses capitalized arc names

            write_memory_from_reply(
                store=self.memory_store,
                transforms=transforms,
                selection=selection,
                schedule=schedule,
                llm_reply=full_response,
                cue_grids=cue_grids
            )
        except Exception as _:
            # Non-fatal – keep running even if memory write failed
            pass

        return full_response
