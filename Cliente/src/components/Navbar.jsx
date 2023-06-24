import React from "react";
import Logo from "../utils/logo.png";
import { Link } from "react-router-dom";
import { search_Inmuebles,get_All_Inmuebles,clear_error } from "../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Filtros from "../components/Filtros";
import {AiOutlineUser} from "react-icons/ai"
import CrearUsuario from "./CrearUsuario";
import Login from "./Login";
export const Navbar = ({isOpen, toggle}) => {
const [search, setSearch]= useState('')
const inmuebles = useSelector((state) => state.inmuebles);
const [buscando, setBuscando] = useState(false);
const [loggedInUser, setLoggedInUser] = useState(null);

const dispatch= useDispatch()

const handleLoginSuccess = (user) => {
  setLoggedInUser(user);
};
 const buscarInmueble=(e)=>{
    e.preventDefault()
      setBuscando(true);
      dispatch(search_Inmuebles(search));
      setBuscando(false);
      setSearch('')
      console.log(inmuebles);
 }
 const clearSearch=()=>{
  dispatch(clear_error())
  dispatch(get_All_Inmuebles())
  
 }
  return (
    <>
   
    <nav className="navbar navbar-expand-lg fixed-top p-2 " style={{backgroundColor:'#bbdce1'}}>
      
      <div className="container-fluid ">
        <Link to="/" className=" w-10 ml-4" href="#" onClick={clearSearch} >
          <img
            className="img-fluid "
            style={{ width: "50%" }}
            src={Logo}
            alt="logo"
          />
        </Link>

        <form className="d-flex px-2 col-4" role="search" >
          <input
            className="form-control me-2 "
            type="search"
            placeholder="Buscar por ubicacion.."
            aria-label="Search"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
          <button className="btn btn-outline-info text-black" type="submit" onClick={buscarInmueble}>
            {buscando ? "Buscando..." : "Buscar"}
            
          </button>
        </form>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
            <li className="nav-item ">
              <Link
                to="/"
                className="nav-link 
             active"
                aria-current="page"
                href="#"
              >
               <strong> Inicio</strong>
              </Link>
            </li>
           
            <li className="nav-item dropdown">
              <Link
                to="/informacion"
                className="nav-link 
             dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <strong> Información</strong>
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item " href="#">
                    Quiénes somos?
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Quiero vender
                  </a>
                </li>

                <li>
                  <a className="dropdown-item" href="#">
                    Contactar
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item " href="#">
                    Desarrollador
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
            <Link
                onClick={toggle}
                className="nav-link"
                role="button"
              
                aria-expanded="false"
              >
                <strong> {loggedInUser? `Hola, ${loggedInUser.nombre}` : "Acceder"} <AiOutlineUser/></strong>
              </Link>
              <Login isOpen={isOpen} toggle={toggle} onLoginSuccess={handleLoginSuccess} />
            </li>
            <li className="nav-item">
              <a className="nav-link disabled">Públicar</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div style={{marginTop:'110px'}}>
    {inmuebles && inmuebles.length > 0 && <Filtros />}

    </div>
    </>
    
  );
};
