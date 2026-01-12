import React from 'react';

const Hero: React.FC = () => {
  // Para autoplay funcionar em navegadores modernos, o vídeo DEVE iniciar mudo (mute=1)
  // modestbranding=1 remove o logo do YouTube da barra de controle
  // rel=0 evita vídeos relacionados
  // iv_load_policy=3 remove anotações de vídeo
  // disablekb=1 remove atalhos de teclado que podem mostrar informações
  const videoSrc = "https://www.youtube-nocookie.com/embed/R2Zxq5g43jU?autoplay=1&mute=1&rel=0&modestbranding=1&showinfo=0&controls=1&iv_load_policy=3&disablekb=1&fs=0";

  return (
    <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-black">
      {/* Luz Ambiente Premium */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C5A376]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="flex-1 text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center space-x-2 px-4 py-2 mb-8 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold tracking-[0.4em] uppercase text-gold">
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
              <span>Upgrade para Gestão Estratégica</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[0.95] mb-8 tracking-tighter">
              Pare de aceitar o básico. <br />
              Sua empresa merece o <br />
              <span className="text-gold italic">Padrão Prime.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/50 mb-10 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              Mudar de contador nunca foi tão seguro. Nossa transição inteligente garante <span className="text-white font-medium">zero burocracia</span> e um upgrade imediato na saúde financeira da sua empresa.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <button 
                onClick={() => document.getElementById('diagnostic')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-gold text-black rounded-sm font-black text-sm uppercase tracking-widest shadow-[0_10px_40_rgba(197,163,118,0.2)] hover:brightness-110 transition-all hover:-translate-y-1"
              >
                Iniciar Minha Transição
              </button>
              <button 
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-transparent text-white border border-white/20 rounded-sm font-bold text-sm uppercase tracking-widest hover:bg-white/5 transition-all"
              >
                Conhecer a Experiência
              </button>
            </div>
            
            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/5 pt-10 opacity-70">
               <div className="flex flex-col">
                  <span className="text-2xl font-black text-white">48h</span>
                  <span className="text-[10px] uppercase tracking-widest text-white/40">Transição</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-2xl font-black text-white">100%</span>
                  <span className="text-[10px] uppercase tracking-widest text-white/40">Segurança Digital</span>
               </div>
            </div>
          </div>
          
          <div className="flex-1 relative w-full max-w-2xl lg:max-w-none mx-auto">
            {/* Moldura do Vídeo com bordas refinadas */}
            <div className="relative z-10 p-1 bg-gradient-to-br from-white/20 to-transparent rounded-lg shadow-2xl overflow-hidden">
              <div className="relative aspect-video rounded-md overflow-hidden bg-zinc-900 border border-white/5">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={videoSrc}
                  title="Apresentação Meu Contador Prime"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                ></iframe>
                
                {/* Overlay sutil para esconder elementos de UI que o YouTube insiste em mostrar no topo */}
                <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-20"></div>
              </div>
            </div>
            
            {/* Selo de Garantia */}
            <div className="absolute -top-6 -right-6 hidden md:flex flex-col items-center justify-center w-24 h-24 bg-gold rounded-full text-black shadow-2xl z-20 animate-bounce">
              <i className="fas fa-check-double text-2xl mb-1"></i>
              <span className="text-[8px] font-black uppercase text-center leading-none">Qualidade<br/>Prime</span>
            </div>

            <div className="absolute -inset-4 bg-gold/20 blur-3xl -z-10 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;