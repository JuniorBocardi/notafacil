import { Bell, Moon, Globe } from 'lucide-react';
import { useState } from 'react';

export default function Configuracoes() {
  const [notifications, setNotifications] = useState({
    alertasGastos: true,
    resumoMensal: true,
    novidades: false,
  });

  const [theme, setTheme] = useState('light');
  const [language] = useState('pt-BR');

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#1D1D1F] mb-8">Configurações</h1>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-xl font-bold text-[#1D1D1F] mb-6 flex items-center space-x-2">
              <Bell className="w-5 h-5 text-[#0071E3]" />
              <span>Notificações</span>
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <h3 className="font-semibold text-gray-900">Alertas de gastos</h3>
                  <p className="text-sm text-gray-600">Receba alertas quando gastar acima da média</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.alertasGastos}
                    onChange={(e) =>
                      setNotifications({ ...notifications, alertasGastos: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0071E3]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <h3 className="font-semibold text-gray-900">Resumo mensal</h3>
                  <p className="text-sm text-gray-600">Receba um resumo dos seus gastos todo mês</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.resumoMensal}
                    onChange={(e) =>
                      setNotifications({ ...notifications, resumoMensal: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0071E3]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-semibold text-gray-900">Novidades e dicas</h3>
                  <p className="text-sm text-gray-600">Receba dicas e novidades sobre o NotaFácil</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.novidades}
                    onChange={(e) =>
                      setNotifications({ ...notifications, novidades: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0071E3]"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-xl font-bold text-[#1D1D1F] mb-6 flex items-center space-x-2">
              <Moon className="w-5 h-5 text-[#0071E3]" />
              <span>Aparência</span>
            </h2>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Tema</label>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setTheme('light')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    theme === 'light'
                      ? 'border-[#0071E3] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white rounded-lg shadow mx-auto mb-2"></div>
                    <span className="text-sm font-medium text-gray-700">Claro</span>
                  </div>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    theme === 'dark'
                      ? 'border-[#0071E3] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-800 rounded-lg shadow mx-auto mb-2"></div>
                    <span className="text-sm font-medium text-gray-700">Escuro</span>
                  </div>
                </button>
                <button
                  onClick={() => setTheme('auto')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    theme === 'auto'
                      ? 'border-[#0071E3] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-white to-gray-800 rounded-lg shadow mx-auto mb-2"></div>
                    <span className="text-sm font-medium text-gray-700">Automático</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-xl font-bold text-[#1D1D1F] mb-6 flex items-center space-x-2">
              <Globe className="w-5 h-5 text-[#0071E3]" />
              <span>Idioma e Região</span>
            </h2>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Idioma</label>
              <select
                value={language}
                disabled
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
              >
                <option value="pt-BR">Português (Brasil)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
