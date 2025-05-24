import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Evento } from '@/types/evento';

// Schema de validação com Zod
const eventoFormSchema = z.object({
  titulo: z.string().min(3, 'O título deve ter pelo menos 3 caracteres'),
  descricao: z.string().optional(),
  data_inicio: z.date({
    required_error: 'A data de início é obrigatória',
  }),
  data_fim: z.date().optional(),
  local_nome: z.string().min(2, 'O nome do local é obrigatório'),
  local_endereco: z.string().optional(),
  cidade: z.string().min(2, 'A cidade é obrigatória'),
  tema: z.string().optional(),
  tipo_evento: z.string({
    required_error: 'Selecione o tipo de evento',
  }),
  publico: z.boolean().default(true),
  link_externo: z.string().url('URL inválida').optional().or(z.literal('')),
});

type EventoFormValues = z.infer<typeof eventoFormSchema>;

interface EventoFormProps {
  eventoId?: string;
  onSuccess?: () => void;
}

const EventoForm = ({ eventoId, onSuccess }: EventoFormProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // Definir os tipos de eventos disponíveis
  const tiposEventos = [
    { value: 'sessao', label: 'Sessão Plenária' },
    { value: 'audiencia', label: 'Audiência Pública' },
    { value: 'visita', label: 'Visita Técnica' },
    { value: 'atendimento', label: 'Atendimento' },
    { value: 'inauguracao', label: 'Inauguração' },
    { value: 'agenda', label: 'Agenda Política' },
  ];

  // Inicializar formulário com validação Zod
  const form = useForm<EventoFormValues>({
    resolver: zodResolver(eventoFormSchema),
    defaultValues: {
      titulo: '',
      descricao: '',
      local_nome: '',
      local_endereco: '',
      cidade: '',
      tema: '',
      tipo_evento: '',
      publico: true,
      link_externo: '',
    },
  });

  // Buscar dados do evento se for edição
  useEffect(() => {
    const fetchEvento = async () => {
      if (!eventoId) return;
      
      setIsFetching(true);
      try {
        // Aqui você pode usar a mesma função fetchEventos e filtrar pelo ID
        // ou criar uma função específica para buscar um evento pelo ID
        const { data: eventos } = await supabase
          .from('eventos')
          .select('*')
          .eq('id', eventoId)
          .single();
        
        if (eventos) {
          // Converter strings de data para objetos Date
          const formData = {
            ...eventos,
            data_inicio: eventos.data_inicio ? new Date(eventos.data_inicio) : undefined,
            data_fim: eventos.data_fim ? new Date(eventos.data_fim) : undefined,
          };
          
          // Resetar o formulário com os dados do evento
          form.reset(formData);
        }
      } catch (error) {
        console.error('Erro ao buscar evento:', error);
        alert('Erro ao carregar os dados do evento. Tente novamente.');
      } finally {
        setIsFetching(false);
      }
    };

    fetchEvento();
  }, [eventoId, form]);

  // Função para salvar o evento (criar ou atualizar)
  const onSubmit = async (data: EventoFormValues) => {
    setIsLoading(true);
    try {
      // Converter datas para formato ISO
      const eventoData = {
        ...data,
        data_inicio: data.data_inicio.toISOString(),
        data_fim: data.data_fim ? data.data_fim.toISOString() : null,
      };

      if (eventoId) {
        // Atualizar evento existente
        const { error } = await supabase.functions.invoke('update-evento', {
          method: 'PUT',
          body: {
            id: eventoId,
            ...eventoData,
          },
        });

        if (error) throw error;
      } else {
        // Criar novo evento
        const { error } = await supabase.functions.invoke('create-evento', {
          method: 'POST',
          body: eventoData,
        });

        if (error) throw error;
      }

      // Redirecionar ou executar callback
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/admin/agenda');
      }
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
      alert(`Erro ao ${eventoId ? 'atualizar' : 'criar'} o evento. Tente novamente.`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-zeli-yellow" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="titulo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título do Evento *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Audiência Pública sobre Educação" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descrição detalhada do evento..." 
                      className="min-h-[120px]" 
                      {...field} 
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="data_inicio"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data e Hora de Início *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="pl-3 text-left font-normal"
                          >
                            {field.value ? (
                              format(field.value, "PPP 'às' HH:mm", { locale: ptBR })
                            ) : (
                              <span>Selecione a data...</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          locale={ptBR}
                        />
                        <div className="p-3 border-t border-gray-100">
                          <Input
                            type="time"
                            value={field.value ? format(field.value, "HH:mm") : ""}
                            onChange={(e) => {
                              const date = field.value || new Date();
                              const [hours, minutes] = e.target.value.split(':');
                              date.setHours(Number(hours), Number(minutes));
                              field.onChange(date);
                            }}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="data_fim"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data e Hora de Término</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="pl-3 text-left font-normal"
                          >
                            {field.value ? (
                              format(field.value, "PPP 'às' HH:mm", { locale: ptBR })
                            ) : (
                              <span>Opcional...</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value || undefined}
                          onSelect={field.onChange}
                          initialFocus
                          locale={ptBR}
                        />
                        <div className="p-3 border-t border-gray-100">
                          <Input
                            type="time"
                            value={field.value ? format(field.value, "HH:mm") : ""}
                            onChange={(e) => {
                              const date = field.value || new Date();
                              const [hours, minutes] = e.target.value.split(':');
                              date.setHours(Number(hours), Number(minutes));
                              field.onChange(date);
                            }}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="tipo_evento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Evento *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de evento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tiposEventos.map((tipo) => (
                        <SelectItem key={tipo.value} value={tipo.value}>
                          {tipo.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="local_nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Local *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Assembleia Legislativa de Goiás" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="local_endereco"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Av. Principal, 123" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Goiânia" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tema"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tema</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Educação, Saúde, etc." {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link_externo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Externo</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} value={field.value || ''} />
                  </FormControl>
                  <FormDescription>URL para mais informações sobre o evento.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="publico"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Evento Público</FormLabel>
                    <FormDescription>
                      Marque esta opção para exibir o evento na agenda pública do site.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/agenda')}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {eventoId ? 'Atualizando...' : 'Criando...'}
              </>
            ) : (
              eventoId ? 'Atualizar Evento' : 'Criar Evento'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EventoForm; 