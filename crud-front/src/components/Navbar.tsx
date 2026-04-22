import { useState, useEffect } from "react"
import { getList, searchCust } from '../services/clientService';

interface NavebarInterface {
    onOpen: () => void,
    setCustomers: (val: any) => void
}

export default function Navbar({onOpen, setCustomers}: NavebarInterface) {
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        const fetchData = async() => {
            if (search) {
                let s = await searchCust(search);
                if (s.success) {
                    setCustomers(s.data);
                }
            } else {
                let cust = await getList();
                if (cust.success) {
                    setCustomers(cust.data);
                }
            }
        }
        fetchData().then()
    }, [search]);

    return (
        <div className="max-lg:collapse bg-base-200 lg:mb-48 shadow-sm w-full rounded-md">
            <input id="navbar-1-toggle" className="peer hidden" type="checkbox" />
            <label htmlFor="navbar-1-toggle" className="fixed inset-0 hidden max-lg:peer-checked:block"></label>
            <div className="collapse-title navbar">
                <div className="navbar-start">
                    <label htmlFor="navbar-1-toggle" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <button className="btn btn-ghost text-xl">Clientes</button>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <button onClick={() => onOpen()}>
                                Criar
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <input
                        type="text"
                        placeholder="Procurar..."
                        className="input input-bordered w-64 lg:w-auto"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}