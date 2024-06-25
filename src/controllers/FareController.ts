import { Request, Response } from 'express';
import { calculateFare } from '../utils/calculateFare';
import { FareService } from '../core/application/services/FareService';
import { DateTime } from '../core/domain/value-objects/DateTime';
import { GeoLocation } from '../core/domain/value-objects/GeoLocation';

export class FareController {
  private fareService: FareService;

  constructor() {
    this.fareService = new FareService();
  }

  async calculateFare(req: Request, res: Response): Promise<void> {
    try {
      const { currentLocation, destination, dateTime } = req.body;

      const dateTimeValue = new DateTime(dateTime);
      const currentLocationValue = new GeoLocation(currentLocation.lat, currentLocation.lon);
      const destinationValue = new GeoLocation(destination.lat, destination.lon);

      const fareRate = this.fareService.getFareRate(dateTimeValue);
      const result = calculateFare(currentLocationValue, destinationValue, fareRate);

      res.json(result);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
