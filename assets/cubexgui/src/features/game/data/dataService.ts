import { GameState, PieceStats, TeamStats, LayerData, CellData, DetailedMetrics, Piece, PieceType } from '../types';

// Helpers
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const BOARD_SIZE = 8;

const PIECE_CONFIG: Record<string, { material: number; morale: number }> = {
  'King': { material: 40, morale: 21 },
  'Queen': { material: 18, morale: 10 }, // Silver General equivalent
  'FractalKnight': { material: 14, morale: 10 }, // Gold General equivalent
  'Rook': { material: 7, morale: 3 },
  'Bishop': { material: 6, morale: 3 },
  'Knight': { material: 4, morale: 3 },
  'Pawn': { material: 1, morale: 1 },
  'GoldGeneral': { material: 14, morale: 10 },
  'SilverGeneral': { material: 18, morale: 10 },
};

const generatePiece = (id: string, color: 'white' | 'black', type: string): PieceStats => {
  const isCaptured = Math.random() > 0.85;
  const config = PIECE_CONFIG[type] || { material: 1, morale: 1 };

  return {
    id,
    pieceType: type,
    color,
    allegiance: ['GoldGeneral', 'FractalKnight'].includes(type) ? 'gold' :
      ['SilverGeneral', 'Queen'].includes(type) ? 'silver' :
        ['Rook', 'Bishop', 'Knight'].includes(type) ? (Math.random() > 0.5 ? 'gold' : 'silver') : 'independent',
    position: [getRandomInt(0, 7), getRandomInt(0, 7), getRandomInt(0, 7)],
    morale: isCaptured ? 0 : config.morale,
    captured: isCaptured,
    promoted: !isCaptured && Math.random() > 0.9,
    games_survived: getRandomInt(0, 5),
    special_moves_used: getRandomInt(0, 3),
    squaresMoved: getRandomInt(5, 50),
    materialCaptured: getRandomInt(0, 15),
    kills: getRandomInt(0, 4),
    kills_by_type: {},
    threatenedBy: new Set(),
    coveringAllies: new Set(),
    isExposed: !isCaptured && Math.random() > 0.7,
    isSupported: !isCaptured && Math.random() > 0.4,
    bully: 0.1,
    formationCoherence: 0.8,
    forwardScout: 0.2,
    _inEnemyTerritoryTurns: 0,
    diligent: 0,
    survivor: !isCaptured,
    rank: 'Initiate',
    achievements: new Set(Math.random() > 0.8 ? ['First Blood'] : []),
    roleTag: isCaptured ? 'inactive' : (Math.random() > 0.6 ? 'offensive' : 'defensive'),
  };
};

