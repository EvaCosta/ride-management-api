# Ride Management API

A Ride Management API é um sistema para gerenciar corridas entre passageiros e motoristas, inspirado em aplicativos de transporte populares como Uber e Lyft. Este projeto oferece funcionalidades para cadastro de usuários, cálculo de tarifas de corrida dinâmicas e geração de recibos automáticos.

## Funcionalidades Principais

1. **Cadastro de Motoristas e Passageiros:**
   - Endpoint para criar, listar, atualizar e deletar motoristas e passageiros.
   - Validadores de CPF único e data de nascimento válida.

2. **Cálculo Dinâmico de Tarifas:**
   - API para calcular o preço da corrida com base na distância, localização e horário.
   - Tarifas variáveis de acordo com o dia da semana e período do dia.

3. **Aceitação de Corridas e Geração de Recibos:**
   - Endpoint para aceitar uma corrida proposta.
   - Geração automática de recibo em formato JSON gravado localmente.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de execução do código JavaScript.
- **Express.js**: Framework web para Node.js.
- **TypeScript**: Superset de JavaScript para tipagem estática.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.

## Estrutura do Projeto

```
├── src/
│   ├── controllers/
│   ├── core/
│   │   ├── aplication/
│   │   │    └── services/
│   │   ├── domain/
│   │   ├── models/
│   │   ├── infrastructure/
│   │   │     └── data/
│   │   │          └── repositories/
│   │   ├── interfaces/
│   │   │    └── controllers/
│   │   └── value-objects/
│   ├── tests/
│   └── utils/
├── tmp/
├── README.md
└── package.json
```

## Endpoints da API

### Cadastro de Motoristas

- **POST** `/driver`: Cria um novo motorista.
- **GET** `/driver`: Retorna todos os motoristas cadastrados.
- **GET** `/driver/{id}`: Retorna um motorista específico pelo ID.
- **PUT** `/driver/{id}`: Atualiza os dados de um motorista existente.
- **DELETE** `/driver/{id}`: Remove um motorista pelo ID.

### Cadastro de Passageiros

- **POST** `/passenger`: Cria um novo passageiro.
- **GET** `/passenger`: Retorna todos os passageiros cadastrados.
- **GET** `/passenger/{id}`: Retorna um passageiro específico pelo ID.
- **PUT** `/passenger/{id}`: Atualiza os dados de um passageiro existente.
- **DELETE** `/passenger/{id}`: Remove um passageiro pelo ID.

### Cálculo de Tarifa

- **POST** `/fare`: Calcula o preço da corrida com base na distância, localização e horário.
  - Parâmetros: `currentLocation`, `destination`, `dateTime`.
  - Retorna: `{ price: xx.xx, requestId: xxxxxxxxxxx }`.

### Aceitação de Corrida

- **POST** `/race`: Aceita uma corrida proposta.
  - Gera automaticamente um recibo em formato JSON e o armazena em `/tmp/{userId}/{date}`.

## Configuração e Uso

1. **Instalação:**
   ```
   npm install
   ```

2. **Execução:**
   ```
   npm run dev
   ```