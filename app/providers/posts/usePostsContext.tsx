"use-client";

import { useContext } from "react";
import { PostsContext} from "./PostsContext";

export function usePostsContext() {
    return useContext(PostsContext)
}