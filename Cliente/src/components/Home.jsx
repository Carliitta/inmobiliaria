import React from "react";
import { Navbar } from "./Navbar";
import Card from "./Card";

import Footer from "./Footer";
import Paginado from "./Paginado";
import { get_All_Inmuebles, clear_error } from "../Redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../src/App.css";
import Mensaje from "./Mensaje";

const Home = () => {
  const dispatch = useDispatch();

  const inmuebles = useSelector((state) => state.inmuebles);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(get_All_Inmuebles());
  }, []);

  return (
    <div style={{display:'block'}}>
      <Navbar />
      <div className="container-sm pt-1  ">
        <div className="row">
          {error ? (
            <Mensaje />
          ) : inmuebles ? (
            inmuebles.map((inmueble) => (
              <Card key={inmueble.id}
                id={inmueble.id}
                titulo={inmueble.titulo}
                provincia={inmueble.provincia}
                ubicacion={inmueble.ubicacion}
                precio={inmueble.precio}
                fotos={inmueble.fotos.url}
              />
            ))
          ) : (
            <div className="loadingDiv">
              <p className="spinner"></p>
              <p className="loadingp">Cargando...</p>
            </div>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-center pt-4 ">
       {/*  verifica si inmuebles existe y tiene un valor antes de evaluar la
        condición inmuebles.length > 0. Si inmuebles es undefined o no tiene
        valor asignado, la expresión se evaluará como false y el componente
        Paginado no se renderizará. */}
        {inmuebles && inmuebles.length > 0 && <Paginado />}
      </div>
      <div
        className=" pt-2 "
        style={{  bottom: '0', width: '100%' }}
      >

      <Footer  />
      </div>
    </div>
  );
};

export default Home;
