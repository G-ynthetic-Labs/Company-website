// game/core/pieces/BasePiece.ts
import { PieceType, PlayerColor, PieceSkill, Vector3, TelemetryData, Faction, PieceStats, Position } from '../../types';
import { TI } from '../TensorConfig';
import { PIECE_PERSONAS } from '../../ai/AIProfiles';
import { XPTable } from '../../ai/XPTable';

export interface MoveContext {
  isEmpty: (pos: Position) => boolean;
  isEnemy: (pos: Position, myColor: PlayerColor) => boolean;
  isAlly: (pos: Position, myColor: PlayerColor) => boolean;
}

export abstract class GamePiece {
  public readonly id: string;
  public type: PieceType;
  public color: PlayerColor;
  public position: Position;

  public faction: Faction = Faction.NONE;
  public commanderId: string | null = null;
  public generalId: string | null = null;
  public currentMorale: number = 0;

  public profileId: string = 'guardian';

  public phase: number = 1;
  public hasMoved: boolean = false;

  // Tracks the vector of the last move to determine orientation
  public lastMoveVector: Vector3 | null = null;
  public isMercenary: boolean = false;

  public telemetry?: TelemetryData;
  public learnedSkills: Set<PieceSkill>;

  // FULL TELEMETRY: This is the object updated by StatTracker/MetricMaps
  public stats?: PieceStats;

  // Movement Constraints for Phase 2
  public maxMoveLimit: number = 8;
  public previousMoveVector: Vector3 | null = null;

  // RPG Fundamentals
  public xp: number = 0;
  public level: number = 1;
  public fundamentals: {
    force: number; // STR-variant (derived from play)
    flow: number;  // INT-variant
    form: number;  // WIS-variant
  } = { force: 0, flow: 0, form: 0 };

  constructor(id: string, type: PieceType, color: PlayerColor, position: Position, isSimulated: boolean = false) {
    this.id = id;
    this.type = type;
    this.color = color;
    this.position = position;
    this.learnedSkills = new Set<PieceSkill>();

    if (isSimulated) {
      // Bypassing heavy RPG objects for AI Pathfinding
      this.currentMorale = this.getBaseMorale();
      return;
    }

    this.telemetry = {
      movesMade: 0,
      distanceTraveled: 0,
      captures: 0,
      avgRRRScore: 0.0,
      peakDangerSurvived: 0.0,
      history: []
    };

    this.currentMorale = this.getBaseMorale();
    this.assignDefaultPersona();

    // Initialize the full PieceStats object
    this.stats = this._createDefaultPieceStats(id, type, color, position);
    if (this.stats) this.stats.morale = this.currentMorale;
  }

  private _createDefaultPieceStats(id: string, type: PieceType, color: PlayerColor, pos: Position): PieceStats {
    return {
      id: id,
      pieceType: type,
      color: color === 'white' ? 'white' : 'black',
      allegiance: 'independent',
      position: [pos.x, pos.y, pos.z],
      morale: 100.0,
      captured: false, promoted: false, rank: null, games_survived: 0, special_moves_used: 0,
      squaresMoved: 0, materialCaptured: 0, kills: 0, kills_by_type: {},
      threatenedBy: new Set(), coveringAllies: new Set(), isExposed: false, bully: 0,
      formationCoherence: 0, forwardScout: 0, _inEnemyTerritoryTurns: 0, diligent: 0, survivor: false,
      achievements: new Set(), roleTag: 'strategic',
      isSupported: false,
    };
  }

  private assignDefaultPersona() {
    switch (this.type) {
      case PieceType.KING: this.profileId = 'royal'; break;
      case PieceType.QUEEN: this.profileId = 'assassin'; break;
      case PieceType.KNIGHT:
      case PieceType.FRACTAL_KNIGHT: this.profileId = 'berserker'; break;
      case PieceType.ROOK: this.profileId = 'sentinel'; break;
      case PieceType.BISHOP: this.profileId = 'explorer'; break;
      case PieceType.PAWN: this.profileId = 'guardian'; break;
      default: this.profileId = 'guardian';
    }
  }

  public getBaseMorale(): number {
    switch (this.type) {
      case PieceType.KING: return 21;
      case PieceType.QUEEN: return 10;
      case PieceType.FRACTAL_KNIGHT: return 10;
      case PieceType.ROOK: return 3;
      case PieceType.BISHOP: return 3;
      case PieceType.KNIGHT: return 3;
      case PieceType.PAWN: return 1;
      default: return 0;
    }
  }

