import { Request, Response } from 'express';
import { DriverService } from '../../application/services/DriverService';
import { Driver } from '../../domain/models/Driver';

export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  async create(req: Request, res: Response) {
    try {
      const driver: Driver = req.body;
      const newDriver = await this.driverService.create(driver);
      res.status(201).json(newDriver);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const driver = await this.driverService.findById(parseInt(id));
    if (driver) {
      res.status(200).json(driver);
    } else {
      res.status(404).json({ message: 'Motorista não encontrado.' });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const updatedDriver: Driver = req.body;
    const driver = await this.driverService.update(parseInt(id), updatedDriver);
    if (driver) {
      res.status(200).json(driver);
    } else {
      res.status(404).json({ message: 'Motorista não encontrado.' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const success = await this.driverService.delete(parseInt(id));
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Motorista não encontrado.' });
    }
  }

  async findAll(req: Request, res: Response) {
    const drivers = await this.driverService.findAll();
    res.status(200).json(drivers);
  }
}
