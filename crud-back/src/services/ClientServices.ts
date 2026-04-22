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
                VALUES(?, ?, ?, ?)`,
                [name, email, date, date]
            );
            await db.commit();

            return 1;
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
                `UPDATE customer SET name=?, email=?, updated_at=?
                WHERE id=?`,
                [name, email, date, id]
            );
            await db.commit();

            return 1;
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
                `UPDATE customer SET deleted_at=?
                WHERE id=?`,
                [date, id]
            );
            await db.commit();

            return 1;
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

    showClient = async(id: number) => {
        try {
            const [rows] = await db.query(
                `SELECT * FROM customer WHERE id=?`,
                [id]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }

    statusClient = async(id: number) => {
        try {
            await db.beginTransaction();
            const date = getDate();

            const customer = await this.showClient(id);
            if (customer[0]) {
                let status = customer[0].status == 1 ? 0 : 1;

                const [rows] = await db.query(
                    `UPDATE customer SET updated_at=?, status=?
                    WHERE id=?`,
                    [date, status, id]
                );
            }
            await db.commit();

            return 1;
        } catch (error) {
            await db.rollback();
            throw error;
        }
    }
}

export default new ClientService;