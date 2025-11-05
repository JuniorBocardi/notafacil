import { X, Upload, Camera, FileText, Loader2, CheckCircle } from 'lucide-react';
import { useState, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function UploadNotaModal({ onClose, onSuccess }: Props) {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/') && selectedFile.type !== 'application/pdf') {
      setError('Por favor, selecione uma imagem ou PDF');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('O arquivo deve ter no máximo 10MB');
      return;
    }

    setFile(selectedFile);
    setError('');

    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview('pdf');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFileSelect(droppedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const simulateAIProcessing = async (): Promise<any> => {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return {
      estabelecimento: 'Supermercado Exemplo Ltda',
      cnpj: '12.345.678/0001-99',
      endereco: 'Rua Exemplo, 123 - São Paulo/SP',
      telefone: '(11) 1234-5678',
      valor_total: 247.5,
      data_emissao: new Date().toISOString().split('T')[0],
      hora_emissao: '14:23:00',
      numero_nota: 'NF-e 123456789',
      categoria: 'alimentacao',
      items: [
        { quantidade: 2, descricao: 'Arroz Tipo 1 5kg', valor_unitario: 24.9, valor_total: 49.8 },
        { quantidade: 1, descricao: 'Feijão Preto 1kg', valor_unitario: 8.5, valor_total: 8.5 },
        { quantidade: 3, descricao: 'Leite Integral 1L', valor_unitario: 4.99, valor_total: 14.97 },
      ],
      insight: 'Você gastou 23% a mais com alimentação neste mês comparado ao mês anterior.',
    };
  };

  const handleUpload = async () => {
    if (!file || !user) return;

    setProcessing(true);
    setError('');

    try {
      const fileName = `${user.id}/${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('notas')
        .upload(fileName, file);

      if (uploadError) {
        throw new Error('Erro ao fazer upload do arquivo');
      }

      const { data: urlData } = supabase.storage.from('notas').getPublicUrl(fileName);

      const aiResult = await simulateAIProcessing();

      const { data: notaData, error: notaError } = await supabase
        .from('notas_fiscais')
        .insert({
          user_id: user.id,
          image_url: urlData.publicUrl,
          thumbnail_url: urlData.publicUrl,
          estabelecimento: aiResult.estabelecimento,
          cnpj: aiResult.cnpj,
          endereco: aiResult.endereco,
          telefone: aiResult.telefone,
          valor_total: aiResult.valor_total,
          data_emissao: aiResult.data_emissao,
          hora_emissao: aiResult.hora_emissao,
          numero_nota: aiResult.numero_nota,
          categoria: aiResult.categoria,
          status: 'processada',
        })
        .select()
        .single();

      if (notaError || !notaData) {
        throw new Error('Erro ao salvar nota fiscal');
      }

      if (aiResult.items && aiResult.items.length > 0) {
        const itemsToInsert = aiResult.items.map((item: any) => ({
          nota_fiscal_id: notaData.id,
          quantidade: item.quantidade,
          descricao: item.descricao,
          valor_unitario: item.valor_unitario,
          valor_total: item.valor_total,
        }));

        await supabase.from('itens_nota').insert(itemsToInsert);
      }

      if (aiResult.insight) {
        await supabase.from('insights_ia').insert({
          nota_fiscal_id: notaData.id,
          user_id: user.id,
          tipo_insight: 'alerta',
          mensagem: aiResult.insight,
        });
      }

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Erro ao processar nota fiscal');
      setProcessing(false);
    }
  };

  const getNotasRemaining = () => {
    if (user?.plan === 'premium') return null;
    return 7;
  };

  const notasRemaining = getNotasRemaining();

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-br from-[#0071E3] to-[#00A3FF] px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Adicionar Nova Nota Fiscal</h2>
              <p className="text-white/90 text-sm">Fotografe ou faça upload do arquivo</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {notasRemaining !== null && (
            <div className="mt-4 bg-white/20 backdrop-blur rounded-xl px-4 py-2 flex items-center justify-between">
              <span className="text-white/90 text-sm">Você tem {notasRemaining} análises restantes este mês</span>
              <a href="/dashboard/plano" className="text-white font-semibold text-sm hover:underline">
                Upgrade
              </a>
            </div>
          )}
        </div>

        <div className="p-8">
          {success ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#1D1D1F] mb-2">Nota fiscal analisada com sucesso!</h3>
              <p className="text-gray-600">Redirecionando...</p>
            </div>
          ) : processing ? (
            <div className="text-center py-12">
              <Loader2 className="w-16 h-16 text-[#0071E3] mx-auto mb-6 animate-spin" />
              <h3 className="text-2xl font-bold text-[#1D1D1F] mb-2">Analisando sua nota fiscal...</h3>
              <p className="text-gray-600">Nossa IA está extraindo todos os dados. Aguarde alguns segundos.</p>
              <div className="w-full max-w-md mx-auto mt-6">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#0071E3] to-[#00A3FF] rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          ) : !preview ? (
            <>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-3 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-[#0071E3] hover:bg-blue-50/30 transition-all cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#0071E3] to-[#00A3FF] flex items-center justify-center">
                  <FileText className="w-10 h-10 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-[#1D1D1F] mb-4">Arraste sua nota fiscal aqui</h3>
                <p className="text-gray-600 mb-8">ou escolha uma das opções abaixo</p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="px-8 py-4 bg-[#0071E3] text-white rounded-full font-semibold hover:bg-[#0077ED] transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <Camera className="w-5 h-5" />
                    <span>Tirar Foto</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="px-8 py-4 bg-white text-[#0071E3] border-2 border-[#0071E3] rounded-full font-semibold hover:bg-[#0071E3] hover:text-white transition-all shadow-lg flex items-center justify-center space-x-2"
                  >
                    <Upload className="w-5 h-5" />
                    <span>Upload de Arquivo</span>
                  </button>
                </div>

                <p className="text-sm text-gray-500 mt-6">Aceita JPG, PNG e PDF até 10MB</p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) handleFileSelect(selectedFile);
                }}
                className="hidden"
              />
            </>
          ) : (
            <div className="text-center">
              <div className="mb-6 rounded-2xl overflow-hidden max-w-md mx-auto shadow-lg">
                {preview === 'pdf' ? (
                  <div className="bg-gray-100 p-12">
                    <FileText className="w-20 h-20 text-gray-400 mx-auto" />
                    <p className="text-gray-600 mt-4">PDF carregado</p>
                  </div>
                ) : (
                  <img src={preview} alt="Preview" className="w-full h-auto" />
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleUpload}
                  className="px-8 py-4 bg-[#0071E3] text-white rounded-xl font-semibold hover:bg-[#0077ED] transition-all shadow-lg hover:shadow-xl"
                >
                  Analisar Nota Fiscal
                </button>
                <button
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="px-8 py-4 bg-white text-gray-600 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                >
                  Escolher Outro Arquivo
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
