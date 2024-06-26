import fs from 'fs';
import path from 'path';
import { ReceiptService } from '../core/application/services/ReceiptService';
import { Receipt } from '../core/domain/models/Receipt';

describe('ReceiptService', () => {
  let receiptService: ReceiptService;
  const mockReceipt: Receipt = {
    id: '1',
    rideId: 'ride-1',
    userId: 'user-1',
    date: '2023-06-25T12:00:00Z',
    value: 50.0,
    distance: 10.5,
  };

  beforeEach(() => {
    receiptService = new ReceiptService();
  });

  it('should generate and save receipt file', async () => {
    const receiptPath = path.join(__dirname, '../../tmp', mockReceipt.userId, '2023-06-25');
    const filenameRegex = /^receipt-\w{8}-\w{4}-\w{4}-\w{4}-\w{12}\.json$/;

    try {
      await receiptService.generateAndSaveReceipt(mockReceipt);

      expect(fs.existsSync(receiptPath)).toBe(true);

      const files = fs.readdirSync(receiptPath);
      const generatedFile = files.find((file) => filenameRegex.test(file));
      expect(generatedFile).toBeDefined();

      if (generatedFile) {
        const filePath = path.join(receiptPath, generatedFile);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const parsedReceipt = JSON.parse(fileContent) as Receipt;
        expect(parsedReceipt).toEqual(mockReceipt);
      } else {
        throw new Error('Receipt file was not generated.');
      }
    } catch (error) {
      throw new Error(`Error generating receipt: ${error}`);
    }
  });
});
