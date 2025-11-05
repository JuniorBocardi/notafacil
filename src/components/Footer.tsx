import { Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1D1D1F] text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0071E3] to-[#00A3FF] flex items-center justify-center shadow-lg">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="6" y="4" width="12" height="16" rx="2" stroke="white" strokeWidth="2" />
                  <line x1="8" y1="8" x2="16" y2="8" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <line x1="8" y1="12" x2="14" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 16L14 18L18 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-white">NotaFácil</span>
            </div>
            <p className="text-gray-500 leading-relaxed">
              Suas finanças no piloto automático
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#como-funciona" className="hover:text-[#0071E3] transition-colors">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#precos" className="hover:text-[#0071E3] transition-colors">
                  Preços
                </a>
              </li>
              <li>
                <a href="#recursos" className="hover:text-[#0071E3] transition-colors">
                  Recursos
                </a>
              </li>
              <li>
                <a href="#upload" className="hover:text-[#0071E3] transition-colors">
                  Começar Grátis
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 mb-6">
              <li>
                <a href="#" className="hover:text-[#0071E3] transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#0071E3] transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#0071E3] transition-colors">
                  LGPD Compliance
                </a>
              </li>
            </ul>

            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#0071E3] flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#0071E3] flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#0071E3] flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-gray-500">
              © 2025 NotaFácil. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Certificado SSL</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Dados Criptografados</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>LGPD Compliance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
