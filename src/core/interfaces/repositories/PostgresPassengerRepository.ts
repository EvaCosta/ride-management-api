import { Pool } from 'pg';
import config from '../../../config';
import { Passenger } from '../../domain/models/Passenger';
import { IPassengerRepository } from '../../domain/repositories/IPassengerRepository';

const pool = new Pool(config.db);

export class PostgresPassengerRepository implements IPassengerRepository {
  async create(passenger: Passenger): Promise<Passenger> {
    const client = await pool.connect();
    try {
      const { nome, cpf, idade, sexo, endereco } = passenger;
      const query = 'INSERT INTO passengers (nome, cpf, idade, sexo, endereco) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const values = [nome, cpf, idade, sexo, endereco];
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async findById(id: number): Promise<Passenger | null> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM passengers WHERE id = $1';
      const result = await client.query(query, [id]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  async findByCpf(cpf: string): Promise<Passenger | null> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM passengers WHERE cpf = $1';
      const result = await client.query(query, [cpf]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  async findAll(): Promise<Passenger[]> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM passengers';
      const result = await client.query(query);
      return result.rows;
    } finally {
      client.release();
    }
  }

  async update(id: number, passenger: Passenger): Promise<Passenger | null> {
    const client = await pool.connect();
    try {
      const { nome, cpf, idade, sexo, endereco } = passenger;
      const query = 'UPDATE passengers SET nome = $1, cpf = $2, idade = $3, sexo = $4, endereco = $5 WHERE id = $6 RETURNING *';
      const values = [nome, cpf, idade, sexo, endereco, id];
      const result = await client.query(query, values);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  async delete(id: number): Promise<boolean> {
    const client = await pool.connect();
    try {
      const query = 'DELETE FROM passengers WHERE id = $1';
      const result = await client.query(query, [id]);

      return result.rowCount != null && result.rowCount > 0;

    } finally {
      client.release();
    }
  }
}
