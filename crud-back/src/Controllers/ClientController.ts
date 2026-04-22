import ClientService from '../services/ClientServices.ts';
import StoreCustomerRequest from '../Requests/StoreCustomerRequest.ts';

class Customer {
    getClients = async(request: any, response: any) => {
        try {
            const cust = await ClientService.getClients();
            response.status(200).json(cust);
        } catch (error) {
            console.log(error);
            response.status(500).json({message: 'Error getting customers list'});
        }
    }

    storeClients = async(request: any, response: any) => {
        try {
            const req = StoreCustomerRequest.rules(request.body);
            if (!req.valid) {
                response.status(422).json(req.errors);
            } else {
                const cust = await ClientService.storeClients(request.body);
                response.status(200).json(cust);
            }
        } catch (error) {
            console.log(error);
            response.status(500).json({message: 'Error storing customer'});
        }
    }

    updateClient = async(request: any, response: any) => {
        try {
            const req = StoreCustomerRequest.rules(request.body);
            if (!req.valid) {
                response.status(422).json(req.errors);
            } else {
                const cust = await ClientService.updateClient(request.body, request.params.id);
                response.status(200).json(cust);
            }
        } catch (error) {
            console.log(error);
            response.status(500).json({message: 'Error updating customer'});
        }
    }

    deleteClient = async(request: any, response: any) => {
        try {
            const cust = await ClientService.deleteClient(request.params.id);
            response.status(200).json(cust);
        } catch (error) {
            console.log(error);
            response.status(500).json({message: 'Error deleting customer'});
        }
    }

    searchClients = async(request: any, response: any) => {
        try {
            const cust = await ClientService.searchClients(request.params.search);
            response.status(200).json(cust);
        } catch (error) {
            console.log(error);
            response.status(500).json({message: 'Error searching customers'});
        }
    }

    showClient = async(request: any, response: any) => {
        try {
            const cust = await ClientService.showClient(request.params.id);
            response.status(200).json(cust);
        } catch (error) {
            console.log(error);
            response.status(500).json({message: 'Error showing customer'});
        }
    }
}

export default new Customer;