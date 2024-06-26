import { Pool } from 'pg';
import config from '../../../../config';
import { Receipt } from '../../../domain/models/Receipt';
import { IReceiptRepository } from '../../../domain/repositories/IReceiptRepository';

const pool = new Pool(config.db);

export class PostgresReceiptRepository implements IReceiptRepository {
  async create(receipt: Receipt): Promise<Receipt> {
    const client = await pool.connect();
    try {
      const { rideId, userId, date, value, distance } = receipt;

      const query = `
        INSERT INTO receipts (ride_id, user_id, date, value, distance)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`;
        
      const values = [rideId, userId, date, value, distance];
      
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async findByUserIdAndDate(userId: string, date: string): Promise<Receipt | null> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM receipts WHERE user_id = $1 AND date = $2';
      const result = await client.query(query, [userId, date]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  async deleteByUserIdAndDate(userId: string, date: string): Promise<boolean> {
    const client = await pool.connect();
    try {
      const query = 'DELETE FROM receipts WHERE user_id = $1 AND date = $2';
      const result = await client.query(query, [userId, date]);
      return result.rowCount != null && result.rowCount > 0;
    } finally {
      client.release();
    }
  }
}
