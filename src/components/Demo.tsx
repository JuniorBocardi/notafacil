import { Camera, CheckCircle, TrendingUp, Lightbulb } from 'lucide-react';

export default function Demo() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="bg-gradient-to-br from-[#1D1D1F] to-[#2D2D2F] rounded-3xl p-6 shadow-2xl">
                <div className="bg-[#F5F5F7] rounded-2xl overflow-hidden">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center space-x-3 animate-pulse">
                      <Camera className="w-10 h-10 text-[#0071E3]" />
                      <div>
                        <p className="font-semibold text-[#1D1D1F]">Fotografando nota...</p>
                        <p className="text-sm text-gray-600">Aguarde um momento</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-lg animate-slideIn" style={{ animationDelay: '1s' }}>
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <p className="font-semibold text-[#1D1D1F]">Nota processada com sucesso!</p>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>Supermercado ABC</p>
                        <p className="font-bold text-[#0071E3] text-lg mt-1">R$ 347,89</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-lg animate-slideIn" style={{ animationDelay: '2s' }}>
                      <div className="flex items-center space-x-2 mb-3">
                        <TrendingUp className="w-5 h-5 text-[#0071E3]" />
                        <p className="font-semibold text-[#1D1D1F]">Categorias Identificadas</p>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Alimentação</span>
                            <span className="font-semibold">R$ 247,50</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-[#0071E3] h-2 rounded-full" style={{ width: '71%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Limpeza</span>
                            <span className="font-semibold">R$ 100,39</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-[#00A3FF] h-2 rounded-full" style={{ width: '29%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-400 rounded-xl p-4 animate-slideIn" style={{ animationDelay: '3s' }}>
                      <div className="flex items-start space-x-2">
                        <Lightbulb className="w-5 h-5 text-orange-500 mt-0.5" />
                        <div>
                          <p className="font-semibold text-[#1D1D1F] text-sm mb-1">Dica Inteligente</p>
                          <p className="text-xs text-gray-700">
                            Você gastou 45% a mais com alimentação este mês. Considere comprar em atacado.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#0071E3]/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#00A3FF]/10 rounded-full blur-2xl"></div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1D1D1F] mb-6">
              Veja na Prática
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Do caos financeiro à clareza total em segundos. Sem planilhas, sem digitação, sem dor de cabeça.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-[#0071E3] mt-1 flex-shrink-0" />
                <p className="text-gray-600">Análise instantânea com IA de última geração</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-[#0071E3] mt-1 flex-shrink-0" />
                <p className="text-gray-600">Categorização automática em 12 categorias inteligentes</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-[#0071E3] mt-1 flex-shrink-0" />
                <p className="text-gray-600">Insights personalizados para economizar mais</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.5s ease-out both;
        }
      `}</style>
    </section>
  );
}
