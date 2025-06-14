import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Home, Auth, Orders, Hot, Cold, Bar, Bill, Login, Admin} from "./pages";
import Header from "./components/shared/Header";
import BottonNav from "./components/shared/BottonNav";

function AppWrapper() {
  const location = useLocation();
  const hideLayout = location.pathname === "/";

  return (
    <>
      {!hideLayout && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Admin/*" element={<Admin />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/hot" element={<Hot />} />
        <Route path="/cold" element={<Cold />} />
        <Route path="/bar" element={<Bar />} />
        <Route path="/bill" element={<Bill />} />
      </Routes>
      {!hideLayout && <BottonNav />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
