import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Search, SlidersHorizontal, Grid3x3, List, Camera, Star, Eye, Download, Trash2, X } from 'lucide-react';
import NotaDetailsModal from '../components/modals/NotaDetailsModal';
import UploadNotaModal from '../components/modals/UploadNotaModal';

interface NotaFiscal {
  id: string;
  image_url: string;
  thumbnail_url: string | null;
  estabelecimento: string;
  valor_total: number;
  data_emissao: string;
  categoria: string;
  status: string;
  is_favorite: boolean;
  numero_nota: string | null;
}

export default function MinhasNotas() {
  const { user } = useAuth();
  const [notas, setNotas] = useState<NotaFiscal[]>([]);
  const [filteredNotas, setFilteredNotas] = useState<NotaFiscal[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedNota, setSelectedNota] = useState<NotaFiscal | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [filters, setFilters] = useState({
    periodo: 'ultimos30',
    categorias: [] as string[],
    valorMin: 0,
    valorMax: 10000,
  });

  useEffect(() => {
    loadNotas();
  }, [user]);

  useEffect(() => {
    applyFilters();
  }, [notas, searchTerm, sortBy, filters]);

  async function loadNotas() {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('notas_fiscais')
        .select('*')
        .eq('user_id', user.id)
        .order('data_emissao', { ascending: false });

      if (error) throw error;
      if (data) setNotas(data);
    } catch (error) {
      console.error('Error loading notas:', error);
    } finally {
      setLoading(false);
    }
  }

  function applyFilters() {
    let filtered = [...notas];

    if (searchTerm) {
      filtered = filtered.filter((nota) =>
        nota.estabelecimento.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.categorias.length > 0) {
      filtered = filtered.filter((nota) => filters.categorias.includes(nota.categoria));
    }

    filtered = filtered.filter(
      (nota) => nota.valor_total >= filters.valorMin && nota.valor_total <= filters.valorMax
    );

    const now = new Date();
    if (filters.periodo !== 'todos') {
      filtered = filtered.filter((nota) => {
        const dataEmissao = new Date(nota.data_emissao);
        const diffDays = Math.floor((now.getTime() - dataEmissao.getTime()) / (1000 * 60 * 60 * 24));

        switch (filters.periodo) {
          case 'hoje':
            return diffDays === 0;
          case 'ultimos7':
            return diffDays <= 7;
          case 'ultimos30':
            return diffDays <= 30;
          case 'ultimos90':
            return diffDays <= 90;
          default:
            return true;
        }
      });
    }

    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.data_emissao).getTime() - new Date(a.data_emissao).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.data_emissao).getTime() - new Date(b.data_emissao).getTime());
        break;
      case 'highest':
        filtered.sort((a, b) => b.valor_total - a.valor_total);
        break;
      case 'lowest':
        filtered.sort((a, b) => a.valor_total - b.valor_total);
        break;
    }

    setFilteredNotas(filtered);
  }

  const toggleCategory = (categoria: string) => {
    setFilters((prev) => ({
      ...prev,
      categorias: prev.categorias.includes(categoria)
        ? prev.categorias.filter((c) => c !== categoria)
        : [...prev.categorias, categoria],
    }));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
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

  const getCategoryColor = (categoria: string) => {
    const colors: Record<string, string> = {
      alimentacao: 'bg-orange-100 text-orange-700',
      transporte: 'bg-blue-100 text-blue-700',
      casa: 'bg-green-100 text-green-700',
      compras: 'bg-purple-100 text-purple-700',
      saude: 'bg-red-100 text-red-700',
      educacao: 'bg-yellow-100 text-yellow-700',
      lazer: 'bg-pink-100 text-pink-700',
      vestuario: 'bg-indigo-100 text-indigo-700',
      beleza: 'bg-rose-100 text-rose-700',
      pets: 'bg-amber-100 text-amber-700',
      tecnologia: 'bg-cyan-100 text-cyan-700',
      outros: 'bg-gray-100 text-gray-700',
    };
    return colors[categoria] || colors.outros;
  };

  const toggleFavorite = async (notaId: string, currentValue: boolean) => {
    try {
      await supabase
        .from('notas_fiscais')
        .update({ is_favorite: !currentValue })
        .eq('id', notaId);

      setNotas((prev) =>
        prev.map((nota) =>
          nota.id === notaId ? { ...nota, is_favorite: !currentValue } : nota
        )
      );
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const deleteNota = async (notaId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta nota?')) return;

    try {
      await supabase.from('notas_fiscais').delete().eq('id', notaId);
      setNotas((prev) => prev.filter((nota) => nota.id !== notaId));
    } catch (error) {
      console.error('Error deleting nota:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin w-12 h-12 border-4 border-[#0071E3] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-[#1D1D1F]">Filtros</h3>
                <button
                  className="lg:hidden text-gray-500"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Período</label>
                  <select
                    value={filters.periodo}
                    onChange={(e) => setFilters({ ...filters, periodo: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                  >
                    <option value="hoje">Hoje</option>
                    <option value="ultimos7">Últimos 7 dias</option>
                    <option value="ultimos30">Últimos 30 dias</option>
                    <option value="ultimos90">Últimos 3 meses</option>
                    <option value="todos">Todo período</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Categorias</label>
                  <div className="space-y-2">
                    {['alimentacao', 'transporte', 'casa', 'compras', 'saude', 'outros'].map((cat) => (
                      <label key={cat} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.categorias.includes(cat)}
                          onChange={() => toggleCategory(cat)}
                          className="w-4 h-4 text-[#0071E3] border-gray-300 rounded focus:ring-[#0071E3]"
                        />
                        <span className="text-sm text-gray-700">{getCategoryLabel(cat)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() =>
                      setFilters({
                        periodo: 'ultimos30',
                        categorias: [],
                        valorMin: 0,
                        valorMax: 10000,
                      })
                    }
                    className="w-full px-4 py-2 text-sm text-gray-600 hover:text-[#0071E3] transition-colors"
                  >
                    Limpar Filtros
                  </button>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-[#1D1D1F]">Minhas Notas Fiscais</h1>
                  <p className="text-sm text-gray-600 mt-1">
                    {filteredNotas.length} {filteredNotas.length === 1 ? 'nota armazenada' : 'notas armazenadas'}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center space-x-2"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Filtros</span>
                  </button>

                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-[#0071E3] text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Grid3x3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-[#0071E3] text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por estabelecimento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                  />
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                >
                  <option value="recent">Mais recentes</option>
                  <option value="oldest">Mais antigas</option>
                  <option value="highest">Maior valor</option>
                  <option value="lowest">Menor valor</option>
                </select>
              </div>
            </div>

            {filteredNotas.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-[#1D1D1F] mb-2">Nenhuma nota encontrada</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || filters.categorias.length > 0
                    ? 'Tente ajustar os filtros ou buscar por outro termo'
                    : 'Comece fotografando ou fazendo upload da sua primeira nota'}
                </p>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="px-8 py-4 bg-[#0071E3] text-white rounded-xl font-semibold hover:bg-[#0077ED] transition-all"
                >
                  Adicionar Primeira Nota
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotas.map((nota) => (
                  <div
                    key={nota.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <div className="relative h-48 bg-gray-100">
                      <img
                        src={nota.thumbnail_url || nota.image_url}
                        alt={nota.estabelecimento}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(nota.categoria)}`}>
                        {getCategoryLabel(nota.categoria)}
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-[#1D1D1F] text-lg truncate flex-1">
                          {nota.estabelecimento}
                        </h3>
                        <button
                          onClick={() => toggleFavorite(nota.id, nota.is_favorite)}
                          className="flex-shrink-0 ml-2"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              nota.is_favorite
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      </div>

                      <p className="text-sm text-gray-600 mb-3">{formatDate(nota.data_emissao)}</p>

                      <p className="text-2xl font-bold text-green-600 mb-4">
                        {formatCurrency(nota.valor_total)}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <button
                          onClick={() => setSelectedNota(nota)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Visualizar"
                        >
                          <Eye className="w-5 h-5 text-gray-600" />
                        </button>
                        <button
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Baixar"
                        >
                          <Download className="w-5 h-5 text-gray-600" />
                        </button>
                        <button
                          onClick={() => deleteNota(nota.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Estabelecimento</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Data</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Categoria</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Valor</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredNotas.map((nota) => (
                      <tr key={nota.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={nota.thumbnail_url || nota.image_url}
                              alt={nota.estabelecimento}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-semibold text-[#1D1D1F]">{nota.estabelecimento}</p>
                              {nota.is_favorite && (
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 inline" />
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(nota.data_emissao).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(nota.categoria)}`}>
                            {getCategoryLabel(nota.categoria)}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-green-600">
                          {formatCurrency(nota.valor_total)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setSelectedNota(nota)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Download className="w-4 h-4 text-gray-600" />
                            </button>
                            <button
                              onClick={() => deleteNota(nota.id)}
                              className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </main>
        </div>
      </div>

      <button
        onClick={() => setShowUploadModal(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-[#0071E3] to-[#00A3FF] text-white rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110 flex items-center justify-center group"
      >
        <Camera className="w-7 h-7 group-hover:rotate-12 transition-transform" />
      </button>

      {selectedNota && (
        <NotaDetailsModal
          nota={selectedNota}
          onClose={() => setSelectedNota(null)}
        />
      )}

      {showUploadModal && (
        <UploadNotaModal
          onClose={() => setShowUploadModal(false)}
          onSuccess={() => {
            setShowUploadModal(false);
            loadNotas();
          }}
        />
      )}
    </div>
  );
}
