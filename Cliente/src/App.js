import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import { Navbar } from './components/Navbar';
import Home from './components/Home';
import Detalle from './components/Detalle';
import ContactoForm from './components/ContactoForm';
import CrearUsuario from './components/CrearUsuario';
import Publicar from './components/Publicar';
function App() {
  return (
    <div >
   <Routes>
     <Route exact path="/" element={<Home/>} />
     <Route exact path="/:id" element={<Detalle/>} />
     <Route exact path="/:id/contacto" element={<ContactoForm/>} />
     <Route exact path="/crear_cuenta" element={<CrearUsuario/>}/>
     <Route exact path="/publicar" element={<Publicar/>}/>
   </Routes>
    </div>
  );
}

export default App;
