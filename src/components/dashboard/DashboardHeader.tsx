import { Link, useLocation } from 'react-router-dom';
import { BarChart3, FileText, Settings, LogOut, User, CreditCard, Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function DashboardHeader() {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/dashboard" className="flex items-center space-x-3">
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
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/dashboard"
              className={`flex items-center space-x-2 font-medium transition-colors ${
                isActive('/dashboard')
                  ? 'text-[#0071E3] border-b-2 border-[#0071E3] pb-1'
                  : 'text-[#1D1D1F] hover:text-[#0071E3]'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/dashboard/notas"
              className={`flex items-center space-x-2 font-medium transition-colors ${
                isActive('/dashboard/notas')
                  ? 'text-[#0071E3] border-b-2 border-[#0071E3] pb-1'
                  : 'text-[#1D1D1F] hover:text-[#0071E3]'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>Minhas Notas</span>
            </Link>
            <Link
              to="/dashboard/configuracoes"
              className={`flex items-center space-x-2 font-medium transition-colors ${
                isActive('/dashboard/configuracoes')
                  ? 'text-[#0071E3] border-b-2 border-[#0071E3] pb-1'
                  : 'text-[#1D1D1F] hover:text-[#0071E3]'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Configurações</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user?.plan === 'free' && (
              <Link
                to="/dashboard/plano"
                className="px-4 py-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-1"
              >
                <Sparkles className="w-4 h-4" />
                <span>Upgrade</span>
              </Link>
            )}

            <div
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                user?.plan === 'premium'
                  ? 'bg-gradient-to-r from-[#0071E3] to-[#00A3FF] text-white'
                  : 'bg-gray-100 text-gray-700 border border-gray-200'
              }`}
            >
              {user?.plan === 'premium' ? 'Premium' : 'Plano Gratuito'}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0071E3] to-[#00A3FF] flex items-center justify-center text-white font-bold shadow-lg hover:shadow-xl transition-all"
              >
                {user?.avatar_url ? (
                  <img src={user.avatar_url} alt={user.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  getInitials(user?.name || '')
                )}
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-semibold text-[#1D1D1F]">{user?.name}</p>
                    <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <Link
                    to="/dashboard/perfil"
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                    onClick={() => setShowDropdown(false)}
                  >
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">Meu Perfil</span>
                  </Link>
                  <Link
                    to="/dashboard/plano"
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                    onClick={() => setShowDropdown(false)}
                  >
                    <CreditCard className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">Plano e Cobrança</span>
                  </Link>
                  <Link
                    to="/dashboard/configuracoes"
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                    onClick={() => setShowDropdown(false)}
                  >
                    <Settings className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">Configurações</span>
                  </Link>
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-3 px-4 py-2 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-red-600 font-medium">Sair</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            className="md:hidden text-[#1D1D1F]"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {showMobileMenu && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl mt-4 mb-4 p-6 space-y-4">
            <Link
              to="/dashboard"
              className="flex items-center space-x-3 text-[#1D1D1F] hover:text-[#0071E3] transition-colors font-medium py-2"
              onClick={() => setShowMobileMenu(false)}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/dashboard/notas"
              className="flex items-center space-x-3 text-[#1D1D1F] hover:text-[#0071E3] transition-colors font-medium py-2"
              onClick={() => setShowMobileMenu(false)}
            >
              <FileText className="w-5 h-5" />
              <span>Minhas Notas</span>
            </Link>
            <Link
              to="/dashboard/configuracoes"
              className="flex items-center space-x-3 text-[#1D1D1F] hover:text-[#0071E3] transition-colors font-medium py-2"
              onClick={() => setShowMobileMenu(false)}
            >
              <Settings className="w-5 h-5" />
              <span>Configurações</span>
            </Link>
            <Link
              to="/dashboard/perfil"
              className="flex items-center space-x-3 text-[#1D1D1F] hover:text-[#0071E3] transition-colors font-medium py-2"
              onClick={() => setShowMobileMenu(false)}
            >
              <User className="w-5 h-5" />
              <span>Meu Perfil</span>
            </Link>
            {user?.plan === 'free' && (
              <Link
                to="/dashboard/plano"
                className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-full font-semibold"
                onClick={() => setShowMobileMenu(false)}
              >
                <Sparkles className="w-5 h-5" />
                <span>Fazer Upgrade</span>
              </Link>
            )}
            <button
              onClick={() => {
                handleSignOut();
                setShowMobileMenu(false);
              }}
              className="flex items-center space-x-3 text-red-600 hover:bg-red-50 transition-colors font-medium py-2 px-2 rounded-lg w-full"
            >
              <LogOut className="w-5 h-5" />
              <span>Sair</span>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
