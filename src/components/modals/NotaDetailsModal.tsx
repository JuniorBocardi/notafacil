import { X, Download, Edit, Trash2, Lightbulb } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface NotaFiscal {
  id: string;
  image_url: string;
  estabelecimento: string;
  cnpj: string | null;
  endereco: string | null;
  telefone: string | null;
  valor_total: number;
  data_emissao: string;
  hora_emissao: string | null;
  numero_nota: string | null;
  categoria: string;
}

interface Item {
  id: string;
  quantidade: number;
  descricao: string;
  valor_unitario: number;
  valor_total: number;
}

interface Insight {
  id: string;
  tipo_insight: string;
  mensagem: string;
}

interface Props {
  nota: NotaFiscal;
  onClose: () => void;
}

export default function NotaDetailsModal({ nota, onClose }: Props) {
  const [items, setItems] = useState<Item[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDetails();
  }, [nota.id]);

  async function loadDetails() {
    try {
      const [itemsData, insightsData] = await Promise.all([
        supabase.from('itens_nota').select('*').eq('nota_fiscal_id', nota.id),
        supabase.from('insights_ia').select('*').eq('nota_fiscal_id', nota.id),
      ]);

      if (itemsData.data) setItems(itemsData.data);
      if (insightsData.data) setInsights(insightsData.data);
    } catch (error) {
      console.error('Error loading details:', error);
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

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl my-8">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-[#1D1D1F]">{nota.estabelecimento}</h2>
            <div className="flex items-center space-x-3 mt-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                {getCategoryLabel(nota.categoria)}
              </span>
              <span className="text-sm text-gray-600">{formatDate(nota.data_emissao)}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div>
              <div className="rounded-2xl overflow-hidden shadow-lg mb-6 group cursor-pointer">
                <img
                  src={nota.image_url}
                  alt="Nota fiscal"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                <p className="text-sm text-gray-600 mb-2">Valor Total</p>
                <p className="text-4xl font-bold text-[#0071E3] mb-4">{formatCurrency(nota.valor_total)}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Data</p>
                    <p className="font-semibold text-gray-900">{formatDate(nota.data_emissao)}</p>
                  </div>
                  {nota.hora_emissao && (
                    <div>
                      <p className="text-gray-600">Horário</p>
                      <p className="font-semibold text-gray-900">{nota.hora_emissao}</p>
                    </div>
                  )}
                  {nota.numero_nota && (
                    <div className="col-span-2">
                      <p className="text-gray-600">Número da Nota</p>
                      <p className="font-semibold text-gray-900">{nota.numero_nota}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="font-bold text-[#1D1D1F] mb-4">Estabelecimento</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-gray-600">Nome</p>
                    <p className="font-semibold text-gray-900">{nota.estabelecimento}</p>
                  </div>
                  {nota.cnpj && (
                    <div>
                      <p className="text-gray-600">CNPJ</p>
                      <p className="font-semibold text-gray-900">{nota.cnpj}</p>
                    </div>
                  )}
                  {nota.endereco && (
                    <div>
                      <p className="text-gray-600">Endereço</p>
                      <p className="font-semibold text-gray-900">{nota.endereco}</p>
                    </div>
                  )}
                  {nota.telefone && (
                    <div>
                      <p className="text-gray-600">Telefone</p>
                      <p className="font-semibold text-gray-900">{nota.telefone}</p>
                    </div>
                  )}
                </div>
              </div>

              {insights.length > 0 && (
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border-l-4 border-amber-400">
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-amber-900 mb-2">Insight da IA</h3>
                      {insights.map((insight) => (
                        <p key={insight.id} className="text-sm text-amber-800 leading-relaxed">
                          {insight.mensagem}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {items.length > 0 && (
            <div className="px-8 pb-8">
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="font-bold text-[#1D1D1F] mb-4">Itens Comprados</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Qtd</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Item</th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-700">Valor Unit.</th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-700">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {items.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-900">{item.quantidade}x</td>
                          <td className="px-4 py-3 text-gray-900">{item.descricao}</td>
                          <td className="px-4 py-3 text-right text-gray-600">
                            {formatCurrency(item.valor_unitario)}
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-gray-900">
                            {formatCurrency(item.valor_total)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={3} className="px-4 py-3 text-right font-bold text-gray-900">
                          Total:
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-[#0071E3]">
                          {formatCurrency(nota.valor_total)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Total de itens: {items.length}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-6 flex flex-wrap gap-3">
          <button className="px-6 py-3 bg-white text-[#0071E3] border-2 border-[#0071E3] rounded-xl font-semibold hover:bg-[#0071E3] hover:text-white transition-all flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Baixar PDF</span>
          </button>
          <button className="px-6 py-3 bg-white text-green-600 border-2 border-green-600 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition-all flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Baixar Excel</span>
          </button>
          <button className="px-6 py-3 bg-white text-gray-600 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-100 transition-all flex items-center space-x-2">
            <Edit className="w-4 h-4" />
            <span>Editar Categoria</span>
          </button>
          <button className="ml-auto px-6 py-3 bg-white text-red-600 border-2 border-red-600 rounded-xl font-semibold hover:bg-red-600 hover:text-white transition-all flex items-center space-x-2">
            <Trash2 className="w-4 h-4" />
            <span>Excluir Nota</span>
          </button>
        </div>
      </div>
    </div>
  );
}
