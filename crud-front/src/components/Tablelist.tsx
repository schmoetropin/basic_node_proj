interface TablelistInstance {
    onOpen: () => void
}

export default function Tablelist({onOpen}: TablelistInstance){
    const customers = [
        {id: 1, name: 'name1', email: 'q@q.c', active: true},
        {id: 2, name: 'name2', email: 'w@w.c', active: true},
        {id: 3, name: 'name3', email: 'e@e.c', active: false},
        {id: 4, name: 'name4', email: 'r@r.c', active: true},
    ];
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
                    {customers.map(c => 
                        <tr key={c.id}>
                            <th>{c.id}</th>
                            <td>{c.name}</td>
                            <td>{c.email}</td>
                            <td>
                                <button
                                    className={`btn rounded-full ${c.active ? 'btn-primary' : 'btn-secondary'}`}
                                >
                                    {c.active ? 'Ativo' : 'Inativo'}
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
                    )}
                </tbody>
            </table>
        </div>
    );
}