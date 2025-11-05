import { Check, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Plano() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1D1D1F] mb-4">
            Planos e Cobrança
          </h1>
          <p className="text-xl text-gray-600">
            Escolha o plano perfeito para suas necessidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200">
            <h3 className="text-2xl font-bold text-[#1D1D1F] mb-3">Gratuito</h3>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-bold text-[#1D1D1F]">R$ 0</span>
              <span className="text-gray-600 ml-2">/mês</span>
            </div>

            <ul className="space-y-3 mb-8">
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

            {user?.plan === 'free' ? (
              <div className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl text-center font-semibold">
                Plano Atual
              </div>
            ) : (
              <button className="w-full px-6 py-3 bg-gray-100 text-[#1D1D1F] rounded-xl font-semibold hover:bg-gray-200 transition-all">
                Mudar para Gratuito
              </button>
            )}
          </div>

          <div className="relative bg-gradient-to-br from-[#0071E3] via-[#0085FF] to-[#00A3FF] rounded-3xl p-8 shadow-2xl transform md:scale-105">
            <div className="absolute -top-4 right-8">
              <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                MAIS POPULAR
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3 flex items-center space-x-2">
              <Sparkles className="w-6 h-6" />
              <span>Premium</span>
            </h3>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-bold text-white">R$ 19,90</span>
              <span className="text-white/80 ml-2">/mês</span>
            </div>

            <ul className="space-y-3 mb-8">
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
                  <span className="text-white/90">{feature}</span>
                </li>
              ))}
            </ul>

            {user?.plan === 'premium' ? (
              <div className="px-6 py-3 bg-white/20 text-white rounded-xl text-center font-semibold">
                Plano Atual
              </div>
            ) : (
              <button className="w-full px-6 py-3 bg-white text-[#0071E3] rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-xl">
                Começar 7 Dias Grátis
              </button>
            )}

            <p className="text-center text-white/80 text-xs mt-4">
              Sem cartão de crédito. Cancele quando quiser.
            </p>
          </div>
        </div>

        {user?.plan === 'premium' && (
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#1D1D1F] mb-6">Histórico de Pagamentos</h2>
            <div className="text-center py-12 text-gray-500">
              Nenhum pagamento registrado ainda
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
