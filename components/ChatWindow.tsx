"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Smile, Image as ImageIcon, MoreVertical, Phone, Video, X, Minimize2 } from "lucide-react";
import { socket } from "@/app/socket";

interface Message {
    id: number;
    text: string;
    sender: string;
    timestamp: string;
    isMe: boolean;
}

interface Client {
    id: number;
    name: string;
    status: string;
    avatar: string;
}

interface ChatWindowProps {
    client: Client;
    onClose: () => void;
}

export default function ChatWindow({ client, onClose }: ChatWindowProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Olá! Tudo bem?",
            sender: client.name,
            timestamp: "10:00",
            isMe: false,
        },
        {
            id: 2,
            text: "Oi! Tudo ótimo por aqui. E com você?",
            sender: "Eu",
            timestamp: "10:02",
            isMe: true,
        },
    ]);
    const [socketinstance] = useState(socket());
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        socketinstance.on("vendas", (message: Message) => {
            setMessages((prev) => [...prev, message]);
        });
        scrollToBottom();
    }, []);

    const handleSendMessage = () => {
        if (socketInstance.trim() === "") return;


        const message: Message = {
            id: messages.length + 1,
            text: socketInstance,
            sender: "Eu",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true,
        };

        setMessages([...messages, message]);
        setsocketInstance("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <div className="fixed bottom-0 right-8 w-80 md:w-96 bg-white rounded-t-2xl shadow-2xl border border-gray-200 flex flex-col z-50 h-[500px] animate-in slide-in-from-bottom-10 duration-300">
            {/* Header */}
            <div className="bg-white p-3 border-b border-gray-100 flex items-center justify-between rounded-t-2xl cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => { }}>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs">
                            {client.avatar}
                        </div>
                        <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-white ${client.status === 'online' ? 'bg-green-500' :
                            client.status === 'busy' ? 'bg-red-500' : 'bg-gray-300'
                            }`}></span>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-sm">{client.name}</h3>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                            {client.status === 'online' ? 'Online' : client.status}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                    <button className="p-1 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"><Minimize2 size={16} /></button>
                    <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="p-1 hover:text-red-600 hover:bg-red-50 rounded transition-colors"><X size={16} /></button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8fafc]">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-2xl p-3 shadow-sm ${msg.isMe
                                ? "bg-green-600 text-white rounded-tr-none"
                                : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                                }`}
                        >
                            <p className="text-sm leading-relaxed">{msg.text}</p>
                            <p
                                className={`text-[10px] mt-1 text-right ${msg.isMe ? "text-green-100" : "text-gray-400"
                                    }`}
                            >
                                {msg.timestamp}
                            </p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white p-3 border-t border-gray-100">
                <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-green-500/20 focus-within:border-green-500/30 transition-all">
                    <input
                        type="text"
                        value={socketInstance}
                        onChange={(e) => setsocketInstance(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Mensagem..."
                        className="flex-1 bg-transparent border-none focus:ring-0 text-gray-700 placeholder-gray-400 text-sm px-2"
                    />
                    <button
                        onClick={handleSendMessage}
                        className={`p-1.5 rounded-lg transition-all ${socketInstance.trim()
                            ? "bg-green-600 text-white shadow-md hover:bg-green-700"
                            : "text-gray-400"
                            }`}
                        disabled={!socketInstance.trim()}
                    >
                        <Send size={16} />
                    </button>
                </div>
                <div className="flex items-center gap-4 mt-2 px-1">
                    <button className="text-gray-400 hover:text-green-600 transition-colors"><ImageIcon size={16} /></button>
                    <button className="text-gray-400 hover:text-green-600 transition-colors"><Paperclip size={16} /></button>
                    <button className="text-gray-400 hover:text-green-600 transition-colors"><Smile size={16} /></button>
                </div>
            </div>
        </div>
    );
}
