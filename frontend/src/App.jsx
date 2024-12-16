import { Route, Routes } from 'react-router-dom';

import AboutPage from './view/pages/AboutPage';
import HomePage from './view/pages/HomePage';
import InformationPage from './view/pages/InformationPage';
import ParkDetailPage from './view/pages/ParkDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/information" element={<InformationPage />} />
      <Route path="/park/:id" element={<ParkDetailPage />} />
    </Routes>
  );
}

export default App;
