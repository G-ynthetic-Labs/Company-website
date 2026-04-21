# path: /final_dawn_engine/core/memory_lattice.py
import math
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple, Set, Any
from collections import defaultdict

# ==============================================================================
# 0. KEY STRUCTURES & PARSING
# ==============================================================================

@dataclass(frozen=True, order=True)
class SpatialKey:
    """
    Format: [g.s.o.c.ct.r]
    (G)alaxy.(S)tar system.explorable (O)bject.(C)ivilization.(C)i(T)y.(R)egion
    """
    g: int
    s: int
    o: int
    c: int
    ct: int
    r: int

    def __str__(self):
        return f"g{self.g}.s{self.s}.o{self.o}.c{self.c}.ct{self.ct}.r{self.r}"

    @classmethod
    def from_string(cls, key_str: str):
        # Expected format: "g1.s2.o3.c4.ct5.r6"
        parts = key_str.split('.')
        return cls(
            g=int(parts[0][1:]),
            s=int(parts[1][1:]),
            o=int(parts[2][1:]),
            c=int(parts[3][1:]),
            ct=int(parts[4][2:]), # 'ct' prefix len 2
            r=int(parts[5][1:])
        )

@dataclass(frozen=True, order=True)
class TemporalKey:
    """
    Format: [s.b.c.p]
    (S)aga.(B)ook.(C)hapter.(P)age
    """
    s: int
    b: int
    c: int
    p: int

    def __str__(self):
        return f"s{self.s}.b{self.b}.c{self.c}.p{self.p}"

    @classmethod
    def from_string(cls, key_str: str):
        # Expected format: "s0.b1.c2.p100"
        parts = key_str.split('.')
        return cls(
            s=int(parts[0][1:]),
            b=int(parts[1][1:]),
            c=int(parts[2][1:]),
            p=int(parts[3][1:])
        )

# ==============================================================================
# 1. THE VOXEL CUBE (The 6 Faces)
# ==============================================================================

@dataclass
class MemoryVoxel:
    # Identifiers
    spatial_key: SpatialKey
    temporal_key: TemporalKey
    
    # --- The 6 Faces ---
    
    # X Axis: I/O (The Event)
    x_pos: str = ""  # Input: Summed input of the game turn
    x_neg: str = ""  # Output: Summed output of the game turn
    
    # Y Axis: Neural/Associative (The Context)
    y_pos: List[List[float]] = field(default_factory=list) # Embeddings (Up to 7 vectors)
    y_neg: List[str] = field(default_factory=list)         # Tags (Up to 7 associative tags)
    
    # Z Axis: World State (The Facts)
    z_pos: List[Dict[str, Any]] = field(default_factory=list) # Entity Character Cards involved
    z_neg: str = ""  # Lorekey for this location address

    def get_id(self) -> str:
        """Unique ID for internal hashing."""
        return f"{self.spatial_key}::{self.temporal_key}"

# ==============================================================================
# 2. THE LATTICE MANAGER & INDEXES
# ==============================================================================

