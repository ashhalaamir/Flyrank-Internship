import { useState } from 'react';
import { Modal } from './components/manual/Modal';
import { Tabs } from './components/manual/Tabs';
import { Disclosure } from './components/manual/Disclosure';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-12">
      <h1 className="text-3xl font-bold">Accessibility Playground</h1>
      
      <section>
        <h2 className="text-xl font-semibold mb-4">1. Disclosure</h2>
        <Disclosure />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">2. Tabs (Use Arrow Keys)</h2>
        <Tabs />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">3. Modal (Traps Focus)</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Open Modal
        </button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <p>Modal Content</p>
        </Modal>
      </section>
    </div>
  );
}

export default App;