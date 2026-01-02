import { Client } from "@/app/models/Client";
import { Dispatch, SetStateAction } from "react";

export async function loadClientes(grupoid: string, setClientes: Dispatch<SetStateAction<Client[]>>) {
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