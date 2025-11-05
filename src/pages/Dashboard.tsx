import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { TrendingUp, TrendingDown, FileText, DollarSign, Calendar } from 'lucide-react';

interface Stats {
  totalNotas: number;
  totalGasto: number;
  mesAtual: number;
  variacao: number;
}

interface CategoryData {
  categoria: string;
  total: number;
  count: number;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalNotas: 0,
    totalGasto: 0,
    mesAtual: 0,
    variacao: 0,
  });
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  async function loadDashboardData() {
    if (!user) return;

    try {
      const { data: notas } = await supabase
        .from('notas_fiscais')
        .select('valor_total, categoria, data_emissao')
        .eq('user_id', user.id)
        .eq('status', 'processada');

      if (notas) {
        const totalGasto = notas.reduce((sum, nota) => sum + Number(nota.valor_total), 0);

        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const notasMesAtual = notas.filter((nota) => {
          const dataEmissao = new Date(nota.data_emissao);
          return dataEmissao.getMonth() === currentMonth && dataEmissao.getFullYear() === currentYear;
        });

        const mesAtual = notasMesAtual.reduce((sum, nota) => sum + Number(nota.valor_total), 0);

        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

        const notasMesAnterior = notas.filter((nota) => {
          const dataEmissao = new Date(nota.data_emissao);
          return dataEmissao.getMonth() === lastMonth && dataEmissao.getFullYear() === lastMonthYear;
        });

        const mesAnterior = notasMesAnterior.reduce((sum, nota) => sum + Number(nota.valor_total), 0);
        const variacao = mesAnterior > 0 ? ((mesAtual - mesAnterior) / mesAnterior) * 100 : 0;

        const categoryMap = new Map<string, { total: number; count: number }>();
        notasMesAtual.forEach((nota) => {
          const existing = categoryMap.get(nota.categoria) || { total: 0, count: 0 };
          categoryMap.set(nota.categoria, {
            total: existing.total + Number(nota.valor_total),
            count: existing.count + 1,
          });
        });

        const categoriesData = Array.from(categoryMap.entries())
          .map(([categoria, data]) => ({ categoria, ...data }))
          .sort((a, b) => b.total - a.total)
          .slice(0, 5);

        setStats({
          totalNotas: notas.length,
          totalGasto,
          mesAtual,
          variacao,
        });
        setCategories(categoriesData);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const getCategoryLabel = (categoria: string) => {
    const labels: Record<string, string> = {
      alimentacao: 'Alimentação',
      transporte: 'Transporte',
      casa: 'Casa',
      compras: 'Compras',
      saude: 'Saúde',
      educacao: 'Educação',
      lazer: 'Lazer',
      vestuario: 'Vestuário',
      beleza: 'Beleza',
      pets: 'Pets',
      tecnologia: 'Tecnologia',
      outros: 'Outros',
    };
    return labels[categoria] || categoria;
  };

  const getCategoryColor = (index: number) => {
    const colors = [
      'from-[#0071E3] to-[#00A3FF]',
      'from-orange-400 to-orange-500',
      'from-green-400 to-green-500',
      'from-purple-400 to-purple-500',
      'from-pink-400 to-pink-500',
    ];
    return colors[index] || colors[0];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-[#0071E3] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1D1D1F] mb-2">
            Bem-vindo, {user?.name?.split(' ')[0]}
          </h1>
          <p className="text-gray-600">Aqui está um resumo das suas finanças</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#0071E3]" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Total de Notas</p>
            <p className="text-3xl font-bold text-[#1D1D1F]">{stats.totalNotas}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Gasto Total</p>
            <p className="text-3xl font-bold text-[#1D1D1F]">{formatCurrency(stats.totalGasto)}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Mês Atual</p>
            <p className="text-3xl font-bold text-[#1D1D1F]">{formatCurrency(stats.mesAtual)}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stats.variacao >= 0 ? 'bg-red-100' : 'bg-green-100'} flex items-center justify-center`}>
                {stats.variacao >= 0 ? (
                  <TrendingUp className="w-6 h-6 text-red-600" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-green-600" />
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Variação</p>
            <p className={`text-3xl font-bold ${stats.variacao >= 0 ? 'text-red-600' : 'text-green-600'}`}>
              {stats.variacao >= 0 ? '+' : ''}{stats.variacao.toFixed(1)}%
            </p>
          </div>
        </div>

        {categories.length > 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#1D1D1F] mb-6">Gastos por Categoria (Mês Atual)</h2>
            <div className="space-y-4">
              {categories.map((category, index) => {
                const percentage = stats.mesAtual > 0 ? (category.total / stats.mesAtual) * 100 : 0;
                return (
                  <div key={category.categoria}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">{getCategoryLabel(category.categoria)}</span>
                      <span className="text-sm font-semibold text-[#1D1D1F]">{formatCurrency(category.total)}</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${getCategoryColor(index)} transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {stats.totalNotas === 0 && (
          <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
            <FileText className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#1D1D1F] mb-2">Nenhuma nota fiscal ainda</h3>
            <p className="text-gray-600 mb-6">Comece fotografando ou fazendo upload da sua primeira nota</p>
            <a
              href="/dashboard/notas"
              className="inline-block px-8 py-4 bg-[#0071E3] text-white rounded-xl font-semibold hover:bg-[#0077ED] transition-all"
            >
              Adicionar Primeira Nota
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
