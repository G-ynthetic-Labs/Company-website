import React, { useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

interface TerminalLogProps {
    logs: string[];
}

export const TerminalLog: React.FC<TerminalLogProps> = ({ logs }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="flex-1 bg-cyber-950 p-6 font-mono text-sm relative overflow-hidden flex flex-col">
            {/* Terminal Header */}
            <div className="flex items-center gap-3 mb-4 border-b border-cyber-800 pb-2">
                <Terminal size={18} className="text-yellow-500" />
                <span className="text-cyber-400 font-bold tracking-tighter uppercase">CUBEX³ ACTION_LOG_V1.0</span>
                <div className="ml-auto flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>
            </div>

            {/* Log Feed */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto space-y-1 custom-scrollbar pr-4 relative"
            >
                {logs.length === 0 && (
                    <div className="text-cyber-700 italic">... Waiting for system initialization ...</div>
                )}
                {logs.map((log, i) => (
                    <div key={i} className="flex gap-4 group">
                        <span className="text-cyber-700 w-12 shrink-0 select-none">[{String(i).padStart(3, '0')}]</span>
                        <span className="text-cyber-200 group-hover:text-yellow-400 transition-colors leading-relaxed">
                            {log}
                        </span>
                    </div>
                ))}
                {/* Blinking Cursor */}
                <div className="flex gap-4 mt-2">
                    <span className="text-cyber-700 w-12 shrink-0">[{String(logs.length).padStart(3, '0')}]</span>
                    <span className="w-2 h-4 bg-yellow-500 animate-pulse" />
                </div>
            </div>

            {/* Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_2px,3px_100%] opacity-20" />
        </div>
    );
};
