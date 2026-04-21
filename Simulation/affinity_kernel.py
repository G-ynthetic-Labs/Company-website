# path: /final_dawn_engine/core/affinity_kernel.py
import math
import random
from enum import Enum
from typing import Dict, List, Optional
from dataclasses import dataclass, field

# ==============================================================================
# 0. CONSTANTS & CONFIGURATION
# ==============================================================================

class Affinity(Enum):
    STR = "STR"
    INT = "INT"
    DEX = "DEX"

# The Affinity Table (Attacker \ Defender)
AFFINITY_MATRIX = {
    Affinity.STR: {Affinity.STR: 1.0, Affinity.INT: 0.0, Affinity.DEX: -1.0},
    Affinity.INT: {Affinity.STR: -1.0, Affinity.INT: 1.0, Affinity.DEX: 0.0},
    Affinity.DEX: {Affinity.STR: 0.0, Affinity.INT: -1.0, Affinity.DEX: 1.0},
}

# Tick Modifiers (Update Frequency thresholds)
TICK_THRESHOLDS = {
    "Inter-galactic": 8,  # Slower (-3 relative scale interpreted as higher ticks required)
    "Inter-stellar": 6,
    "Interplanetary": 4,
    "Planetary": 2,       # Baseline
    "Civilizational": 1,  # Faster
    "Civic": 1,
    "Regional": 1         # Fastest
}

# ==============================================================================
# 1. CORE STATE MODEL: THE THREE GEARS
# ==============================================================================

@dataclass
class GearState:
    """Represents the 'Three Gears' of any entity."""
    politics: float = 50.0  # (P) Drives Diplomacy
    economy: float = 50.0   # (E) Drives Politics
    unrest: float = 10.0    # (U) Drives Economy (Micro) & Diplomacy (Macro)

    def clamp(self):
        """Ensures values stay within 0-100 narrative feel bounds."""
        self.politics = max(0.0, min(100.0, self.politics))
        self.economy = max(0.0, min(100.0, self.economy))
        self.unrest = max(0.0, min(100.0, self.unrest))

class SimulationEntity:
    def __init__(self, name: str, layer_name: str, affinity: Affinity, parent=None):
        self.name = name
        self.layer_name = layer_name
        self.affinity = affinity
        self.state = GearState()
        self.parent = parent
        self.children: List['SimulationEntity'] = []
        
        # Internal tick counter for update frequency
        self._tick_accumulator = 0

    def add_child(self, child: 'SimulationEntity'):
        self.children.append(child)
        child.parent = self

    def get_affinity_modifier(self, target_affinity: Affinity) -> float:
        """Returns the interaction weight based on the 3x3 Matrix."""
        return AFFINITY_MATRIX[self.affinity][target_affinity]

    def __repr__(self):
        return (f"<{self.layer_name} '{self.name}' ({self.affinity.name}) "
                f"P:{self.state.politics:.1f} E:{self.state.economy:.1f} U:{self.state.unrest:.1f}>")

# ==============================================================================
# 2. HIERARCHY & SCALE (THE 3x3x7 DRILL DOWN)
# ==============================================================================

