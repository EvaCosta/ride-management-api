import { Passenger } from "../models/Passenger";

export interface IPassengerRepository {
    create(passenger: Passenger): Promise<Passenger>;
    findById(id: number): Promise<Passenger | null>;
    findByCpf(cpf: string): Promise<Passenger | null>;
    findAll(): Promise<Passenger[]>;
    update(id: number, passenger: Passenger): Promise<Passenger | null>;
    delete(id: number): Promise<boolean>;
}