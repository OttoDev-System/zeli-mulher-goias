
export interface Evento {
  id: string;
  titulo: string;
  descricao?: string;
  data_inicio: string;
  data_fim?: string;
  local_nome: string;
  local_endereco?: string;
  cidade: string;
  tema?: string;
  tipo_evento: string;
  publico: boolean;
  link_externo?: string;
}
