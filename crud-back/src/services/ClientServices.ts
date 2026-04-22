import db from "../db.ts";
import { getDate } from "../Helpers/DateHelper.ts";

interface ClientData {
    name: string,
    email: string,
}

class ClientService {
    getClients = async() => {
        try {
            const [rows] = await db.query('SELECT * FROM customer WHERE deleted_at IS NULL');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    storeClients = async(clientData: ClientData) => {
        try {
            await db.beginTransaction();
            const {name, email} = clientData;
            const date = getDate();

            const [rows] = await db.query(
                `INSERT INTO customer(name, email, created_at, updated_at)
                VALUES(?, ?, ?, ?)
                RETURNING *`,
                [name, email, date, date]
            );
            await db.commit();

            return rows[0];
        } catch (error) {
            await db.rollback();
            throw error;
        }
    }

    updateClient = async(clientData: ClientData, id: number) => {
        try {
            await db.beginTransaction();
            const {name, email} = clientData;
            const date = getDate();

            const [rows] = await db.query(
                `UDPADE customer SET name=?, email=?, updated_at=?
                WHERE id=?
                RETURNING *`,
                [name, email, date, id]
            );
            await db.commit();

            return rows[0];
        } catch (error) {
            await db.rollback();
            throw error;
        }
    }

    deleteClient = async(id: number) => {
        try {
            await db.beginTransaction();
            const date = getDate();

            const [rows] = await db.query(
                `UDPADE customer SET deleted_at=?
                WHERE id=?
                RETURNING *`,
                [date, id]
            );
            await db.commit();

            return rows[0];
        } catch (error) {
            await db.rollback();
            throw error;
        }
    }

    searchClients = async(search: string) => {
        try {
            const [rows] = await db.query(
                `SELECT * FROM customer WHERE name like ? OR email like ?`,
                [`%${search}%`, `%${search}%`]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

export default new ClientService;