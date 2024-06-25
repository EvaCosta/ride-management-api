import { GeoLocation } from '../../domain/value-objects/GeoLocation';
import { DateTime } from '../../domain/value-objects/DateTime';
import { RaceService } from './RaceService';
import { AcceptRaceDTO } from '../../domain/models/AceptRaceDTO';

export class RaceAppService {
  private raceService: RaceService;

  constructor() {
    this.raceService = new RaceService();
  }

  public acceptRace(dto: AcceptRaceDTO) {
    const currentLocation = new GeoLocation(dto.currentLocation.lat, dto.currentLocation.lon);
    const destination = new GeoLocation(dto.destination.lat, dto.destination.lon);
    const dateTime = new DateTime(dto.dateTime);

    return this.raceService.acceptRace({
      userId: dto.userId,
      currentLocation,
      destination,
      dateTime,
    });
  }
}
