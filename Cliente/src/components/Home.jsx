import React from "react";
import { Navbar } from "./Navbar";
import Card from "./Card";
import Filtros from "./Filtros";
import Footer from "./Footer";
import Paginado from "./Paginado";
import { get_All_Inmuebles,clear_error } from "../Redux/actions";
import { useEffect ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Mensaje from "./Mensaje";
const Home = () => {
  const dispatch = useDispatch();
 
  const inmuebles = useSelector((state) => state.inmuebles);
  const error = useSelector((state) => state.error);
 
  useEffect(() => {
   
    dispatch(get_All_Inmuebles());
  }, []);
 

  return (
    <div>
      <Navbar />
      <Filtros />
      <div className="container-sm pt-1  ">
              <div className="row">
              {error?
              <Mensaje/>:
              inmuebles?
              inmuebles.map((inmueble) => (
                <Card
                  key={inmueble.id}
                  titulo={inmueble.titulo}
                  provincia={inmueble.provincia}
                  ubicacion={inmueble.ubicacion}
                  precio={inmueble.precio}
                  fotos={inmueble.fotos}
                />
              )):
              <p style={{textAlign:'center'}}>Cargando...</p>
            }
            </div>
          
        
      </div>
      <div className="d-flex justify-content-center pt-4  ">
        <Paginado />
      </div>
      <div
        className=" pt-2 "
        style={{ bottom: "0", position: "absolute", width: "100%" }}
      >
      </div>
        <Footer />
    </div>
  );
};

export default Home;
