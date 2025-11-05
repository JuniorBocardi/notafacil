import { Check } from 'lucide-react';

export default function Features() {
  const features = [
    'Análise ilimitada de notas fiscais',
    'Categorização automática inteligente (12 categorias)',
    'Dashboard visual com gráficos interativos',
    'Comparação mês a mês automática',
    'Alertas de gastos excessivos',
    'Identificação de produtos duplicados/desperdiçados',
    'Comparação de preços entre mercados',
    'Detecção de recalls e produtos vencidos',
    'Exportação Excel/PDF',
    'Modo família (até 4 membros)',
    'Metas financeiras personalizadas',
    'Suporte prioritário via WhatsApp',
  ];

  return (
    <section id="recursos" className="py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-[#1D1D1F] mb-20">
          Tudo que Você Precisa em Um Só Lugar
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#0071E3] to-[#00A3FF] flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <p className="text-gray-700 font-medium pt-1">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
