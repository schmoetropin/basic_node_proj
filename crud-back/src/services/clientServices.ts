import db from "../db.ts";

export const getClients = async() => {
    const [rows] = await db.query('SELECT * FROM customer');
    return rows;
}