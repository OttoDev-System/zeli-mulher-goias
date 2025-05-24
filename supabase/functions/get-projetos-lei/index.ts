// @ts-expect-error Deno import
import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
// @ts-expect-error Deno import
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  // Configurar CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  // Configuração do cliente Supabase
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!
  );

  // Extrair query params
  const { searchParams } = new URL(req.url);
  const skip = parseInt(searchParams.get("skip") ?? "0", 10);
  const limit = parseInt(searchParams.get("limit") ?? "10", 10);
  const status = searchParams.get("status");
  const tema = searchParams.get("tema");

  // Construir query
  let query = supabase
    .from("projetos_lei")
    .select("*", { count: "exact" })
    .order("data_apresentacao", { ascending: false })
    .range(skip, skip + limit - 1);

  if (status) {
    query = query.eq("status", status);
  }
  if (tema) {
    query = query.contains("temas_relacionados", [tema]);
  }

  const { data, error, count } = await query;

  if (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      }
    );
  }

  return new Response(
    JSON.stringify({ data, count }),
    {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    }
  );
}); 