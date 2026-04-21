this is memory.py currently

"""
Copyright (c) 2025 William Wallace
G-Synthetic Project

Usage of this code is subject to the MIT license + G-Synthetic Addendum + Patent Notice.
See LICENSE file for full terms.
"""


# memory.py (Consolidated and corrected)

import json
import os
import re
import pyaml
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Tuple, Any, Optional, Iterable, Union


# --- Part 1: Core Lattice Logic ---

def enc7(v: int) -> int:
    if v < -3 or v > 3:
        raise ValueError("tick out of range [-3,3]")
    return v + 3

def dec7(d: int) -> int:
    if d < 0 or d > 6:
        raise ValueError("digit out of range [0,6]")
    return d - 3

def shell_inf(x: int, y: int, z: int) -> int:
    return max(abs(x), abs(y), abs(z))

def make_key(t: int, x: int, y: int, z: int) -> str:
    dx, dy, dz = enc7(x), enc7(y), enc7(z)
    r = shell_inf(x, y, z)
    if t < 0 or t > 2: raise ValueError("transform must be 0..2")
    return f"T{t}-D{dx}{dy}{dz}-S{r}"

def parse_key(key: str) -> Tuple[int, int, int, int, int]:
    t = int(key[1])
    dx, dy, dz = int(key[5]), int(key[6]), int(key[7])
    r = int(key[11])
    x, y, z = dec7(dx), dec7(dy), dec7(dz)
    return t, x, y, z, r

def node_id_from_parts(t: int, dx: int, dy: int, dz: int) -> int:
    cell = dx * 49 + dy * 7 + dz
    return t * 343 + cell

def node_id_from_key(key: str) -> int:
    t, x, y, z, _ = parse_key(key)
    dx, dy, dz = enc7(x), enc7(y), enc7(z)
    return node_id_from_parts(t, dx, dy, dz)

def parts_from_node_id(node_id: int) -> Tuple[int, int, int, int]:
    t = node_id // 343
    cell = node_id % 343
    dx = cell // 49
    rem = cell % 49
    dy = rem // 7
    dz = rem % 7
    x, y, z = dec7(dx), dec7(dy), dec7(dz)
    return t, x, y, z

def key_from_node_id(node_id: int) -> str:
    t, x, y, z = parts_from_node_id(node_id)
    return make_key(t, x, y, z)

def neighbors6(node_id: int) -> List[int]:
    t, x, y, z = parts_from_node_id(node_id)
    res = []
    for xx, yy, zz in ((x-1,y,z),(x+1,y,z),(x,y-1,z),(x,y+1,z),(x,y,z-1),(x,y,z+1)):
        if -3 <= xx <= 3 and -3 <= yy <= 3 and -3 <= zz <= 3:
            dx, dy, dz = enc7(xx), enc7(yy), enc7(zz)
            res.append(node_id_from_parts(t, dx, dy, dz))
    return res

# --- Part 2: Lattice Memory Store ---

def _now_iso() -> str:
    return datetime.utcnow().replace(microsecond=0).isoformat() + "Z"

