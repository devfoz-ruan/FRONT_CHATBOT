"use client";

import { SetStateAction } from "react"
import { initialState } from "./initialState"
import { createContext } from "react"
import { Posts } from "@/app/models/Posts";

type PostsContextType = {
    Posts: Posts[],
    setPosts: React.Dispatch<SetStateAction<Posts[]>>
}

const initialContextValue: PostsContextType = {
    Posts: initialState,
    setPosts: () => { }
}
export const PostsContext = createContext<PostsContextType>(initialContextValue)