

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."trigger_set_timestamp"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  NEW.atualizado_em = NOW();
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."trigger_set_timestamp"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."eventos" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "titulo" "text" NOT NULL,
    "descricao" "text",
    "data_inicio" timestamp with time zone NOT NULL,
    "data_fim" timestamp with time zone,
    "local_nome" "text" NOT NULL,
    "local_endereco" "text",
    "cidade" "text" NOT NULL,
    "tema" "text",
    "tipo_evento" "text" DEFAULT 'agenda'::"text",
    "publico" boolean DEFAULT true,
    "link_externo" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."eventos" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."projetos_lei" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "numero_lei" "text",
    "titulo_projeto" "text" NOT NULL,
    "ementa" "text" NOT NULL,
    "resumo_cidadao" "text",
    "status" "text" NOT NULL,
    "data_apresentacao" "date" NOT NULL,
    "data_sancao_aprovacao" "date",
    "link_integra" "text",
    "autor" "text" DEFAULT 'Deputada Zeli'::"text" NOT NULL,
    "temas_relacionados" "text"[],
    "impacto_previsto" "text",
    "criado_em" timestamp with time zone DEFAULT "now"() NOT NULL,
    "atualizado_em" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."projetos_lei" OWNER TO "postgres";


COMMENT ON COLUMN "public"."projetos_lei"."numero_lei" IS 'Número oficial da lei, se sancionada.';



COMMENT ON COLUMN "public"."projetos_lei"."titulo_projeto" IS 'Título oficial ou nome popular do projeto de lei.';



COMMENT ON COLUMN "public"."projetos_lei"."ementa" IS 'Descrição resumida oficial do projeto ou lei.';



COMMENT ON COLUMN "public"."projetos_lei"."resumo_cidadao" IS 'Resumo do projeto em linguagem acessível ao cidadão (a ser gerado por IA).';



COMMENT ON COLUMN "public"."projetos_lei"."status" IS 'Situação atual do projeto (ex: Em Tramitação, Aprovado, Sancionado).';



COMMENT ON COLUMN "public"."projetos_lei"."data_apresentacao" IS 'Data de apresentação do projeto na assembleia.';



COMMENT ON COLUMN "public"."projetos_lei"."data_sancao_aprovacao" IS 'Data de sanção (se tornou lei) ou aprovação final.';



COMMENT ON COLUMN "public"."projetos_lei"."link_integra" IS 'Link para o texto completo ou mais detalhes no site da assembleia/diário oficial.';



COMMENT ON COLUMN "public"."projetos_lei"."temas_relacionados" IS 'Array de temas/palavras-chave associados ao projeto.';



ALTER TABLE ONLY "public"."eventos"
    ADD CONSTRAINT "eventos_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."projetos_lei"
    ADD CONSTRAINT "projetos_lei_pkey" PRIMARY KEY ("id");



CREATE OR REPLACE TRIGGER "set_timestamp_projetos_lei" BEFORE UPDATE ON "public"."projetos_lei" FOR EACH ROW EXECUTE FUNCTION "public"."trigger_set_timestamp"();



CREATE POLICY "Permitir leitura pública de projetos de lei" ON "public"."projetos_lei" FOR SELECT USING (true);



CREATE POLICY "Todos podem ver eventos públicos" ON "public"."eventos" FOR SELECT USING (("publico" = true));



ALTER TABLE "public"."eventos" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."projetos_lei" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

























































































































































GRANT ALL ON FUNCTION "public"."trigger_set_timestamp"() TO "anon";
GRANT ALL ON FUNCTION "public"."trigger_set_timestamp"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."trigger_set_timestamp"() TO "service_role";


















GRANT ALL ON TABLE "public"."eventos" TO "anon";
GRANT ALL ON TABLE "public"."eventos" TO "authenticated";
GRANT ALL ON TABLE "public"."eventos" TO "service_role";



GRANT ALL ON TABLE "public"."projetos_lei" TO "anon";
GRANT ALL ON TABLE "public"."projetos_lei" TO "authenticated";
GRANT ALL ON TABLE "public"."projetos_lei" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
