import { Dispatch, SetStateAction } from "react";
import { Posts } from "../../models/Posts";
 export  async function loadPosts(idgrupo: string , setPosts: Dispatch<SetStateAction<Posts[]>>) { 
        try {
                const responsePosts = await fetch(`/api/posts?grupoid=${idgrupo}`, {
                    credentials: "include"
                });
                if (!responsePosts.ok) throw new Error("Erro ao buscar posts");
                const posts: Posts[] = await responsePosts.json();
                console.log("Posts carregados:", posts);
                setPosts(posts ?? []);
            } catch (e) {
                console.error(e);
                setPosts([]);
            }
        }
