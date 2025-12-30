"use client";

import { useEffect, useState } from "react";
import ChatWindow from "@/components/ChatWindow";
import FeedPost from "@/components/FeedPost";
import NewPostInput from "@/components/NewPostInput";
import { Search, Filter } from "lucide-react";
import { Posts } from "@/app/models/Posts";
import { Client } from "@/app/models/Client";

import { useParams, useSearchParams} from "next/navigation";

import { useMessageContext } from "../../../providers/message/useMessageContext";
import { usePostsContext } from "@/app/providers/posts/usePostsContext";

export default function MessagesPage() {

    const params = useParams();
    const grupoid = params.id as string;

    const searchParams = useSearchParams();
    const nome = searchParams.get("nome")

    const { msgs } = useMessageContext();
    const {Posts, setPosts } = usePostsContext();
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [clientes, setClientes] = useState<Client[]>([]) ;
    
    useEffect(() => {
        async function loadClientes() {
            try {
                const response = await fetch(`/api/cliente?grupoid=${grupoid}`, {
                    credentials: "include"
                });
                if (!response.ok) throw new Error("Erro ao buscar clientes");
                const data: Client[] = await response.json();
                setClientes(data ?? []);
            } catch (e) {
                console.error(e);
                setClientes([]);
            }
        }

        async function loadPosts() {
            try {
                const responsePosts = await fetch(`/api/posts?grupoid=${grupoid}`, {
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
        loadPosts();
        loadClientes();
}, [grupoid, msgs]);

    return (
        <div className="max-w-7xl mx-auto p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{nome}</h1>
                    <p className="text-gray-500 mt-1">Compartilhe atualizações e colabore com seu time.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar no feed..."
                            className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500/20 w-full sm:w-64"
                        />
                    </div>
                    <button className="p-2 bg-white text-gray-500 hover:bg-gray-50 rounded-lg border border-gray-200">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content - Feed */}
                <div className="lg:col-span-2">
                    {/* New Post Input */}
                    <NewPostInput />

                    {/* Feed */}
                    <div className="space-y-6">
                        {Posts.map((post) => (
                            <FeedPost
                                key={post.id}
                                name={post.nome}
                                role={post.cargo}
                                content={post.texto}
                                timestamp={new Date(post.timestamp).toLocaleString()}
                                likes={post.likes}
                                comments={post.total_comentarios}
                            />
                        ))}
                    </div>
                </div>

                {/* Sidebar - Clients */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-8">
                        <h2 className="font-bold text-gray-900 mb-4 flex items-center justify-between">
                            Clientes
                            <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{clientes.length}</span>
                        </h2>
                        <div className="space-y-4">
                            {(clientes??[]).map((client) => (
                                <div
                                    key={client.chatid}
                                    onClick={() => setSelectedClient(client)}
                                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group"
                                >
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm border-2 border-white shadow-sm group-hover:border-green-100 transition-colors">
                                            {client.avatar}
                                        </div>
                                        <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${client.ativo === true ? 'bg-green-500' :
                                            client.ativo === false ? 'bg-red-500' : 'bg-gray-300'
                                            }`}></span>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900 group-hover:text-green-700 transition-colors">{client.nome}</h3>
                                        <p className="text-xs text-gray-500 capitalize">{client.ativo}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 py-2 text-sm text-green-600 font-medium hover:bg-green-50 rounded-lg transition-colors border border-dashed border-green-200 hover:border-green-300">
                            + Adicionar Cliente
                        </button>
                    </div>
                </div>
            </div>

            {/* Chat Overlay */}
            {selectedClient && (
                <ChatWindow
                    client={selectedClient}
                    onClose={() => setSelectedClient(null)}
                />
            )}
        </div>
    );
}