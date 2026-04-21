import db from "../db.ts";
import { getDate } from "../Helpers/DateHelper.ts";

interface ClientData {
    name: string,
    email: string,
}

class ClientService {
    getClients = async() => {
        try {
            const [rows] = await db.query('SELECT * FROM customer');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    storeClients = async(clientData: ClientData) => {
        try {
            const {name, email} = clientData;
            const date = getDate;
            const [rows] = await db.query(
                `INSERT INTO customer(name, email, created_at, updated_at)
                VALUES($name, $email, $created_at, $updated_at)
                RETURNING *`,
                [name, email, date, date]
            );

            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    updateClient = async(clientData: ClientData, id: number) => {
        try {
            const {name, email} = clientData;
            const date = getDate;
            const [rows] = await db.query(
                `UDPADE customer SET name=$name, email=$email, updated_at=$updated_at
                WHERE id=$id
                RETURNING *`,
                [name, email, date, id]
            );

            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    deleteClient = async(id: number) => {
        try {
            const date = getDate;
            const [rows] = await db.query(
                `UDPADE customer SET updated_at=$deleted_at
                WHERE id=$id
                RETURNING *`,
                [date, id]
            );

            return rows[0];
        } catch (error) {
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