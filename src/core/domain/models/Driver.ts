export interface Driver {
    id: number;
    nome: string;
    cpf: string;
    idade: number;
    sexo: 'M' | 'F' | 'Outro';
    endereco: string;
}
  