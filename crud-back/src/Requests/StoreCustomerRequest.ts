import db from "../db.ts";

interface RequestUser {
    cust_id?: number,
    name: string,
    email: string,
}

interface Error {
    name?: string|undefined,
    email?: string|undefined,
}

class StoreCustomerRequest {
    async rules(data: RequestUser) {
        try {
            const errors: Error = {};

            if (!data.name) {
                errors.name = 'Name is required';
            }

            if (!data.email) {
                errors.email = 'Email is required';
            } else {
                const testEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
                if (!testEmail) {
                    errors.email = 'Email is not valid';
                }

                let checkEmailQuery = 'SELECT * FROM customer WHERE email=? AND deleted_at IS NULL';
                let checkEmailArray: any[] = [data.email];

                if (data.cust_id) {
                    checkEmailQuery += ' AND id<>?';
                    checkEmailArray = [
                        ...checkEmailArray,
                        data.cust_id,
                    ];
                }

                const regEmail = await db.query(checkEmailQuery, checkEmailArray);

                if (regEmail[0].length) {
                    errors.email = 'Email already registered';
                }
            }

            return {
                valid: Object.keys(errors).length === 0,
                errors
            };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default new StoreCustomerRequest;