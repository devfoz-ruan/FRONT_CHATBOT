"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Smile, Image as ImageIcon, MoreVertical, Phone, Video } from "lucide-react";
import { Message, MessagePayload } from "@/app/models/Mensagem";
import { useMessageContext } from "@/app/providers/message/useMessageContext";
import { getSocket } from "@/app/socket";
import { Client } from "@/app/models/Client";

interface ChatPageProps {
    client: Client;
}

export default function ChatPage({ client}: ChatPageProps) {
        const { msgs, setMsgs } = useMessageContext();
        const [messageText, setMessageText] = useState("");
        const socketConnection = getSocket();
        const messagesEndRef = useRef<HTMLDivElement>(null)
    
        const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        };
    
        useEffect(() => {
            let mounted = true;
    
            socketConnection.emit("join", client.chatid);
    
            async function loadMessages() {
                try {
                    const response = await fetch(
                        `/api/mensagem?idconversa=${client.idconversa}`
                    );
                    if (!response.ok) {
                        throw new Error("Erro ao buscar mensagens");
                    }
                    const data: MessagePayload[] = await response.json();
                    const dataMessages: Message[] = data.map(payload => ({
                        idConversa: payload.idconversa,
                        texto: payload.texto,
                        idGrupo: payload.idgrupo,
                        isVendedor: payload.isvendedor,
                        timestampEnvio: new Date(payload.timestampenvio),
                        timestampFormatted: new Date(payload.timestampenvio)
                            .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }));
                    if (mounted) {
                        setMsgs(dataMessages);
                    }
                } catch (e) {
                    console.error(e);
                    if (mounted) setMsgs([]);
                }
            }
            loadMessages();
            const handleRoomMessage = (message: Message) => {
                setMsgs(prev => [...prev, message]);
            };
            socketConnection.on("roomMessage", handleRoomMessage);
            return () => {
                mounted = false;
                socketConnection.off("roomMessage", handleRoomMessage);
                socketConnection.emit("leave", client.chatid);
            };
        }, [client.chatid, client.idconversa]);
    
    
        const handleSendMessage = () => {
            if (messageText.trim() === "") return;
    
            const message: Message = {
                texto: messageText,
                idConversa: client.idconversa,
                idGrupo: client.idgrupo,
                timestampEnvio: new Date(),
                isVendedor: true,
                timestampFormatted: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            socketConnection.emit("sendMessage", {
                roomId: client.chatid,
                message
            });
            setMessageText("");
        };
    
        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, clientid: string) => {
            if (e.key === "Enter") {
                handleSendMessage();
            }
        };
    

    return (
        <div className="flex flex-col h-screen bg-gray-50 max-w-4xl mx-auto shadow-xl rounded-2xl overflow-hidden my-4 border border-gray-100">
            {/* Header */}
            <div className="bg-white p-4 border-b border-gray-100 flex items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                        JS
                    </div>
                    <div>
                        <h1 className="font-bold text-gray-900">João da Silva</h1>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            Online agora
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                    <button className="hover:text-green-600 transition-colors"><Phone size={20} /></button>
                    <button className="hover:text-green-600 transition-colors"><Video size={20} /></button>
                    <button className="hover:text-green-600 transition-colors"><MoreVertical size={20} /></button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#f8fafc]">
                {msgs.map((msg) => (
                    <div
                        key={msg.timestampEnvio.toISOString()}
                        className={`flex ${msg.isVendedor ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[70%] rounded-2xl p-4 shadow-sm ${msg.isVendedor
                                ? "bg-green-600 text-white rounded-tr-none"
                                : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                                }`}
                        >
                            <p className="text-sm leading-relaxed">{msg.texto}</p>
                            <p
                                className={`text-[10px] mt-2 text-right ${msg.isVendedor ? "text-green-100" : "text-gray-400"
                                    }`}
                            >
                                {msg.timestampFormatted}
                            </p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white p-4 border-t border-gray-100 px-6">
                <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-green-500/20 focus-within:border-green-500/30 transition-all">
                    <div className="flex items-center gap-1 pl-2">
                        <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors">
                            <ImageIcon size={20} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors">
                            <Paperclip size={20} />
                        </button>
                    </div>

                    <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e)=> handleKeyDown(e, client.chatid)}
                        placeholder="Digite sua mensagem..."
                        className="flex-1 bg-transparent border-none focus:ring-0 text-gray-700 placeholder-gray-400"
                    />

                    <div className="flex items-center gap-2 pr-2">
                        <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors">
                            <Smile size={20} />
                        </button>
                        <button
                            onClick={handleSendMessage}
                            className={`p-2 rounded-xl transition-all ${messageText.trim()
                                ? "bg-green-600 text-white shadow-lg shadow-green-200 hover:bg-green-700"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                }`}
                            disabled={!messageText.trim()}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
