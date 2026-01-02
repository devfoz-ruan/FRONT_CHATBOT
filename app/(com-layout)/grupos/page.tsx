'use client'

import { Grupo } from "@/app/models/Grupo";
import { Card, CardContent } from "@/components/Cards";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
    const [grupos, setGrupos] =  useState<Grupo[]>([]);
     
    useEffect(() => {
        async function loadGrupos() {
            try {
                const idVendedor = Number(localStorage.getItem('dataUser'));    
                const response = await fetch(`/api/grupos?id=${idVendedor}`, {
                    credentials: "include"
                });
                if (!response.ok) throw new Error("Erro ao buscar grupos");
                const data = await response.json();
                setGrupos(data ?? []);
                console.log(data);
            } catch (e) {
                console.error(e);
            }
        }
        loadGrupos();           
}, []);
    return (
        <>
        
        <div className="max-w-7xl mx-auto p-8 flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold text-gray-900">Bem-vindo ao Colla!</h1>
            <p className="text-gray-500 mt-2 mb-8">Selecione um grupo para começar a colaborar com sua equipe.</p>
            <div className="flex-col max-w-7xl gap-8 justify-center">
            <div className="flex justify-center items-center space-x-0.5 gap-8 flex-wrap">
                {grupos.map((grupo) => (
                    <Link key={grupo.id} href={`/grupos/${grupo.id}?nome=${grupo.nome}`}>                
                    <Card className="h-full max-w-2xs shadow-soft hover:shadow-medium transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-gray-100 shadow-lg hover:shadow-xl ">
                    <CardContent className="p-6 ">
                        <div className=" rounded-lg flex items-center justify-center mb-2 flex-col gap-4">
                        <div className="rounded-lg overflow-hidden w-full h-40 flex items-center justify-center">
                            <img src="https://foztintas.com/public/assets/images/logo.png" alt="cachorro"  className="w-full"/>
                            </div>
                        <h3 className="text-black">{grupo.nome}</h3>
                        </div>

                    </CardContent>
                    </Card>
                    </Link>
                ))}
            </div>
        </div>
        </div>

        
        </>
    );
       
}