import { Camera, Upload as UploadIcon, FileText, Loader2 } from 'lucide-react';
import { useState, useRef } from 'react';

export default function Upload() {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/') || file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
        simulateProcessing();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateProcessing = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert('Nota fiscal analisada com sucesso! Em um app real, você veria o dashboard com os resultados.');
    }, 3000);
  };

  return (
    <section id="upload" className="py-24 bg-gradient-to-br from-[#0071E3] to-[#00A3FF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Comece a Organizar Suas Finanças Hoje
          </h2>
          <p className="text-xl text-white/90">
            Junte-se a milhares de brasileiros que já recuperaram o controle do orçamento
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          {!preview ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                isDragging
                  ? 'border-[#0071E3] bg-blue-50'
                  : 'border-gray-300 hover:border-[#0071E3] hover:bg-gray-50'
              }`}
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#0071E3] to-[#00A3FF] flex items-center justify-center">
                <FileText className="w-10 h-10 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-[#1D1D1F] mb-4">
                Arraste sua nota fiscal aqui
              </h3>
              <p className="text-gray-600 mb-8">
                ou escolha uma das opções abaixo
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-8 py-4 bg-[#0071E3] text-white rounded-full font-semibold hover:bg-[#0077ED] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Camera className="w-5 h-5" />
                  <span>Tirar Foto</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-8 py-4 bg-white text-[#0071E3] border-2 border-[#0071E3] rounded-full font-semibold hover:bg-[#0071E3] hover:text-white transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
                >
                  <UploadIcon className="w-5 h-5" />
                  <span>Upload de Arquivo</span>
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileSelect}
                className="hidden"
              />

              <p className="text-sm text-gray-500 mt-6">
                Aceita JPG, PNG e PDF até 10MB
              </p>
            </div>
          ) : (
            <div className="text-center">
              {isProcessing ? (
                <div className="py-12">
                  <Loader2 className="w-16 h-16 text-[#0071E3] mx-auto mb-6 animate-spin" />
                  <h3 className="text-2xl font-bold text-[#1D1D1F] mb-2">
                    Analisando sua nota fiscal...
                  </h3>
                  <p className="text-gray-600">
                    Nossa IA está extraindo todos os dados. Isso leva apenas alguns segundos.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="mb-6 rounded-2xl overflow-hidden max-w-md mx-auto shadow-lg">
                    {preview.startsWith('data:image') ? (
                      <img src={preview} alt="Preview" className="w-full h-auto" />
                    ) : (
                      <div className="bg-gray-100 p-12">
                        <FileText className="w-20 h-20 text-gray-400 mx-auto" />
                        <p className="text-gray-600 mt-4">PDF carregado</p>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setPreview(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="text-[#0071E3] hover:text-[#0077ED] font-semibold"
                  >
                    Analisar outra nota
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-center space-x-8 mt-8 text-white/90 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <span>Sem cartão de crédito</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <span>10 análises grátis</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <span>Cancele quando quiser</span>
          </div>
        </div>
      </div>
    </section>
  );
}
