export interface ProjetoLei {
  id: string;
  numero_lei?: string;
  titulo_projeto: string;
  ementa: string;
  resumo_cidadao?: string;
  status: string;
  data_apresentacao: string; // Ou Date, dependendo da sua preferência de manipulação
  data_sancao_aprovacao?: string; // Ou Date
  link_integra?: string;
  autor: string;
  temas_relacionados?: string[];
  impacto_previsto?: string;
  criado_em: string; // Ou Date
  atualizado_em: string; // Ou Date
} 