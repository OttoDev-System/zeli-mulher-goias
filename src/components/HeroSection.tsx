
import { Button } from '@/components/ui/button';
import { ArrowDown, Users, Calendar } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-zeli-yellow/90 to-zeli-green/80 z-10"></div>
      
      {/* Background image placeholder */}
      <div className="absolute inset-0 bg-gray-200">
        <img 
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80" 
          alt="Assembleia Legislativa de Goiás" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Dra. Zeli
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-white mb-8 font-medium">
            A Mulher de Palavra representando o<br />
            <span className="text-zeli-yellow font-bold">Entorno do Distrito Federal</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-white text-zeli-gray hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              <Users className="mr-2 h-5 w-5" />
              Procuradoria da Mulher
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-zeli-gray px-8 py-3 text-lg font-semibold"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Ver Agenda
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">R$ 41.8Mi</div>
              <div className="text-lg opacity-90">Investimentos para Goiás</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">3 Leis</div>
              <div className="text-lg opacity-90">Sancionadas em 2023</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">+10 Cidades</div>
              <div className="text-lg opacity-90">Contempladas com emendas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <ArrowDown className="h-8 w-8 text-white animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
