"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Paperclip,
  Smile,
  Image as ImageIcon,
  X,
  Minimize2,
  Maximize2
} from "lucide-react";

import { getSocket } from "@/app/socket";
import type { Client } from "@/app/models/Client";
import type { Message, MessagePayload } from "@/app/models/Mensagem";

interface ChatWindowProps {
  client: Client;
  onClose: () => void;
}

export default function ChatWindow({ client, onClose }: ChatWindowProps) {
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const [isMaximized, setIsMaximized] = useState(false);

  const socketConnection = getSocket();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const toggleMaximize = () => setIsMaximized(prev => !prev);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [msgs]);

  useEffect(() => {
    let mounted = true;

    socketConnection.emit("join", client.chatid);

    async function loadMessages() {
      try {
        const res = await fetch(
          `/api/mensagem?idconversa=${client.idconversa}`,
          { credentials: "include" }
        );

        if (!res.ok) throw new Error("Erro ao buscar mensagens");

        const data: MessagePayload[] = await res.json();

        if (!mounted) return;

        setMsgs(
            data.map(payload => ({
            id: payload.id,
            idConversa: payload.idconversa,
            idGrupo: payload.idgrupo,
            texto: payload.texto,
            isVendedor: payload.isvendedor,
            timestampEnvio: new Date(payload.timestampenvio),
            timestampFormatted: new Date(payload.timestampenvio).toLocaleTimeString(
              [],
              { hour: "2-digit", minute: "2-digit" }
            )
          }))
        );
      } catch {
        if (mounted) setMsgs([]);
      }
    }

    loadMessages();

    const handleRoomMessage = (message: Message) => {
      if (message.idConversa === client.idconversa) {
        setMsgs(prev => [...prev, message]);
      }
    };

    socketConnection.on("roomMessage", handleRoomMessage);

    return () => {
      mounted = false;
      socketConnection.emit("leave", client.chatid);
      socketConnection.off("roomMessage", handleRoomMessage);
    };
  }, [client.chatid, client.idconversa]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const message: Message = {
      id: crypto.randomUUID(),
      texto: messageText,
      idConversa: client.idconversa,
      idGrupo: client.idgrupo,
      isVendedor: true,
      timestampEnvio: new Date(),
      timestampFormatted: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    socketConnection.emit("sendMessage", {
      roomId: client.chatid,
      message
    });

    setMsgs(prev => [...prev, message]);
    setMessageText("");
  };

  return (
    <div className={`fixed z-50 flex flex-col bg-white shadow-2xl border transition-all duration-500 right-0 ${isMaximized ? "w-[calc(100%-16rem)] h-full" : "w-96 h-125 bottom-0 right-8"}`}>
      {/* HEADER */}
      <div className="p-3 border-b flex justify-between">
        <div>
          <h3 className="font-bold text-sm">{client.nome}</h3>
          <p className="text-xs text-green-600">
            {client.ativo ? "Online" : "Offline"}
          </p>
        </div>

        <div className="flex gap-1">
          <button onClick={toggleMaximize}>
            {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <button onClick={onClose}>
            <X size={16} />
          </button>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f8fafc]">
        {msgs.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.isVendedor ? "justify-end" : "justify-start"}`}
          >
            <div className={`p-3 rounded-2xl text-sm max-w-[80%] ${msg.isVendedor ? "bg-green-600 text-white" : "bg-white"}`}>
              {msg.texto}
              <div className="text-[10px] text-right opacity-70">
                {msg.timestampFormatted}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="p-3 border-t">
        <input
          value={messageText}
          onChange={e => setMessageText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSendMessage()}
          placeholder="Mensagem..."
          className="w-full border rounded p-2 text-sm"
        />
      </div>
    </div>
  );
}
