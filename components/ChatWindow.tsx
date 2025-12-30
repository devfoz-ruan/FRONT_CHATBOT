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
import { useMessageContext } from "@/app/providers/message/useMessageContext";

interface ChatWindowProps {
  client: Client;
  onClose: () => void;
}

export default function ChatWindow({ client, onClose }: ChatWindowProps) {
  const { msgs, setMsgs } = useMessageContext();
  const [messageText, setMessageText] = useState("");
  const [isMaximized, setIsMaximized] = useState(false);

  const socketConnection = getSocket();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleMaximize = () => {
    setIsMaximized(prev => !prev);
  };

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
          { credentials: "include" }
        );
        if (!response.ok) throw new Error("Erro ao buscar mensagens");

        const data: MessagePayload[] = await response.json();

        const parsed: Message[] = data.map(payload => ({
          idConversa: payload.idconversa,
          texto: payload.texto,
          idGrupo: payload.idgrupo,
          isVendedor: payload.isvendedor,
          timestampEnvio: new Date(payload.timestampenvio),
          timestampFormatted: new Date(payload.timestampenvio).toLocaleTimeString(
            [],
            { hour: "2-digit", minute: "2-digit" }
          )
        }));

        if (mounted) {
          setMsgs(parsed);
          scrollToBottom();
        }
      } catch (e) {
        console.error(e);
        if (mounted) setMsgs([]);
      }
    }

    loadMessages();

    const handleRoomMessage = (message: Message) => {
      setMsgs(prev => [...prev, message]);
      scrollToBottom();
    };

    socketConnection.on("roomMessage", handleRoomMessage);

    return () => {
      mounted = false;
      socketConnection.off("roomMessage", handleRoomMessage);
      socketConnection.emit("leave", client.chatid);
    };
  }, [client.chatid, client.idconversa]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const message: Message = {
      texto: messageText,
      idConversa: client.idconversa,
      idGrupo: client.idgrupo,
      timestampEnvio: new Date(),
      isVendedor: true,
      timestampFormatted: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    socketConnection.emit("sendMessage", {
      roomId: client.chatid,
      message
    });

    setMessageText("");
  };

  return (
    <div
      className={`
        fixed z-50 flex flex-col
        bg-white shadow-2xl border border-gray-200
        transition-all duration-500 ease-in-out
        right-0
        ${
          isMaximized
            ? `
              bottom-0
              w-[calc(100%-16rem)]
              h-full
              translate-x-0
              translate-y-0
            `
            : `
              bottom-0
              right-8
              w-80 md:w-96
              h-125
              translate-x-0
              translate-y-0
            `
        }
      `}
    >
      {/* HEADER */}
      <div className="bg-white p-3 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs">
            {client.avatar}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">{client.nome}</h3>
            <p className="text-xs text-green-600">
              {client.ativo ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleMaximize}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            {isMaximized ? <Minimize2 color="black" size={16} /> : <Maximize2 color="black"size={16} />}
          </button>

          <button
            onClick={onClose}
            className="p-1 hover:bg-red-50 hover:text-red-600 rounded transition-colors"
          >
            <X color="black" size={16} />
          </button>
        </div>
      </div>

      {/* MENSAGENS */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8fafc]">
        {msgs.map(msg =>
          msg.idConversa === client.idconversa ? (
            <div
              key={msg.timestampEnvio.toString()}
              className={`flex ${
                msg.isVendedor ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 shadow-sm ${
                  msg.isVendedor
                    ? "bg-green-600 text-white rounded-tr-none"
                    : "bg-white text-gray-800 rounded-tl-none"
                }`}
              >
                <p className="text-sm">{msg.texto}</p>
                <p className="text-[10px] mt-1 text-right opacity-70">
                  {msg.timestampFormatted}
                </p>
              </div>
            </div>
          ) : null
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="bg-white p-3 border-t border-gray-100">
        <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border">
          <input
            type="text"
            value={messageText}
            onChange={e => setMessageText(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSendMessage()}
            placeholder="Mensagem..."
            className="flex-1 bg-transparent outline-none text-sm placeholder-gray-600"
          />
          <button
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            className={`p-2 rounded-lg transition ${
              messageText.trim()
                ? "bg-green-600 text-white hover:bg-green-700"
                : "text-gray-400"
            }`}
          >
            <Send size={16} />
          </button>
        </div>

        <div className="flex gap-4 mt-2 px-1 text-gray-400">
          <ImageIcon color="black" size={16} />
          <Paperclip color="black" size={16} />
          <Smile color="black"size={16} />
        </div>
      </div>
    </div>
  );
}
