import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Tablelist from './components/Tablelist'
import Modal from './components/Modal';
import { getList, searchCust } from './services/clientService';

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<string>('add');
  const [search, setSearch] = useState<string>('');
  const [customers, setCustomers] = useState<any>([]);

  useEffect(() => {
      const fetchData = async() => {
          let resp = await getList();
          if (resp.success) {
              let cust = resp.data ? resp.data : [];
              setCustomers(cust)
          }
      }
      fetchData().then();
  }, []);

  useEffect(() => {
      const fetchData = async() => {
          let { data } = await searchCust(search);
          if (data.success) {
            setCustomers(data);
          }
      }
      fetchData().then()
  }, [search]);

  const handleOpen = (mode: string) => {
    setModalMode(mode);
    setIsOpen(true);
  }

  const handleSubmit = async() => {
    if (modalMode == 'add') {
      console.log('add');
    } else {
      console.log('edit');
    }
  }

  return (
    <>
      <Navbar
        onOpen={() => handleOpen('add')}
        search={search}
        setSearch={setSearch}
      />
      <Tablelist
        onOpen={() => handleOpen('edit')}
        customers={customers}
      />
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        mode={modalMode}
        onSubmit={() => handleSubmit}
      />
    </>
  )
}

export default App