import { FareService } from './FareService';
import { calculateFare } from '../../../utils/calculateFare';
import { calculateDistance } from '../../../utils/calculateDistance';
import { AcceptRaceParams } from '../../domain/models/AcceptRaceParams';
import { Receipt } from '../../domain/models/Receipt';
import { PostgresReceiptRepository } from '../../infrastructure/data/repositories/PostgresReceiptRepository';
import { ReceiptService } from './ReceiptService';
import { PostgresRideRepository } from '../../infrastructure/data/repositories/PostgresRideRepository';
import { PostgresDriverRepository } from '../../infrastructure/data/repositories/PostgresDriverRepository';
import { v4 as uuidv4 } from 'uuid';
import { Ride } from '../../domain/models/Ride';

export class RaceService {
  private fareService: FareService;
  private receiptService: ReceiptService;
  private receiptRepository: PostgresReceiptRepository;
  private rideRepository: PostgresRideRepository;
  private driverRepository: PostgresDriverRepository;

  constructor() {
    this.fareService = new FareService();
    this.receiptService = new ReceiptService();
    this.receiptRepository = new PostgresReceiptRepository();
    this.rideRepository = new PostgresRideRepository();
    this.driverRepository = new PostgresDriverRepository();
  }

  public async acceptRace(params: AcceptRaceParams): Promise<Receipt> {
    const { userId, currentLocation, destination, dateTime } = params;

    const fareRate = this.fareService.getFareRate(dateTime);
    const result = calculateFare(currentLocation, destination, fareRate);
    const driverId = await this.driverRepository.findAvailableDriver(currentLocation, dateTime);

    if (!driverId) {
      throw new Error('Nenhum motorista disponível no momento.');
    }

    const rideId = uuidv4();

    const ride: Ride = {
      id: rideId,
      userId,
      driverId,
      currentLocation,
      destination,
      fare: result.price,
      distance: calculateDistance(currentLocation.getLatitude(), currentLocation.getLongitude(), destination.getLatitude(), destination.getLongitude()),
      dateTime,
      status: 'accepted'
    };

    const createdRide = await this.rideRepository.create(ride);

    const receiptId = uuidv4();

    const receipt: Receipt = {
      id: receiptId,
      rideId: createdRide.id,
      userId: ride.userId,
      date: ride.dateTime.toString(),
      value: ride.fare,
      distance: ride.distance
    };
    await this.receiptRepository.create(receipt);

    await this.receiptService.generateAndSaveReceipt(receipt);

    return receipt;
  }
}
