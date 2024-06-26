import { Request, Response } from 'express';
import { RideService } from '../core/application/services/RideService';
import { Ride } from '../core/domain/models/Ride';

export class RideController {
  constructor(private readonly rideService: RideService) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const ride: Ride = req.body;
      const createdRide = await this.rideService.create(ride);
      res.status(201).json(createdRide);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const ride = await this.rideService.findById(id);
      if (ride) {
        res.status(200).json(ride);
      } else {
        res.status(404).json({ message: 'Ride not found' });
      }
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const rides = await this.rideService.findAll();
      res.status(200).json(rides);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const ride: Ride = req.body;
      const updatedRide = await this.rideService.update(id, ride);
      if (updatedRide) {
        res.status(200).json(updatedRide);
      } else {
        res.status(404).json({ message: 'Ride not found' });
      }
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const deleted = await this.rideService.delete(id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Ride not found' });
      }
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}