class UniverseFactory:
    """Generates the 3x3x7 Drill Down structure."""
    
    @staticmethod
    def build_simulation() -> SimulationEntity:
        # Root node acts as the "Inter-galactic" container or the Universe itself
        universe = SimulationEntity("Eideus Prime", "Universe", Affinity.INT)
        
        # 1. MACRO SCALE
        # Level 1: Inter-galactic (3 Galaxies)
        for g in range(3):
            galaxy_aff = random.choice(list(Affinity))
            galaxy = SimulationEntity(f"Galaxy_{g+1}", "Inter-galactic", galaxy_aff)
            universe.add_child(galaxy)

            # Level 2: Inter-stellar (3 Star Systems per Galaxy)
            for s in range(3):
                star_aff = random.choice(list(Affinity))
                star_sys = SimulationEntity(f"System_{g+1}-{s+1}", "Inter-stellar", star_aff)
                galaxy.add_child(star_sys)

                # Level 3: Planetary (7 Planetary Objects per System)
                for p in range(7):
                    planet_aff = random.choice(list(Affinity))
                    planet = SimulationEntity(f"Planet_{g+1}-{s+1}-{p+1}", "Planetary", planet_aff)
                    star_sys.add_child(planet)

                    # 2. MICRO SCALE (Embedded on Planets)
                    # Level 1: Global/Civilizational (3 Civilizations per Planet)
                    for c in range(3):
                        civ_aff = random.choice(list(Affinity))
                        civ = SimulationEntity(f"Civ_{c+1}", "Civilizational", civ_aff)
                        planet.add_child(civ)

                        # Level 2: Civic (3 Cities per Civ)
                        for city_idx in range(3):
                            city_aff = random.choice(list(Affinity))
                            city = SimulationEntity(f"City_{city_idx+1}", "Civic", city_aff)
                            civ.add_child(city)

                            # Level 3: Regional (7 Regions per City)
                            for r in range(7):
                                reg_aff = random.choice(list(Affinity))
                                region = SimulationEntity(f"Region_{r+1}", "Regional", reg_aff)
                                city.add_child(region)
        
        return universe

# ==============================================================================
# 3. THE ACTUATORS (PLAYER INFLUENCE)
# ==============================================================================

class ActuatorSystem:
    def __init__(self):
        # Relational Scores (0.0 to 100.0)
        self.rel_player_lyra = 50.0
        self.rel_navbot_vizzy = 50.0

    def calculate_tension(self) -> float:
        """
        Calculates the global simulation modifier.
        Formula: Delta(Player, Lyra) - Delta(Navbot, Vizzy)
        """
        # Delta is interpreted here as deviation from neutral or raw strength
        # Using raw score for simplicity as per formula logic
        modifier = self.rel_player_lyra - self.rel_navbot_vizzy
        return modifier

# ==============================================================================
# 4. THE CHURN: GEAR COUPLING LOGIC
# ==============================================================================

