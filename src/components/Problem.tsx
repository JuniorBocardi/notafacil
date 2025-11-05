import { TrendingDown, Edit3, AlertCircle } from 'lucide-react';

export default function Problem() {
  const problems = [
    {
      icon: TrendingDown,
      stat: '73%',
      text: 'dos brasileiros não sabem para onde vai o salário',
    },
    {
      icon: Edit3,
      stat: 'Manual',
      text: 'Aplicativos tradicionais exigem digitação manual de cada gasto',
    },
    {
      icon: AlertCircle,
      stat: '30%',
      text: 'Sem controle, famílias gastam até 30% mais do que planejavam',
    },
  ];

  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-[#1D1D1F] mb-16">
          Você sabe exatamente para onde vai seu dinheiro?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0071E3]/10 to-[#00A3FF]/10 flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-[#0071E3]" />
                </div>
                <div className="text-4xl font-bold text-[#0071E3] mb-3">
                  {problem.stat}
                </div>
                <p className="text-gray-600 leading-relaxed">{problem.text}</p>
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-gray-500 mt-12">
          Fonte: Pesquisa SPC Brasil 2024 | Confederação Nacional de Dirigentes Lojistas
        </p>
      </div>
    </section>
  );
}
