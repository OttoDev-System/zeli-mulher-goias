
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Phone, FileText, MessageSquare } from 'lucide-react';

const WomenAdvocacy = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-pink-600" />
              </div>
              <span className="text-pink-600 font-semibold text-lg">Procuradoria da Mulher</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-zeli-gray mb-6">
              Um canal de apoio e defesa para as <span className="text-pink-600">mulheres goianas</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              A Procuradoria da Mulher é um espaço seguro e confidencial onde você pode buscar orientação, 
              denunciar violações de direitos e encontrar apoio. Estamos aqui para ouvir, acolher e agir.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-pink-600" />
                <span className="text-gray-700">Atendimento 24h</span>
              </div>
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-pink-600" />
                <span className="text-gray-700">Orientação jurídica</span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-5 w-5 text-pink-600" />
                <span className="text-gray-700">Canal confidencial</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-pink-600" />
                <span className="text-gray-700">Rede de apoio</span>
              </div>
            </div>

            <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3">
              Saiba Mais
            </Button>
          </div>

          {/* Visual */}
          <div className="relative">
            <Card className="border-0 shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-10 w-10 text-pink-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-zeli-gray mb-4">
                    Você não está sozinha
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Juntas, podemos construir um Goiás mais justo e igualitário para todas as mulheres.
                  </p>
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <p className="text-pink-800 font-semibold text-sm">
                      "Cada mulher que levanta a voz fortalece todas as outras."
                    </p>
                    <p className="text-pink-600 text-sm mt-2">- Deputada Zeli</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WomenAdvocacy;
