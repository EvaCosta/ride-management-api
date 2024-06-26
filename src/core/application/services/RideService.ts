import { Ride } from '../../domain/models/Ride';
import { IRideRepository } from '../../domain/repositories/IRideRepository';

export class RideService {
  constructor(private readonly rideRepository: IRideRepository) {}

  async create(ride: Ride): Promise<Ride> {
    return await this.rideRepository.create(ride);
  }

  async findById(id: number): Promise<Ride | null> {
    return await this.rideRepository.findById(id);
  }

  async findAll(): Promise<Ride[]> {
    return await this.rideRepository.findAll();
  }

  async update(id: number, ride: Ride): Promise<Ride | null> {
    return await this.rideRepository.update(id, ride);
  }

  async delete(id: number): Promise<boolean> {
    return await this.rideRepository.delete(id);
  }
}
