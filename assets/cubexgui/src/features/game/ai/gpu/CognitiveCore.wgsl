// src/features/game/ai/gpu/CognitiveCore.wgsl

// THE CUBEX\u00b3 COGNITIVE COMPUTE SHADER
// Phase 8: Temporal Prediction & Gradient Optimization.

struct NodeData {
    data: array<f32, 64>,
};

struct TensorField {
    nodes: array<NodeData, 512>,
};

@group(0) @binding(0) var<storage, read_write> tf: TensorField;
@group(0) @binding(1) var<storage, read> piecePositions: array<vec4<f32>, 32>; // x, y, z, val
@group(0) @binding(2) var<storage, read> prevTf: TensorField; // Temporal Memory

// Constants for indexing (Sync with TensorConfig.ts)
const TI_STATE_ID: u32 = 0u;
const TI_OWNER_ID: u32 = 1u;
const TI_POLARITY: u32 = 53u; // Rate of Change
const TI_INFLUENCE_GRAD: u32 = 6u;
const TI_ATTACK_VECTOR: u32 = 8u;
const TI_DEFENSE_VECTOR: u32 = 9u;
const TI_VULNERABILITY: u32 = 11u;

fn getIdx(x: u32, y: u32, z: u32) -> u32 {
    return x + (y * 8u) + (z * 64u);
}

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let nodeIdx = global_id.x;
    if (nodeIdx >= 512u) { return; }

    // 1. Coordinate Recovery
    let x = nodeIdx % 8u;
    let y = (nodeIdx / 8u) % 8u;
    let z = nodeIdx / (8u * 8u);
    let worldPos = vec3<f32>(f32(x), f32(y), f32(z));

    // --- TIER 1: Local Pattern Sampling ---
    
    var localThreat = 0.0;
    var localSupport = 0.0;
    
    for (var i = 0u; i < 32u; i = i + 1u) {
        let p = piecePositions[i];
        if (p.w == 0.0) { continue; } 
        
        let dist = distance(worldPos, p.xyz);
        let influence = 1.0 / (dist + 0.5);
        
        if (p.w > 0.0) { localSupport += influence; }
        else { localThreat += influence; }
    }
    
    tf.nodes[nodeIdx].data[TI_ATTACK_VECTOR] = localThreat;
    tf.nodes[nodeIdx].data[TI_DEFENSE_VECTOR] = localSupport;

    // --- TIER 8: Temporal Dynamics (d/dt) ---
    // Calculate the temporal derivative (rate of change)
    let prevThreat = prevTf.nodes[nodeIdx].data[TI_ATTACK_VECTOR];
    let ddt_threat = localThreat - prevThreat;
    
    // Polarity tracks the "Strategic Heat" of a node
    tf.nodes[nodeIdx].data[TI_POLARITY] = abs(ddt_threat);

    // --- TIER 7: Gradient Optimization (Spatial Derivatives) ---
    var grad = vec3<f32>(0.0, 0.0, 0.0);
    
    // X-Axis Derivative
    if (x > 0u && x < 7u) {
        let valPlus = tf.nodes[getIdx(x + 1u, y, z)].data[TI_DEFENSE_VECTOR];
        let valMinus = tf.nodes[getIdx(x - 1u, y, z)].data[TI_DEFENSE_VECTOR];
        grad.x = (valPlus - valMinus) / 2.0;
    }
    
    // Y-Axis Derivative
    if (y > 0u && y < 7u) {
        let valPlus = tf.nodes[getIdx(x, y + 1u, z)].data[TI_DEFENSE_VECTOR];
        let valMinus = tf.nodes[getIdx(x, y - 1u, z)].data[TI_DEFENSE_VECTOR];
        grad.y = (valPlus - valMinus) / 2.0;
    }
    
    // Z-Axis Derivative
    if (z > 0u && z < 7u) {
        let valPlus = tf.nodes[getIdx(x, y, z + 1u)].data[TI_DEFENSE_VECTOR];
        let valMinus = tf.nodes[getIdx(x, y, z - 1u)].data[TI_DEFENSE_VECTOR];
        grad.z = (valPlus - valMinus) / 2.0;
    }
    
    tf.nodes[nodeIdx].data[TI_INFLUENCE_GRAD] = length(grad);
}
