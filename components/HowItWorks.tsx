import React from 'react';

const steps = [
  {
    icon: 'fa-file-invoice-dollar',
    title: 'Análise de Elite',
    description: 'Nossos especialistas auditam sua empresa para encontrar brechas e oportunidades'
  },
  {
    icon: 'fa-handshake',
    title: 'Aperto de Mão',
    description: 'Definimos o escopo Prime e você assina digitalmente a transferência. Simples assim.'
  },
  {
    icon: 'fa-gears',
    title: 'Sincronização',
    description: 'Importamos seus dados para nossa plataforma de alta performance sem ruídos.'
  },
  {
    icon: 'fa-trophy',
    title: 'Voo Prime',
    description: 'Sua empresa agora conta com gestão de classe mundial e suporte 24/7.'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">O Caminho da <span className="text-gold">Mudança</span></h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-8"></div>
          <p className="text-white/50 max-w-2xl mx-auto font-light">Um processo refinado, desenhado para quem não tem tempo a perder.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-12 relative">
          <div className="hidden lg:block absolute top-12 left-0 w-full h-px bg-white/10 -z-10"></div>
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-zinc-900 border border-white/10 rounded-sm flex items-center justify-center mb-8 group-hover:border-gold transition-all duration-500 shadow-2xl relative">
                <span className="absolute -top-3 -right-3 w-8 h-8 bg-gold text-black rounded-full flex items-center justify-center font-black text-xs">
                    0{index + 1}
                </span>
                <i className={`fas ${step.icon} text-3xl text-gold`}></i>
              </div>
              <h3 className="text-lg font-bold mb-4 text-white uppercase tracking-widest">{step.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed font-light">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 bg-gradient-to-r from-zinc-900 to-black rounded-sm p-10 md:p-16 flex flex-col md:flex-row items-center justify-between border border-white/10">
          <div className="mb-10 md:mb-0 text-center md:text-left">
            <h3 className="text-3xl font-black text-white mb-4 uppercase">Contrato com multa de saída?</h3>
            <p className="text-white/50 text-lg font-light">Nossos consultores jurídicos analisam sua situação e viabilizam a transição sem prejuízos.</p>
          </div>
          <button 
            onClick={() => document.getElementById('diagnostic')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-5 bg-gold text-black rounded-sm font-black text-sm uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_30px_rgba(197,163,118,0.3)]"
          >
            Consultoria de Transição
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;