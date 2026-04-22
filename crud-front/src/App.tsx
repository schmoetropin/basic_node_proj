import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Tablelist from './components/Tablelist'
import Modal from './components/Modal';

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<string>('add');
  const [customers, setCustomers] = useState<any>([]);

  const handleOpen = (mode: string) => {
    setModalMode(mode);
    setIsOpen(true);
  }

  return (
    <>
      <Navbar
        onOpen={() => handleOpen('add')}
        setCustomers={setCustomers}
      />
      <Tablelist
        onOpen={() => handleOpen('edit')}
        customers={customers}
      />
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        mode={modalMode}
        setCustomers={setCustomers}
      />
    </>
  )
}

export default App