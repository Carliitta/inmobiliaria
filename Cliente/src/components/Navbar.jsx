import React from "react";
import Logo from "../utils/logo.png";
import { Link } from "react-router-dom";
import { search_Inmuebles,get_All_Inmuebles,clear_error } from "../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

export const Navbar = () => {
const [search, setSearch]= useState('')

const [buscando, setBuscando] = useState(false);
const dispatch= useDispatch()
  
 const buscarInmueble=(e)=>{
    e.preventDefault()
      setBuscando(true);
      dispatch(search_Inmuebles(search));
      setBuscando(false);
      setSearch('')
 }
 const clearSearch=()=>{
dispatch(clear_error())
dispatch(get_All_Inmuebles())
 }
  return (
    <nav className="navbar navbar-expand-lg bg-secondary bg-gradient bg-opacity-10 ">
      
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
                to="/inicio"
                className="nav-link 
             active"
                aria-current="page"
                href="#"
              >
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/contacto"
                className="nav-link 
            "
              >
                Contacto
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
                Información
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
              <a className="nav-link disabled">Públicar</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
