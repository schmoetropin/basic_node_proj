import mysql2 from 'mysql2/promise'
import env from 'dotenv';
env.config();

const db: any = await mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

export default db;