export const generateMockGameState = (): GameState => {
  // Generate Pieces (Stats Format)
  const statsPieces: PieceStats[] = [];
  let idCounter = 0;

  ['white', 'black'].forEach((color) => {
    // 1 King
    statsPieces.push(generatePiece(`p-${idCounter++}`, color as 'white' | 'black', 'King'));
    // Generals
    statsPieces.push(generatePiece(`p-${idCounter++}`, color as 'white' | 'black', 'FractalKnight'));
    statsPieces.push(generatePiece(`p-${idCounter++}`, color as 'white' | 'black', 'Queen'));
    // Commanders
    for (let i = 0; i < 2; i++) statsPieces.push(generatePiece(`p-${idCounter++}`, color as 'white' | 'black', 'Rook'));
    for (let i = 0; i < 2; i++) statsPieces.push(generatePiece(`p-${idCounter++}`, color as 'white' | 'black', 'Bishop'));
    for (let i = 0; i < 2; i++) statsPieces.push(generatePiece(`p-${idCounter++}`, color as 'white' | 'black', 'Knight'));
    // Pawns
    for (let i = 0; i < 8; i++) statsPieces.push(generatePiece(`p-${idCounter++}`, color as 'white' | 'black', 'Pawn'));
  });

  const whitePieces = statsPieces.filter(p => p.color === 'white');
  const blackPieces = statsPieces.filter(p => p.color === 'black');

  // --- Calculate Detailed Metrics ---

  // 1. Risk (Material)
  let whiteMaterial = 0;
  let blackMaterial = 0;
  const materialBreakdown = Object.keys(PIECE_CONFIG).map(type => {
    const wCount = whitePieces.filter(p => p.pieceType === type && !p.captured).length;
    const bCount = blackPieces.filter(p => p.pieceType === type && !p.captured).length;
    const val = PIECE_CONFIG[type].material;
    whiteMaterial += wCount * val;
    blackMaterial += bCount * val;
    return { type, value: val, whiteCount: wCount, blackCount: bCount };
  });

  const riskDelta = blackMaterial - whiteMaterial;
  const riskStatus = riskDelta <= -4 ? -1 : riskDelta >= 4 ? 1 : 0;

  // 2. Relation (Morale)
  let whiteMoraleTotal = 0;
  let blackMoraleTotal = 0;
  const whiteSubteams = { gold: 0, silver: 0 };
  const blackSubteams = { gold: 0, silver: 0 };

  const moraleBreakdown = Object.keys(PIECE_CONFIG).map(type => {
    const val = PIECE_CONFIG[type].morale;
    const wPieces = whitePieces.filter(p => p.pieceType === type && !p.captured);
    const bPieces = blackPieces.filter(p => p.pieceType === type && !p.captured);

    wPieces.forEach(p => {
      whiteMoraleTotal += val;
      if (p.allegiance === 'gold') whiteSubteams.gold += val;
      if (p.allegiance === 'silver') whiteSubteams.silver += val;
    });
    bPieces.forEach(p => {
      blackMoraleTotal += val;
      if (p.allegiance === 'gold') blackSubteams.gold += val;
      if (p.allegiance === 'silver') blackSubteams.silver += val;
    });

    return { type, value: val, whiteCount: wPieces.length, blackCount: bPieces.length };
  });

  const relationDelta = blackMoraleTotal - whiteMoraleTotal;
  const relationStatus = relationDelta <= -4 ? -1 : relationDelta >= 4 ? 1 : 0;

  // 3. Reward (Control)
  // Simulating control scores
  const whiteBaseMoves = getRandomInt(30, 60);
  const blackBaseMoves = getRandomInt(30, 60);

  // Check penalties/bonuses
  const whiteInCheck = getRandomInt(0, 1) === 1;
  const blackInCheck = getRandomInt(0, 1) === 1;
  const checkValue = 40; // King value roughly

  // Shield bonuses
  const whiteShieldBonus = getRandomInt(5, 20);
  const blackShieldBonus = getRandomInt(5, 20);

  const whiteControl = whiteBaseMoves - (whiteInCheck ? checkValue : 0) + whiteShieldBonus;
  const blackControl = blackBaseMoves - (blackInCheck ? checkValue : 0) + blackShieldBonus;

  const rewardDelta = blackControl - whiteControl;
  // Threshold for control might be higher than material, let's assume scaled to fit similar -4/4 logic or just map large deltas
  const scaledRewardDelta = Math.floor(rewardDelta / 5);
  const rewardStatus = scaledRewardDelta <= -4 ? -1 : scaledRewardDelta >= 4 ? 1 : 0;

  const detailedMetrics: DetailedMetrics = {
    risk: {
      whiteMaterial,
      blackMaterial,
      breakdown: materialBreakdown,
      delta: riskDelta,
      status: riskStatus
    },
    reward: {
      whiteControl,
      blackControl,
      delta: rewardDelta,
      status: rewardStatus,
      components: [
        { label: 'Valid Moves', whiteValue: whiteBaseMoves, blackValue: blackBaseMoves, netDelta: blackBaseMoves - whiteBaseMoves },
        { label: 'Check Modifiers', whiteValue: whiteInCheck ? -checkValue : 0, blackValue: blackInCheck ? -checkValue : 0, netDelta: (blackInCheck ? -checkValue : 0) - (whiteInCheck ? -checkValue : 0) },
        { label: 'Shield Bonus', whiteValue: whiteShieldBonus, blackValue: blackShieldBonus, netDelta: blackShieldBonus - whiteShieldBonus }
      ]
    },
    relation: {
      whiteMorale: whiteMoraleTotal,
      blackMorale: blackMoraleTotal,
      delta: relationDelta,
      breakdown: moraleBreakdown,
      subteams: { white: whiteSubteams, black: blackSubteams },
      status: relationStatus
    }
  };

  // --- End Detailed Metrics ---

  const whiteStats: TeamStats = {
    name: "White Alliance",
    color: 'white',
    morale: whiteMoraleTotal,
    totalKills: whitePieces.reduce((acc, p) => acc + p.kills, 0),
    totalLosses: blackPieces.reduce((acc, p) => acc + p.kills, 0),
    checksMade: blackInCheck ? 1 : 0,
    timesInCheck: whiteInCheck ? 1 : 0,
    boardControlScore: whiteControl,
    kingSurvived: !whitePieces.find(p => p.pieceType === 'King')?.captured,
    specialsUsed: 0,
    bodyDoubleUsed: false,
    medals: new Set(),
    moraleEvents: []
  };

  const blackStats: TeamStats = {
    name: "Black Syndicate",
    color: 'black',
    morale: blackMoraleTotal,
    totalKills: blackPieces.reduce((acc, p) => acc + p.kills, 0),
    totalLosses: whitePieces.reduce((acc, p) => acc + p.kills, 0),
    checksMade: whiteInCheck ? 1 : 0,
    timesInCheck: blackInCheck ? 1 : 0,
    boardControlScore: blackControl,
    kingSurvived: !blackPieces.find(p => p.pieceType === 'King')?.captured,
    specialsUsed: 0,
    bodyDoubleUsed: false,
    medals: new Set(),
    moraleEvents: []
  };

  // Generate 8x8x8 Heatmap Data
  const boardLayers: LayerData[] = [];
  for (let z = 0; z < BOARD_SIZE; z++) {
    const cells: CellData[][] = [];
    for (let y = 0; y < BOARD_SIZE; y++) {
      const row: CellData[] = [];
      for (let x = 0; x < BOARD_SIZE; x++) {
        const whiteThreat = getRandomInt(0, 3);
        const blackThreat = getRandomInt(0, 3);
        const whiteCover = getRandomInt(0, 2);
        const blackCover = getRandomInt(0, 2);

        let control: CellData['controlOwner'] = 'neutral';
        const netWhite = whiteThreat + whiteCover;
        const netBlack = blackThreat + blackCover;

        if (netWhite > netBlack + 1) control = 'white';
        else if (netBlack > netWhite + 1) control = 'black';
        else if (netWhite > 0 && netBlack > 0) control = 'contested';

        const pieceAtLoc = statsPieces.find(p => !p.captured && p.position[0] === x && p.position[1] === y && p.position[2] === z);

        row.push({
          x, y, z,
          pieceId: pieceAtLoc?.id,
          threatCount: { white: whiteThreat, black: blackThreat },
          coverageCount: { white: whiteCover, black: blackCover },
          controlOwner: control
        });
      }
      cells.push(row);
    }
    boardLayers.push({ z, cells });
  }

  // --- MAP STATS PIECES TO GAME ENGINE PIECES ---
  const enginePieces: Piece[] = statsPieces.map(p => ({
    id: p.id,
    type: p.pieceType as PieceType, // Ensure strings in generator match Enum
    color: p.color,
    position: { x: p.position[0], y: p.position[1], z: p.position[2] },
    hasMoved: p.squaresMoved > 0,
    faction: (p.allegiance === 'gold' || p.allegiance === 'silver') ? p.allegiance : undefined
  }));

  // Map Captured pieces as well
  const engineCaptured = enginePieces.filter(p => statsPieces.find(sp => sp.id === p.id)?.captured);
  const engineActive = enginePieces.filter(p => !statsPieces.find(sp => sp.id === p.id)?.captured);

  return {
    pieces: engineActive,
    capturedPieces: engineCaptured,
    selectedId: null,
    validMoves: [],
    turn: 'white',
    moveHistory: [],
    turnPhase: null,
    pendingPromotion: null,
    gameMode: 'HvH',
    difficulty: 'Medium',
    isAiThinking: false,

    // UI Data
    matchStats: {
      turnCount: getRandomInt(10, 50),
      winner: null,
      totalMoves: getRandomInt(20, 100),
      totalCaptures: whiteStats.totalKills + blackStats.totalKills,
      riskDelta: riskDelta,
      rewardDelta: scaledRewardDelta,
      relationDelta: relationDelta,
      endReason: null,
      startTime: Date.now(),
      endTime: null,
      firstBloodBy: null,
      firstBloodTurn: null,
      mostValuablePiece: null,
      finalSurvivors: [],
      moraleCrashes: [],
      highestComeback: {},
      totalSpecials: 0
    },
    detailedMetrics,
    whiteStats,
    blackStats,
    boardLayers,
    pieceTelemetry: statsPieces
  };
};