class MemoryLattice:
    def __init__(self):
        # Primary Storage: Map ID -> Voxel
        self.voxels: Dict[str, MemoryVoxel] = {}
        
        # --- Lookup Indexes ---
        # Maps Term -> List[VoxelIDs]
        self.idx_location: Dict[str, List[str]] = defaultdict(list)
        self.idx_personage: Dict[str, List[str]] = defaultdict(list)
        self.idx_proper_noun: Dict[str, List[str]] = defaultdict(list)
        self.idx_tags: Dict[str, List[str]] = defaultdict(list)
        self.idx_lore_key: Dict[str, List[str]] = defaultdict(list)
        self.idx_entity_id: Dict[str, List[str]] = defaultdict(list)
        self.idx_entity_class: Dict[str, List[str]] = defaultdict(list)

    # --- Ingestion ---
    
    def add_voxel(self, voxel: MemoryVoxel):
        vid = voxel.get_id()
        self.voxels[vid] = voxel
        
        # Indexing Logic
        # 1. Tag Index (y-)
        for tag in voxel.y_neg:
            self.idx_tags[tag].append(vid)
            
        # 2. Entity Indexes (z+)
        for entity in voxel.z_pos:
            if 'name' in entity:
                self.idx_personage[entity['name']].append(vid)
            if 'id' in entity:
                self.idx_entity_id[entity['id']].append(vid)
            if 'class' in entity:
                self.idx_entity_class[entity['class']].append(vid)
        
        # 3. Lore Index (z-)
        if voxel.z_neg:
            self.idx_lore_key[voxel.z_neg].append(vid)

    # --- Core Toolcalls: Slicing & Direct Reads ---

    def direct_voxel_read(self, spatial_str: str, temporal_str: str) -> Optional[MemoryVoxel]:
        """Input: exact [g.s...r] + [s.b...p]"""
        try:
            s_key = SpatialKey.from_string(spatial_str)
            t_key = TemporalKey.from_string(temporal_str)
            return self.voxels.get(f"{s_key}::{t_key}")
        except:
            return None

    def direct_spatial_slice(self, spatial_str: str) -> List[MemoryVoxel]:
        """Input: exact [g.s...r]. Output: all pages at that location."""
        target_s = SpatialKey.from_string(spatial_str)
        results = []
        for v in self.voxels.values():
            if v.spatial_key == target_s:
                results.append(v)
        # Sort by time
        results.sort(key=lambda x: x.temporal_key)
        return results

    def range_read_temporal(self, start_t_str: str, end_t_str: str) -> List[MemoryVoxel]:
        """Input: Range of temporal keys."""
        start = TemporalKey.from_string(start_t_str)
        end = TemporalKey.from_string(end_t_str)
        results = []
        for v in self.voxels.values():
            if start <= v.temporal_key <= end:
                results.append(v)
        results.sort(key=lambda x: x.temporal_key)
        return results

    def latest_at_location(self, spatial_str: str) -> Optional[MemoryVoxel]:
        """Input: [g.s...r]. Output: newest voxel."""
        slice_res = self.direct_spatial_slice(spatial_str)
        return slice_res[-1] if slice_res else None

    # --- Advanced Lookup Tools ---

    def entity_encounter_window(self, entity_id: str, pivot_voxel: MemoryVoxel, window_size: int = 3) -> List[MemoryVoxel]:
        """
        Input: entity + a specific encounter voxel
        Output: that voxel ±N pages + filtered by entity presence
        """
        pivot_t = pivot_voxel.temporal_key
        
        # 1. Get raw Temporal Window
        matches = []
        for v in self.voxels.values():
            # Check saga/book/chapter alignment (assuming strict session continuity)
            if (v.temporal_key.s == pivot_t.s and 
                v.temporal_key.b == pivot_t.b and 
                v.temporal_key.c == pivot_t.c):
                
                # Check Page range
                if abs(v.temporal_key.p - pivot_t.p) <= window_size:
                    matches.append(v)
        
        # 2. Filter by Entity Presence (Index Cross-check)
        # Verify entity is actually in these voxels (z+ face check)
        final_list = []
        for v in matches:
            has_entity = any(e.get('id') == entity_id for e in v.z_pos)
            if has_entity:
                final_list.append(v)
                
        final_list.sort(key=lambda x: x.temporal_key)
        return final_list

    def associative_jump(self, voxel: MemoryVoxel) -> Dict[str, List[MemoryVoxel]]:
        """
        Entry: voxel
        Rule: follow its y- tags -> retrieve other voxels sharing them
        """
        results = {}
        for tag in voxel.y_neg:
            # Use Index
            voxel_ids = self.idx_tags.get(tag, [])
            # Fetch objects
            voxels = [self.voxels[vid] for vid in voxel_ids if vid != voxel.get_id()]
            results[tag] = voxels
        return results

    def spacetime_neighborhood(self, voxel: MemoryVoxel, t_window: int = 1) -> List[MemoryVoxel]:
        """
        Combine: spatial neighbor set (same r, ct, c...) at time t, then apply ±N time
        Simplified for demo: strict location match, ±N pages.
        """
        # In a full grid implementation, we would check r±1, ct±1 etc.
        # Here we stick to the Prompt's "Place + Time Query" logic on the exact node.
        
        matches = []
        t_key = voxel.temporal_key
        
        for v in self.voxels.values():
            # Same Location
            if v.spatial_key == voxel.spatial_key:
                # Time Window
                if (v.temporal_key.s == t_key.s and
                    v.temporal_key.b == t_key.b and
                    v.temporal_key.c == t_key.c and
                    abs(v.temporal_key.p - t_key.p) <= t_window):
                    matches.append(v)
        
        matches.sort(key=lambda x: x.temporal_key)
        return matches

