import React, { useState } from "react";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import {BsFillArrowLeftSquareFill} from "react-icons/bs"

const Soporte = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario o manejar la información ingresada
    console.log("Formulario enviado:", { nombre, correo, mensaje });
    // Restablecer los campos del formulario después del envío
    setNombre("");
    setCorreo("");
    setMensaje("");
  };

  return (
    <>
    <div className="d-flex flex-column min-vh-100" style={{backgroundColor:'#6febadda' , justifyContent: 'center', alignItems: 'center'}}>
         <Link to={"/"} style={{display :'flex', justifyContent:'center'}}>
        <BsFillArrowLeftSquareFill style={{fontSize:'35px', marginBottom:'5px',color:'rgb(7 122 245)', marginTop:"3px"}}/>
    </Link>
      <div  className="card b-3 p-2 bg-info mb-2" style={{ width: '800px', alignItems: 'center' }}>
        <h2 className="fw-bolder fs-3 ">Soporte</h2>
        <div style={{ padding: '40px' }}>
          <p className="fs-5 ">
            ¿Tienes algún problema o pregunta? ¡Estamos aquí para ayudarte! Completa el siguiente formulario y nos pondremos en contacto contigo lo antes posible.
          </p>
          <form className="container p-3 bg-info mt-3 mb-3" onSubmit={handleSubmit}  style={{ width: '500px', borderRadius:'20px' }}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label fs-5">Nombre:</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="correo" className="form-label fs-5">Correo electrónico:</label>
              <input
                type="email"
                className="form-control"
                id="correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mensaje" className="form-label fs-5">Mensaje:</label>
              <textarea
                className="form-control"
                id="mensaje"
                rows="5"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Enviar</button>
          </form>
        </div>
      </div>
    </div>
      <Footer />
    </>
  );
};

export default Soporte;
