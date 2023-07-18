import logo from './logo.svg';
import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
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
import Publicaciones from './components/Publicaciones';
import Actualizar from './components/ActualizarInmueble';
import EditarPerfil from './components/EditarPerfil';
import NotFount from "./components/notFount/NotFount";
import { useSelector } from "react-redux";
import PrivateRoute  from "./components/PrivateRoute"; // Import the custom hook


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Detalle />} />
        <Route path="/:id/contacto" element={<ContactoForm />} />
        <Route path="/crear_cuenta" element={<CrearUsuario />} />
        <Route path="/quienes-somos?" element={<QuienesSomos />} />
        <Route path="/quiero-vender" element={<QuieroVender />} />
        <Route path="/soporte" element={<Soporte />} />
        <Route path="/desarrollador" element={<Desarrollador />} />
        
        <Route element={<PrivateRoute />}>
        <Route path="/publicar" element={<Publicar />} />
        <Route path="/mis_publicaciones" element={<Publicaciones />} />
        <Route path="/actualizar/:id" element={<Actualizar />} />
        <Route path="/user/editar/:id" element={<EditarPerfil />} />

        </Route>
        
        <Route path="*" element={<NotFount />} />
      </Routes>
    </div>
  );
}

export default App;

