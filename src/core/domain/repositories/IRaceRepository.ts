import { Race } from "../models/Race";

export interface IRaceRepository {
    create(race: Race): Promise<Race>;
    findById(id: number): Promise<Race | null>;
}