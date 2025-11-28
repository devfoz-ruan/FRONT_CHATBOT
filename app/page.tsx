
import { Users, MessageSquare, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-green-100 selection:text-green-900">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-yellow-400 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-yellow-600">
                Colla
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-green-600 transition-colors">Recursos</a>
              <a href="#about" className="text-gray-600 hover:text-green-600 transition-colors">Sobre</a>
              <a href="#contact" className="text-gray-600 hover:text-green-600 transition-colors">Contato</a>
              <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-medium transition-all shadow-lg shadow-green-200 hover:shadow-green-300">
                Começar Agora
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium mb-8 border border-green-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            A revolução no atendimento em equipe
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight">
            Unindo Equipes, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-yellow-500 to-green-500 animate-gradient-x">
              Transformando Atendimentos
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Centralize todas as mensagens em uma única caixa de entrada compartilhada.
            Fortaleça a união do seu time e ofereça um suporte ágil e transparente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all flex items-center gap-2 shadow-xl hover:shadow-2xl hover:-translate-y-1">
              Começar Gratuitamente
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-full text-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all border border-gray-200 hover:border-gray-300">
              Ver Demonstração
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tudo que sua equipe precisa</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ferramentas desenhadas para promover a colaboração e eficiência no atendimento ao cliente.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Caixa de Entrada Unificada</h3>
              <p className="text-gray-600">
                Todas as mensagens em um só lugar. WhatsApp, E-mail e Chat integrados para que ninguém fique sem resposta.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Colaboração em Tempo Real</h3>
              <p className="text-gray-600">
                Atribua conversas, deixe notas internas e veja quem está digitando. O trabalho em equipe nunca foi tão fluido.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Transparência Total</h3>
              <p className="text-gray-600">
                Métricas detalhadas de desempenho da equipe. Saiba exatamente como está a qualidade do seu atendimento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-3xl p-8 md:p-16 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Por que escolher o Colla?
                </h2>
                <div className="space-y-4">
                  {[
                    "Foco total na experiência do time",
                    "Interface intuitiva e amigável",
                    "Suporte humanizado 24/7",
                    "Setup em menos de 5 minutos"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-yellow-400" />
                      <span className="text-lg">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
                <div className="text-center">
                  <p className="text-5xl font-bold mb-2">98%</p>
                  <p className="text-green-100 mb-8">Satisfação dos clientes</p>
                  <p className="text-5xl font-bold mb-2">3x</p>
                  <p className="text-green-100">Mais agilidade no atendimento</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-yellow-400 rounded-md flex items-center justify-center">
                <Users className="w-3 h-3 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">Colla</span>
            </div>
            <div className="text-gray-500 text-sm">
              © 2024 Colla. Todos os direitos reservados.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
