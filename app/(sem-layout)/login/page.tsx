"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import {
    Mail,
    Lock,
    LogIn,
    ArrowRight
} from "lucide-react";


export default function LoginPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: "",
        senha: ""
    });
    const emailLowercase = formData.email.toLowerCase();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email: emailLowercase,
                senha: formData.senha
            })
        })
        const data = await response.json();
        console.log(data);
        localStorage.setItem('dataUser', String(data.id));
        localStorage.setItem('userName', data.nome);
        localStorage.setItem('userPerm', String(data.permissoes));
        
        if (response.ok) {
            router.replace('/grupos');
        } else {
            console.log('Erro no login');
        }
        // Add logic to submit login
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-green-500 via-emerald-600 to-teal-700 p-4 font-sans">
            <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 transition-all duration-300 hover:shadow-green-500/20">

                {/* Header Section */}
                <div className="bg-slate-900 p-8 text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-yellow-400 via-green-500 to-emerald-400"></div>
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/20 rounded-full blur-3xl group-hover:bg-green-500/30 transition-all duration-700"></div>
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-all duration-700"></div>

                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Bem-vindo(a)</h1>
                    <p className="text-slate-400 text-sm">Entre com suas credenciais</p>
                </div>

                {/* Form Section */}
                <div className="p-8 pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Email */}
                        <div className="space-y-1.5 group">
                            <label htmlFor="email" className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1 group-focus-within:text-emerald-600 transition-colors">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="seu.email@exemplo.com"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Senha */}
                        <div className="space-y-1.5 group">
                            <label htmlFor="senha" className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1 group-focus-within:text-emerald-600 transition-colors">
                                Senha
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    id="senha"
                                    name="senha"
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                                    value={formData.senha}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="text-right">
                                <a href="#" className="text-xs text-slate-400 hover:text-emerald-600 transition-colors">
                                    Esqueceu sua senha?
                                </a>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-green-500/30 active:scale-[0.98] transition-all duration-200"
                            >
                                <span>Entrar</span>
                                <LogIn size={20} />
                            </button>
                        </div>

                        {/* Footer */}
                        <div className="text-center">
                            <p className="text-sm text-slate-500">
                                Não tem uma conta? <Link href="/cadastro" className="font-semibold text-emerald-600 hover:text-emerald-500 hover:underline transition-colors">Cadastre-se</Link>
                            </p>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
