import React from "react";
import {FaFacebookSquare, FaTwitterSquare, FaInstagram} from "react-icons/fa"
import Logo from "../utils/logo.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer  opacity-85 " style={{ height:'200px', backgroundColor:'#80808096'}}>
    <div className="container pt-3 " >
       <div className="container-fluid ">
        <Link to={"/"}   >
          <img
            className="img-fluid "
            style={{ width: "170px" }}
            src={Logo}
            alt="logo"
          />
        </Link>
        </div>
      <span className="fs-6  d-inline-block w-25 " style={{ width: '100%'}}>
        Encontrá propiedades e inmuebles en venta y alquiler, casas,
        departamentos y más en InmoLandia.<br></br>
      
      </span>
      <div className="footer-links">
      <Link  to={"/quienes-somos?"} style={{textDecoration:'none', marginRight:'50px', color:'black'}}>
       Quiénes somos?
       </Link>
       <Link  to={"/quiero-vender"} style={{textDecoration:'none', marginRight:'50px', color:'black'}}>
        Quiero Vender
        </Link>
        <Link  to={"/soporte"} style={{textDecoration:'none', marginRight:'50px', color:'black'}}>
        Soporte
        </Link>
        <Link  to={"/desarrollador"} style={{textDecoration:'none',color:'black'}}>
        Desarrolladora
        </Link>

      </div>
      
  
      <span title="Dato ficticio" className="d-inline-block"style={{ float: 'right' }} >
      Contacto <br></br>
      Escribenos a InmoLandia@gmail.com <br></br>
      <span className="social-icons pt-1" >
      <FaFacebookSquare  style={{ fontSize: '25px',marginRight:'2px', color:'white' }}/>
      <FaTwitterSquare style={{ fontSize: '25px' , marginRight:'2px',color:'white'}}/>
      <FaInstagram style={{ fontSize: '25px' ,color:'white'}}/>
      </span>
      </span>
     
    </div>
     <p className="copiright" style={{ display: 'block', textAlign: 'center', marginLeft:'25%' ,marginBottom:"5px"}}><strong >Copiright-2023.</strong></p> 
  </footer>
  
  );
};

export default Footer;
