import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Como funciona a IA de análise?',
      answer:
        'Utilizamos tecnologia de ponta com GPT-4 Vision que analisa a imagem da sua nota fiscal, extrai todos os dados (itens, valores, data, local) e categoriza automaticamente seus gastos. Todo o processo leva em média 3 segundos.',
    },
    {
      question: 'Funciona com qualquer tipo de nota fiscal?',
      answer:
        'Sim! NotaFácil foi desenvolvido especificamente para o mercado brasileiro e aceita NF-e (nota fiscal eletrônica), cupom fiscal, ECF, e até notas escritas à mão. Aceitamos formatos em foto (JPG, PNG) e PDF.',
    },
    {
      question: 'Meus dados estão seguros?',
      answer:
        'Absolutamente. Todos os dados são criptografados com certificado SSL. As notas fiscais são processadas e imediatamente deletadas de nossos servidores. Nunca vendemos ou compartilhamos seus dados com terceiros. Somos 100% compliance com a LGPD.',
    },
    {
      question: 'Posso cancelar a qualquer momento?',
      answer:
        'Sim, você tem total controle. Pode cancelar seu plano premium a qualquer momento, sem multas ou taxas. Seu acesso continua ativo até o final do período pago.',
    },
    {
      question: 'Tem app para celular?',
      answer:
        'Nossa plataforma web é totalmente responsiva e funciona perfeitamente em qualquer dispositivo (celular, tablet, desktop). Em breve lançaremos aplicativos nativos para iOS e Android com recursos adicionais.',
    },
    {
      question: 'Qual a diferença do plano grátis para o premium?',
      answer:
        'O plano grátis permite 10 análises por mês com dashboard básico e 5 categorias. O Premium oferece análises ilimitadas, 12 categorias inteligentes, alertas personalizados, comparação de preços, dicas de IA, exportação de dados, detecção de recalls e suporte prioritário.',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-[#1D1D1F] mb-20">
          Perguntas Frequentes
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#F5F5F7] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
              >
                <span className="font-semibold text-[#1D1D1F] text-lg pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-[#0071E3] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-8 pb-6 text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
