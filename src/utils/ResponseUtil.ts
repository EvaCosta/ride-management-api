import { Response } from 'express';

export class ResponseUtil {
  static handleError(res: Response, error: any) {
    res.status(400).json({ error: (error as Error).message });
  }

  static notFound(res: Response, message: string = 'Recurso não encontrado.') {
    res.status(404).json({ message });
  }

  static sendResponse(res: Response, statusCode: number, data: any) {
    res.status(statusCode).json(data);
  }
}