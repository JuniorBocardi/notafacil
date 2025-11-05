import { Camera, Sparkles, BarChart3 } from 'lucide-react';

export default function Solution() {
  const steps = [
    {
      number: '01',
      icon: Camera,
      title: 'Fotografe',
      description:
        'Tire foto da nota fiscal ou faça upload do PDF. Aceita cupom fiscal, NF-e, qualquer formato brasileiro.',
    },
    {
      number: '02',
      icon: Sparkles,
      title: 'IA Processa',
      description:
        'Nossa inteligência artificial extrai TODOS os dados em segundos: valor, data, local, categorias.',
    },
    {
      number: '03',
      icon: BarChart3,
      title: 'Veja Insights',
      description:
        'Dashboard inteligente mostra para onde vai seu dinheiro + alertas personalizados + dicas de economia.',
    },
  ];

  return (
    <section id="como-funciona" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-[#1D1D1F] mb-20">
          A Forma Mais Inteligente de Controlar Gastos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#0071E3]/30 to-transparent"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`,
                }}
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 relative z-10 border border-gray-100">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[#0071E3] to-[#00A3FF] flex items-center justify-center text-white font-bold shadow-lg">
                    {step.number}
                  </div>

                  <div className="mt-8 mb-6 w-20 h-20 rounded-3xl bg-gradient-to-br from-[#0071E3]/10 to-[#00A3FF]/10 flex items-center justify-center mx-auto">
                    <Icon className="w-10 h-10 text-[#0071E3]" />
                  </div>

                  <h3 className="text-2xl font-bold text-[#1D1D1F] mb-4 text-center">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-center">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
