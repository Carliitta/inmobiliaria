import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import { Navbar } from './components/Navbar';
import Home from './components/Home';
import Detalle from './components/Detalle';
import ContactoForm from './components/ContactoForm';
function App() {
  return (
    <div >
   <Routes>
     <Route exact path="/" element={<Home/>} />
     <Route exact path="/:id" element={<Detalle/>} />
     <Route exact path="/:id/contacto" element={<ContactoForm/>} />
   </Routes>
    </div>
  );
}

export default App;
