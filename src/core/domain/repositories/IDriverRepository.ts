import { Driver } from "../models/Driver";

export interface IDriverRepository {
  create(driver: Driver): Promise<Driver>;
  findById(id: number): Promise<Driver | null>;
  findByCpf(cpf: string): Promise<Driver | null>;
  findAll(): Promise<Driver[]>;
  update(id: number, driver: Driver): Promise<Driver | null>;
  delete(id: number): Promise<boolean>;
}