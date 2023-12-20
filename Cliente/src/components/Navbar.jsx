import React from "react";
import Logo from "../utils/logo.png";
import { Link } from "react-router-dom";
import { search_Inmuebles,get_All_Inmuebles,clear_error } from "../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Filtros from "../components/Filtros";
import {AiOutlineUser} from "react-icons/ai"
import {BsSearch} from "react-icons/bs";
import {AiOutlineMenu} from 'react-icons/ai'
import CrearUsuario from "./CrearUsuario";
import Login from "./Login";
export const Navbar = ({isOpen, toggle, setPagina}) => {
const [search, setSearch]= useState('')
const inmuebles = useSelector((state) => state.inmuebles);

const [buscando, setBuscando] = useState(false);
const [loggedInUser, setLoggedInUser] = useState(null);

const dispatch= useDispatch()
const usuario = localStorage.getItem("user-log");
const user= usuario?.data_user
const [menuOpen, setMenuOpen] = useState(false);


const handleMenuToggle = () => {
  setMenuOpen(!menuOpen);
};
useEffect(() => {

  if (usuario) {
    setLoggedInUser(JSON.parse(usuario));
  }
/*   console.log("usuario",usuario);
  console.log("usuariooo",loggedInUser);
 */
}, [usuario]);

const handleLoginSuccess = (user) => {
  
  setLoggedInUser(user);
  localStorage.setItem("user-log", JSON.stringify(user));
};
 const buscarInmueble=(e)=>{
    e.preventDefault()
      setBuscando(true);
      dispatch(search_Inmuebles(search));
      setBuscando(false);
      setSearch('')
      //console.log(inmuebles);
 }
 const clearSearch=()=>{
  dispatch(clear_error())
  dispatch(get_All_Inmuebles())
  
 }
  return (
    <>
   
    <nav className="navbar navbar-expand-lg fixed-top p-2 " style={{backgroundColor:'rgb(255 210 7 / 52%)'}}>
      
      <div className="container-fluid ">

        <Link to="/" className="ml-2" href="#" onClick={clearSearch} >
          <img
            className="img-fluid "
            style={{ width: "50%" }}
            src={Logo}
            alt="logo"
          />
        </Link>
<div className="input-menu">


        <form className="d-flex px-2 col-4" style={{position: "relative"}} role="search" >
          <input
        style={{paddingLeft:'40px'}}
            className="form-control me-2 "
            type="search"
            placeholder="Buscar por ubicación.."
            aria-label="Search"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
          <button style={{border:"none", background:'none',  position: "absolute",
      top: "50%",
      left: "10px",
      transform: "translateY(-50%)",}} type="submit" onClick={buscarInmueble}>
          {/*   {buscando ? "Buscando..." : "Buscar"} */}
            <BsSearch style={{fontSize:"20px"}}/>
          </button>
        </form>
      
          {/* Hamburger Menu */}
          <AiOutlineMenu className="navbar-toggler" type="button" onClick={handleMenuToggle}>
         
          <span style={{ background: menuOpen ? "transparent" : "#333" }}></span>
          <span style={{ background: menuOpen ? "transparent" : "#333" }}></span>
          <span style={{ background: menuOpen ? "transparent" : "#333" }}></span>
     
        </AiOutlineMenu>
</div>
        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
           
           
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
                  <Link className="dropdown-item " to={"/quienes-somos?"}>
                    Quiénes somos?
                  </Link>
                </li>
                <li>
                <Link className="dropdown-item " to={"/quiero-vender"}>
                    Quiero Vender
                  </Link>
                </li>

                <li>
                <Link className="dropdown-item " to={"/soporte"}>
                    Soporte
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                <Link className="dropdown-item " to={"/desarrollador"}>
                    Desarrolladora
                  </Link>
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
                <strong className="login"> {loggedInUser? `${loggedInUser.nombre}` : "Acceder"} <AiOutlineUser/></strong>
              </Link>
              <Login isOpen={isOpen} toggle={toggle} onLoginSuccess={handleLoginSuccess} loggedInUser={loggedInUser}/>
            </li>
          
            <li className="nav-item" >
              <Link  className={!loggedInUser?"nav-link disabled":"nav-link"} to={"/publicar"}  >
               <strong>Públicar Inmueble</strong>  
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div style={{marginTop:'110px'}}>
     {inmuebles && inmuebles.length > 0 && <Filtros setPagina={setPagina} />} 

    </div>
    </>
    
  );
};
