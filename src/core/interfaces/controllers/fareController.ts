import { Request, Response } from 'express';
import { calculateFare } from '../../../utils/fareCalculator';
import { FareService } from '../../application/services/FareService';
import { DateTime } from '../../domain/value-objects/DateTime';

export class FareController {
  private fareService: FareService;

  constructor() {
    this.fareService = new FareService();
  }

  async calculateFare(req: Request, res: Response): Promise<void> {
    try {
      const { currentLocation, destination, dateTime } = req.body;

      const dateTimeValue = new DateTime(dateTime);
      const fareRate = this.fareService.getFareRate(dateTimeValue);
      const result = calculateFare(currentLocation, destination, fareRate);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
