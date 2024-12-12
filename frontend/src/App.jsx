import { Route, Routes } from 'react-router-dom';

import ParkDetail from './components/park/ParkDetail';
import ParkList from './components/park/ParkList';
import HomePage from './view/pages/HomePage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/parks" element={<ParkList />} />
        <Route path="/parks/:id" element={<ParkDetail />} />
      </Routes>
    </>
  );
}

export default App;
