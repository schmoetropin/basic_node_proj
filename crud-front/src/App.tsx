import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Tablelist from './components/Tablelist'
import Modal from './components/Modal';

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<string>('add');

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
      />
      <Tablelist
        onOpen={() => handleOpen('edit')}
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