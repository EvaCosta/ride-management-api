import { Receipt } from '../models/Receipt';

export interface IReceiptRepository {
  create(receipt: Receipt): Promise<Receipt>;
  findByUserIdAndDate(userId: string, date: string): Promise<Receipt | null>;
  deleteByUserIdAndDate(userId: string, date: string): Promise<boolean>;
}
