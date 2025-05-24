import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { CalendarDays, Plus, Pencil, Trash2, ArrowLeft, LogOut, Loader2 } from 'lucide-react';
import { fetchEventos } from '@/services/agendaService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { supabase } from '@/integrations/supabase/client';
import { Evento } from '@/types/evento';
import logoZeli from '@/assets/logo/logo_Zeli.png';

const AdminAgendaPage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const { data: eventos, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['admin-eventos'],
    queryFn: () => fetchEventos({ limit: 100 }), // Buscar mais eventos para a visão de admin
  });

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return format(data, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR });
  };

  const excluirEvento = async (id: string) => {
    setIsDeleting(id);
    try {
      const { error } = await supabase.functions.invoke('delete-evento', {
        method: 'DELETE',
        body: { id },
      });

      if (error) throw error;
      refetch(); // Recarregar a lista após excluir
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
      alert('Erro ao excluir o evento. Tente novamente.');
    } finally {
      setIsDeleting(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-zeli-yellow mb-4" />
        <p className="text-lg">Carregando eventos...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 mb-4">Erro ao carregar eventos: {error instanceof Error ? error.message : 'Erro desconhecido'}</p>
        <Button onClick={() => refetch()}>Tentar novamente</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Link to="/admin/dashboard" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
              <img src={logoZeli} alt="Logo Dra. Zeli" className="w-10 h-10 object-contain" />
            </Link>
            <h1 className="text-xl font-bold text-zeli-gray">Gestão de Agenda</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Olá, {user?.email}</span>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <CalendarDays className="mr-2 h-6 w-6 text-zeli-yellow" />
            Eventos da Agenda
          </h2>
          <Button onClick={() => navigate('/admin/agenda/novo')}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Evento
          </Button>
        </div>

        {eventos && eventos.length === 0 ? (
          <Card className="text-center py-8">
            <CardContent>
              <CalendarDays className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500 mb-4">Nenhum evento cadastrado</p>
              <Button onClick={() => navigate('/admin/agenda/novo')}>Adicionar primeiro evento</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventos?.map((evento: Evento) => (
              <Card key={evento.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between mb-2">
                    <Badge>{evento.tipo_evento}</Badge>
                    <Badge variant={evento.publico ? "default" : "outline"}>
                      {evento.publico ? "Público" : "Privado"}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{evento.titulo}</CardTitle>
                  <CardDescription>
                    {formatarData(evento.data_inicio)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {evento.descricao && (
                    <p className="text-sm text-gray-600 mb-3">{evento.descricao}</p>
                  )}
                  <div className="text-sm text-gray-600">
                    <p><strong>Local:</strong> {evento.local_nome}</p>
                    <p><strong>Cidade:</strong> {evento.cidade}</p>
                    {evento.tema && <p><strong>Tema:</strong> {evento.tema}</p>}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <Button variant="outline" size="sm" onClick={() => navigate(`/admin/agenda/editar/${evento.id}`)}>
                    <Pencil className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Excluir
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir o evento "{evento.titulo}"? 
                          Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => excluirEvento(evento.id)}
                          disabled={isDeleting === evento.id}
                        >
                          {isDeleting === evento.id ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Excluindo...
                            </>
                          ) : (
                            'Sim, excluir'
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-white shadow-inner mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Deputada Zeli - Painel Administrativo
        </div>
      </footer>
    </div>
  );
};

export default AdminAgendaPage; 