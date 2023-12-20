import React from "react";
import { Navbar } from "./Navbar";
import Card from "./Card";
import  NotFount from "./notFount/NotFount"
import Footer from "./Footer";
import Paginado from "./Paginado";
import { get_All_Inmuebles, clear_error } from "../Redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../src/App.css";
import Mensaje from "./Mensaje";
import CrearUsuario from "./CrearUsuario";

const Home = () => {
  const dispatch = useDispatch();

  const inmuebles = useSelector((state) => state.inmuebles);
  const error = useSelector((state) => state.error);
  const user = useSelector((state) => state.user);
  const [pagina, setPagina]= useState(1)
  const[verPorPagina , setVerPorPagina]=useState(3)
  const maximo = Math.ceil(inmuebles?.length/verPorPagina)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  useEffect(() => {
    // Llamada a la acción para obtener inmuebles
    dispatch(get_All_Inmuebles());
  
  }, [dispatch, user]);
   //console.log(inmuebles)



  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar isOpen={isModalOpen} toggle={toggleModal} setPagina={setPagina} />
      <div className="container-sm pt-1 flex-grow-1">
        <div className="row">
          {error ? (
            <Mensaje />
          ) : inmuebles?.length > 0 ? (
            inmuebles
              ?.slice((pagina - 1) * verPorPagina, (pagina - 1) * verPorPagina + verPorPagina)
              ?.map((inmueble) => (
                <Card
                  key={inmueble?.id}
                  id={inmueble?.id}
                  titulo={inmueble?.titulo}
                  provincia={inmueble?.Provincia?.nombre_prov}
                  ubicacion={inmueble?.ubicacion}
                  precio={inmueble?.precio}
                  fotos={inmueble?.fotos?.url || inmueble?.fotos[0]?.url}
                />
              ))
          ) : (
            <div className="not-found-message mt-4 fs-4">
              No se encontraron inmuebles 
            </div>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-center pt-4">
        {inmuebles && inmuebles.length > 0 && <Paginado inmuebles={maximo} pagina={pagina} setPagina={setPagina} />}
      </div>
      <div style={{ marginTop: 'auto' }}>
        <Footer />
      </div>
    </div>
  );
  }  

export default Home;
