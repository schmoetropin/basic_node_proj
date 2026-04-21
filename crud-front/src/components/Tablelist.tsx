interface TablelistInstance {
    onOpen: () => void
    customers: any
}

export default function Tablelist({onOpen, customers}: TablelistInstance){
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
                                            className={`btn rounded-full ${c.status ? 'btn-primary' : 'btn-secondary'}`}
                                        >
                                            {c.status ? 'Ativo' : 'Inativo'}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => onOpen()}
                                            className={`btn rounded-full `}
                                        >
                                            Atualizar
                                        </button>
                                    </td>
                                    <td>
                                        <button className={`btn rounded-full btn-warning`}>
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