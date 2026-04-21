import ClientService from '../services/ClientServices.ts';

class Customer {
    getClients = async(request: any, response: any) => {
        try {
            const cust = await ClientService.getClients();
            response.status(200).json(cust);
        } catch (error) {
            console.log(error);
            response.status(500).json({message: 'Error fetching data'});
        }
    }

    storeClients = async(request: any, response: any) => {
        try {
            const cust = await ClientService.storeClients(request.body);
            response.status(200).json(cust);
        } catch (error) {
            console.log(error);
            response.status(500).json({message: 'Error fetching data'});
        }
    }

    updateClient = async(request: any, response: any) => {
        try {
            const cust = await ClientService.updateClient(request.body, request.params.id);
            response.status(200).json(cust);
        } catch (error) {
            console.log(error);
            response.status(500).json({message: 'Error fetching data'});
        }
    }

    deleteClient = async(request: any, response: any) => {
        try {
            const cust = await ClientService.deleteClient(request.params.id);
            response.status(200).json(cust);
        } catch (error) {
            console.log(error);
            response.status(500).json({message: 'Error fetching data'});
        }
    }

    searchClients = async(request: any, response: any) => {
        try {
            const cust = await ClientService.searchClients(request.params.search);
            response.status(200).json(cust);
        } catch (error) {
            console.log(error);
            response.status(500).json({message: 'Error fetching data'});
        }
    }
}

export default new Customer;