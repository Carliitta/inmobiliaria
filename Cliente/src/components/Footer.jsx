import React from "react";
import {FaFacebookSquare, FaTwitterSquare, FaInstagram} from "react-icons/fa"
import Logo from "../utils/logo.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer bg-primary opacity-85 " style={{ height:'200px'}}>
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
      <span className="text-white  d-inline-block w-25 " style={{ width: '100%'}}>
        Encontrá propiedades e inmuebles en venta y alquiler, casas,
        departamentos y más en InmoLandia.<br></br>
      
      </span>
      <span title="Dato ficticio" className="text-white d-inline-block"style={{ float: 'right' }} >
      Contacto <br></br>
      Escribenos a InmoLandia@gmail.com <br></br>
      <span className="text-white pt-1" >
      <FaFacebookSquare  style={{ fontSize: '25px',marginRight:'2px' }}/>
      <FaTwitterSquare style={{ fontSize: '25px' , marginRight:'2px'}}/>
      <FaInstagram style={{ fontSize: '25px' }}/>
      </span>
      </span>
     
    </div>
     <p style={{ display: 'block', textAlign: 'center', marginLeft:'25%'}}><strong className="text-white" >Copiright-2023.</strong></p> 
  </footer>
  
  );
};

export default Footer;
