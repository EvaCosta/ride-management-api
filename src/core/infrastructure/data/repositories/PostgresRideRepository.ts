import { Pool } from 'pg';
import config from '../../../../config';
import { Ride } from '../../../domain/models/Ride';
import { IRideRepository } from '../../../domain/repositories/IRideRepository';

const pool = new Pool(config.db);

export class PostgresRideRepository implements IRideRepository {
   async create(ride: Ride): Promise<Ride> {
    const client = await pool.connect();
    try {
      const { userId, driverId, currentLocation, destination, fare, distance, dateTime, status } = ride;

      const query = `
        INSERT INTO rides (user_id, driver_id, current_lat, current_lon, dest_lat, dest_lon, fare, distance, date, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *`;
        
      const values = [userId, driverId, currentLocation.getLatitude(), currentLocation.getLongitude(),
                     destination.getLatitude(), destination.getLongitude(), fare, distance, dateTime.getValue(), status];
      
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async findById(id: number): Promise<Ride | null> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM rides WHERE id = $1';
      const result = await client.query(query, [id]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  async findAll(): Promise<Ride[]> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM rides';
      const result = await client.query(query);
      return result.rows;
    } finally {
      client.release();
    }
  }

  async update(id: number, ride: Ride): Promise<Ride | null> {
    const client = await pool.connect();
    try {
      const { userId, currentLocation, destination, dateTime } = ride;

      const query = 'UPDATE rides SET user_id = $1, current_lat = $2, current_lon = $3, dest_lat = $4, dest_lon = $5, date = $6 WHERE id = $7 RETURNING *';
      const values = [userId, currentLocation.getLatitude(), currentLocation.getLongitude(), destination.getLatitude(), destination.getLongitude(), dateTime, id];
      const result = await client.query(query, values);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  async delete(id: number): Promise<boolean> {
    const client = await pool.connect();
    try {
      const query = 'DELETE FROM rides WHERE id = $1';
      const result = await client.query(query, [id]);
      return result.rowCount != null && result.rowCount > 0;
    } finally {
      client.release();
    }
  }
}
