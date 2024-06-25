import { Request, Response } from 'express';
import { RaceAppService } from '../core/application/services/RaceAppService';

export class RaceController {
  private raceAppService: RaceAppService;

  constructor() {
    this.raceAppService = new RaceAppService();
  }

  async acceptRace(req: Request, res: Response): Promise<void> {
    try {
      const { userId, currentLocation, destination, dateTime } = req.body;

      const receipt = this.raceAppService.acceptRace({ userId, currentLocation, destination, dateTime });
      res.json({ message: 'Corrida aceita com sucesso. Recibo gerado.', receipt });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
