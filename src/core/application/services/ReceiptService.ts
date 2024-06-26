import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Receipt } from '../../domain/models/Receipt';

export class ReceiptService {
  private tmpDirectory: string;

  constructor() {
    this.tmpDirectory = path.join(__dirname, '../../../../tmp');
  }

  public async generateAndSaveReceipt(receipt: Receipt): Promise<void> {
    const receiptDate = receipt.date.split('T')[0];
    const receiptPath = path.join(this.tmpDirectory, receipt.userId, receiptDate);
    fs.mkdirSync(receiptPath, { recursive: true });

    const filename = `receipt-${uuidv4()}.json`;
    const filePath = path.join(receiptPath, filename);

    fs.writeFileSync(filePath, JSON.stringify(receipt, null, 2));
  }
}
