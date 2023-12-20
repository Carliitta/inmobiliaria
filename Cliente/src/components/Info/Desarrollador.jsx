import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import foto from "../img/foto.jpg"
import { Link } from "react-router-dom";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import Footer from '../Footer';

const Desarrollador = () => {
  return (
    <>
    
    <div className="d-flex flex-column min-vh-100" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Link to={"/"} style={{ display: 'flex', justifyContent: 'center' }}>
        <BsFillArrowLeftSquareFill style={{ fontSize: '35px', marginBottom: '5px', color: '#80808096', marginTop: "3px" }} />
      </Link>

      <div className="carli card b-3 p-3 mb-2" style={{ width: '500px', alignItems: 'center', backgroundColor:'rgb(255 210 7 / 52%)'}}>
        <img
          style={{ borderRadius: '50%', width: '250px', height: 'auto', border:"solid 1px white", backgroundColor:'white' }}
          src={foto}
          alt="Foto del Desarrollador"
          className="card-img-top p-1 mb-2"
        />
        <div className=' card  p-3 '>
        <h3 className='card-text text-center fs-3'>Rodriguez Carla Yamila</h3>
        <p className='card-text text-center fs-4'>Desarrolladora web full-stack 👩‍💻🚀<br /></p>
       

       
        <p className='card-text text-center fs-4'>Misiones, Argentina</p>
        <div className='d-flex '  style={{ justifyContent:'center'}}>
          <a href="https://www.linkedin.com/in/carla-yamila-rodriguez/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin title='linkedin' style={{ fontSize: '35px', marginRight: '5px', color: 'black' }} />
          </a>
          <a href="https://github.com/Carliitta" target="_blank" rel="noopener noreferrer">
            <FaGithub title='gitHub' style={{ fontSize: '35px', color: 'black' }} />
          </a>
        </div>
        </div>
      </div>

    </div>
      <Footer style={{ position: 'fixed', bottom: '0' }} />
    </>
  );
};

export default Desarrollador;


