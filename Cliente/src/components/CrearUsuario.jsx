import React, { useState } from "react";
import { Button } from "reactstrap";
import {IoIosCreate} from"react-icons/io"
import { Link } from "react-router-dom";
import {BsFillArrowLeftSquareFill} from "react-icons/bs"
import {useDispatch, useSelector} from "react-redux"
import { registrarse } from "../Redux/actions";
import Swal from 'sweetalert2';

const CrearUsuario = () => {
const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    nombre: "",
    correo:"",
    codigo: "",
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.nombre || !formData.codigo || !formData.correo) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Complete todos los campos',
        });
      } else {
        await dispatch(registrarse(formData));
        Swal.fire({
          icon: 'success',
          title: '¡Perfecto!',
          text: 'Usuario registrado correctamente',
        });
        setFormData({
          nombre: '',
          codigo: '',
          correo: '',
        });
      }
    } catch (error) {
      let errorMessage = 'Ha ocurrido un error';
      if (error.response && error.response.data && error.response.data.msg) {
        errorMessage = error.response.data.msg;
      }
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text: errorMessage,
      });
    }
  };
  

  return (
   <div  className="d-flex flex-column min-vh-100" style={{backgroundColor:'#6febadda'}}>
   
      <Link to={"/"} style={{display :'flex', justifyContent:'center'}}>
        <BsFillArrowLeftSquareFill style={{fontSize:'35px', marginBottom:'5px', color:'#1ba2c4da', marginTop:"3px"}}/>
    </Link>
        <form className="container p-4 bg-info mt-3 mb-3" style={{ width: '400px', borderRadius:'20px' }}onSubmit={handleSubmit}>
            <h3 className=" mb-4 text-light">Formulario de registro <IoIosCreate/></h3>
          <label className="text-white" htmlFor="username">Nombre:</label>
          <input
            type="text"
            id="username"
            name="nombre"
            className="form-control mb-3 "
            value={formData.nombre}
            onChange={handleChange}
           
          />
          
           <label className="text-white" htmlFor="useremail">Correo:</label>
          <input
          className="form-control mb-3"
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
          
          />

          <label className="text-white" htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="codigo"
            className="form-control mb-3"
            value={formData.codigo}
            onChange={handleChange}
            
          />
          
        <Button className="mt-3" color="primary" onClick={handleSubmit}>
          Registrarme
        </Button>
        </form>

   </div>
     
  );
};

export default CrearUsuario;



