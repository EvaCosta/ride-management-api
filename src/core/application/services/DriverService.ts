import { Driver } from "../../domain/models/Driver";
import { IDriverRepository } from '../../domain/repositories/IDriverRepository';
import {CPF} from '../../domain/value-objects/CPF';
import { DateOfBirth } from "../../domain/value-objects/DateOfBirth";

export class DriverService {
  constructor(private readonly driverRepository: IDriverRepository) {}

  private async validateCPF(cpf: string, id?: number): Promise<void> {
    const cpfObject = new CPF(cpf);
    const existingDriver = await this.driverRepository.findByCpf(cpfObject.getValue());
    
    if (existingDriver  && existingDriver.id !== id) {
      throw new Error('Já existe um motorista com este CPF.');
    }
  }

  async create(driver: Driver): Promise<Driver> {
    try {
      new DateOfBirth(driver.datanascimento);
      await this.validateCPF(driver.cpf);

      return await this.driverRepository.create(driver);
    } catch (error) {
        throw error;
    }
  }

  async update(id: number, driver: Driver): Promise<Driver | null> {
    try {
      new DateOfBirth(driver.datanascimento);
      await this.validateCPF(driver.cpf, id);
      return await this.driverRepository.update(id, driver);
    } catch (error) {
        throw error;
    }
  }

  async delete(id: number): Promise<boolean> {
    return await this.driverRepository.delete(id);
  }

  async findAll(): Promise<Driver[]> {
    return await this.driverRepository.findAll();
  }

  
  async findById(id: number): Promise<Driver | null> {
    return await this.driverRepository.findById(id);
  }


}
