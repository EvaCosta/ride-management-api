import { Pool } from 'pg';
import config from '../config';
import { PostgresDriverRepository } from '../core/infrastructure/data/repositories/PostgresDriverRepository';
import { Driver } from '../core/domain/models/Driver';

// Configurar mock para o Pool do PostgreSQL
jest.mock('pg', () => {
  const mockPool = {
    connect: jest.fn(),
  };
  return {
    __esModule: true,
    Pool: jest.fn(() => mockPool),
  };
});

describe('PostgresDriverRepository', () => {
  let repository: PostgresDriverRepository;
  let mockPool: any; // Mock do Pool do PostgreSQL

  beforeEach(() => {
    mockPool = new Pool(config.db);
    repository = new PostgresDriverRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new driver', async () => {
    const mockDriver: Driver = {
      id: 1,
      nome: 'John Doe',
      cpf: '12345678900',
      datanascimento: '1990-01-01',
      sexo: 'M',
      endereco: '123 Main St',
      disponivel: true,
      cnh: '123456',
    };

    // Mock da função connect para retornar um cliente simulado
    mockPool.connect.mockResolvedValueOnce({
      query: jest.fn().mockResolvedValueOnce({ rows: [mockDriver] }),
      release: jest.fn(),
    });

    const createdDriver = await repository.create(mockDriver);
    expect(createdDriver).toEqual(mockDriver);
  });

  it('should find a driver by ID', async () => {
    const mockDriver: Driver = {
      id: 1,
      nome: 'John Doe',
      cpf: '12345678900',
      datanascimento: '1990-01-01',
      sexo: 'M',
      endereco: '123 Main St',
      disponivel: true,
      cnh: '123456',
    };

    // Mock da função connect para retornar um cliente simulado
    mockPool.connect.mockResolvedValueOnce({
      query: jest.fn().mockResolvedValueOnce({ rows: [mockDriver] }),
      release: jest.fn(),
    });

    const foundDriver = await repository.findById(1);
    expect(foundDriver).toEqual(mockDriver);
  });

  // Testes similares para os demais métodos (findByCpf, findAll, update, delete, findAvailableDriver)
});

