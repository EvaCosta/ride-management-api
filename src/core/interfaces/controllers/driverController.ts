import { Request, Response } from 'express';
import { DriverService } from '../../application/services/DriverService';
import { Driver } from '../../domain/models/Driver';
import { ResponseUtil } from "../../../utils/ResponseUtil";

export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  async create(req: Request, res: Response) {
    try {
      const driver: Driver = req.body;
      const newDriver = await this.driverService.create(driver);
      ResponseUtil.sendResponse(res, 201, newDriver);
    } catch (error) {
      ResponseUtil.handleError(res, error);
    }
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const driver = await this.driverService.findById(parseInt(id));
    if (!driver) {
      return ResponseUtil.notFound(res, 'Motorista não encontrado.');
    }
    ResponseUtil.sendResponse(res, 200, driver);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const updatedDriver: Driver = req.body;

    try {
      const driver = await this.driverService.update(parseInt(id), updatedDriver);
      if (!driver) {
        return ResponseUtil.notFound(res, 'Motorista não encontrado.');
      }
      ResponseUtil.sendResponse(res, 200, driver);
    } catch (error) {
      ResponseUtil.handleError(res, error);
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const success = await this.driverService.delete(parseInt(id));
    if (!success) {
      return ResponseUtil.notFound(res, 'Motorista não encontrado.');
    }
    ResponseUtil.sendResponse(res, 204, { message: 'Motorista deletado com sucesso.' });
  }

  async findAll(req: Request, res: Response) {
    try {
      const drivers = await this.driverService.findAll();
      ResponseUtil.sendResponse(res, 200, drivers);
    } catch (error) {
      ResponseUtil.handleError(res, error);
    }
  }
}
