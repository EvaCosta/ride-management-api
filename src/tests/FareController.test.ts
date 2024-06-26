import { Request, Response } from 'express';
import { FareController } from '../controllers/FareController';
import { FareService } from '../core/application/services/FareService';
import { DateTime } from '../core/domain/value-objects/DateTime';
import { GeoLocation } from '../core/domain/value-objects/GeoLocation';


jest.mock('../core/application/services/FareService');

describe('FareController', () => {
  let fareController: FareController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    const mockFareService = new FareService() as jest.Mocked<FareService>;
    fareController = new FareController();
    fareController['fareService'] = mockFareService;


    const currentDate = new Date();
    const pastDate = new Date(currentDate.getTime() - 1000 * 60 * 60 * 24); 
    mockRequest = {
      body: {
        currentLocation: { lat: 1.23, lon: 4.56 },
        destination: { lat: 7.89, lon: 0.12 },
        dateTime: pastDate.toISOString() 
      }
    };

    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should calculate fare correctly', async () => {
    const mockDateTime = new DateTime(mockRequest.body.dateTime);
    const mockCurrentLocation = new GeoLocation(mockRequest.body.currentLocation.lat, mockRequest.body.currentLocation.lon);
    const mockDestination = new GeoLocation(mockRequest.body.destination.lat, mockRequest.body.destination.lon);
    const mockFareRate = 10; // Mocking fare rate
    const mockResult = { price: 8890.18, requestId: 'f5f53984-e1c2-46cd-9100-99c57ce843b4' };

    (fareController['fareService'].getFareRate as jest.Mock).mockReturnValue(mockFareRate);
    (mockResponse.json as jest.Mock).mockImplementation((result) => {
      expect(result).toHaveProperty('price');
      expect(typeof result.price).toBe('number');
    });

    await fareController.calculateFare(mockRequest as Request, mockResponse as Response);

    expect(fareController['fareService'].getFareRate).toHaveBeenCalledWith(mockDateTime);
    expect(mockResponse.json).toHaveBeenCalled();
  });

  it('should handle error if calculation fails', async () => {
    const errorMessage = 'Invalid date time format';
    (fareController['fareService'].getFareRate as jest.Mock).mockImplementation(() => {
      throw new Error(errorMessage);
    });

    await fareController.calculateFare(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
