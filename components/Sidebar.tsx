"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    MessageSquare,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    const menuItems = [
        { icon: LayoutDashboard, label: "Visão Geral", href: "/dashboard" },
        { icon: MessageSquare, label: "Demandas", href: "/mensages" },
        { icon: Users, label: "Meu Grupo", href: "/group" },
        { icon: Settings, label: "Configurações", href: "/dashboard/settings" },
    ];

    return (
        <aside
            className={`
        bg-white border-r border-gray-100 h-screen sticky top-0 
        transition-all duration-300 ease-in-out flex flex-col
        ${collapsed ? "w-20" : "w-64"}
      `}
        >
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-50">
                {!collapsed && (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-linear-to-br from-green-500 to-yellow-400 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-green-600 to-yellow-600">
                            Colla
                        </span>
                    </div>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className={`p-1.5 rounded-lg hover:bg-gray-50 text-gray-500 transition-colors ${collapsed ? "mx-auto" : ""}`}
                >
                    {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group
                ${isActive
                                    ? "bg-green-50 text-green-700 font-medium"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }
                ${collapsed ? "justify-center" : ""}
              `}
                        >
                            <item.icon
                                size={22}
                                className={`
                  transition-colors
                  ${isActive ? "text-green-600" : "text-gray-400 group-hover:text-gray-600"}
                `}
                            />
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-gray-50">
                <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border-2 border-white shadow-sm">
                        <span className="font-semibold text-gray-600">JD</span>
                    </div>
                    {!collapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">João da Silva</p>
                            <p className="text-xs text-gray-500 truncate">Suporte Nível 1</p>
                        </div>
                    )}
                    {!collapsed && (
                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                            <LogOut size={18} />
                        </button>
                    )}
                </div>
            </div>
        </aside>
    );
}
