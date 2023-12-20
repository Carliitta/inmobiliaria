import React from 'react'
import { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { BsEyeSlash, BsEye } from "react-icons/bs";
import AuthService from "../helpers/Auth";
import { LoginSuccess, LogOut } from '../Redux/actions';
import Swal from "sweetalert2";

const Login = ({ isOpen, toggle, onLoginSuccess, loggedInUser }) => {
  const [user, setUser] = useState({
    correo: "",
    codigo: "",
  });
  const [seePassword, setSeePassword] = useState(false);
  const existingUserLog = JSON.parse(window.localStorage.getItem("user-log"));


  const [isLoggedIn, setIsLoggedIn] = useState(!!existingUserLog || !!localStorage.getItem("user-log"));
  const userId = loggedInUser?.id || null;
  useEffect(() => {
   //console.log(existingUserLog);
  }, []);
  const handleUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });

  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    AuthService.Login(user).then((response) => {
      const data = {
        data_user: response.data.data.dataValues,
        token: response.data.data.token,
      };
      if (!user.codigo || !user.correo) {
        return Swal.fire({
          icon: 'error',
          title: 'Error',
          text: "Debe rellenar los campos"
        })
      } else {

        dispatch(LoginSuccess(data));

        // Llama a la función onLoginSuccess
        if (typeof onLoginSuccess === "function") {
          onLoginSuccess(data.data_user);
        }
        if (data.data_user.rol === "admin") {
          Swal.fire({
            icon: "success",
            title: "Bienvenido!",
            text: response.data.message,
            confirmButtonText: "Continue",
          });
          navigate("/publicar");
        } else {
          Swal.fire({

            icon: "success",
            title: "Bienvenido!",
            text: response.data.message,
            confirmButtonText: "Continue",
          });
          navigate("/");
          setIsLoggedIn(true); // Establecer isLoggedIn a true al iniciar sesión
        }
      }
    }).catch((response) => {
      console.log(response)
      return Swal.fire({
        icon: 'error',
        title: 'Ups, ocurrio un error',
       /*  text: response.response.data.message, */
      })
    })

    toggle();

  };
  const handleLogout = () => {

    dispatch(LogOut());
    localStorage.removeItem("user-log");

    onLoginSuccess(null);
    setIsLoggedIn(false);

  };


  return (
    <Modal isOpen={isOpen} toggle={toggle} >
     {/*  {console.log(loggedInUser)} */}
      <ModalHeader toggle={toggle} >
        {
          isLoggedIn ? "Sesion" : " Acceder"
        }
      </ModalHeader>
      <ModalBody >
        {!loggedInUser ?
          (
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Correo:</label>
              <input
                type="email"
                id="correo"
                name="correo"
                className="form-control"
                value={user.correo}
                onChange={handleUser}
              />

              <label htmlFor="password">Contraseña:</label>

              <input
                type={seePassword ? "text" : "password"}
                id="codigo"
                name="codigo"
                className="form-control"
                value={user.codigo}
                onChange={handleUser}
              />
              <span
                onClick={() => {
                  setSeePassword(!seePassword);
                }}
                className="absolute right-2"
              >
                {seePassword ? <BsEyeSlash /> : <BsEye />}
              </span>


            </form>
          ) :

          <div>
              <>
                <p>Has iniciado sesión correctamente.</p> <br></br>
                <Link to={`/user/editar/${userId}`}>
                  <Button className='mb-2' color="primary" >
                    Editar perfil
                  </Button>
                </Link>
                <br></br>
                <Link to={`/mis_publicaciones/${userId}`} style={{ textDecoration: 'none' }}>
                  <Button className='mb-2' color="primary" >
                    Ver mis publicaciones
                  </Button>
                </Link>
              </>
          </div>
        }
      </ModalBody>
      <ModalFooter >
        {
          !loggedInUser ?
            <>
              <Button style={{ backgroundColor: 'black', color: "white" }} onClick={handleSubmit}>
                Ingresar
              </Button>{" "}
              <Button color="secondary" onClick={toggle}>
                Cancelar
              </Button>
            </> :

            <Button className='mb-2' color="primary" onClick={handleLogout} >
              Cerrar sesion
            </Button>
        }

      </ModalFooter>
      <div style={{ margin: '5px', alignItems: 'center', textAlign: 'center' }}>
        <Link style={{ textDecoration: 'none', fontSize: '18px' }} to="/crear_cuenta">
          {
            loggedInUser ? null : " No tengo cuenta, quiero registrarme "
          }

        </Link>
      </div>
    </Modal>
  )
}

export default Login