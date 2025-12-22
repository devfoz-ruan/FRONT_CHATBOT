"use client";

import { Message } from "@/app/models/Mensagem"
import { SetStateAction } from "react"
import { initialState } from "./initialState"
import { createContext } from "react"

type MessageContextType = {
    msgs: Message[],
    setMsgs: React.Dispatch<SetStateAction<Message[]>>
}

const initialContextValue: MessageContextType = {
    msgs: initialState,
    setMsgs: () => { }
}
export const MessageContext = createContext<MessageContextType>(initialContextValue)