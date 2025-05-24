import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
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
    
    // Processar a solicitação de exclusão
    if (req.method !== 'DELETE') {
      return new Response(
        JSON.stringify({ error: 'Método não permitido' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Obter o ID do evento dos parâmetros ou do corpo
    let id: string;
    
    // Verificar se o ID está nos parâmetros da URL
    const url = new URL(req.url);
    const idParam = url.searchParams.get('id');
    
    if (idParam) {
      id = idParam;
    } else {
      // Se não estiver nos parâmetros, tentar obter do corpo
      try {
        const body = await req.json();
        id = body.id;
      } catch (e) {
        return new Response(
          JSON.stringify({ error: 'ID do evento não fornecido' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }
    
    if (!id) {
      return new Response(
        JSON.stringify({ error: 'ID do evento é obrigatório' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Verificar se o evento existe antes de excluir
    const { data: evento, error: findError } = await supabaseClient
      .from('eventos')
      .select('id')
      .eq('id', id)
      .single();
    
    if (findError || !evento) {
      return new Response(
        JSON.stringify({ error: 'Evento não encontrado' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Excluir o evento
    const { error: deleteError } = await supabaseClient
      .from('eventos')
      .delete()
      .eq('id', id);
    
    if (deleteError) {
      console.error('Erro ao excluir evento:', deleteError);
      return new Response(
        JSON.stringify({ error: deleteError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify({ success: true, message: 'Evento excluído com sucesso' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (err) {
    console.error('Erro na Edge Function delete-evento:', err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}); 