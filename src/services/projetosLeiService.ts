import { ProjetoLei } from '@/types/projetoLei';

const SUPABASE_FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-projetos-lei`;

interface FetchProjetosLeiParams {
  skip?: number;
  limit?: number;
  status?: string;
  tema?: string;
}

interface FetchProjetosLeiResponse {
  data: ProjetoLei[];
  count: number;
}

export async function fetchProjetosLei(
  params: FetchProjetosLeiParams = {}
): Promise<FetchProjetosLeiResponse> {
  const queryParams = new URLSearchParams();

  if (params.skip !== undefined) queryParams.append('skip', String(params.skip));
  if (params.limit !== undefined) queryParams.append('limit', String(params.limit));
  if (params.status) queryParams.append('status', params.status);
  if (params.tema) queryParams.append('tema', params.tema);

  const response = await fetch(`${SUPABASE_FUNCTION_URL}?${queryParams.toString()}`, {
    headers: {
      'Content-Type': 'application/json',
      // Se sua Edge Function requer autenticação, adicione o header Authorization aqui
      // 'Authorization': `Bearer ${supabaseAccessToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Falha ao buscar projetos de lei');
  }

  return response.json();
} 