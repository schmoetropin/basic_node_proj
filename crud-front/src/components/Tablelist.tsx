import { statusCust, getList, deleteCust } from "../services/clientService";

interface TablelistInstance {
    onOpen: () => void
    customers: any
    setCustId: (val: number) => void,
    setCustomers: (val: any) => void,
}

export default function Tablelist({onOpen, customers, setCustId, setCustomers}: TablelistInstance){
    const openModal = (id: number) => {
        setCustId(id);
        onOpen()
    }

    const updStatus = async(id: number) => {
        const resp = await statusCust(id);
        if (resp.success) {
            const custs = await getList();
            if (custs.success) {
                setCustomers(custs.data);
            }
        }
    }

    const delCust = async(id: number) => {
        const resp = await deleteCust(id);
        if (resp.success) {
            const custs = await getList();
            if (custs.success) {
                setCustomers(custs.data);
            }
        }
    }

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customers ? 
                            customers.map((c: any) => 
                                <tr key={c.id}>
                                    <th>{c.id}</th>
                                    <td>{c.name}</td>
                                    <td>{c.email}</td>
                                    <td>
                                        <button
                                            onClick={() => updStatus(c.id)}
                                            className={`btn rounded-full ${c.status ? 'btn-primary' : 'btn-secondary'}`}
                                        >
                                            {c.status ? 'Ativo' : 'Inativo'}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => openModal(c.id)}
                                            className={`btn rounded-full `}
                                        >
                                            Atualizar
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => delCust(c.id)}
                                            className={`btn rounded-full btn-warning`}
                                        >
                                            Deletar
                                        </button>
                                    </td>
                                </tr> 
                            )
                            : <></>
                    }
                </tbody>
            </table>
        </div>
    );
}