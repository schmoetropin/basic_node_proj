interface RequestUser {
    name: string,
    email: string,
}

interface Error {
    name?: string|undefined,
    email?: string|undefined,
}

class StoreCustomerRequest {
    rules(data: RequestUser) {
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