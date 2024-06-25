import { FareService } from './FareService';
import { calculateFare } from '../../../utils/calculateFare';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { calculateDistance } from '../../../utils/calculateDistance';
import { AcceptRaceParams } from '../../domain/models/AcceptRaceParams';
import { Receipt } from '../../domain/models/Receipt';

export class RaceService {
  private fareService: FareService;
  private tmpDirectory: string;

  constructor() {
    this.fareService = new FareService();
    this.tmpDirectory = path.join(__dirname, '../../../../tmp');
  }

  public acceptRace(params: AcceptRaceParams): Receipt {
    const { userId, currentLocation, destination, dateTime } = params;

    const fareRate = this.fareService.getFareRate(dateTime);
    const result = calculateFare(currentLocation, destination, fareRate);

    const receipt: Receipt = {
      userId,
      date: dateTime.getValue().toISOString(),
      value: result.price,
      distance: calculateDistance(currentLocation.getLatitude(), currentLocation.getLongitude(), destination.getLatitude(), destination.getLongitude())
    };

    // Async operation to save receipt
    this.saveReceipt(receipt);

    return receipt;
  }

  private async saveReceipt(receipt: Receipt): Promise<void> {
    const receiptDate = receipt.date.split('T')[0];
    const receiptPath = path.join(this.tmpDirectory, receipt.userId, receiptDate);
    console.log(receipt.userId)
    fs.mkdirSync(receiptPath, { recursive: true });
    fs.writeFileSync(
      path.join(receiptPath, `receipt-${uuidv4()}.txt`),
      JSON.stringify(receipt, null, 2)
    );
  }
}
