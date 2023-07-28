import React from "react";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import {BsFillArrowLeftSquareFill} from "react-icons/bs"
const QuienesSomos = () => {
  return (
    <>
    <div className="d-flex flex-column min-vh-100" style={{  justifyContent: 'center', alignItems: 'center'}}>
        <Link to={"/"} style={{display :'flex', justifyContent:'center'}}>
        <BsFillArrowLeftSquareFill style={{fontSize:'35px', marginBottom:'5px', color:'#80808096', marginTop:"3px"}}/>
    </Link>
    <div className="info card b-3 p-2  mb-2" style={{ width: '1200px', alignItems: 'center',backgroundColor:'#ffe307cf' }}>
      <h2 className="fw-bolder fs-3 mb-5">Quiénes somos?</h2>
      <div className=" card-body"  style={{ padding: '40px' }}>
        <p className="fs-5">
          Somos <b>Inmolandia</b>, una reconocida inmobiliaria especializada en ventas y alquiler de propiedades. Nuestro objetivo es ayudar a nuestros clientes a encontrar el hogar de sus sueños o invertir en propiedades rentables.
        </p>
        <p className="fs-5">
          En Inmolandia, contamos con un equipo de profesionales altamente capacitados y con amplia experiencia en el mercado inmobiliario. Nuestro conocimiento y compromiso nos permiten brindar un servicio de calidad, personalizado y adaptado a las necesidades de cada cliente.
        </p>
        <p className="fs-5">
          Nos enorgullece ofrecer un amplio catálogo de propiedades, que incluye casas, apartamentos, terrenos y más. Trabajamos de la mano de propietarios y desarrolladores para garantizar que cada propiedad cumpla con altos estándares de calidad y se ajuste a los requerimientos de nuestros clientes.
        </p>
        <p className="fs-5">
          En Inmolandia, nos esforzamos por brindar una experiencia excepcional a nuestros clientes. Valoramos la honestidad, la transparencia y el trabajo en equipo. Estamos comprometidos en hacer que el proceso de compra, venta o alquiler de una propiedad sea lo más fácil y satisfactorio posible.
        </p>
        <p className="fs-5">
          Si estás buscando asesoramiento profesional y confiable en el mercado inmobiliario, no dudes en contactarnos. Estaremos encantados de ayudarte a encontrar la propiedad perfecta o a maximizar el potencial de tu inversión.
        </p>
      </div>
    </div>
  </div>
    <Footer />
    
    </>
  );
};

export default QuienesSomos;
