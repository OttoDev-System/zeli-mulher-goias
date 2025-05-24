
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, MessageSquare, Users, FileText, Shield, Heart } from 'lucide-react';

const Procuradoria = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="h-8 w-8 text-pink-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Procuradoria da Mulher
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Um espaço seguro de acolhimento, orientação e defesa dos direitos das mulheres goianas
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zeli-gray mb-4">
              Canal Seguro e Confidencial
            </h2>
            <p className="text-lg text-gray-600">
              Precisa de ajuda? Estamos aqui para ouvir e apoiar você
            </p>
          </div>

          <Card className="shadow-lg border-0">
            <CardHeader className="bg-white">
              <CardTitle className="text-center text-2xl text-zeli-gray">
                Entre em Contato
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome (opcional)
                    </label>
                    <Input placeholder="Seu nome" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cidade
                    </label>
                    <Input placeholder="Sua cidade" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contato (WhatsApp, telefone ou e-mail)
                  </label>
                  <Input placeholder="Como podemos retornar o contato" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem
                  </label>
                  <Textarea 
                    placeholder="Conte-nos como podemos ajudar você..."
                    rows={6}
                  />
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="h-5 w-5 text-yellow-600" />
                    <span className="font-semibold text-yellow-800">Confidencialidade Garantida</span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    Todas as informações compartilhadas são tratadas com total sigilo e confidencialidade.
                  </p>
                </div>

                <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 text-lg">
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zeli-gray mb-4">
              Como Podemos Ajudar
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-zeli-gray mb-3">Orientação Jurídica</h3>
                <p className="text-gray-600">
                  Esclarecimento sobre direitos e orientações sobre procedimentos legais
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-zeli-gray mb-3">Acolhimento</h3>
                <p className="text-gray-600">
                  Escuta qualificada e encaminhamento para a rede de proteção
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-zeli-gray mb-3">Denúncias</h3>
                <p className="text-gray-600">
                  Canal para relatar violações de direitos e violência contra a mulher
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-16 bg-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zeli-gray mb-4">
              Em Caso de Emergência
            </h2>
            <p className="text-lg text-gray-600">
              Se você está em situação de risco imediato, ligue para os números abaixo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-red-600 text-white border-0">
              <CardContent className="p-6 text-center">
                <Phone className="h-8 w-8 mx-auto mb-3" />
                <h3 className="text-xl font-bold mb-2">190</h3>
                <p>Polícia Militar</p>
              </CardContent>
            </Card>

            <Card className="bg-purple-600 text-white border-0">
              <CardContent className="p-6 text-center">
                <Heart className="h-8 w-8 mx-auto mb-3" />
                <h3 className="text-xl font-bold mb-2">180</h3>
                <p>Central de Atendimento à Mulher</p>
              </CardContent>
            </Card>

            <Card className="bg-blue-600 text-white border-0">
              <CardContent className="p-6 text-center">
                <MessageSquare className="h-8 w-8 mx-auto mb-3" />
                <h3 className="text-xl font-bold mb-2">197</h3>
                <p>Polícia Civil</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Procuradoria;
