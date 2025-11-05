import { Flag, Zap, TrendingUp, Shield, Gauge, Gem } from 'lucide-react';

export default function Differentials() {
  const features = [
    {
      icon: Flag,
      title: 'Específico para Brasil',
      description:
        'Único app que entende nota fiscal brasileira (NF-e, cupom, ECF). Sem gambiarras.',
    },
    {
      icon: Zap,
      title: 'IA de Ponta',
      description:
        'Tecnologia GPT-4 Vision identifica até produtos escritos à mão com 98% de precisão.',
    },
    {
      icon: TrendingUp,
      title: 'Insights Inteligentes',
      description:
        'Não só categoriza: avisa onde você gasta demais e sugere economia baseado no seu padrão.',
    },
    {
      icon: Shield,
      title: '100% Seguro',
      description:
        'Seus dados criptografados. Notas processadas e deletadas. Certificado SSL. Sem venda de dados.',
    },
    {
      icon: Gauge,
      title: 'Velocidade',
      description:
        'Análise completa em média de 3 segundos. Sem espera, sem fricção.',
    },
    {
      icon: Gem,
      title: 'Premium Experience',
      description:
        'Interface elegante tipo iPhone. Modo escuro. Sem anúncios. Você merece o melhor.',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-[#F5F5F7] via-white to-[#E8F4FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-[#1D1D1F] mb-20">
          Por que NotaFácil é Diferente?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 hover:scale-105"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0071E3] to-[#00A3FF] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-[#1D1D1F] mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
