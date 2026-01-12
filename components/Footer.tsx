import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-8">
              <img 
                src="https://www.meucontadorprime.com.br/assets/svg/logo.svg" 
                alt="Meu Contador Prime Logo" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-white/40 max-w-sm mb-10 font-light leading-relaxed">
              Elevando empresas brasileiras ao padrão global de gestão contábil, financeira e estratégica. O standard de ouro para o seu negócio.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white/20 hover:text-gold transition-all text-xl">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white/20 hover:text-gold transition-all text-xl">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://wa.me/5511993108092" target="_blank" className="text-white/20 hover:text-gold transition-all text-xl">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.3em] text-white/30 mb-8">Navegação</h4>
            <ul className="space-y-4 text-white/50 text-sm font-light">
              <li><a href="https://www.meucontadorprime.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors uppercase tracking-widest text-[10px] font-bold">Nosso Site</a></li>
              <li><a href="https://www.meucontadorprime.blog" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors uppercase tracking-widest text-[10px] font-bold">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.3em] text-white/30 mb-8">Contato</h4>
            <ul className="space-y-6 text-white/50 text-sm font-light">
              <li className="flex items-start space-x-4">
                <i className="fas fa-envelope text-gold mt-1"></i>
                <span className="font-medium">comercial@meucontadorprime.com.br</span>
              </li>
              <li className="flex items-start space-x-4">
                <i className="fas fa-phone text-gold mt-1"></i>
                <span className="font-medium">11 99310-8092</span>
              </li>
              <li className="flex items-start space-x-4">
                <i className="fas fa-map-marker-alt text-gold mt-1"></i>
                <span className="font-medium italic opacity-70 italic leading-snug">Rua das Figueiras, 474 8º andar - Bairro Jardim - Santo André - SP</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-white/20 text-[10px] uppercase tracking-[0.2em] font-bold">
          <p>© 2024 Meu Contador Prime - Private Accounting. All Rights Reserved.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Compliance</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;