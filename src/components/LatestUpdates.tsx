
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, FileText, Users } from 'lucide-react';

const LatestUpdates = () => {
  const updates = [
    {
      icon: FileText,
      category: "Legislação",
      title: "Leis que transformam: conheça 3 novas leis de nossa autoria para Goiás",
      description: "Criamos leis importantes para apoio a pacientes oncológicos, mulheres em vulnerabilidade e diabéticos.",
      date: "15 de Dezembro, 2023",
      color: "text-blue-600"
    },
    {
      icon: Calendar,
      category: "Agenda",
      title: "Deputada cumpre agenda em Valparaíso de Goiás",
      description: "Visita às unidades de saúde e diálogo com a população sobre as necessidades locais.",
      date: "12 de Dezembro, 2023",
      color: "text-green-600"
    },
    {
      icon: Users,
      category: "Transparência",
      title: "Mais de R$ 11 milhões em emendas pagas para Valparaíso e outras 11 cidades",
      description: "Recursos destinados para saúde, educação, infraestrutura e programas sociais.",
      date: "10 de Dezembro, 2023",
      color: "text-purple-600"
    }
  ];

  return (
    <section className="py-16 bg-zeli-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-zeli-gray mb-4">
            Últimas Atualizações
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Acompanhe as ações mais recentes do nosso mandato e fique por dentro das conquistas para Goiás
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {updates.map((update, index) => (
            <Card key={index} className="hover-lift border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center`}>
                    <update.icon className={`h-5 w-5 ${update.color}`} />
                  </div>
                  <span className={`text-sm font-semibold ${update.color}`}>
                    {update.category}
                  </span>
                </div>
                <CardTitle className="text-xl text-zeli-gray leading-tight">
                  {update.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                  {update.description}
                </CardDescription>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{update.date}</span>
                  <Button variant="ghost" size="sm" className="text-zeli-yellow hover:text-yellow-600">
                    Ler mais →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestUpdates;
