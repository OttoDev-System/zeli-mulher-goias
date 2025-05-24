import { supabase } from '@/integrations/supabase/client';
import type { Evento } from '@/types/evento';

interface FetchEventosParams {
  skip?: number;
  limit?: number;
  cidade?: string;
  tema?: string;
}

export const fetchEventos = async (params: FetchEventosParams = {}): Promise<Evento[]> => {
  const { skip = 0, limit = 10, cidade, tema } = params;
  
  // Montar query string
  const queryParams = new URLSearchParams({
    skip: skip.toString(),
    limit: limit.toString(),
  });
  if (cidade) queryParams.append('cidade', cidade);
  if (tema) queryParams.append('tema', tema);

  try {
    // Chamada correta: parâmetros na URL, sem body para GET
    const { data, error } = await supabase.functions.invoke(`get-eventos?${queryParams.toString()}`, {
      method: 'GET',
    });

    if (error) {
      console.error('Erro ao buscar eventos:', error);
      throw new Error(`Falha ao carregar eventos: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    console.error('Erro na API de eventos ou problema de rede:', error);
    if (error instanceof Error && error.message.startsWith('Falha ao carregar eventos:')) {
      throw error;
    }
    throw new Error('Ocorreu um problema ao contatar a API de eventos.');
  }
};
