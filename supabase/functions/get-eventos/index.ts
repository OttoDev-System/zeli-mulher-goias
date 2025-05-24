
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('Iniciando busca de eventos...');
    
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
    );

    const url = new URL(req.url);
    const params = url.searchParams;
    const skip = parseInt(params.get('skip') || '0', 10);
    const limit = parseInt(params.get('limit') || '10', 10);
    const cidade = params.get('cidade');
    const tema = params.get('tema');

    console.log('Parâmetros:', { skip, limit, cidade, tema });

    let query = supabaseClient
      .from('eventos')
      .select('id, titulo, descricao, data_inicio, data_fim, local_nome, local_endereco, cidade, tema, tipo_evento, publico, link_externo')
      .eq('publico', true)
      .order('data_inicio', { ascending: true })
      .range(skip, skip + limit - 1);

    if (cidade) {
      query = query.ilike('cidade', `%${cidade}%`);
    }
    if (tema) {
      query = query.ilike('tema', `%${tema}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Erro na query:', error);
      throw error;
    }

    console.log('Eventos encontrados:', data?.length || 0);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error('Erro na Edge Function:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
