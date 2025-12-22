import type { Message } from "@/app/models/Mensagem";


export const initialState: Message[] =
    [
        {
            id: 1,
            text: "Olá! Tudo bem?",
            sender: "",
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
    ]