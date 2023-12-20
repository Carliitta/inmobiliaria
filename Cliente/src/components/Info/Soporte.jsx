import React, { useState } from "react";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import {BsFillArrowLeftSquareFill} from "react-icons/bs"
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { sendEmailSoport } from "../../Redux/actions";

const Soporte = () => {

  const [form, setForm] = useState({
  nombre:'',
  correo:'',
  mensaje:''
  });
  const handleChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const dispatch = useDispatch()
  const handleSubmit =async (e) => {
    e.preventDefault();

    try {
      if(!form.nombre || !form.correo || !form.mensaje){
        Swal.fire({
          icon:'error',
          title:'Comprete todos los campos',
          
        })
      }else{
        
      dispatch(sendEmailSoport(form))
      
      Swal.fire({
        icon:'success',
        title:'Mensaje enviado con exito!',
        text:'Nos contactaremos con usted en brevedad:)'
      })
      }

     setForm({
     nombre:'',
      correo:'',
      mensaje:''
     })
    } catch (error) {
      Swal.fire({
        icon:'error',
        title:'ocurrio un error',
        text:error.message
      })
    }
 
  };

  return (
    <>
    <div className="d-flex flex-column min-vh-100" style={{ justifyContent: 'center', alignItems: 'center'}}>
         <Link to={"/"} style={{display :'flex', justifyContent:'center'}}>
        <BsFillArrowLeftSquareFill style={{fontSize:'35px', marginBottom:'5px',color:'#80808096', marginTop:"3px"}}/>
    </Link>
      <div  className="info card b-3 p-2  mb-2" style={{ width: '800px', alignItems: 'center', backgroundColor:'rgb(255 210 7 / 52%)'}}>
        <h2 className="fw-bolder fs-3 ">Soporte</h2>
        <div  className='card-body' style={{ padding: '40px' }}>
          <p className="fs-5 ">
            ¿Tienes algún problema o pregunta? ¡Estamos aquí para ayudarte! Completa el siguiente formulario y nos pondremos en contacto contigo lo antes posible.
          </p>
          <form className="container p-3  mt-3 mb-3" onSubmit={handleSubmit}  style={{ width: '500px', borderRadius:'20px' }}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label fs-5">Nombre:</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={form.nombre}
                onChange={handleChangeForm}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="correo" className="form-label fs-5">Correo electrónico:</label>
              <input
                type="email"
                className="form-control"
                id="correo"
                name="correo"
                value={form.correo}
                onChange={handleChangeForm}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mensaje" className="form-label fs-5">Mensaje:</label>
              <textarea
                className="form-control"
                id="mensaje"
                rows="5"
                value={form.mensaje}
                name="mensaje"
                onChange={handleChangeForm}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn " style={{backgroundColor:'black', color:"white"}}>Enviar</button>
          </form>
        </div>
      </div>
    </div>
      <Footer />
    </>
  );
};

export default Soporte;
