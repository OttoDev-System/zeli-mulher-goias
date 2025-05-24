
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
  
  try {
    const { data, error } = await supabase.functions.invoke('get-eventos', {
      method: 'GET',
      body: new URLSearchParams({
        skip: skip.toString(),
        limit: limit.toString(),
        ...(cidade && { cidade }),
        ...(tema && { tema }),
      }).toString(),
    });

    if (error) {
      console.error('Erro ao buscar eventos:', error);
      throw new Error('Erro ao carregar eventos');
    }

    return data || [];
  } catch (error) {
    console.error('Erro na API de eventos:', error);
    throw error;
  }
};
