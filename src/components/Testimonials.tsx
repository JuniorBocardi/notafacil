import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Marina Silva',
      role: 'Designer',
      text: 'Descobri que gastava R$ 800 por mês com delivery. Em 2 meses economizei R$ 1.200!',
      avatar: 'M',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      name: 'Carlos Mendes',
      role: 'Engenheiro',
      text: 'App incrível! Fotografo a nota no mercado e pronto. Melhor que qualquer planilha ou app caro.',
      avatar: 'C',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Ana Paula',
      role: 'Professora',
      text: 'Meu marido não acreditava que eu gastava tanto. NotaFácil provou. Agora controlamos tudo!',
      avatar: 'A',
      gradient: 'from-purple-500 to-indigo-500',
    },
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden bg-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-20 w-72 h-72 bg-[#0071E3]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-[#00A3FF]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1D1D1F] mb-6">
            Histórias de sucesso
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Veja como pessoas reais estão controlando suas finanças com NotaFácil
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group rounded-2xl bg-white border border-gray-200 p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              style={{ borderRadius: '20px' }}
            >
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed mb-8 text-base">
                "{testimonial.text}"
              </p>

              <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-bold text-[#1D1D1F] text-sm md:text-base">{testimonial.name}</p>
                  <p className="text-gray-500 text-xs md:text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
