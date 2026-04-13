import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Axis, CUBE_SIZE } from '../types';

interface SliceNavigatorProps {
  activeAxis: Axis;
  activeLayer: number;
  onAxisChange: (axis: Axis) => void;
  onLayerChange: (layer: number) => void;
}

const TUNING = {
  gap_px: 2.5, // Halved from 5.0
  depth_ratio_x: 0.35,
  depth_ratio_y_scale: 0.70,
  sep_edge_scale: 0.040,
  top_near_nudge_x: 0.0,
  top_far_left_dx: 3.0, // Halved from 6.0
  top_far_left_dy: 0.0,
  top_far_right_dx: 0.0,
  top_far_right_dy: 0.0,
  right_sep_scale: 1.0,
  right_near_top_dx: -3.0, // Halved
  right_near_top_dy: -1.5, // Halved
  right_near_bot_dx: -3.0, // Halved
  right_near_bot_dy: 0.0,
  right_far_top_lower: 1.5, // Halved
  right_bottom_extra_up: 4.0, // Halved
  active_scale: 1.15,
};

type FaceName = 'front' | 'top' | 'right';

const SliceNavigator: React.FC<SliceNavigatorProps> = ({ activeAxis, activeLayer, onAxisChange, onLayerChange }) => {
  const [visualMode, setVisualMode] = useState<'IDLE' | 'ACTIVE'>('IDLE');
  const [hoverFace, setHoverFace] = useState<FaceName | null>(null);
  const [hoverLayer, setHoverLayer] = useState<number>(-1);
  const [opacity, setOpacity] = useState(0.2);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Map logic
  const faceToAxis: Record<FaceName, Axis> = { front: 'Z', top: 'X', right: 'Y' };
  const axisToFace: Record<Axis, FaceName> = { Z: 'front', X: 'top', Y: 'right' };

  // Current visual face based on mode or prop
  const currentFace = visualMode === 'ACTIVE' ? axisToFace[activeAxis] : null;

  // Geometry Generation
  const width = 120;
  const height = 120;
  const margin = 8;

  const geometry = useMemo(() => {
    const usableW = width - 2 * margin;
    const usableH = height - 2 * margin;
    const side = Math.min(usableW * 0.6, usableH * 0.6);
    
    const cx = width / 2;
    const cy = height / 2;

    const frontLeft = cx - side * 0.5;
    const frontTop = cy - side * 0.35;
    
    const gap = TUNING.gap_px;
    const sep = Math.max(gap, side * TUNING.sep_edge_scale);
    const depthX = side * TUNING.depth_ratio_x;
    const depthY = depthX * TUNING.depth_ratio_y_scale;

    // Front Face (Rect)
    const fRect = { x: frontLeft, y: frontTop, w: side, h: side };
    // Adjusted for gap
    const fPath = `M ${fRect.x + gap},${fRect.y + gap} L ${fRect.x + fRect.w - gap},${fRect.y + gap} L ${fRect.x + fRect.w - gap},${fRect.y + fRect.h - gap} L ${fRect.x + gap},${fRect.y + fRect.h - gap} Z`;
    
    // Corners for calculating other faces
    const tl = { x: fRect.x, y: fRect.y };
    const tr = { x: fRect.x + fRect.w, y: fRect.y };
    const bl = { x: fRect.x, y: fRect.y + fRect.h };
    const br = { x: fRect.x + fRect.w, y: fRect.y + fRect.h };
    
    const cornerFarBase = { x: tr.x + depthX, y: tr.y - (depthY + sep) };

    // Top Face
    const topPts = [
      { x: tl.x + depthX + TUNING.top_far_left_dx + gap, y: tl.y - (depthY + sep) + TUNING.top_far_left_dy + gap }, // Far L
      { x: cornerFarBase.x + TUNING.top_far_right_dx - gap, y: cornerFarBase.y + TUNING.top_far_right_dy + gap }, // Far R
      { x: tr.x - TUNING.top_near_nudge_x - gap, y: tr.y - sep + gap }, // Near R
      { x: tl.x + TUNING.top_near_nudge_x + gap, y: tl.y - sep + gap }  // Near L
    ];
    const tPath = `M ${topPts[0].x},${topPts[0].y} L ${topPts[1].x},${topPts[1].y} L ${topPts[2].x},${topPts[2].y} L ${topPts[3].x},${topPts[3].y} Z`;

    // Right Face
    const rSep = sep * TUNING.right_sep_scale;
    const rNearT = { x: tr.x + rSep + TUNING.right_near_top_dx, y: tr.y + TUNING.right_near_top_dy };
    const rNearB = { x: br.x + rSep + TUNING.right_near_bot_dx, y: br.y + TUNING.right_near_bot_dy };
    const rFarT = { x: cornerFarBase.x, y: cornerFarBase.y + TUNING.right_far_top_lower };
    const vDown = { x: rNearB.x - rNearT.x, y: rNearB.y - rNearT.y };
    const rFarB = { x: rFarT.x + vDown.x, y: rFarT.y + vDown.y - TUNING.right_bottom_extra_up };

    const rightPts = [
      { x: rNearT.x, y: rNearT.y + gap },
      { x: rNearB.x, y: rNearB.y - gap },
      { x: rFarB.x - gap, y: rFarB.y - gap },
      { x: rFarT.x - gap, y: rFarT.y + gap }
    ];
    const rPath = `M ${rightPts[0].x},${rightPts[0].y} L ${rightPts[1].x},${rightPts[1].y} L ${rightPts[2].x},${rightPts[2].y} L ${rightPts[3].x},${rightPts[3].y} Z`;

    return { 
      front: { path: fPath, center: { x: cx, y: cy } },
      top: { path: tPath, center: { x: cx, y: cy } },
      right: { path: rPath, center: { x: cx, y: cy } },
      frontPts: [ {x: fRect.x+gap, y: fRect.y+gap}, {x: fRect.x+fRect.w-gap, y: fRect.y+gap}, {x: fRect.x+fRect.w-gap, y: fRect.y+fRect.h-gap}, {x: fRect.x+gap, y: fRect.y+fRect.h-gap} ],
      topPts,
      rightPts
    };
  }, []);

  // Helper to scale paths for active state
  const getTransform = (face: FaceName) => {
    if (visualMode === 'IDLE') return undefined;
    if (currentFace !== face) return undefined;
    return `scale(${TUNING.active_scale}) translate(${width/2 * (1 - 1/TUNING.active_scale)}, ${height/2 * (1 - 1/TUNING.active_scale)}) transform-origin: center`;
  };

  // Layer Band Calculations
  const getLayerBands = (face: FaceName) => {
    if (visualMode === 'IDLE' || currentFace !== face) return null;
    
    let p0, p1, p2, p3; 
    let dir: 'TB' | 'LR';

    if (face === 'front') {
      [p0, p1, p2, p3] = geometry.frontPts;
      dir = 'TB';
    } else if (face === 'top') {
      [p3, p2, p1, p0] = geometry.topPts;
      dir = 'LR';
    } else {
      [p0, p3, p2, p1] = geometry.rightPts;
      dir = 'TB';
    }

    const bands = [];
    for (let i = 0; i < CUBE_SIZE; i++) {
        const t0 = i / CUBE_SIZE;
        const t1 = (i + 1) / CUBE_SIZE;
        
        const lerp = (a: any, b: any, t: number) => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });

        let p_tl, p_tr, p_br, p_bl;

        if (dir === 'LR') {
            p_tl = lerp(p0, p1, t0);
            p_tr = lerp(p0, p1, t1);
            p_br = lerp(p3, p2, t1);
            p_bl = lerp(p3, p2, t0);
        } else {
            p_tl = lerp(p0, p3, t0);
            p_tr = lerp(p1, p2, t0);
            p_br = lerp(p1, p2, t1);
            p_bl = lerp(p0, p3, t1);
        }

        const path = `M ${p_tl.x},${p_tl.y} L ${p_tr.x},${p_tr.y} L ${p_br.x},${p_br.y} L ${p_bl.x},${p_bl.y} Z`;
        
        const logicalIdx = activeAxis === 'Z' ? (CUBE_SIZE - 1 - i) : (activeAxis === 'Y' ? (CUBE_SIZE - 1 - i) : i);

        bands.push({ path, idx: logicalIdx, visualIdx: i });
    }
    return bands;
  };

  const handleClickFace = (face: FaceName) => {
    setVisualMode('ACTIVE');
    onAxisChange(faceToAxis[face]);
  };

  // Logic to determine band color/opacity
  const getBandStyle = (logicalIdx: number) => {
    const isActive = logicalIdx === activeLayer;
    const isHover = logicalIdx === hoverLayer;
    
    if (isActive) return { fill: 'rgba(6, 182, 212, 0.4)', stroke: '#22d3ee', strokeWidth: 1.5 }; // Cyan
    if (isHover) return { fill: 'rgba(255, 255, 255, 0.2)', stroke: 'white', strokeWidth: 1 };
    return { fill: 'transparent', stroke: 'rgba(255,255,255,0.1)', strokeWidth: 0.5 };
  };

  const activeTransform = visualMode === 'ACTIVE' ? `translate(${width/2}, ${height/2}) scale(${TUNING.active_scale}) translate(${-width/2}, ${-height/2})` : '';

  // Proximity & Click Outside Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.sqrt(Math.pow(e.clientX - cx, 2) + Math.pow(e.clientY - cy, 2));
      
      const maxDist = 300;
      const minDist = 60; // radius of widget roughly
      
      let newOp = 0.2;
      if (dist < minDist) {
          newOp = 0.75;
      } else if (dist < maxDist) {
          const t = 1 - (dist - minDist) / (maxDist - minDist);
          newOp = 0.2 + (0.55 * t);
      }
      setOpacity(newOp);
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
             setVisualMode('IDLE');
        }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div 
        ref={containerRef}
        className="relative select-none pointer-events-auto transition-opacity duration-200"
        style={{ width, height, opacity }}
    >
      <svg 
        width="100%" height="100%" 
        viewBox={`0 0 ${width} ${height}`} 
        className="overflow-visible"
        onMouseLeave={() => { setHoverFace(null); setHoverLayer(-1); }}
      >
        <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>

        {/* IDLE STATE FACES */}
        {visualMode === 'IDLE' && (
          <g>
            <path d={geometry.top.path} 
                fill={hoverFace === 'top' ? '#64748b' : '#475569'} 
                fillOpacity={hoverFace === 'top' ? 0.8 : 0.4}
                stroke="white" strokeWidth="0.5" strokeOpacity="0.3"
                onMouseEnter={() => setHoverFace('top')}
                onClick={() => handleClickFace('top')}
                className="cursor-pointer transition-all duration-200"
            />
            <path d={geometry.right.path} 
                fill={hoverFace === 'right' ? '#475569' : '#334155'}
                fillOpacity={hoverFace === 'right' ? 0.8 : 0.4}
                stroke="white" strokeWidth="0.5" strokeOpacity="0.3"
                onMouseEnter={() => setHoverFace('right')}
                onClick={() => handleClickFace('right')}
                className="cursor-pointer transition-all duration-200"
            />
            <path d={geometry.front.path} 
                fill={hoverFace === 'front' ? '#334155' : '#1e293b'}
                fillOpacity={hoverFace === 'front' ? 0.8 : 0.4}
                stroke="white" strokeWidth="0.5" strokeOpacity="0.3"
                onMouseEnter={() => setHoverFace('front')}
                onClick={() => handleClickFace('front')}
                className="cursor-pointer transition-all duration-200"
            />
            {/* Axis Labels for Idle */}
            <text x={width/2} y={margin + 12} fill="white" opacity={0.5} textAnchor="middle" fontSize="8" pointerEvents="none">X</text>
            <text x={width - margin - 4} y={height/2 + 8} fill="white" opacity={0.5} textAnchor="middle" fontSize="8" pointerEvents="none">Y</text>
            <text x={width/2} y={height - margin - 4} fill="white" opacity={0.5} textAnchor="middle" fontSize="8" pointerEvents="none">Z</text>
          </g>
        )}

        {/* ACTIVE STATE FACE */}
        {visualMode === 'ACTIVE' && currentFace && (
            <g transform={activeTransform} filter="url(#glow)">
                <path d={geometry[currentFace].path} 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeOpacity="0.8"
                />
                
                {/* Bands */}
                {getLayerBands(currentFace)?.map((band) => {
                    const style = getBandStyle(band.idx);
                    return (
                        <path 
                            key={band.idx}
                            d={band.path}
                            fill={style.fill}
                            stroke={style.stroke}
                            strokeWidth={style.strokeWidth}
                            onMouseEnter={() => setHoverLayer(band.idx)}
                            onClick={(e) => { e.stopPropagation(); onLayerChange(band.idx); }}
                            className="cursor-pointer transition-all duration-150"
                        />
                    );
                })}

                {/* Info Text */}
                <text x={width/2} y={height + 15} fill="#22d3ee" textAnchor="middle" fontSize="10" fontWeight="bold" letterSpacing="1">
                    {activeAxis} : {activeLayer}
                </text>
            </g>
        )}
      </svg>
      
      {/* Helper Text */}
      {visualMode === 'IDLE' && (
          <div className="absolute bottom-1 left-0 w-full text-center text-[7px] text-slate-500 pointer-events-none uppercase tracking-widest">
              Select Axis
          </div>
      )}
      {visualMode === 'ACTIVE' && (
          <div className="absolute top-1 right-1 text-[7px] text-cyan-500 pointer-events-none uppercase tracking-widest animate-pulse">
              Select Layer
          </div>
      )}
    </div>
  );
};

export default SliceNavigator;