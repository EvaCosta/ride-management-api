import { RaceAppService } from '../core/application/services/RaceAppService';
import { RaceService } from '../core/application/services/RaceService';
import { AcceptRaceDTO } from '../core/domain/models/AceptRaceDTO';
import { GeoLocation } from '../core/domain/value-objects/GeoLocation';
import { DateTime } from '../core/domain/value-objects/DateTime';

describe('RaceAppService', () => {
  let raceAppService: RaceAppService;
  let raceServiceMock: RaceService;

  beforeEach(() => {
    raceServiceMock = {
      acceptRace: jest.fn().mockReturnValue('Mocked acceptance result'),
    } as unknown as RaceService;

    raceAppService = new RaceAppService();
    (raceAppService as any).raceService = raceServiceMock;
  });

  it('should accept race with correct parameters', () => {
    const acceptRaceDTO: AcceptRaceDTO = {
      userId: 'user123',
      currentLocation: { lat: 10.123, lon: 20.456 },
      destination: { lat: 30.789, lon: 40.321 },
      dateTime: '2023-07-01T15:30:00Z',
    };

    const result = raceAppService.acceptRace(acceptRaceDTO);

    expect(raceServiceMock.acceptRace).toHaveBeenCalled();
    expect(raceServiceMock.acceptRace).toHaveBeenCalledWith({
      userId: acceptRaceDTO.userId,
      currentLocation: new GeoLocation(acceptRaceDTO.currentLocation.lat, acceptRaceDTO.currentLocation.lon),
      destination: new GeoLocation(acceptRaceDTO.destination.lat, acceptRaceDTO.destination.lon),
      dateTime: new DateTime(acceptRaceDTO.dateTime),
    });
    expect(result).toEqual('Mocked acceptance result');
  });
});
