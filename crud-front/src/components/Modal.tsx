import { useState } from "react"

interface ModalInterface {
    isOpen: boolean,
    onClose: () => void,
    mode: string,
    onSubmit: () => void,
};

export default function Modal({isOpen, onClose, mode, onSubmit}: ModalInterface){
    const [clNome, setClName] = useState<string>('');
    const [email, setEmail] = useState('');

    return(
        <dialog id="my_modal_3" className="modal" open={isOpen} onClose={onClose}>
            <div className="modal-box">
                <h3 className="font-bold text-lg py-4">
                    {mode == 'add' ? 'Adicionar' : 'Editar'}
                </h3>
                <form method="dialog">
                    <button
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

                    <button className="btn btn-success">
                        {mode == 'add' ? 'Adicionar' : 'Editar'}
                    </button>
                </form>
            </div>
        </dialog>
    );
}