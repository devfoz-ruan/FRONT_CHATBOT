"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    User,
    Phone,
    Briefcase,
    Mail,
    Lock,
    Building,
    IdCard,
    ArrowRight,
    CheckCircle2
} from "lucide-react";

export default function CadastroPage() {
    const [formData, setFormData] = useState({
        nome: "",
        telefone: "",
        funcao: "",
        setor: "",
        cargo: "",
        email: "",
        senha: ""
    });

    const isVendedor = formData.funcao === "vendedor";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Cadastro Data:", formData);
        // Add logic to submit data
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-green-500 via-emerald-600 to-teal-700 p-4 font-sans">
            <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 transition-all duration-300 hover:shadow-green-500/20">

                {/* Header Section */}
                <div className="bg-slate-900 p-8 text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-yellow-400 via-green-500 to-emerald-400"></div>
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/20 rounded-full blur-3xl group-hover:bg-green-500/30 transition-all duration-700"></div>
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-all duration-700"></div>

                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Crie sua Conta</h1>
                    <p className="text-slate-400 text-sm">Preencha seus dados para começar</p>
                </div>

                {/* Form Section */}
                <div className="p-8 pt-6">
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Nome */}
                        <div className="space-y-1.5 group">
                            <label htmlFor="nome" className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1 group-focus-within:text-emerald-600 transition-colors">
                                Nome Completo
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                                    <User size={18} />
                                </div>
                                <input
                                    id="nome"
                                    name="nome"
                                    type="text"
                                    required
                                    placeholder="Ex: João da Silva"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                                    value={formData.nome}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Telefone */}
                        <div className="space-y-1.5 group">
                            <label htmlFor="telefone" className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1 group-focus-within:text-emerald-600 transition-colors">
                                Telefone
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                                    <Phone size={18} />
                                </div>
                                <input
                                    id="telefone"
                                    name="telefone"
                                    type="tel"
                                    required
                                    placeholder="(00) 00000-0000"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                                    value={formData.telefone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Função */}
                        <div className="space-y-1.5 group">
                            <label htmlFor="funcao" className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1 group-focus-within:text-emerald-600 transition-colors">
                                Função
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                                    <Briefcase size={18} />
                                </div>
                                <select
                                    id="funcao"
                                    name="funcao"
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 appearance-none transition-all duration-200 cursor-pointer"
                                    value={formData.funcao}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>Selecione sua função...</option>
                                    <option value="cliente">Cliente</option>
                                    <option value="vendedor">Vendedor</option>
                                    <option value="gerente">Gerente</option>
                                    <option value="suporte">Suporte</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Conditional Fields for Vendedor */}
                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isVendedor ? 'max-h-125 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="space-y-5 pt-2 pb-2 pl-4 border-l-2 border-emerald-100 ml-1">

                                {/* Section Title */}
                                <div className="flex items-center gap-2 text-emerald-700 font-medium text-sm">
                                    <CheckCircle2 size={16} />
                                    <span>Informações de Acesso</span>
                                </div>

                                {/* Setor */}
                                <div className="space-y-1.5 group">
                                    <label htmlFor="setor" className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1 group-focus-within:text-emerald-600 transition-colors">
                                        Setor
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                                            <Building size={18} />
                                        </div>
                                        <input
                                            id="setor"
                                            name="setor"
                                            type="text"
                                            required={isVendedor}
                                            placeholder="Ex: Comercial"
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                                            value={formData.setor}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {/* Cargo */}
                                <div className="space-y-1.5 group">
                                    <label htmlFor="cargo" className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1 group-focus-within:text-emerald-600 transition-colors">
                                        Cargo
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                                            <IdCard size={18} />
                                        </div>
                                        <input
                                            id="cargo"
                                            name="cargo"
                                            type="text"
                                            required={isVendedor}
                                            placeholder="Ex: Consultor Sênior"
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                                            value={formData.cargo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-1.5 group">
                                    <label htmlFor="email" className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1 group-focus-within:text-emerald-600 transition-colors">
                                        Email Corporativo
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required={isVendedor}
                                            placeholder="seu.nome@empresa.com"
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {/* Senha */}
                                <div className="space-y-1.5 group">
                                    <label htmlFor="senha" className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1 group-focus-within:text-emerald-600 transition-colors">
                                        Senha de Acesso
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                                            <Lock size={18} />
                                        </div>
                                        <input
                                            id="senha"
                                            name="senha"
                                            type="password"
                                            required={isVendedor}
                                            placeholder="••••••••"
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                                            value={formData.senha}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-green-500/30 active:scale-[0.98] transition-all duration-200"
                            >
                                <span>Cadastrar</span>
                                <ArrowRight size={20} />
                            </button>
                        </div>

                        {/* Footer */}
                        <div className="text-center">
                            <p className="text-sm text-slate-500">
                                Já tem uma conta? <Link href="/login" className="font-semibold text-emerald-600 hover:text-emerald-500 hover:underline transition-colors">Fazer Login</Link>
                            </p>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