# ==============================================================================
# 3. USAGE DEMONSTRATION
# ==============================================================================

if __name__ == "__main__":
    lattice = MemoryLattice()

    # --- 1. Populate Mock Data ---
    # Defines a sequence where the player meets "Lyra" in City 5
    
    # Turn 1: Arrival
    v1 = MemoryVoxel(
        spatial_key=SpatialKey.from_string("g1.s1.o1.c1.ct5.r1"),
        temporal_key=TemporalKey.from_string("s0.b1.c1.p1"),
        x_pos="Player enters the Neon Market.",
        x_neg="System loads region description. Ambient noise high.",
        y_neg=["market", "neon", "arrival"],
        z_pos=[],
        z_neg="lore.city5.market"
    )
    
    # Turn 2: Encounter Lyra
    v2 = MemoryVoxel(
        spatial_key=SpatialKey.from_string("g1.s1.o1.c1.ct5.r1"),
        temporal_key=TemporalKey.from_string("s0.b1.c1.p2"),
        x_pos="Player talks to the hooded figure.",
        x_neg="Lyra reveals herself. 'You're late,' she says.",
        y_neg=["dialogue", "tension", "npc_reveal"],
        z_pos=[{"name": "Lyra", "id": "npc_lyra_01", "class": "rogue"}],
        z_neg="lore.city5.market"
    )
    
    # Turn 3: Trade
    v3 = MemoryVoxel(
        spatial_key=SpatialKey.from_string("g1.s1.o1.c1.ct5.r1"),
        temporal_key=TemporalKey.from_string("s0.b1.c1.p3"),
        x_pos="Player offers data chip.",
        x_neg="Lyra accepts. Reputation +5.",
        y_neg=["trade", "reputation_up", "item_transfer"],
        z_pos=[{"name": "Lyra", "id": "npc_lyra_01", "class": "rogue"}],
        z_neg="lore.city5.market"
    )

    lattice.add_voxel(v1)
    lattice.add_voxel(v2)
    lattice.add_voxel(v3)

    print("--- Memory Cognitive Lattice Initialized ---")
    
    # --- 2. Test Toolcalls ---
    
    # A. Entity Encounter Window
    # "Show me the context around the moment I traded with Lyra (v3)"
    print(f"\n[Tool: Entity Encounter Window] Target: Lyra @ {v3.temporal_key}")
    window = lattice.entity_encounter_window("npc_lyra_01", v3, window_size=2)
    for v in window:
        print(f"  > {v.temporal_key}: {v.x_neg}")

    # B. Associative Jump
    # "Find other memories related to 'neon' or 'market' from v1"
    print(f"\n[Tool: Associative Jump] Source: v1 (Tags: {v1.y_neg})")
    jumps = lattice.associative_jump(v1)
    for tag, voxels in jumps.items():
        if voxels:
            print(f"  > Tag '{tag}' leads to: {[str(vx.temporal_key) for vx in voxels]}")

    # C. Direct Spatial Slice
    loc = "g1.s1.o1.c1.ct5.r1"
    print(f"\n[Tool: Direct Spatial Slice] Location: {loc}")
    slice_res = lattice.direct_spatial_slice(loc)
    print(f"  > Found {len(slice_res)} pages.")