  public getMaterialValue(): number {
    switch (this.type) {
      case PieceType.KING: return 100000;
      case PieceType.QUEEN: return 18;
      case PieceType.FRACTAL_KNIGHT: return 14;
      case PieceType.ROOK: return 10;
      case PieceType.BISHOP: return 9;
      case PieceType.KNIGHT: return 8;
      case PieceType.PAWN: return 1;
      default: return 0;
    }
  }

  public setPosition(newPos: Position, rrrScore: number = 0): void {
    const dx = newPos.x - this.position.x;
    const dy = newPos.y - this.position.y;
    const dz = newPos.z - this.position.z;

    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

    // Update Orientation Vector
    this.lastMoveVector = { x: dx, y: dy, z: dz };

    if (this.telemetry) {
      this.telemetry.movesMade++;
      this.telemetry.distanceTraveled += dist;
      this.telemetry.history.push({ ...newPos });

      const n = this.telemetry.movesMade;
      this.telemetry.avgRRRScore =
        ((this.telemetry.avgRRRScore * (n - 1)) + rrrScore) / n;
    }

    this.position = newPos;
    this.hasMoved = true;

    // Update PieceStats position
    if (this.stats) this.stats.position = [newPos.x, newPos.y, newPos.z];
  }

  public evolve(): void {
    this.phase++;
    this._unlockPhaseSkills();
  }

  protected _unlockPhaseSkills(): void {
    if (this.phase >= 2) {
      if (this.type === PieceType.ROOK) this.learnedSkills.add(PieceSkill.FRACTAL_DRIFT);
      if (this.type === PieceType.BISHOP) this.learnedSkills.add(PieceSkill.PRISM_REFRACT);
      if (this.type === PieceType.KNIGHT || this.type === PieceType.FRACTAL_KNIGHT) {
        this.learnedSkills.add(PieceSkill.QUANTUM_LEAP);
      }
    }
  }

  protected _isInBounds(pos: Position, boardSize: number): boolean {
    return (
      pos.x >= 0 && pos.x < boardSize &&
      pos.y >= 0 && pos.y < boardSize &&
      pos.z >= 0 && pos.z < boardSize
    );
  }

  // Helper to determine if a target position is effectively "Stopping"
  public isMoveFinished(target: Position): boolean {
    return this.position.x === target.x &&
      this.position.y === target.y &&
      this.position.z === target.z;
  }

  public abstract getPotentialMoves(boardSize: number, ctx: MoveContext): Position[];

  /**
   * Calculates the trajectory of a move (all nodes visited).
   * Default: Linear Raycast (for sliding pieces like Rook, Bishop, Queen, Pawn).
   * Overridden by Teleporters (Knight) to skip intermediates.
   */
  public addXp(amount: number) {
    this.xp += amount;

    // Logarithmic Threshold Check
    let nextLevelXp = XPTable.getNextLevelThreshold(this.level);

    while (this.xp >= nextLevelXp) {
      this.level++;
      this._applyGrowth();

      // Tiered Phase Unlock (Every 8 Levels)
      if (this.level % 8 === 0) {
        this.evolve();
      }

      nextLevelXp = XPTable.getNextLevelThreshold(this.level);
    }
  }

  private _applyGrowth() {
    // Growth is based on the AI Profile mapping
    const profile = PIECE_PERSONAS[this.profileId];
    if (profile && profile.statGrowth) {
      // Boost fundamentals by growth variants (per level)
      this.fundamentals.force += profile.statGrowth.force;
      this.fundamentals.flow += profile.statGrowth.flow;
      this.fundamentals.form += profile.statGrowth.form;
    } else {
      // Default growth if profile not found
      this.fundamentals.force += 0.2;
      this.fundamentals.form += 0.1;
    }
  }

  public getTrajectory(target: Position): Position[] {
    const start = this.position;
    const trajectory: Position[] = [start];

    const dx = target.x - start.x;
    const dy = target.y - start.y;
    const dz = target.z - start.z;

    const steps = Math.max(Math.abs(dx), Math.abs(dy), Math.abs(dz));

    // If teleporting to same spot or just 1 step, just return start/end
    if (steps <= 1) {
      if (steps === 1) trajectory.push(target);
      return trajectory;
    }

    // Linear Interpolation for Sliding
    const sx = dx / steps;
    const sy = dy / steps;
    const sz = dz / steps;

    for (let i = 1; i <= steps; i++) {
      trajectory.push({
        x: Math.round(start.x + (sx * i)),
        y: Math.round(start.y + (sy * i)),
        z: Math.round(start.z + (sz * i))
      });
    }

    return trajectory;
  }
}