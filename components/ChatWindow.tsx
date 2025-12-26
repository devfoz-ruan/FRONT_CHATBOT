"use client";

import { useState, useRef, useEffect, useContext } from "react";
import { Send, Paperclip, Smile, Image as ImageIcon, MoreVertical, Phone, Video, X, Minimize2 } from "lucide-react";
import { getSocket } from "@/app/socket";
import type { Client } from "@/app/models/Client";
import type { Message, MessagePayload } from "@/app/models/Mensagem";
import { useMessageContext } from "@/app/providers/message/useMessageContext";
import ChatPage from "@/app/grupo/chat/page";

interface ChatWindowProps {
    client: Client;
    onClose: () => void;
}

export default function ChatWindow({ client, onClose }: ChatWindowProps) {
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
                    `/api/mensagem?idconversa=${client.idconversa}`,
                    { method: 'GET', credentials: "include" }
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
        scrollToBottom();
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
        <div className="fixed bottom-0 right-8 w-80 md:w-96 bg-white rounded-t-2xl shadow-2xl border border-gray-200 flex flex-col z-50 h-[500px] animate-in slide-in-from-bottom-10 duration-300">
            {/* Header */}
            <div className="bg-white p-3 border-b border-gray-100 flex items-center justify-between rounded-t-2xl cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => { }}>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs">
                            {client.avatar}
                        </div>
                        <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-white ${client.ativo === true ? 'bg-green-500' :
                            client.ativo === false ? 'bg-red-500' : 'bg-gray-300'
                            }`}></span>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-sm">{client.nome}</h3>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                            {client.ativo}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                    <button className="p-1 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"><Minimize2 size={16} /></button>
                    <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="p-1 hover:text-red-600 hover:bg-red-50 rounded transition-colors"><X size={16} /></button>
                </div>
            </div>

            {/* msgs Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8fafc]">
                {msgs.map((msg) => {

                    if (msg.idConversa === client.idconversa) return (
                        <div
                            key={msg.timestampEnvio.toString()}
                            className={`flex ${msg.isVendedor ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[80%] rounded-2xl p-3 shadow-sm ${msg.isVendedor
                                    ? "bg-green-600 text-white rounded-tr-none"
                                    : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                                    }`}
                            >
                                <p className="text-sm leading-relaxed">{msg.texto}</p>
                                <p
                                    className={`text-[10px] mt-1 text-right ${msg.isVendedor ? "text-green-100" : "text-gray-400"
                                        }`}
                                >
                                    {msg.timestampFormatted}
                                </p>
                            </div>
                        </div>
                    )
                })}
                <div ref={messagesEndRef} />
            </div>



            {/* Input Area */}
            <div className="bg-white p-3 border-t border-gray-100">
                <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-green-500/20 focus-within:border-green-500/30 transition-all">
                    <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, client.chatid)}
                        placeholder="Mensagem..."
                        className="flex-1 bg-transparent border-none focus:ring-0 text-gray-700 placeholder-gray-400 text-sm px-2"
                    />
                    <button
                        onClick={() => handleSendMessage}
                        className={`p-1.5 rounded-lg transition-all ${messageText.trim()
                            ? "bg-green-600 text-white shadow-md hover:bg-green-700"
                            : "text-gray-400"
                            }`}
                        disabled={!messageText.trim()}
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