class EideusEngine:
    def __init__(self):
        self.universe = UniverseFactory.build_simulation()
        self.actuators = ActuatorSystem()
        self.global_tick_count = 0

    def run_tick(self):
        """Main simulation loop step."""
        self.global_tick_count += 1
        print(f"\n--- [TICK {self.global_tick_count}] ---")
        
        tension_mod = self.actuators.calculate_tension()
        print(f"Global Actuator Tension: {tension_mod:.2f}")

        # Recursive update starting from the universe root
        # Note: We traverse logic Bottom-Up for the Churn chain generally, 
        # but the Actuator injects Top/Bottom simultaneously.
        self._process_entity(self.universe, tension_mod)

    def _process_entity(self, entity: SimulationEntity, tension_mod: float):
        # 1. Determine if this entity updates this tick
        threshold = TICK_THRESHOLDS.get(entity.layer_name, 1)
        entity._tick_accumulator += 1
        
        should_update = entity._tick_accumulator >= threshold
        
        # Recurse first (Processing children updates first allows upward bubbling of Unrest)
        for child in entity.children:
            self._process_entity(child, tension_mod)

        if should_update:
            self._apply_gears(entity, tension_mod)
            entity._tick_accumulator = 0 # Reset counter

    def _apply_gears(self, entity: SimulationEntity, tension_mod: float):
        """
        Implements Section 3: The Churn & Section 5: The Actuators
        """
        # Retrieve parent for upward propagation
        parent = entity.parent

        # --- A. ACTUATOR INJECTION (Section 5) ---
        
        # 1. Regional Public Unrest (The bottom-most anchor)
        if entity.layer_name == "Regional":
            # Direct injection of tension into Unrest
            # If Player/Lyra are strong (+), Unrest drops. If Navbot/Vizzy dominates (-), Unrest rises.
            # Formula interpretation: High Tension = High Stability (Player/Lyra alignment)
            # Low Tension (Negative) = Chaos
            # Adjusting logic: Higher tension (positive) -> Lower Unrest
            entity.state.unrest -= (tension_mod * 0.1) 

        # 2. Intergalactic Diplomacy (The top-most anchor)
        if entity.layer_name == "Inter-galactic":
            # Drives Diplomacy directly
            entity.state.politics += (tension_mod * 0.05)

        # --- B. CAUSAL CHAIN (Section 3) ---
        
        # NOTE: Interactions are modified by Affinity Table inside the logic
        
        # 1. Regional Unrest -> drives -> City Diplomacy (Politics)
        if entity.layer_name == "Regional" and parent and parent.layer_name == "Civic":
            aff_mod = entity.get_affinity_modifier(parent.affinity)
            impact = (entity.state.unrest * 0.1) * (1 + aff_mod)
            # High Unrest damages City Politics (Diplomacy)
            parent.state.politics -= impact

        # 2. City Diplomacy -> drives -> City Economy
        elif entity.layer_name == "Civic":
            # Internal gear turn
            impact = entity.state.politics * 0.05
            entity.state.economy += impact # Good politics boosts economy
            
            # Also propagates up: City Economy -> drives -> Civilizational Politics
            if parent and parent.layer_name == "Civilizational":
                aff_mod = entity.get_affinity_modifier(parent.affinity)
                up_impact = (entity.state.economy * 0.05) * (1 + aff_mod)
                parent.state.politics += up_impact

        # 3. Civilizational Politics -> drives -> Civilizational Unrest
        elif entity.layer_name == "Civilizational":
            # Internal
            impact = entity.state.politics * 0.05
            # Good politics reduces unrest
            entity.state.unrest -= impact
            
            # Upward: Civilizational Unrest -> drives -> Interplanetary Diplomacy (Politics)
            if parent and parent.layer_name == "Planetary":
                aff_mod = entity.get_affinity_modifier(parent.affinity)
                up_impact = (entity.state.unrest * 0.05) * (1 + aff_mod)
                parent.state.politics -= up_impact

        # 4. Planetary Logic (Mapping to "Interplanetary" flows)
        elif entity.layer_name == "Planetary":
            # Interplanetary Diplomacy -> drives -> Interplanetary Economy
            impact = entity.state.politics * 0.02
            entity.state.economy += impact
            
            # Upward: Interplanetary Economy -> drives -> Interstellar Politics
            if parent and parent.layer_name == "Inter-stellar":
                aff_mod = entity.get_affinity_modifier(parent.affinity)
                up_impact = (entity.state.economy * 0.02) * (1 + aff_mod)
                parent.state.politics += up_impact

        # 5. Inter-stellar Logic
        elif entity.layer_name == "Inter-stellar":
            # Interstellar Politics -> drives -> Interstellar Unrest (or next chain link)
            # Recursive pattern application
            impact = entity.state.politics * 0.01
            entity.state.unrest -= impact
            
            # Upward to Inter-galactic
            if parent and parent.layer_name == "Inter-galactic":
                # Interstellar Unrest -> drives -> Inter-galactic Diplomacy
                aff_mod = entity.get_affinity_modifier(parent.affinity)
                up_impact = (entity.state.unrest * 0.05) * (1 + aff_mod)
                parent.state.politics -= up_impact

        # Final State Clamp
        entity.state.clamp()

# ==============================================================================
# 5. EXECUTION EXAMPLE
# ==============================================================================

if __name__ == "__main__":
    engine = EideusEngine()
    
    # Simulate Player actions modifying the Actuators
    engine.actuators.rel_player_lyra = 80.0  # Strong bond
    engine.actuators.rel_navbot_vizzy = 20.0 # Weak bond
    # Resulting Tension = 60.0 (Positive/Stable)
    
    # Run a few ticks
    for i in range(5):
        engine.run_tick()
        
        # Sample readout of a specific chain to show the churn
        galaxy = engine.universe.children[0]
        system = galaxy.children[0]
        planet = system.children[0]
        civ = planet.children[0]
        city = civ.children[0]
        region = city.children[0]
        
        print(f"  [Micro] {region.name} Unrest: {region.state.unrest:.2f}")
        print(f"  [Micro] {city.name} Politics: {city.state.politics:.2f}")
        print(f"  [Macro] {galaxy.name} Politics: {galaxy.state.politics:.2f}")