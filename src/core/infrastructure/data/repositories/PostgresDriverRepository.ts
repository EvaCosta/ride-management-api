import { Pool } from 'pg';
import config from '../../../../config';
import { Driver } from '../../../domain/models/Driver';
import { IDriverRepository } from '../../../domain/repositories/IDriverRepository';

const pool = new Pool(config.db);

export class PostgresDriverRepository implements IDriverRepository {
  async create(driver: Driver): Promise<Driver> {
    const client = await pool.connect();
    try {
      const { nome, cpf, datanascimento, sexo, endereco } = driver;
      
      const query = 'INSERT INTO drivers (nome, cpf, datanascimento, sexo, endereco) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const values = [nome, cpf, datanascimento, sexo, endereco];
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async findById(id: number): Promise<Driver | null> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM drivers WHERE id = $1';
      const result = await client.query(query, [id]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  async findByCpf(cpf: string): Promise<Driver | null> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM drivers WHERE cpf = $1';
      const result = await client.query(query, [cpf]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  async findAll(): Promise<Driver[]> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM drivers';
      const result = await client.query(query);
      return result.rows;
    } finally {
      client.release();
    }
  }

  async update(id: number, driver: Driver): Promise<Driver | null> {
    const client = await pool.connect();
    try {

      const { nome, cpf, datanascimento, sexo, endereco } = driver;

      const query = 'UPDATE drivers SET nome = $1, cpf = $2, datanascimento = $3, sexo = $4, endereco = $5 WHERE id = $6 RETURNING *';
      const values = [nome, cpf, datanascimento, sexo, endereco, id];
      const result = await client.query(query, values);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  async delete(id: number): Promise<boolean> {
    const client = await pool.connect();
    try {
      const query = 'DELETE FROM drivers WHERE id = $1';
      const result = await client.query(query, [id]);
      return result.rowCount != null && result.rowCount > 0;
    } finally {
      client.release();
    }
  }
}
