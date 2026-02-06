import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Use pool connection for Neon
const { Pool } = pg;
const connectionString = process.env.DATABASE_URL;
export const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

// Test database connection
pool.on('connect', () => {
    console.log('Connected to Neon database');
});