import { Passenger } from "../../domain/models/Passenger";
import { IPassengerRepository } from '../../domain/repositories/IPassengerRepository';
import { CPF } from "../../domain/value-objects/CPF";
import { DateOfBirth } from "../../domain/value-objects/DateOfBirth";

export class PassengerService {
  constructor(private readonly passengerRepository: IPassengerRepository) {}

  private async validateCPF(cpf: string, id?: number): Promise<void> {
    const cpfObject = new CPF(cpf);
    const existingDriver = await this.passengerRepository.findByCpf(cpfObject.getValue());
    
    if (existingDriver  && existingDriver.id !== id) {
      throw new Error('Já existe um passageiro com este CPF.');
    }
  }
  async create(passenger: Passenger): Promise<Passenger> {
    try {
      new DateOfBirth(passenger.datanascimento);
      await this.validateCPF(passenger.cpf);
     
      return await this.passengerRepository.create(passenger);
    } catch (error) {
        throw error;
    }
  }

  async findById(id: number): Promise<Passenger | null> {
    return await this.passengerRepository.findById(id);
  }

  async update(id: number, passenger: Passenger): Promise<Passenger | null> {
    try {
      new DateOfBirth(passenger.datanascimento);
      await this.validateCPF(passenger.cpf, id);
      return await this.passengerRepository.update(id, passenger);
    } catch (error) {
        throw error;
    }
  }

  async delete(id: number): Promise<boolean> {
    return await this.passengerRepository.delete(id);
  }

  async findAll(): Promise<Passenger[]> {
    return await this.passengerRepository.findAll();
  }
}
