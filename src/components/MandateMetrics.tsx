
import { Card, CardContent } from '@/components/ui/card';

const MandateMetrics = () => {
  const metrics = [
    {
      value: "+ R$ 41.8 Milhões",
      label: "Em investimentos para o Mercado Goiano",
      icon: "💰",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      value: "3 Leis Sancionadas",
      label: "Em 2023, impactando a vida dos goianos",
      icon: "⚖️",
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      value: "+ 10 Municípios",
      label: "Contemplados com emendas recentes",
      icon: "🏘️",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    },
    {
      value: "112 Óculos de Grau",
      label: "Entregues pelo programa 'Deputados Aqui'",
      icon: "👓",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-zeli-gray mb-4">
            Mandato em Números
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Resultados concretos que transformam a vida dos goianos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index} className={`${metric.bgColor} border-0 hover-lift`}>
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{metric.icon}</div>
                <div className={`text-2xl md:text-3xl font-bold ${metric.textColor} mb-2`}>
                  {metric.value}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {metric.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MandateMetrics;
