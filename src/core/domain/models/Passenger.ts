export interface Passenger {
    id: number;
    nome: string;
    cpf: string;
    datanascimento: string;
    sexo: 'M' | 'F' | 'Outro';
    endereco: string;
}
  