import { Driver } from "../../domain/models/Driver";
import { IDriverRepository } from '../../domain/repositories/IDriverRepository';

export class DriverService {
  constructor(private readonly driverRepository: IDriverRepository) {}

  async create(driver: Driver): Promise<Driver> {
    const existingDriver = await this.driverRepository.findByCpf(driver.cpf);
    if (existingDriver) {
      throw new Error('Já existe um motorista com este CPF.');
    }

    return await this.driverRepository.create(driver);
  }

  async findById(id: number): Promise<Driver | null> {
    return await this.driverRepository.findById(id);
  }

  async update(id: number, driver: Driver): Promise<Driver | null> {
    return await this.driverRepository.update(id, driver);
  }

  async delete(id: number): Promise<boolean> {
    return await this.driverRepository.delete(id);
  }

  async findAll(): Promise<Driver[]> {
    return await this.driverRepository.findAll();
  }
}
