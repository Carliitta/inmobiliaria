import React, { useState } from "react";
import { Button } from "reactstrap";
import {IoIosCreate} from"react-icons/io"
import { Link } from "react-router-dom";
import {BsFillArrowLeftSquareFill} from "react-icons/bs"
import {useDispatch, useSelector} from "react-redux"
import { registrarse } from "../Redux/actions";
import Swal from 'sweetalert2';
import Footer from "./Footer";
import { BsEyeSlash, BsEye } from "react-icons/bs";

const CrearUsuario = () => {
const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    nombre: "",
    correo:"",
    codigo: "",
  });
  const [seePassword, setSeePassword] = useState(false);
  const [error, setError] = useState({
    correo:'',
    codigo:''
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //console.log(error);
      if(error.codigo){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La contraseña debe tener al menos 5 caracteress',
        });
      }
      if(error.correo){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor, ingrese un correo valido',
        });
      }
    
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
        setError({codigo:'', correo:''})
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
  
  const Validations = (e) => {
    const { name, value } = e.target;
    // Inicializa un nuevo objeto de errores
    const newErrors = { ...error };
  
    // Validación de correo (email)
    if (name === "correo") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        newErrors.correo = "Por favor, ingrese un correo válido.";
        // Restablece el error anterior para el correo
        newErrors.codigo = "";
      } else {
        newErrors.correo = ""; // Borra el error si la validación es exitosa
      }
    }
  
    // Validación de código (password)
    if (name === "codigo") {
      if (value.length < 5) {
        newErrors.codigo = "La contraseña debe tener al menos 5 caracteres.";
        // Restablece el error anterior para el código
        newErrors.correo = "";
      } else {
        newErrors.codigo = ""; // Borra el error si la validación es exitosa
      }
    }
  
    // Actualiza el estado de error
    setError(newErrors);
  };
  

  return (
    <>
  
   <div  className="d-flex flex-column min-vh-100" >
 {/*   {console.log(error)} */}
      <Link to={"/"} style={{display :'flex', justifyContent:'center'}}>
        <BsFillArrowLeftSquareFill style={{fontSize:'35px', marginBottom:'5px', color:'#80808096', marginTop:"5px"}}/>
    </Link>
        <form className="User container p-4  mt-4 mb-3" style={{ width: '450px', borderRadius:'20px', backgroundColor:'#ffe307cf' }}onSubmit={handleSubmit}>
            <h3 className=" mb-4 text-center ">Formulario de registro <IoIosCreate/></h3>
          <label  htmlFor="username">Nombre:</label>
          <input
            type="text"
            id="username"
            name="nombre"
            className="form-control mb-3 "
            value={formData.nombre}
            onChange={handleChange}
          
          />
          
           <label  htmlFor="useremail">Correo:</label>
          <input
          className="form-control mb-3"
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            onBlur={Validations}
          />
          {error.correo && <div className="text-danger">{error.correo}</div>}
          <label htmlFor="password">Contraseña:</label>
          <input
            type={seePassword ? "text" : "password"}
            id="password"
            name="codigo"
            className="form-control mb-3"
            value={formData.codigo}
            onChange={handleChange}
            onBlur={Validations}
          />
           <span
            onClick={() => {
              setSeePassword(!seePassword);
            }}
            className="absolute right-2"
          >
            {seePassword ? <BsEyeSlash /> : <BsEye />}
          </span>
          {error.codigo && <div className="text-danger">{error.codigo}</div>}
           <br />
        <Button className="mt-3" style={{backgroundColor:'black', color:"white"}} onClick={handleSubmit}>
          Registrarme
        </Button>
        </form>

   </div>
   <Footer/>
     </>
     
  );
};

export default CrearUsuario;



