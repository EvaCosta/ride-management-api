export interface Driver {
  id: number;
  nome: string;
  cpf: string;
  datanascimento: string;
  sexo: 'M' | 'F' | 'Outro';
  endereco: string;
  cnh: string;
  created_at?: string;
  updated_at?: string;
}
