import { Check, Sparkles } from 'lucide-react';

export default function Pricing() {
  const scrollToUpload = () => {
    const element = document.getElementById('upload');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="precos" className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#0071E3]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-[#00A3FF]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1D1D1F] mb-6">
            Planos simples e transparentes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Escolha o plano perfeito para suas necessidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="rounded-3xl bg-white border-2 border-gray-200 p-12 shadow-lg hover:shadow-xl transition-all duration-300" style={{ borderRadius: '24px' }}>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#1D1D1F] mb-3">Gratuito</h3>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-[#1D1D1F]">R$ 0</span>
                <span className="text-gray-600 ml-2 text-lg">/mês</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Perfeito para começar</p>
            </div>

            <ul className="space-y-4 mb-10">
              {[
                '10 análises por mês',
                'Dashboard básico',
                '5 categorias',
                'Suporte por email',
              ].map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-[#0071E3] flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={scrollToUpload}
              className="w-full px-6 py-4 bg-gray-100 text-[#1D1D1F] rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-300"
            >
              Começar Grátis
            </button>
          </div>

          <div className="relative rounded-3xl bg-gradient-to-br from-[#0071E3] via-[#0085FF] to-[#00A3FF] p-12 shadow-2xl hover:shadow-3xl transition-all duration-300 transform md:scale-105 md:z-10 origin-center" style={{ borderRadius: '24px' }}>
            <div className="absolute -top-4 right-8">
              <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg" style={{ borderRadius: '50px' }}>
                MAIS POPULAR
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-3 flex items-center space-x-2">
                <Sparkles className="w-6 h-6" />
                <span>Premium</span>
              </h3>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-white">R$ 19,90</span>
                <span className="text-white/80 ml-2 text-lg">/mês</span>
              </div>
              <p className="text-sm text-white/80 mt-2">7 dias grátis, cancele quando quiser</p>
            </div>

            <ul className="space-y-3 mb-10">
              {[
                'Análises ILIMITADAS',
                'Dashboard avançado com IA',
                '12 categorias inteligentes',
                'Alertas de gastos',
                'Comparação de preços',
                'Dicas com IA',
                'Exportar dados',
                'Detecção de recalls',
                'Suporte prioritário',
              ].map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-white flex-shrink-0" />
                  <span className="text-white/90 font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={scrollToUpload}
              className="w-full px-6 py-4 bg-white text-[#0071E3] rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-xl font-bold"
            >
              Começar 7 Dias Grátis
            </button>

            <p className="text-center text-white/80 text-xs mt-4">
              Sem cartão de crédito. Cancele quando quiser.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
