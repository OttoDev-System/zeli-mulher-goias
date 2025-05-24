import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'PUT, OPTIONS',
};

serve(async (req: Request) => {
  // Lidar com preflight CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Obter token do usuário do header Authorization
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Não autorizado: Token ausente ou inválido' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.split(' ')[1];
    
    // Inicializar cliente Supabase com token do usuário para validação
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    );
    
    // Verificar usuário autenticado
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Não autorizado: Usuário inválido ou não encontrado' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Opcional: verificar roles específicas
    // const userRoles = user.app_metadata?.roles || [];
    // if (!userRoles.includes('admin_agenda')) {
    //   return new Response(
    //     JSON.stringify({ error: 'Proibido: Permissões insuficientes' }),
    //     { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    //   );
    // }
    
    // Processar os dados do evento
    if (req.method !== 'PUT') {
      return new Response(
        JSON.stringify({ error: 'Método não permitido' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const updateData = await req.json();
    
    // Validação básica dos dados
    if (!updateData.id) {
      return new Response(
        JSON.stringify({ error: 'ID do evento é obrigatório' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Extrair o ID e remover do objeto para evitar tentar atualizar a PK
    const { id, ...eventoData } = updateData;
    
    // Validação básica dos dados (use uma biblioteca como Zod para validação mais robusta)
    if (!eventoData.titulo || !eventoData.data_inicio || !eventoData.local_nome || !eventoData.cidade || !eventoData.tipo_evento) {
      return new Response(
        JSON.stringify({ error: 'Dados inválidos: campos obrigatórios ausentes' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Atualizar evento no banco de dados
    const { data, error } = await supabaseClient
      .from('eventos')
      .update(eventoData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Erro ao atualizar evento:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (!data) {
      return new Response(
        JSON.stringify({ error: 'Evento não encontrado' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify(data),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (err) {
    console.error('Erro na Edge Function update-evento:', err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}); 