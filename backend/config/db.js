import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'insurance_db',
  password: 'Annuman@7',
  port: 5432,
});