class LatticeMemoryStore:
    def __init__(self, base_dir: str = "memory_lattice"):
        self.base = Path(base_dir)
        self.base.mkdir(parents=True, exist_ok=True)

    def key_from_axes(self, t: int, x: int, y: int, z: int) -> str:
        return make_key(t, x, y, z)

    def path_from_key(self, key: str) -> Path:
        t = key[1]
        dx, dy, dz = key[5], key[6], key[7]
        return self.base / f"T{t}" / f"D{dx}{dy}{dz}" / "node.json"

    def read_node(self, key: str) -> Optional[dict]:
        p = self.path_from_key(key)
        if p.exists():
            try:
                return json.loads(p.read_text())
            except Exception:
                return None
        return None

    def write_entry(self, key: str, entry: dict) -> dict:
        p = self.path_from_key(key)
        p.parent.mkdir(parents=True, exist_ok=True)
        node = self.read_node(key) or {
            "key": key,
            "node_id": node_id_from_key(key),
            "created_at": _now_iso(),
            "updated_at": None,
            "history": []
        }
        entry = {**entry}
        if "timestamp" not in entry:
            entry["timestamp"] = _now_iso()
        if "tags" in entry and isinstance(entry["tags"], str):
            entry["tags"] = [t.strip() for t in entry["tags"].split(",") if t.strip()]
        if "weight" in entry:
            try:
                entry["weight"] = int(entry["weight"])
            except Exception:
                entry["weight"] = 4
        entry.setdefault("access_count", 0)
        entry.setdefault("last_accessed", None)
        node["history"].append(entry)
        node["updated_at"] = entry["timestamp"]
        node["last"] = entry
        p.write_text(json.dumps(node, indent=2))
        return node

    def save_node_object(self, key: str, node_obj: dict) -> None:
        p = self.path_from_key(key)
        p.parent.mkdir(parents=True, exist_ok=True)
        if "key" not in node_obj:
            node_obj["key"] = key
        if "node_id" not in node_obj:
            node_obj["node_id"] = node_id_from_key(key)
        node_obj["updated_at"] = _now_iso()
        p.write_text(json.dumps(node_obj, indent=2))

    def delete_node(self, key: str) -> bool:
        p = self.path_from_key(key)
        try:
            if p.exists():
                p.unlink()
                d = p.parent
                while d != self.base and d.exists() and not any(d.iterdir()):
                    d.rmdir()
                    d = d.parent
                return True
        except Exception:
            return False
        return False

    def recall(self, key: str, limit: int = 3, max_chars: int = 600) -> str:
        node = self.read_node(key)
        if not node:
            return ""
        hist = node.get("history", [])[-limit:]
        lines: List[str] = []
        for h in hist:
            prefix = ""
            if "arc" in h and "phase" in h:
                prefix = f"[{h['arc']}/{h['phase']}] "
            text = h.get("text") or h.get("summary") or h.get("cue") or ""
            if not text:
                continue
            lines.append(prefix + text)
        blob = " | ".join(lines)
        if len(blob) > max_chars:
            blob = blob[: max_chars - 3] + "..."
        return blob

    def _score_entry(self, h: dict) -> tuple:
        cnt = int(h.get("access_count", 0) or 0)
        ts = h.get("timestamp") or ""
        return (-cnt, ts)

    def _increment_access_for_indices(self, node: dict, indices: list[int]) -> None:
        hist = node.get("history", [])
        for idx in indices:
            if 0 <= idx < len(hist):
                h = hist[idx]
                h["access_count"] = int(h.get("access_count", 0) or 0) + 1
                h["last_accessed"] = _now_iso()
                log = h.get("access_log") or []
                if isinstance(log, list):
                    log.append(h["last_accessed"])
                    if len(log) > 20:
                        log = log[-20:]
                    h["access_log"] = log
        node["history"] = hist

    def trim_node(self, key: str, max_entries: int = 8) -> dict:
        node = self.read_node(key) or {}
        hist = node.get("history", [])
        if len(hist) <= max_entries:
            return node
        ordered = sorted(hist, key=self._score_entry)
        kept = ordered[:max_entries]
        kept.sort(key=lambda h: h.get("timestamp") or "")
        node["history"] = kept
        node["last"] = kept[-1] if kept else {}
        node["updated_at"] = _now_iso()
        p = self.path_from_key(key)
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(json.dumps(node, indent=2))
        return node

    def trim_all_nodes(self, max_entries: int = 8) -> int:
        trimmed = 0
        for key, _p in self.iter_node_paths():
            node = self.read_node(key) or {}
            if len(node.get("history", [])) > max_entries:
                self.trim_node(key, max_entries=max_entries)
                trimmed += 1
        return trimmed

    @staticmethod
    def arc_index_to_tick(a_idx: int) -> int:
        if not (0 <= a_idx <= 6):
            raise ValueError("arc index must be 0..6")
        return a_idx - 3

    def key_for_cell(self, t_idx: int, pillar_idx: int, arc_idx: int) -> str:
        tick = self.arc_index_to_tick(arc_idx)
        x = tick if pillar_idx == 0 else 0
        y = tick if pillar_idx == 1 else 0
        z = tick if pillar_idx == 2 else 0
        return self.key_from_axes(t_idx, x, y, z)

    _KEY_RE = re.compile(r'^T[0-2]-D[0-6]{3}-S[0-3]$')

    def iter_node_paths(self) -> Iterable[tuple[str, Path]]:
        if not self.base.exists():
            return
        for tdir in sorted(self.base.glob("T[0-2]")):
            for ddir in sorted(tdir.glob("D???")):
                node = ddir / "node.json"
                t = tdir.name[1]
                dx, dy, dz = ddir.name[1], ddir.name[2], ddir.name[3]
                try:
                    x = int(dx) - 3
                    y = int(dy) - 3
                    z = int(dz) - 3
                except ValueError:
                    continue
                r = max(abs(x), abs(y), abs(z))
                key = f"T{t}-D{dx}{dy}{dz}-S{r}"
                if node.exists() and self._KEY_RE.match(key):
                    yield key, node

    def list_nodes_meta(self) -> List[dict]:
        out: List[dict] = []
        for key, p in self.iter_node_paths():
            try:
                data = json.loads(p.read_text())
            except Exception:
                continue
            last = (data.get("last") or {})
            out.append({
                "key": key,
                "node_id": data.get("node_id"),
                "updated_at": data.get("updated_at"),
                "history_len": len(data.get("history", [])),
                "last_arc": last.get("arc"),
                "last_phase": last.get("phase"),
                "last_tags": last.get("tags", []),
                "last_weight": last.get("weight", None),
                "last_text": last.get("text") or last.get("cue") or ""
            })
        out.sort(key=lambda m: m.get("updated_at") or "", reverse=True)
        return out


