import { Camera, Play, Sparkles } from 'lucide-react';

export default function Hero() {
  const scrollToUpload = () => {
    const element = document.getElementById('upload');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-0">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-glow { animation: glow 3s ease-in-out infinite; }
      `}</style>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0071E3]/10 rounded-full blur-3xl animate-glow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#00A3FF]/8 rounded-full blur-3xl animate-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#0071E3]/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center space-x-2 w-fit rounded-full border border-gray-200 bg-white/50 backdrop-blur px-4 py-2" style={{ borderRadius: '50px' }}>
              <div className="flex -space-x-1.5">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-gradient-to-br from-[#0071E3] to-[#00A3FF] border border-white flex items-center justify-center text-white text-xs font-bold"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700">
                Usado por <span className="font-bold text-[#0071E3]">15.000+</span>
              </span>
            </div>

            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1D1D1F] leading-tight tracking-tight mb-4">
                Suas Finanças<br />
                <span className="bg-gradient-to-r from-[#0071E3] via-[#00A3FF] to-[#0071E3] bg-clip-text text-transparent">
                  Automaticamente
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
                Fotografe sua nota fiscal. Nossa IA analisa tudo em segundos. Nunca mais perca o controle dos seus gastos.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={scrollToUpload}
                className="px-8 py-4 bg-[#0071E3] text-white rounded-2xl font-semibold text-base hover:bg-[#0077ED] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2 group"
              >
                <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Analisar Nota Grátis</span>
              </button>

              <button className="px-8 py-4 bg-white text-[#0071E3] border-2 border-[#0071E3] rounded-2xl font-semibold text-base hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Ver Demo</span>
              </button>
            </div>

            <div className="pt-4 flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400 text-lg">★★★★★</span>
              </div>
              <span className="text-gray-600">
                <span className="font-bold">4.9</span> baseado em 1.200+ reviews
              </span>
            </div>
          </div>

          <div className="hidden lg:flex justify-center items-center relative h-full">
            <div className="relative w-full max-w-sm animate-float">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0071E3]/20 to-[#00A3FF]/20 rounded-3xl blur-2xl"></div>

              <div className="relative bg-gradient-to-br from-black to-gray-900 rounded-3xl p-3 shadow-2xl">
                <div className="bg-white rounded-2xl overflow-hidden">
                  <div className="bg-gradient-to-br from-gray-50 to-white p-6 space-y-4">
                    <div className="flex items-center space-x-3 bg-white rounded-xl p-3 shadow-sm">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0071E3] to-[#00A3FF] flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#1D1D1F]">IA Processando</p>
                        <p className="text-xs text-gray-500">Analisando nota...</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Total do Mês</p>
                          <p className="text-3xl font-bold text-[#0071E3]">R$ 2.847</p>
                        </div>
                        <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                          ↓ 12%
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-medium text-gray-700">Alimentação</span>
                            <span className="text-xs font-semibold text-gray-900">R$ 1.234</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#0071E3] to-[#00A3FF] rounded-full" style={{ width: '43%' }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-medium text-gray-700">Transporte</span>
                            <span className="text-xs font-semibold text-gray-900">R$ 856</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full" style={{ width: '30%' }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-medium text-gray-700">Outros</span>
                            <span className="text-xs font-semibold text-gray-900">R$ 757</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-full" style={{ width: '27%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-3">
                      <p className="text-xs font-medium text-amber-900">
                        💡 Dica: Você gastou 45% a mais com delivery este mês
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
