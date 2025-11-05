import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
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
            <span className="text-2xl font-bold text-[#1D1D1F] tracking-tight">
              NotaFácil
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('como-funciona')}
              className="text-[#1D1D1F] hover:text-[#0071E3] transition-colors font-medium"
            >
              Como Funciona
            </button>
            <button
              onClick={() => scrollToSection('precos')}
              className="text-[#1D1D1F] hover:text-[#0071E3] transition-colors font-medium"
            >
              Preços
            </button>
            <button
              onClick={() => scrollToSection('recursos')}
              className="text-[#1D1D1F] hover:text-[#0071E3] transition-colors font-medium"
            >
              Recursos
            </button>
          </div>

          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('upload')}
              className="px-6 py-3 bg-[#0071E3] text-white rounded-full font-semibold hover:bg-[#0077ED] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Começar Grátis
            </button>
          </div>

          <button
            className="md:hidden text-[#1D1D1F]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl mt-4 mb-4 p-6 space-y-4">
            <button
              onClick={() => scrollToSection('como-funciona')}
              className="block w-full text-left text-[#1D1D1F] hover:text-[#0071E3] transition-colors font-medium py-2"
            >
              Como Funciona
            </button>
            <button
              onClick={() => scrollToSection('precos')}
              className="block w-full text-left text-[#1D1D1F] hover:text-[#0071E3] transition-colors font-medium py-2"
            >
              Preços
            </button>
            <button
              onClick={() => scrollToSection('recursos')}
              className="block w-full text-left text-[#1D1D1F] hover:text-[#0071E3] transition-colors font-medium py-2"
            >
              Recursos
            </button>
            <button
              onClick={() => scrollToSection('upload')}
              className="w-full px-6 py-3 bg-[#0071E3] text-white rounded-full font-semibold hover:bg-[#0077ED] transition-all duration-300 shadow-lg mt-4"
            >
              Começar Grátis
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
