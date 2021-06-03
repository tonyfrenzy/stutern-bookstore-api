import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: 'localhost',
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
});

pool.on('connect', () => console.log('Database connected successfully'));

pool.on('error', (err) => console.log(`Error: ${err}`));

export default pool;