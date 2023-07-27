import React from "react";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import {BsFillArrowLeftSquareFill} from "react-icons/bs"
const QuieroVender = () => {
  return (
    <>
    <div className="d-flex flex-column min-vh-100" style={{ justifyContent: 'center', alignItems: 'center'}}>
         <Link to={"/"} style={{display :'flex', justifyContent:'center'}}>
        <BsFillArrowLeftSquareFill style={{fontSize:'35px', marginBottom:'5px', color:'#80808096', marginTop:"3px"}}/>
    </Link>
      <div className="card b-3 p-2  mb-2" style={{ width: '1200px', alignItems: 'center', backgroundColor:'#ffe307cf' }}>
        <h2 className="fw-bolder fs-3 mb-5">Quiero Vender</h2>
        <div className='card-body' style={{ padding: '40px' }}>
          <p className="fs-5">
            ¡Gracias por elegir Inmolandia para vender tu propiedad! Para poder publicar tu inmueble en nuestra plataforma, necesitas <b> crear una cuenta</b> en nuestra página.
          </p>
          <p className="fs-5">
            Al crear una cuenta, tendrás acceso a un panel de control donde podrás agregar los detalles de tu propiedad, subir fotos, establecer el precio y proporcionar información relevante para los posibles compradores o interesados en alquilar.
          </p>
          <p className="fs-5">
            La creación de una cuenta es sencilla y solo te llevará unos minutos. Solo tienes que hacer clic en el botón <b>"Acceder"</b>  en la esquina superior derecha de nuestra página y seguir los pasos indicados. Una vez que hayas creado tu cuenta, podrás iniciar sesión y comenzar a publicar tu inmueble.
          </p>
          <p className="fs-5">
            En Inmolandia, nos comprometemos a brindarte una plataforma segura y confiable para vender tu propiedad. Nuestro equipo estará disponible para ayudarte en cada paso del proceso y responder a cualquier pregunta que puedas tener.
          </p>
          <p className="fs-5">
            ¡No pierdas la oportunidad de llegar a una amplia audiencia de posibles compradores! Crea tu cuenta ahora y comienza a publicar tu inmueble en Inmolandia.
          </p>
        </div>
      </div>
    </div>
      <Footer />
    </>
  );
};

export default QuieroVender;
