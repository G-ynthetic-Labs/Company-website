// src/features/game/ui/PieceVantageChat.tsx
import React, { useState, useRef, useEffect } from 'react';
import { MessagesSquare, Send, BrainCircuit } from 'lucide-react';
import clsx from 'clsx';
import { PlayerColor } from '../types';

interface Message {
    role: 'piece' | 'player';
    content: string;
}

interface PieceVantageChatProps {
    pieceId: string;
    pieceName: string;
    pieceColor: PlayerColor;
    pieceType: string;
    isLoading: boolean;
    onSendMessage: (message: string) => void;
    messages: Message[];
}

const PieceVantageChat: React.FC<PieceVantageChatProps> = ({
    pieceId,
    pieceName,
    pieceColor,
    isLoading,
    onSendMessage,
    messages
}) => {
    const [input, setInput] = useState('');
    const chatBodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSendMessage(input.trim());
            setInput('');
        }
    };
    
    // Determine the theme colors
    const themeColor = pieceColor === 'white' ? 'text-slate-200' : 'text-red-400';
    const bgColor = pieceColor === 'white' ? 'bg-slate-900/90' : 'bg-red-900/90';
    const inputBg = pieceColor === 'white' ? 'bg-slate-800' : 'bg-red-950';

    return (
        <div className={clsx(
            "w-72 h-80 flex flex-col rounded-lg shadow-2xl border transition-all duration-500",
            bgColor,
            pieceColor === 'white' ? 'border-slate-700' : 'border-red-800'
        )}>
            {/* Header */}
            <div className={clsx(
                "p-3 flex items-center justify-between text-xs font-bold uppercase border-b",
                pieceColor === 'white' ? 'border-slate-700 text-slate-300' : 'border-red-800 text-red-300'
            )}>
                <div className="flex items-center gap-2">
                    <MessagesSquare size={14} className={themeColor} />
                    <span>{pieceName.toUpperCase()} VANTAGE</span>
                </div>
                <span className="text-[10px] italic opacity-70">ID: {pieceId.slice(-4)}</span>
            </div>

            {/* Message Body */}
            <div ref={chatBodyRef} className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2 text-xs">
                {messages.length === 0 ? (
                    <div className="text-slate-500 italic text-center pt-8">
                        Ask your unit for tactical counsel.
                    </div>
                ) : (
                    messages.map((msg, index) => (
                        <div 
                            key={index} 
                            className={clsx(
                                "max-w-[85%] p-2 rounded",
                                msg.role === 'player' 
                                    ? "ml-auto bg-blue-900/50 text-white" 
                                    : "mr-auto bg-gray-700/50 text-slate-200"
                            )}
                        >
                            <span className="font-bold mr-1">{msg.role === 'piece' ? pieceName.split(' ')[0] : 'Player'}:</span>
                            {msg.content}
                        </div>
                    ))
                )}
                {isLoading && (
                    <div className="flex items-center gap-2 p-2 bg-gray-800 rounded animate-pulse">
                        <BrainCircuit size={12} className="text-cyan-400" />
                        <span className="text-slate-400">Consulting Neural Net...</span>
                    </div>
                )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-2 border-t border-gray-700">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="What do you see?"
                        className={clsx("flex-1 p-2 rounded text-xs focus:outline-none", inputBg, themeColor)}
                        disabled={isLoading}
                    />
                    <button 
                        type="submit" 
                        disabled={!input.trim() || isLoading}
                        className={clsx(
                            "p-2 rounded transition-colors",
                            isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-cyan-600 hover:bg-cyan-500 text-white"
                        )}
                    >
                        <Send size={14} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PieceVantageChat;