import { Request, Response } from 'express';
import { PassengerService } from '../../application/services/PassengerService';
import { Passenger } from '../../domain/models/Passenger';

export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  async create(req: Request, res: Response) {
    try {
      const passenger: Passenger = req.body;
      const newPassenger = await this.passengerService.create(passenger);
      res.status(201).json(newPassenger);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const passenger = await this.passengerService.findById(parseInt(id));
    if (passenger) {
      res.status(200).json(passenger);
    } else {
      res.status(404).json({ message: 'Passageiro não encontrado.' });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const updatedPassenger: Passenger = req.body;
    const passenger = await this.passengerService.update(parseInt(id), updatedPassenger);
    if (passenger) {
      res.status(200).json(passenger);
    } else {
      res.status(404).json({ message: 'Passageiro não encontrado.' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const success = await this.passengerService.delete(parseInt(id));
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Passageiro não encontrado.' });
    }
  }

  async findAll(req: Request, res: Response) {
    const passengers = await this.passengerService.findAll();
    res.status(200).json(passengers);
  }
}
