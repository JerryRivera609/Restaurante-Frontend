import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage';
import CocinaPage from './pages/CocinaPage';
import BarPage from './pages/BarPage';
import FriosPage from './pages/FriosPage';
import MeseroPage from './pages/MeseroPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<MeseroPage />} />
        <Route path="/cocina" element={<CocinaPage />} />
        <Route path="/bar" element={<BarPage />} />
        <Route path="/frios" element={<FriosPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
