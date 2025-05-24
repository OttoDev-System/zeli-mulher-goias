
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Building2, GraduationCap, Heart, MapPin } from 'lucide-react';

const ZeliHighlights = () => {
  const achievements = [
    {
      title: "Lei nº 262/2023",
      subtitle: "Dia Estadual da Doação de Cabelo",
      description: "Criou o Dia Estadual da Doação de Cabelo, celebrado em 9 de abril, uma iniciativa para apoiar pacientes em tratamento oncológico",
      icon: Heart,
      status: "Sancionada"
    },
    {
      title: "Lei nº 219/2023", 
      subtitle: "Banco de Currículos para Mulheres",
      description: "Instituiu o Banco de Currículos para Mulheres em vulnerabilidade social, incentivando a inserção delas no mercado de trabalho",
      icon: Users,
      status: "Sancionada"
    },
    {
      title: "Lei nº 372/2023",
      subtitle: "Atendimento Preferencial Diabéticos",
      description: "Implementou atendimento preferencial para pacientes diabéticos nas unidades de saúde estaduais",
      icon: Heart,
      status: "Sancionada"
    }
  ];

  const conquests = [
    {
      title: "Mercado Goiano",
      description: "Articulou a construção do Mercado Goiano em Valparaíso de Goiás e em 6 municípios do Entorno do DF",
      value: "R$ 41,8 milhões",
      icon: Building2
    },
    {
      title: "Programa Deputados Aqui",
      description: "Levou o programa a Valparaíso, beneficiando a população carente",
      value: "112 óculos de grau",
      icon: Users
    },
    {
      title: "Corpo de Bombeiros",
      description: "Destinou recursos para aquisição de caminhão para o Corpo de Bombeiros da Cidade Ocidental",
      value: "R$ 1,4 milhão",
      icon: Building2
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Quote */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-zeli-yellow to-zeli-green p-8 rounded-lg text-white mb-8">
            <blockquote className="text-xl md:text-2xl font-medium italic">
              "Desde que assumi o meu mandato, eu disse que não faria oba-oba e só anunciaria as emendas depois que o dinheiro estivesse na conta das prefeituras, e assim está sendo. Fico feliz em contribuir com áreas importantes e que farão a diferença no desenvolvimento dos nossos municípios"
            </blockquote>
            <cite className="block mt-4 text-lg font-semibold">- Deputada Zeli</cite>
          </div>
        </div>

        {/* Laws Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zeli-gray mb-4">
              Projetos que viraram Lei em Goiás
            </h2>
            <div className="w-20 h-1 bg-zeli-yellow mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="hover-lift border-0 shadow-lg h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <achievement.icon className="h-8 w-8 text-zeli-yellow" />
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      {achievement.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-zeli-gray">
                    {achievement.title}
                  </CardTitle>
                  <p className="text-zeli-yellow font-semibold">
                    {achievement.subtitle}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Conquests Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zeli-gray mb-4">
              Outras Conquistas
            </h2>
            <div className="w-20 h-1 bg-zeli-yellow mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {conquests.map((conquest, index) => (
              <Card key={index} className="hover-lift border-0 shadow-lg h-full">
                <CardHeader>
                  <conquest.icon className="h-8 w-8 text-zeli-yellow mb-4" />
                  <CardTitle className="text-lg text-zeli-gray">
                    {conquest.title}
                  </CardTitle>
                  <p className="text-2xl font-bold text-zeli-yellow">
                    {conquest.value}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    {conquest.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Investment Summary */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-zeli-gray mb-2">
              Mais de R$ 11 milhões em emendas pagas
            </h3>
            <p className="text-gray-600">
              Para Valparaíso de Goiás e outros 11 municípios
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <MapPin className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">R$ 4.7Mi</div>
              <div className="text-sm text-gray-600">Saúde</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Building2 className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">R$ 1.8Mi</div>
              <div className="text-sm text-gray-600">Infraestrutura</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <GraduationCap className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">R$ 1.8Mi</div>
              <div className="text-sm text-gray-600">Educação</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">R$ 873k</div>
              <div className="text-sm text-gray-600">Social e Cultura</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZeliHighlights;
