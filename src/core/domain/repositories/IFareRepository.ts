import { Fare } from "../models/Fare";

export interface IFareRepository {
    create(fare: Fare): Promise<Fare>;
    findById(id: number): Promise<Fare | null>;
}