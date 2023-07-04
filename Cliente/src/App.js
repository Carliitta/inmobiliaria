import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import { Navbar } from './components/Navbar';
import Home from './components/Home';
import Detalle from './components/Detalle';
import ContactoForm from './components/ContactoForm';
import CrearUsuario from './components/CrearUsuario';
import Publicar from './components/Publicar';
import QuienesSomos from './components/Info/QuienesSomos';
import QuieroVender from './components/Info/QuieroVender';
import Soporte from './components/Info/Soporte';
import Desarrollador from './components/Info/Desarrollador';
function App() {
  return (
    <div >
   <Routes>
     <Route exact path="/" element={<Home/>} />
     <Route exact path="/:id" element={<Detalle/>} />
     <Route exact path="/:id/contacto" element={<ContactoForm/>} />
     <Route exact path="/crear_cuenta" element={<CrearUsuario/>}/>
     <Route exact path="/publicar" element={<Publicar/>}/>
     <Route exact path="/quienes-somos?" element={<QuienesSomos/>}/>
     <Route exact path="/quiero-vender" element={<QuieroVender/>}/>
     <Route exact path="/soporte" element={<Soporte/>}/>
     <Route exact path="/desarrollador" element={<Desarrollador/>}/>
   </Routes>
    </div>
  );
}

export default App;