# --- Part 3: LLM Hooks and Integrations ---
# R_ARCS and other constants would need to be defined elsewhere in your project
R_ARCS = ["Essence", "Form", "Function", "Context", "Intent", "Relation", "Value"]
PHASE_LABELS = ("Phase1", "Phase2", "Phase3")


def read_memory_for_prompt(
    store: LatticeMemoryStore,
    schedule: List[Tuple[int, int]],
    selection: dict,
    transforms: List[str]
) -> str:
    t_index: Dict[str, int] = {name: i for i, name in enumerate(transforms)}
    contexts = []
    visited_keys = set()
    for p, q in schedule:
        ph_name = f"Phase{p+1}"
        t_name = selection.get(ph_name, {}).get("transform")
        if not t_name:
            continue
        t_idx = t_index.get(t_name, -1)
        if t_idx == -1:
            continue
        for a_idx, arc in enumerate(R_ARCS):
            key = store.key_for_cell(t_idx, q, a_idx)
            if key in visited_keys:
                continue
            visited_keys.add(key)
            node_data = store.read_node(key)
            if node_data and "last" in node_data and node_data["last"]:
                last_entry = node_data["last"]
                text = last_entry.get("text", "").strip()
                if text:
                    contexts.append(f"- At {t_name}/{arc} (Cell {q}): {text}")
    if not contexts:
        return ""
    header = "CONTEXT FROM PREVIOUS EVENTS (Use this to inform your writing):"
    return f"{header}\n" + "\n".join(contexts)


def write_memory_from_reply(
    store: LatticeMemoryStore,
    transforms: List[str],
    selection: dict,
    schedule: List[Tuple[int, int]],
    llm_reply: str,
    cue_grids: Dict[str, List[List[str]]]
):
    if not llm_reply or not llm_reply.strip():
        return
    persist_pass_writes(
        store=store,
        transforms=transforms,
        selection=selection,
        schedule=schedule,
        arc_names=R_ARCS,
        llm_reply=llm_reply,
        cue_grids=cue_grids,
        phase_labels=PHASE_LABELS
    )


def persist_pass_writes(
    store: LatticeMemoryStore,
    transforms: List[str],
    selection: dict,
    schedule: List[Tuple[int, int]],
    arc_names: List[str],
    llm_reply: str,
    cue_grids: Dict[str, List[List[str]]],
    phase_labels: Tuple[str, str, str],
    default_weight: int = 4,
    extra_tags: Optional[List[str]] = None,
):
    t_index: Dict[str, int] = {name: i for i, name in enumerate(transforms)}
    reply_excerpt = (llm_reply or "").strip()
    if len(reply_excerpt) > 320:
        reply_excerpt = reply_excerpt[:317] + "..."
    tags = ["auto"]
    if extra_tags:
        tags.extend([t for t in extra_tags if t not in tags])
    for (p, q) in schedule:
        ph_name = phase_labels[p]
        t_name = selection.get(ph_name, {}).get("transform") or ""
        t_idx = t_index.get(t_name, 0)
        for a_idx, arc in enumerate(arc_names):
            key = store.key_for_cell(t_idx, q, a_idx)
            cue = cue_grids.get(arc, [["","",""],["","",""],["","",""]])[p][q]
            if not cue:
                continue
            store.write_entry(key, {
                "arc": arc,
                "phase": ph_name,
                "cue": cue,
                "text": reply_excerpt,
                "tags": tags,
                "weight": default_weight,
            })