import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './view/pages/HomePage';
import ParkForm from './components/park/ParkForm';
import ParkList from './components/park/ParkList';
import ParkDetail from './components/park/ParkDetail';
import Modal from './components/auth/Modal';

function App() {
  return (
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/parks" element={<ParkList />} />
      <Route path="/parks/new" element={<ParkForm />} />
      <Route path="/parks/:id" element={<ParkDetail />} />
    </Routes>
    
    <>
      <Modal />
    </>
  );
}

export default App;
