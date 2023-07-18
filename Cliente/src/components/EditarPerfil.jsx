
import React, { useState , useEffect} from "react";
import { Button } from "reactstrap";
import {IoIosCreate} from"react-icons/io"
import { Link } from "react-router-dom";
import {BsFillArrowLeftSquareFill} from "react-icons/bs"
import {useDispatch, useSelector} from "react-redux"
import { registrarse, update_Profile } from "../Redux/actions";
import Swal from 'sweetalert2';
import Footer from "./Footer";
import { BsEyeSlash, BsEye } from "react-icons/bs";

const EditarPerfil = () => {
    const dispatch = useDispatch()
    const user = JSON.parse(window.localStorage.getItem("loggedInUser"));
  const [formData, setFormData] = useState({
    nombre: "",
    correo:"",
    codigo: "",
  });
  const [seePassword, setSeePassword] = useState(false);
  useEffect(() => {
  
     setFormData({
       nombre: user.nombre || '',
       correo: user.correo|| '',
       codigo:user.codigo ||''
   })


 console.log(user);
 }, [])
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateForm={
        nombre: formData.nombre,
        correo: formData.correo,
        codigo: formData.codigo,
    }
    try {
      if (!formData.nombre || !formData.codigo || !formData.correo) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Los campos no pueden estar vacios',
        });
      } else {
        await dispatch(update_Profile(user?.id,window.localStorage.setItem("loggedInUser", JSON.stringify(updateForm))));
      
        Swal.fire({
          icon: 'success',
          title: '¡Perfecto!',
          text: 'Sus datos fueron actualizados correctamente',
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
    <>
  
    <div  className="d-flex flex-column min-vh-100" >
    
       <Link to={"/"} style={{display :'flex', justifyContent:'center'}}>
         <BsFillArrowLeftSquareFill style={{fontSize:'35px', marginBottom:'5px', color:'#80808096', marginTop:"5px"}}/>
     </Link>
         <form className="container p-4  mt-4 mb-3" style={{ width: '450px', borderRadius:'20px', backgroundColor:'#ffe307cf' }} onSubmit={handleSubmit}>
             <h3 className=" mb-4 text-center ">Editar perfil<IoIosCreate/></h3>
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
           
           />
 
           <label htmlFor="password">Contraseña:</label>
           <input
             type={seePassword ? "text" : "password"}
             id="password"
             name="codigo"
             className="form-control mb-3 opacity-75"
             value={formData.codigo}
             readOnly
             onChange={handleChange}
             
           />
            <span
             onClick={() => {
               setSeePassword(!seePassword);
             }}
             className="absolute right-2"
           >
             {seePassword ? <BsEyeSlash /> : <BsEye />}
           </span> <br />
           
         <Button className="mt-3" style={{backgroundColor:'black', color:"white"}} >
           Guardar cambios
         </Button>
         </form>
 
    </div>
    <Footer/>
      </>
  )
}

export default EditarPerfil