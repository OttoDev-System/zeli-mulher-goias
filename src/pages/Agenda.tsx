
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { fetchEventos } from '@/services/agendaService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';

const Agenda = () => {
  const { data: eventos, isLoading, isError } = useQuery({
    queryKey: ['eventos'],
    queryFn: () => fetchEventos({ limit: 20 }),
  });

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return format(data, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR });
  };

  const getEventoColor = (tipo: string) => {
    const cores = {
      'sessao': 'bg-blue-100 text-blue-800',
      'audiencia': 'bg-green-100 text-green-800',
      'visita': 'bg-purple-100 text-purple-800',
      'atendimento': 'bg-pink-100 text-pink-800',
      'inauguracao': 'bg-yellow-100 text-yellow-800',
      'agenda': 'bg-gray-100 text-gray-800',
    };
    return cores[tipo as keyof typeof cores] || cores.agenda;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-zeli-yellow to-zeli-green py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Agenda Pública
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Acompanhe os compromissos e atividades da Deputada Zeli
          </p>
        </div>
      </section>

      {/* Eventos Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zeli-yellow mx-auto"></div>
              <p className="mt-4 text-gray-600">Carregando eventos...</p>
            </div>
          )}

          {isError && (
            <div className="text-center py-12">
              <p className="text-red-600">Erro ao carregar os eventos. Tente novamente mais tarde.</p>
            </div>
          )}

          {eventos && eventos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">Nenhum evento encontrado.</p>
            </div>
          )}

          {eventos && eventos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventos.map((evento) => (
                <Card key={evento.id} className="hover-lift border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={getEventoColor(evento.tipo_evento)}>
                        {evento.tipo_evento}
                      </Badge>
                      {evento.link_externo && (
                        <a 
                          href={evento.link_externo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-zeli-yellow hover:text-yellow-600"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    <CardTitle className="text-lg text-zeli-gray leading-tight">
                      {evento.titulo}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {evento.descricao && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {evento.descricao}
                      </p>
                    )}
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-zeli-yellow" />
                        {formatarData(evento.data_inicio)}
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-zeli-yellow" />
                        <div>
                          <div className="font-medium">{evento.local_nome}</div>
                          <div className="text-xs">{evento.cidade}</div>
                        </div>
                      </div>

                      {evento.tema && (
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-zeli-yellow" />
                          {evento.tema}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Agenda;
