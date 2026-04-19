import * as clientService from '../services/clientServices.ts';

export const getClients = async(request: any, response: any) => {
    try {
        const cust = await clientService.getClients();
        response.status(200).json(cust);
    } catch (error) {
        console.log(error);
        response.status(500).json({message: 'Error fetching data'})
    }
}