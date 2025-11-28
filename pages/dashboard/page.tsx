import {
    Search,
    Filter,
    MoreHorizontal,
    Clock,
    AlertCircle,
    CheckCircle2
} from "lucide-react";

export default function Dashboard() {
    const demands = [
        {
            id: 1,
            title: "Erro ao processar pagamento",
            client: "Empresa ABC",
            priority: "Alta",
            status: "Pendente",
            time: "10 min atrás",
            type: "Bug"
        },
        {
            id: 2,
            title: "Dúvida sobre integração API",
            client: "Tech Solutions",
            priority: "Média",
            status: "Em Análise",
            time: "45 min atrás",
            type: "Suporte"
        },
        {
            id: 3,
            title: "Solicitação de reembolso",
            client: "Maria Oliveira",
            priority: "Baixa",
            status: "Resolvido",
            time: "2h atrás",
            type: "Financeiro"
        },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Olá, João! 👋</h1>
                    <p className="text-gray-500">Aqui está o resumo das demandas do seu grupo hoje.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-white px-4 py-2 rounded-full border border-gray-200 flex items-center gap-2 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-sm font-medium text-gray-700">Grupo Online</span>
                    </div>
                    <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                        Nova Demanda
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                            <Clock className="w-5 h-5 text-yellow-600" />
                        </div>
                        <span className="text-xs font-medium bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full">Hoje</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">12</p>
                    <p className="text-sm text-gray-500">Demandas Pendentes</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <AlertCircle className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded-full">Em andamento</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">5</p>
                    <p className="text-sm text-gray-500">Sendo Analisadas</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-xs font-medium bg-green-50 text-green-700 px-2 py-1 rounded-full">+15%</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">28</p>
                    <p className="text-sm text-gray-500">Resolvidas esta semana</p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-gray-900">Demandas Recentes</h2>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar demandas..."
                                className="pl-9 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-green-500/20 w-full sm:w-64"
                            />
                        </div>
                        <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg border border-gray-200">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* List */}
                <div className="divide-y divide-gray-50">
                    {demands.map((demand) => (
                        <div key={demand.id} className="p-6 hover:bg-gray-50 transition-colors group cursor-pointer">
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4">
                                    <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                    ${demand.priority === 'Alta' ? 'bg-red-100 text-red-600' :
                                            demand.priority === 'Média' ? 'bg-yellow-100 text-yellow-600' :
                                                'bg-green-100 text-green-600'}
                  `}>
                                        <AlertCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                                            {demand.title}
                                        </h3>
                                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                                            <span>{demand.client}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                            <span>{demand.type}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                            <span>{demand.time}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${demand.status === 'Pendente' ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' :
                                            demand.status === 'Em Análise' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                                                'bg-green-50 text-green-700 border border-green-100'}
                  `}>
                                        {demand.status}
                                    </span>
                                    <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t border-gray-50 text-center">
                    <button className="text-sm text-gray-500 hover:text-green-600 font-medium transition-colors">
                        Ver todas as demandas
                    </button>
                </div>
            </div>
        </div>
    );
}
