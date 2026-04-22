import { useState } from "react"
import { storeCust } from "../services/clientService"

interface ModalInterface {
    isOpen: boolean,
    onClose: () => void,
    mode: string,
    setCustomers: (data: any) => void,
};

export default function Modal({isOpen, onClose, mode, setCustomers}: ModalInterface){
    const [clNome, setClName] = useState<string>('');
    const [email, setEmail] = useState('');

    const handleSubmit = async(e: any) => {
        e.preventDefault();
        let {data} = await storeCust({
            name: clNome,
            email,
        });
        console.log(data);
        onClose();
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
                        onClick={() => {}}
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