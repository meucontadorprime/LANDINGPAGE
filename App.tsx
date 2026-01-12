import React from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import DiagnosticTool from './components/DiagnosticTool.tsx';
import HowItWorks from './components/HowItWorks.tsx';
import Footer from './components/Footer.tsx';

const Benefits: React.FC = () => {
  const items = [
    { icon: 'fa-user-tie', title: 'Contador concierge', text: 'Seu contador concierge lidera uma equipe de experts, que cuida de sua contabilidade como se trabalhasse em sua empresa, com contatos frequentes.' },
    { icon: 'fa-chess', title: 'Consultoria estratégica', text: 'Analisamos a fundo o modelo de negócios de cada parceiro e estruturamos uma solução contábil personalizada. Suas tomadas de decisão mais assertivas.' },
    { icon: 'fa-calculator', title: 'Planejamento Tributário', text: 'Elaboramos um diagnóstico fiscal, trabalhista, contábil e tributário. Indicamos o melhor momento para migrar de regime e economizar em impostos.' },
    { icon: 'fa-file-shield', title: 'Solução de Pendências Fiscais', text: 'Identificamos e mapeamos as soluções para reduzir o valor de multas e viabilizar o parcelamento de valores, evitando punições elevadas.' },
    { icon: 'fa-gavel', title: 'Monitoramento da Legislação', text: 'Acompanhamos em tempo real as mudanças que impactam nossos clientes, buscando redução de carga tributária em total conformidade.' },
    { icon: 'fa-network-wired', title: 'Sistema integrado', text: 'Usamos tecnologia para uma maior integração operacional e redução de riscos, garantindo segurança e agilidade para nossos clientes.' }
  ];

  return (
    <section id="benefits" className="py-24 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tight uppercase">Vantagens do formato <span className="text-gold">Full Service</span></h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-8"></div>
          <p className="text-white/50 max-w-3xl mx-auto text-lg font-light italic">
            Desde a abertura ou reposicionamento tributário, até a estratégia de expansão do negócio. No Full Service, vamos além da rotina de contabilidade e oferecemos serviços para quem busca eficiência e lucratividade.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div key={i} className="bg-zinc-900/40 p-10 rounded-sm border border-white/5 hover:border-gold/50 transition-all duration-500 group">
              <div className="w-16 h-16 border border-white/10 text-gold rounded-sm flex items-center justify-center mb-8 group-hover:bg-gold group-hover:text-black transition-all">
                <i className={`fas ${item.icon} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white uppercase tracking-widest">{item.title}</h3>
              <p className="text-white/40 leading-relaxed text-sm font-light">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    { q: "Quais os custos da migração?", a: "Nenhum. No Meu Contador Prime, a migração é um processo 'turn-key' totalmente bonificado para novos parceiros." },
    { q: "Como fica o contador antigo?", a: "O cliente precisa sinalizar formalmente ao contador atual sobre a migração. Após esse aviso, nossa equipe de onboarding assume o contato técnico para a transferência de documentos." },
    { q: "A transição interrompe minha operação?", a: "Absolutamente não. A mudança ocorre nos bastidores, sem afetar seu faturamento ou emissão de notas." },
    { q: "Minha empresa é de outro estado?", a: "Atendemos digitalmente todo o território nacional com o mesmo padrão de excelência de São Paulo." }
  ];

  return (
    <section id="faq" className="py-24 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-black text-white uppercase tracking-widest mb-4">Esclarecimentos</h2>
             <p className="text-white/40">Transparência absoluta desde o primeiro contato.</p>
          </div>
          <div className="grid gap-6">
            {faqs.map((f, i) => (
              <div key={i} className="p-8 bg-zinc-900/50 rounded-sm border border-white/5 hover:bg-zinc-900 transition-all">
                <h4 className="font-bold text-lg mb-3 flex items-center space-x-4 text-white uppercase tracking-tight">
                  <span className="text-gold font-black">0{i+1}.</span>
                  <span>{f.q}</span>
                </h4>
                <p className="text-white/40 pl-11 font-light leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />
      <Hero />
      <Benefits />
      <HowItWorks />
      <DiagnosticTool />
      <FAQ />
      <Footer />
    </div>
  );
};

export default App;