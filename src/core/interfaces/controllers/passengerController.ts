import { Request, Response } from 'express';
import { PassengerService } from '../../application/services/PassengerService';
import { Passenger } from '../../domain/models/Passenger';
import { ResponseUtil } from "../../../utils/ResponseUtil";

export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  async create(req: Request, res: Response) {
    try {
      const passenger: Passenger = req.body;
      const newPassenger = await this.passengerService.create(passenger);
      ResponseUtil.sendResponse(res, 201, newPassenger);
    } catch (error) {
      ResponseUtil.handleError(res, error);
    }
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const passenger = await this.passengerService.findById(parseInt(id));
    if (!passenger) {
      return ResponseUtil.notFound(res, 'Passageiro não encontrado.');
    }
    ResponseUtil.sendResponse(res, 200, passenger);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const updatedPassenger: Passenger = req.body;

    try {
      const passenger = await this.passengerService.update(parseInt(id), updatedPassenger);
      if (!passenger) {
        return ResponseUtil.notFound(res,'Passageiro não encontrado.')
      }
      ResponseUtil.sendResponse(res, 200, passenger);
    } catch (error) {
      ResponseUtil.handleError(res, error);
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const success = await this.passengerService.delete(parseInt(id));
    if (!success) {
      return ResponseUtil.notFound(res,'Passageiro não encontrado.')
    }
    ResponseUtil.sendResponse(res, 204, { message: 'Passageiro deletado com sucesso.' });
 
  }

  async findAll(req: Request, res: Response) {
    try {
      const passengers = await this.passengerService.findAll();
      ResponseUtil.sendResponse(res, 200, passengers);
    } catch (error) {
      ResponseUtil.handleError(res, error);
    }
  }
}
