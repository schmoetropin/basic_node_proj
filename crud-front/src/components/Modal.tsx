import { useState, useEffect } from "react"
import { getList, storeCust, updateCust, showCust } from "../services/clientService"

interface ModalInterface {
    isOpen: boolean,
    onClose: () => void,
    mode: string,
    setCustomers: (data: any) => void,
    setOpen: (val: boolean) => void,
    custId: number,
};

export default function Modal({isOpen, onClose, mode, setCustomers, setOpen, custId}: ModalInterface){
    const [clNome, setClName] = useState<string>('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (mode == 'add') {
            setClName('');
            setEmail('');
        }
    }, [mode]);

    useEffect(() => {
        const fetchData = async() => {
            if (mode == 'edit') {
                let cust = await showCust(custId);
                if (cust.success) {
                    setClName(cust.data[0].name);
                    setEmail(cust.data[0].email);
                }
            }
        }
        fetchData().then();
    }, [custId]);

    const handleSubmit = async(e: any) => {
        e.preventDefault();
        
        let custData = {
            name: clNome,
            email,
        };

        if (mode == 'add') {
            store(custData);
        } else {
            update(custData, custId)
        }

        onClose();
    }

    const store = async(data: any) => {
        let saveCust = await storeCust(data);

        if (saveCust.success) {
            let cust = await getList();
            if (cust.success) {
                setCustomers(cust.data);
            }
        }
    }

    const update = async(data: any, id: Number) => {
        let saveCust = await updateCust(data, id);

        if (saveCust.success) {
            let cust = await getList();
            if (cust.success) {
                setCustomers(cust.data);
            }
        }
    }

    return(
        <dialog id="my_modal_3" className="modal" open={isOpen} onClose={onClose}>
            <div className="modal-box">
                <h3 className="font-bold text-lg py-4">
                    {mode == 'add' ? 'Adicionar' : 'Editar'}
                </h3>
                <form method="dialog" onSubmit={handleSubmit}>
                    <button
                        type="button"
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={() => setOpen(false)}
                    >
                        ✕
                    </button>

                    <div>
                        <input
                            type="text"
                            placeholder="Nome"
                            className="input"
                            value={clNome}
                            onChange={(e) => {setClName(e.target.value)}}
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            className="input"
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                        />
                    </div>

                    <button type="submit" className="btn btn-success">
                        {mode == 'add' ? 'Adicionar' : 'Editar'}
                    </button>
                </form>
            </div>
        </dialog>
    );
}