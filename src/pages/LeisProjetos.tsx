import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/Header'; // Ajuste o caminho se necessário
import { Footer } from '@/components/Footer'; // Ajuste o caminho se necessário
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, AlertCircle, Loader2 } from 'lucide-react'; // Ícones
import { fetchProjetosLei } from '@/services/projetosLeiService';
import { ProjetoLei } from '@/types/projetoLei';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function LeisProjetos() {
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['projetosLei'], // Adicione filtros aqui se necessário para o cache ex: ['projetosLei', status, tema]
    queryFn: () => fetchProjetosLei({ limit: 10 }), // Exemplo com limite, adicione outros filtros conforme necessário
  });

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
    } catch (e) {
      return 'Data inválida';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Leis e Projetos</h1>

        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2 text-lg">Carregando projetos...</p>
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center py-10 bg-red-50 border border-red-200 rounded-md p-6">
            <AlertCircle className="h-12 w-12 text-red-500 mb-3" />
            <h2 className="text-xl font-semibold text-red-700 mb-2">Ocorreu um erro!</h2>
            <p className="text-red-600 text-center">
              Não foi possível carregar os projetos de lei. Tente novamente mais tarde.
            </p>
            {error && <p className="mt-2 text-sm text-red-500">Detalhes: {error.message}</p>}
          </div>
        )}

        {!isLoading && !isError && response && response.data && response.data.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {response.data.map((projeto: ProjetoLei) => (
              <Card key={projeto.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold leading-tight">
                      {projeto.titulo_projeto}
                    </CardTitle>
                    <Badge variant={projeto.status === 'Sancionado' ? 'default' : 'secondary'}
                           className={`whitespace-nowrap ${projeto.status === 'Sancionado' ? 'bg-green-600 text-white' : ''}`}>
                      {projeto.status}
                    </Badge>
                  </div>
                  {projeto.numero_lei && (
                    <p className="text-xs text-muted-foreground mt-1">{projeto.numero_lei}</p>
                  )}
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-sm mb-3 line-clamp-4">
                    {projeto.ementa}
                  </CardDescription>
                  <p className="text-xs text-muted-foreground mb-1">
                    Apresentado em: {formatDate(projeto.data_apresentacao)}
                  </p>
                  {projeto.data_sancao_aprovacao && (
                     <p className="text-xs text-muted-foreground mb-3">
                       Status em: {formatDate(projeto.data_sancao_aprovacao)}
                     </p>
                  )}
                  {projeto.temas_relacionados && projeto.temas_relacionados.length > 0 && (
                    <div className="mb-3">
                      {projeto.temas_relacionados.map(tema => (
                        <Badge key={tema} variant="outline" className="mr-1 mb-1 text-xs">{tema}</Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
                {projeto.link_integra && (
                  <div className="p-4 pt-0 mt-auto">
                    <Button
                      variant="link"
                      asChild
                      className="p-0 h-auto text-sm"
                    >
                      <a href={projeto.link_integra} target="_blank" rel="noopener noreferrer">
                        <FileText className="h-4 w-4 mr-1" /> Ver na Íntegra
                      </a>
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {!isLoading && !isError && (!response || !response.data || response.data.length === 0) && (
          <div className="text-center py-10">
            <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">Nenhum projeto de lei encontrado no momento.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
} 