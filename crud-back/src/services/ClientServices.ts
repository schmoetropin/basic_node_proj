import db from "../db.ts";
import { getDate } from "../Helpers/DateHelper.ts";

interface ClientData {
    name: string,
    email: string,
}

class ClientService {
    getClients = async() => {
        const [rows] = await db.query('SELECT * FROM customer');
        return rows;
    }

    storeClients = async(clientData: ClientData) => {
        const {name, email} = clientData;
        const date = getDate;
        const [rows] = await db.query(
            `INSERT INTO customer(name, email, created_at, updated_at)
            VALUES($name, $email, $created_at, $updated_at)
            RETURNING *`,
            [name, email, date, date]
        );

        return rows[0];
    }
}

export default new ClientService;