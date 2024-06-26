import { Response } from 'express';
import { ResponseUtil } from '../utils/ResponseUtil';

describe('ResponseUtil', () => {
  let mockResponse: Response;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;
  });

  it('should handle errors correctly', () => {
    const error = new Error('Test error');
    ResponseUtil.handleError(mockResponse, error);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Test error' });
  });

  it('should handle not found correctly with default message', () => {
    ResponseUtil.notFound(mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Recurso não encontrado.' });
  });

  it('should handle not found correctly with custom message', () => {
    const customMessage = 'Custom not found message';
    ResponseUtil.notFound(mockResponse, customMessage);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: customMessage });
  });

  it('should send response with specified status code and data', () => {
    const statusCode = 200;
    const data = { key: 'value' };
    ResponseUtil.sendResponse(mockResponse, statusCode, data);

    expect(mockResponse.status).toHaveBeenCalledWith(statusCode);
    expect(mockResponse.json).toHaveBeenCalledWith(data);
  });
});
