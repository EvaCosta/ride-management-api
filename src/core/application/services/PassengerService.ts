import { Passenger } from "../../domain/models/Passenger";
import { IPassengerRepository } from '../../domain/repositories/IPassengerRepository';

export class PassengerService {
  constructor(private readonly passengerRepository: IPassengerRepository) {}

  async create(passenger: Passenger): Promise<Passenger> {
    const existingPassenger = await this.passengerRepository.findByCpf(passenger.cpf);
    if (existingPassenger) {
      throw new Error('Já existe um passageiro com este CPF.');
    }

    return await this.passengerRepository.create(passenger);
  }

  async findById(id: number): Promise<Passenger | null> {
    return await this.passengerRepository.findById(id);
  }

  async update(id: number, passenger: Passenger): Promise<Passenger | null> {
    return await this.passengerRepository.update(id, passenger);
  }

  async delete(id: number): Promise<boolean> {
    return await this.passengerRepository.delete(id);
  }

  async findAll(): Promise<Passenger[]> {
    return await this.passengerRepository.findAll();
  }
}
