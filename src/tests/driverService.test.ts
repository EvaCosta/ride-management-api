import { DriverService } from "../core/application/services/DriverService";
import { Driver } from "../core/domain/models/Driver";

class MockDriverRepository {
  private drivers: Driver[] = [];

  async create(driver: Driver): Promise<Driver> {
    this.drivers.push(driver);
    return driver;
  }

  async findById(id: number): Promise<Driver | null> {
    return this.drivers.find(d => d.id === id) || null;
  }

  async update(id: number, driver: Driver): Promise<Driver | null> {
    const index = this.drivers.findIndex(d => d.id === id);
    if (index !== -1) {
      this.drivers[index] = driver;
      return driver;
    }
    return null;
  }

  async delete(id: number): Promise<boolean> {
    const index = this.drivers.findIndex(d => d.id === id);
    if (index !== -1) {
      this.drivers.splice(index, 1);
      return true;
    }
    return false;
  }

  async findAll(): Promise<Driver[]> {
    return this.drivers;
  }

  async findByCpf(cpf: string): Promise<Driver | null> {
    return this.drivers.find(d => d.cpf === cpf) || null;
  }
}

describe('DriverService', () => {
  let driverService: DriverService;
  let mockDriverRepository: MockDriverRepository;

  beforeEach(() => {
    mockDriverRepository = new MockDriverRepository();
    driverService = new DriverService(mockDriverRepository);
  });

  it('should create a new driver', async () => {
    const newDriver: Driver = {
      id: 1,
      nome: 'João Silva',
      cpf: '111.444.777-35',
      datanascimento: '2000-12-05',
      sexo: 'M',
      endereco: 'Rua A, 123',
    };

    const createdDriver = await driverService.create(newDriver);
    expect(createdDriver).toEqual(newDriver);

    const foundDriver = await driverService.findById(1);
    expect(foundDriver).toEqual(newDriver);
  });

  it('should not create a driver with duplicate CPF', async () => {
    const newDriver: Driver = {
      id: 1,
      nome: 'João Silva',
      cpf: '111.444.777-35',
      datanascimento: '2000-12-05',
      sexo: 'M',
      endereco: 'Rua A, 123',
    };

    await driverService.create(newDriver);

    await expect(driverService.create(newDriver)).rejects.toThrowError('Já existe um motorista com este CPF.');
  });

  it('should find a driver by ID', async () => {
    const newDriver: Driver = {
      id: 1,
      nome: 'João Silva',
      cpf: '111.444.777-35',
      datanascimento: '2000-12-05',
      sexo: 'M',
      endereco: 'Rua A, 123',
    };

    await driverService.create(newDriver);

    const foundDriver = await driverService.findById(1);
    expect(foundDriver).toEqual(newDriver);
  });


});
