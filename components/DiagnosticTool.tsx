import React, { useState } from 'react';
import { getAccountingDiagnostic } from '../services/geminiService.ts';
import { DiagnosticResponse } from '../types.ts';

const DiagnosticTool: React.FC = () => {
  const [painPoints, setPainPoints] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosticResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Lead Form States
  const [formData, setFormData] = useState({ nome: '', telefone: '', email: '', cnpj: '' });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [cnpjError, setCnpjError] = useState(false);

  const validateCNPJ = (cnpj: string) => {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj === '' || cnpj.length !== 14) return false;
    if (/^(\d)\1+$/.test(cnpj)) return false;
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(1))) return false;
    return true;
  };

  const handleDiagnostic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!painPoints.trim()) return;
    
    setLoading(true);
    setErrorMsg(null);
    try {
      const data = await getAccountingDiagnostic(painPoints);
      setResult(data);
    } catch (error: any) {
      console.error("Diagnostic error detail:", error);
      if (error.message?.includes("Chave de API")) {
        setErrorMsg("Configuração incompleta: A API_KEY não foi detectada no ambiente de hospedagem.");
      } else {
        setErrorMsg("O motor de IA Prime está temporariamente indisponível. Por favor, tente novamente em instantes.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCNPJ(formData.cnpj)) {
      setCnpjError(true);
      return;
    }
    setFormSubmitting(true);
    try {
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbyqmIhyGoKzd1QNOi3AOGVVsnzYkyLTa5wOxiAmLP_bwTdy4zS78eWXXCCtXsYTuk_9-w/exec';
      const payload = {
        nome: formData.nome,
        telefone: formData.telefone,
        email: formData.email,
        cnpj: formData.cnpj.replace(/[^\d]+/g, ''),
        data_contato: new Date().toLocaleString('pt-BR'),
        input_usuario: painPoints,
        feedback_ia: result?.analysis || 'Diagnóstico Prime não disponível'
      };
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setFormSent(true);
    } catch (error) {
      console.error("Erro ao enviar lead:", error);
      alert("Houve um problema ao processar seu envio. Por favor, utilize o WhatsApp.");
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <section id="diagnostic" className="py-24 bg-black text-white relative overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,_#C5A376_0%,_transparent_70%)] opacity-30"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight">Diagnóstico <span className="text-gold">Prime</span></h2>
            <p className="text-white/40 text-lg font-light italic">Descubra em segundos o nível de eficiência da sua contabilidade atual.</p>
          </div>

          {!result ? (
            <div className="bg-[#0A0A0A] p-10 md:p-14 rounded-sm border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <form onSubmit={handleDiagnostic}>
                <label className="block text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-4">Relate as dificuldades com seu contador atual</label>
                <textarea 
                  value={painPoints}
                  onChange={(e) => setPainPoints(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-sm p-6 text-white focus:ring-1 focus:ring-gold focus:border-transparent outline-none transition-all mb-6 h-40 font-light placeholder:text-white/10"
                  placeholder="Ex: Demora no envio de guias, falta de visão financeira, erros recorrentes..."
                ></textarea>
                
                {errorMsg && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-sm text-red-500 text-xs font-bold uppercase tracking-widest text-center">
                    <i className="fas fa-exclamation-triangle mr-2"></i> {errorMsg}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={loading || !painPoints}
                  className="w-full py-5 bg-gold text-black rounded-sm font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center space-x-3 disabled:opacity-50 transition-all shadow-lg hover:brightness-110"
                >
                  {loading ? (
                    <>
                      <i className="fas fa-circle-notch fa-spin"></i>
                      <span>Processando Diagnóstico...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-microchip"></i>
                      <span>Gerar Análise Estratégica</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-[#0A0A0A] text-white p-10 md:p-16 rounded-sm border border-gold/30 shadow-2xl animate-fade-in relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gold"></div>
              
              <div className="mb-12">
                <div className="text-center md:text-left mb-8">
                  <h3 className="text-3xl font-black mb-2 uppercase tracking-tighter">
                    {result.isAccountingRelated ? 'Relatório de Impacto' : 'Comunicado Institucional'}
                  </h3>
                  <p className="text-white/40 font-light">Parecer oficial da consultoria Prime.</p>
                </div>
                
                <div className="text-white/80 leading-relaxed font-light text-lg p-8 bg-white/5 border-l-2 border-gold italic rounded-r-sm">
                  "{result.analysis}"
                </div>
              </div>

              {result.isAccountingRelated ? (
                <div className="grid md:grid-cols-2 gap-12 mb-12">
                  <div className="space-y-6">
                    <h4 className="font-bold text-sm uppercase tracking-[0.3em] flex items-center space-x-3 text-gold">
                      <i className="fas fa-bolt"></i>
                      <span>Plano de Ação Prime</span>
                    </h4>
                    <ul className="space-y-4">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start space-x-4 text-white/60 text-sm font-light">
                          <i className="fas fa-check text-gold mt-1"></i>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white/5 p-8 rounded-sm border border-white/10">
                    <h4 className="font-bold text-xl mb-4 uppercase tracking-tight text-center text-gold">Agendar Consultoria</h4>
                    {!formSent ? (
                      <form onSubmit={handleLeadSubmit} className="space-y-4">
                        <input 
                          type="text" required placeholder="NOME COMPLETO" 
                          value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})}
                          className="w-full bg-black border border-white/10 rounded-sm p-3 text-xs text-white focus:border-gold outline-none" 
                        />
                        <input 
                          type="email" required placeholder="E-MAIL CORPORATIVO" 
                          value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-black border border-white/10 rounded-sm p-3 text-xs text-white focus:border-gold outline-none" 
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input 
                            type="text" required placeholder="WHATSAPP" 
                            value={formData.telefone} onChange={e => setFormData({...formData, telefone: e.target.value})}
                            className="w-full bg-black border border-white/10 rounded-sm p-3 text-xs text-white focus:border-gold outline-none" 
                          />
                          <div className="relative">
                            <input 
                              type="text" required placeholder="CNPJ" 
                              value={formData.cnpj} 
                              onChange={e => {
                                setFormData({...formData, cnpj: e.target.value});
                                setCnpjError(false);
                              }}
                              className={`w-full bg-black border ${cnpjError ? 'border-red-500' : 'border-white/10'} rounded-sm p-3 text-xs text-white focus:border-gold outline-none transition-colors`} 
                            />
                            {cnpjError && (
                              <span className="absolute -bottom-5 left-0 text-[9px] text-red-500 font-bold uppercase tracking-widest">CNPJ Inválido</span>
                            )}
                          </div>
                        </div>
                        <button 
                          type="submit" 
                          disabled={formSubmitting}
                          className="w-full mt-4 py-4 bg-gold text-black rounded-sm font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
                        >
                          {formSubmitting ? 'ENVIANDO DADOS...' : 'SOLICITAR CALL VIP'}
                        </button>
                      </form>
                    ) : (
                      <div className="text-center py-8">
                        <i className="fas fa-check-circle text-gold text-4xl mb-4"></i>
                        <p className="text-sm font-bold uppercase tracking-widest text-gold">DADOS REGISTRADOS!</p>
                        <p className="text-xs text-white/40 mt-2 italic leading-relaxed">Sua solicitação foi processada com sucesso. Um consultor especializado entrará em contato em breve.</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="mb-12 flex flex-col items-center">
                  <div className="w-full max-w-lg p-10 bg-white/5 border border-white/10 rounded-sm text-center">
                    <i className="fas fa-info-circle text-gold text-3xl mb-6"></i>
                    <p className="text-white/60 font-light text-sm mb-10 leading-relaxed">
                      Para obter mais informações sobre gestão de negócios, finanças e tendências empresariais, convidamos você a explorar nosso portal de conhecimento.
                    </p>
                    <a 
                      href="https://www.meucontadorprime.blog" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block px-8 py-4 bg-gold text-black rounded-sm font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all"
                    >
                      Conheça o Blog do Meu Contador Prime
                    </a>
                  </div>
                </div>
              )}
              
              <button 
                onClick={() => {
                  setResult(null);
                  setErrorMsg(null);
                }}
                className="text-white/20 hover:text-gold text-xs font-bold uppercase tracking-widest transition-colors flex items-center space-x-2"
              >
                <i className="fas fa-arrow-left"></i>
                <span>Novo Diagnóstico</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DiagnosticTool;