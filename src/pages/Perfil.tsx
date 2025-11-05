import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Camera, Save, Loader2, Shield, Trash2, Check } from 'lucide-react';

export default function Perfil() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || '');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);

    const { error: updateError } = await updateProfile({ name });

    if (updateError) {
      setError(updateError);
    } else {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }

    setSaving(false);
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
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#1D1D1F] mb-8">Meu Perfil</h1>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-xl font-bold text-[#1D1D1F] mb-6 flex items-center space-x-2">
              <User className="w-5 h-5 text-[#0071E3]" />
              <span>Informações Pessoais</span>
            </h2>

            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0071E3] to-[#00A3FF] flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {user?.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt={user.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    getInitials(user?.name || '')
                  )}
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border-2 border-gray-100">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-3">Clique para alterar foto</p>
            </div>

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-600" />
                <p className="text-green-600 text-sm">Perfil atualizado com sucesso!</p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">O email não pode ser alterado</p>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full sm:w-auto px-8 py-3 bg-[#0071E3] text-white rounded-xl font-semibold hover:bg-[#0077ED] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Salvando...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Salvar Alterações</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-xl font-bold text-[#1D1D1F] mb-6 flex items-center space-x-2">
              <Shield className="w-5 h-5 text-[#0071E3]" />
              <span>Segurança</span>
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Alterar Senha</h3>
                <p className="text-sm text-gray-600 mb-4">Mantenha sua conta segura com uma senha forte</p>
                <button className="px-6 py-2 bg-white text-[#0071E3] border-2 border-[#0071E3] rounded-lg font-semibold hover:bg-[#0071E3] hover:text-white transition-all text-sm">
                  Alterar Senha
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-xl font-bold text-[#1D1D1F] mb-6">Plano Atual</h2>

            <div className={`p-6 rounded-2xl border-2 ${
              user?.plan === 'premium'
                ? 'bg-gradient-to-br from-[#0071E3]/10 to-[#00A3FF]/10 border-[#0071E3]'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#1D1D1F]">
                    {user?.plan === 'premium' ? 'Premium' : 'Gratuito'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {user?.plan === 'premium'
                      ? 'Análises ilimitadas e recursos avançados'
                      : '10 análises por mês'}
                  </p>
                </div>
                {user?.plan === 'premium' && (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0071E3] to-[#00A3FF] flex items-center justify-center">
                    <span className="text-white text-2xl">⭐</span>
                  </div>
                )}
              </div>

              {user?.plan === 'free' && (
                <>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Uso este mês</span>
                      <span className="font-semibold text-gray-900">3 de 10</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#0071E3] to-[#00A3FF] transition-all"
                        style={{ width: '30%' }}
                      ></div>
                    </div>
                  </div>

                  <a
                    href="/dashboard/plano"
                    className="block w-full px-6 py-3 bg-gradient-to-r from-[#0071E3] to-[#00A3FF] text-white text-center rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Fazer Upgrade para Premium
                  </a>
                </>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-red-200">
            <h2 className="text-xl font-bold text-red-600 mb-6 flex items-center space-x-2">
              <Trash2 className="w-5 h-5" />
              <span>Zona de Perigo</span>
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Excluir Conta</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Uma vez excluída, sua conta não pode ser recuperada. Todos os seus dados serão permanentemente removidos.
                </p>
                <button className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all text-sm">
                  Excluir Minha Conta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
