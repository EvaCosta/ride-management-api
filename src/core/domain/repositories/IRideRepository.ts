import { Ride } from '../models/Ride';

export interface IRideRepository {
  create(ride: Ride): Promise<Ride>;
  findById(id: number): Promise<Ride | null>;
  findAll(): Promise<Ride[]>;
  update(id: number, ride: Ride): Promise<Ride | null>;
  delete(id: number): Promise<boolean>;
}