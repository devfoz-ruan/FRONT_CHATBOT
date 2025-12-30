"use client";

import { useState } from "react"
import { initialState } from "./initialState"
import { PostsContext } from "./PostsContext"

type PostsProviderProps = {
    children: React.ReactNode
}
export function PostsProvider({ children }: PostsProviderProps) {
    const [Posts, setPosts] = useState(initialState)
    return (
        <PostsContext.Provider value={{ Posts, setPosts }}>
            {children}
        </PostsContext.Provider>
    )
}