// src/features/game/ai/TelemetryUtils.ts
// Porting metrics/util/position_ops.py and metrics/util/matrix_math.py

import { Position, Vector3 } from '../types';

export const BOARD_SIZE = 8;
export type Vector3Key = `${number},${number},${number}`;
export type CubeGrid<T> = T[][][];


// --- Position Operations ---

/** Converts a Position object {x, y, z} to a Vector3 (Position object). */
export const posToArray = (pos: Position): Vector3 => ({ x: pos.x, y: pos.y, z: pos.z });

/** Converts a Vector3 (Position object) to a string key 'x,y,z'. */
export const arrayToKey = (pos: Vector3): Vector3Key => `${pos.x},${pos.y},${pos.z}` as Vector3Key;

/** Converts a Position object {x, y, z} to a string key 'x,y,z'. */
export const posToKey = (pos: Position): Vector3Key => `${pos.x},${pos.y},${pos.z}` as Vector3Key;

/** Adds two 3D vectors. */
export const addPos = (a: Vector3, b: Vector3): Vector3 => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z });

/** Checks if a position is within the [0, 7] bounds. */
export const isInBounds = (pos: Vector3): boolean =>
    0 <= pos.x && pos.x < BOARD_SIZE &&
    0 <= pos.y && pos.y < BOARD_SIZE &&
    0 <= pos.z && pos.z < BOARD_SIZE;

/** Applies an offset and checks bounds. */
export const applyOffset = (pos: Vector3, offset: Vector3): Vector3 | null => {
    const newPos: Vector3 = addPos(pos, offset);
    return isInBounds(newPos) ? newPos : null;
};

/** Calculates the Manhattan (taxi-cab) distance between two points. */
export const manhattanDistance = (a: Vector3, b: Vector3): number =>
    Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);

// --- Matrix Operations ---

/** Creates an empty 8x8x8 grid filled with a default value. */
export const emptyGrid = <T>(value: T): CubeGrid<T> => {
    const grid: CubeGrid<T> = [];
    for (let x = 0; x < BOARD_SIZE; x++) {
        grid[x] = [];
        for (let y = 0; y < BOARD_SIZE; y++) {
            grid[x][y] = [];
            for (let z = 0; z < BOARD_SIZE; z++) {
                grid[x][y][z] = value;
            }
        }
    }
    return grid;
};

/** Adds two numerical 8x8x8 grids element-wise. */
export const addGrids = (a: CubeGrid<number>, b: CubeGrid<number>): CubeGrid<number> => {
    return a.map((plane, x) =>
        plane.map((row, y) =>
            row.map((val, z) => val + b[x][y][z])
        )
    ) as CubeGrid<number>;
};

/** Subtracts two numerical 8x8x8 grids element-wise. */
export const subtractGrids = (a: CubeGrid<number>, b: CubeGrid<number>): CubeGrid<number> => {
    return a.map((plane, x) =>
        plane.map((row, y) =>
            row.map((val, z) => val - b[x][y][z])
        )
    ) as CubeGrid<number>;
};

/** Normalizes grid values to a [0, 1] range based on the maximum value found. */
export const normalizeGrid = (grid: CubeGrid<number>): CubeGrid<number> => {
    let maxVal = 0;
    grid.forEach(plane =>
        plane.forEach(row =>
            row.forEach(val => {
                if (val > maxVal) maxVal = val;
            })
        )
    );

    if (maxVal === 0) return grid;

    return grid.map(plane =>
        plane.map(row =>
            row.map(val => val / maxVal)
        )
    ) as CubeGrid<number>;
};

/** Deep copy a grid. */
export const copyGrid = <T>(grid: CubeGrid<T>): CubeGrid<T> => {
    return grid.map(plane =>
        plane.map(row =>
            row.map(val => val)
        )
    ) as CubeGrid<T>;
};

/** Generates coordinate notation for a move. */
export const getCoordinateNotation = (
    pieceType: string,
    color: string,
    from: Position,
    to: Position,
    isCapture: boolean = false
): string => {
    const colorCode = color.toUpperCase();
    const typeCode = pieceType.toUpperCase();
    const fromStr = `[${from.x},${from.y},${from.z}]`;
    const toStr = `[${to.x},${to.y},${to.z}]`;
    const connector = isCapture ? 'X' : '->';

    return `${colorCode} ${typeCode} ${fromStr} ${connector} ${toStr}`;
};