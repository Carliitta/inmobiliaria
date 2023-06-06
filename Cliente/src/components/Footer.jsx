import React from "react";
import {FaFacebookSquare, FaTwitterSquare, FaInstagram} from "react-icons/fa"
const Footer = () => {
  return (
    <footer className="footer bg-primary ">
      <div className="container pt-3 " >
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
