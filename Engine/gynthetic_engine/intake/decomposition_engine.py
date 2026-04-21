# decomposition_engine.py

import os
import json
from typing import Dict, Optional
import openai

from arc_struct import RhetoricalArcs

# --- System Prompt for Arc Decomposition ---
SYSTEM_PROMPT = """
You are a decomposition engine. When given a single natural language prompt, extract the 7 canonical rhetorical arcs used in G-ynthetic processing:

- Essence
- Form
- Action
- Frame
- Intent
- Relation
- Value

Respond only in valid JSON with the following structure:
{
  "essence": "...",
  "form": "...",
  "action": "...",
  "frame": "...",
  "intent": "...",
  "relation": "...",
  "value": "..."
}

Do not invent new logic. Do not generate prose. Return only the decomposed structure.
"""

def decompose_prompt(
    user_input: str,
    model: str = "gpt-4",
    api_key: Optional[str] = None,
    temperature: float = 0.2,
    top_p: float = 0.9,
    max_tokens: int = 500
) -> Dict[str, str]:
    """
    Sends a decomposition request to the LLM and returns the 7-arc dictionary.
    Raises ValueError if API key or response is malformed.
    """
    api_key = api_key or os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("API key must be provided or set in environment.")

    openai.api_key = api_key

    try:
        response = openai.ChatCompletion.create(
            model=model,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_input}
            ],
            temperature=temperature,
            top_p=top_p,
            max_tokens=max_tokens
        )
    except Exception as e:
        raise RuntimeError(f"OpenAI request failed: {e}")

    content = response.choices[0].message["content"].strip()

    try:
        data = json.loads(content)
    except json.JSONDecodeError:
        raise ValueError(f"Invalid JSON returned by LLM:\n{content}")

    expected_keys = ["essence", "form", "action", "frame", "intent", "relation", "value"]
    missing = [key for key in expected_keys if key not in data]
    if missing:
        raise ValueError(f"Missing expected keys in response: {missing}\n{content}")

    return data


def decompose_to_dataclass(
    user_input: str,
    model: str = "gpt-4",
    api_key: Optional[str] = None
) -> RhetoricalArcs:
    """
    Calls the LLM and returns a RhetoricalArcs dataclass.
    """
    arc_dict = decompose_prompt(user_input, model=model, api_key=api_key)
    return RhetoricalArcs.from_dict(arc_dict)
