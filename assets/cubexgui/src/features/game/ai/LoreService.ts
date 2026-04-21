// src/features/game/ai/LoreService.ts
import { PieceType } from '../types';

export interface PieceLore {
    type: PieceType;
    title: string;
    description: string;
    factionNotes: {
        gold: string;
        silver: string;
    };
    baseAethos: string;
}

export const LORE_DATABASE: Record<PieceType, PieceLore> = {
    [PieceType.KING]: {
        type: PieceType.KING,
        title: 'The Prime Singularity',
        description: 'The ontological anchor of the local Tensor Field. If this unit collapses, the entire sub-reality de-coheres.',
        factionNotes: {
            gold: 'A beacon of absolute order.',
            silver: 'A tyrant of frozen code.'
        },
        baseAethos: 'Preservation at any cost.'
    },
    [PieceType.QUEEN]: {
        type: PieceType.QUEEN,
        title: 'The Vector Queen',
        description: 'A multi-dimensional strike platform capable of traversing the entire lattice in a single cycle.',
        factionNotes: {
            gold: 'The sword of the light.',
            silver: 'The shadow that cuts through all.'
        },
        baseAethos: 'Domination through mobility.'
    },
    [PieceType.FRACTAL_KNIGHT]: {
        type: PieceType.FRACTAL_KNIGHT,
        title: 'The Glitch-Walker',
        description: 'A unit that exists in a state of quantum superposition, allowing it to "jump" over obstacles by phase-shifting.',
        factionNotes: {
            gold: 'A miracle of architecture.',
            silver: 'A corrupted remnant of a lost star.'
        },
        baseAethos: 'Unpredictability as a weapon.'
    },
    [PieceType.ROOK]: {
        type: PieceType.ROOK,
        title: 'The Monolith',
        description: 'Heavy architectural suppression unit. Designed for area denial and structural reinforcement.',
        factionNotes: {
            gold: 'A fortress of faith.',
            silver: 'An iron prison for the disobedient.'
        },
        baseAethos: 'Stoic endurance and direct force.'
    },
    [PieceType.BISHOP]: {
        type: PieceType.BISHOP,
        title: 'The Apostle of the Void',
        description: 'Operates on the extreme diagonal frequencies of the Tensor Field. Often unseen until the moment of collapse.',
        factionNotes: {
            gold: 'Wisdom through focus.',
            silver: 'Madness through obsession.'
        },
        baseAethos: 'Precision from the edges.'
    },
    [PieceType.KNIGHT]: {
        type: PieceType.KNIGHT,
        title: 'The Kinetic Surge',
        description: 'High-frequency harassment unit. Its multi-phase movement allows it to exploit holes in any defensive formation.',
        factionNotes: {
            gold: 'The charger of the gate.',
            silver: 'The serpent in the wall.'
        },
        baseAethos: 'Agility kills strength.'
    },
    [PieceType.PAWN]: {
        type: PieceType.PAWN,
        title: 'The Sub-Voxel Drone',
        description: 'The fundamental building blocks of the expansion. Often sacrificial, but capable of transcendence.',
        factionNotes: {
            gold: 'The humble seed of empire.',
            silver: 'Disposable static.'
        },
        baseAethos: 'Power in numbers, destiny in the end.'
    }
};

export class LoreService {
    public static getLore(type: PieceType): PieceLore {
        return LORE_DATABASE[type];
    }
}
