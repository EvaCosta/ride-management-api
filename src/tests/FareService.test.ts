import { FareService } from '../core/application/services/FareService';
import { DateTime } from '../core/domain/value-objects/DateTime';

describe('FareService', () => {
  let fareService: FareService;

  beforeEach(() => {
    fareService = new FareService();
  });

  it('should calculate weekday rate correctly', () => {
    const dateTimeString = '2024-06-25T10:00:00Z'; 
    const dateTime = new DateTime(dateTimeString);
    const fareRate = fareService.getFareRate(dateTime);
    expect(fareRate).toEqual(3.1); 
  });

  it('should calculate weekend rate correctly', () => {
    const dateTimeString = '2024-06-22T18:00:00Z'; 
    const dateTime = new DateTime(dateTimeString);
    const fareRate = fareService.getFareRate(dateTime);
    expect(fareRate).toEqual(3); 
  });

});
