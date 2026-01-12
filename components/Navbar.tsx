import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappLink = "https://wa.me/5511993108092?text=Oi!%20Preciso%20mudar%20de%20contador";

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Superior Esquerdo - Oficial */}
        <div className="flex items-center cursor-pointer group" onClick={() => scrollTo('hero')}>
          <img 
            src="https://www.meucontadorprime.com.br/assets/svg/logo.svg" 
            alt="Meu Contador Prime" 
            className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        <div className="hidden md:flex space-x-10 items-center">
          <a 
            href="https://www.meucontadorprime.com.br" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/70 hover:text-gold font-medium transition-all text-[10px] uppercase tracking-[0.2em] flex items-center gap-2"
          >
            Nosso Site <i className="fas fa-external-link-alt text-[8px]"></i>
          </a>
          <a 
            href="https://www.meucontadorprime.blog" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/70 hover:text-gold font-medium transition-all text-[10px] uppercase tracking-[0.2em] flex items-center gap-2"
          >
            Blog <i className="fas fa-external-link-alt text-[8px]"></i>
          </a>
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold text-black px-6 py-2 rounded-sm font-bold shadow-lg hover:brightness-110 transition-all uppercase text-[10px] tracking-widest"
          >
            Falar com Especialista
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;