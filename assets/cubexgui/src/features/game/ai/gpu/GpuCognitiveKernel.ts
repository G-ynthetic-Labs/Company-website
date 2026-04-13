// src/features/game/ai/gpu/GpuCognitiveKernel.ts

import shaderSource from './CognitiveCore.wgsl?raw';
import { TENSOR_SIZE, CUBE_COUNT } from '../../core/TensorConfig';
import { Position, Piece } from '../../types';

/**
 * GpuCognitiveKernel
 * The TypeScript bridge to the WebGPU Cognitive Core.
 * Handles massive parallel processing of the 512-node Tensor Field.
 */
export class GpuCognitiveKernel {
    private device: any = null;
    private pipeline: any = null;

    // Buffers
    private tfBuffer: any = null;
    private prevTfBuffer: any = null;
    private pieceBuffer: any = null;
    private readBuffer: any = null;

    private isInitialized = false;

    /**
     * Bootstraps the WebGPU environment.
     */
    public async initialize(): Promise<boolean> {
        if (this.isInitialized) return true;

        if (!(navigator as any).gpu) {
            console.error("WebGPU not supported on this browser.");
            return false;
        }

        const adapter = await (navigator as any).gpu.requestAdapter();
        if (!adapter) return false;

        this.device = await adapter.requestDevice();
        if (!this.device) return false;

        // Create Compute Pipeline
        const shaderModule = this.device.createShaderModule({ code: shaderSource });
        this.pipeline = await this.device.createComputePipelineAsync({
            layout: 'auto',
            compute: { module: shaderModule, entryPoint: 'main' }
        });

        // Initialize Buffers
        // 512 nodes * 64 floats * 4 bytes = 131,072 bytes (128 KB)
        const tfSize = CUBE_COUNT * TENSOR_SIZE * 4;
        this.tfBuffer = this.device.createBuffer({
            size: tfSize,
            usage: 0x80 | 0x04 | 0x08 // STORAGE | COPY_SRC | COPY_DST
        });

        this.prevTfBuffer = this.device.createBuffer({
            size: tfSize,
            usage: 0x80 | 0x08 // STORAGE | COPY_DST
        });

        // 32 pieces * 4 floats (x,y,z,val) * 4 bytes = 512 bytes
        this.pieceBuffer = this.device.createBuffer({
            size: 32 * 4 * 4,
            usage: 0x80 | 0x08 // STORAGE | COPY_DST
        });

        this.readBuffer = this.device.createBuffer({
            size: tfSize,
            usage: 0x01 | 0x08 // MAP_READ | COPY_DST
        });

        this.isInitialized = true;
        return true;
    }

    /**
     * Dispatches the compute shader to update the Tensor Field.
     * @param tensorData Flat array of 512 * 64 floats
     * @param pieces Current board pieces
     */
    public async process(tensorData: Float32Array, pieces: Piece[]): Promise<void> {
        if (!this.isInitialized || !this.device || !this.pipeline) return;

        // 1. Prepare Piece Data (x, y, z, val)
        // val = 1.0 for player, -1.0 for opponent (simplified for now)
        const pieceData = new Float32Array(32 * 4);
        pieces.forEach((p, i) => {
            if (i >= 32) return;
            pieceData[i * 4] = p.position.x;
            pieceData[i * 4 + 1] = p.position.y;
            pieceData[i * 4 + 2] = p.position.z;
            pieceData[i * 4 + 3] = p.color === 'white' ? 1.0 : -1.0;
        });

        // 2. Upload to GPU
        this.device.queue.writeBuffer(this.tfBuffer!, 0, tensorData);
        this.device.queue.writeBuffer(this.pieceBuffer!, 0, pieceData);

        // 3. Create Bind Group
        const bindGroup = this.device.createBindGroup({
            layout: this.pipeline.getBindGroupLayout(0),
            entries: [
                { binding: 0, resource: { buffer: this.tfBuffer! } },
                { binding: 1, resource: { buffer: this.pieceBuffer! } },
                { binding: 2, resource: { buffer: this.prevTfBuffer! } }
            ]
        });

        // 4. Command Encoding
        const encoder = this.device.createCommandEncoder();
        const pass = encoder.beginComputePass();
        pass.setPipeline(this.pipeline);
        pass.setBindGroup(0, bindGroup);
        // Dispatch blocks of 64 threads (512 / 64 = 8 groups)
        pass.dispatchWorkgroups(8);
        pass.end();

        // Copy Result to Read Buffer
        encoder.copyBufferToBuffer(this.tfBuffer!, 0, this.readBuffer!, 0, tensorData.byteLength);

        // Update Previous State Buffer for next turn prediction
        encoder.copyBufferToBuffer(this.tfBuffer!, 0, this.prevTfBuffer!, 0, tensorData.byteLength);

        // Submit
        this.device.queue.submit([encoder.finish()]);

        // 5. Read Back Update
        await (this.readBuffer! as any).mapAsync(1); // GPUMapMode.READ = 1
        const copyArray = new Float32Array(this.readBuffer!.getMappedRange());
        tensorData.set(copyArray);
        this.readBuffer!.unmap();
    }
}

// Singleton Instance
export const gpuKernel = new GpuCognitiveKernel();
