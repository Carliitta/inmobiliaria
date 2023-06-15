
import {useSelector, useDispatch} from "react-redux"
import React, { useState, useEffect } from 'react';
import { filter_by_Provincias, get_All_Provincias } from "../Redux/actions";


const Filtros = () => {
  const provincias= useSelector(state=>state.provincias)
  const dispatch= useDispatch()
  useEffect(() => {
   dispatch(get_All_Provincias())
  
   
  }, [])
  
  const filtrarProvincia= (e)=>{
   dispatch(filter_by_Provincias(e.target.value))
   console.log(e.target.value);
  }

  return (
    <nav className="navbar justify-content-center ">
   <div className="dropdown m-1">
 
  <select  onChange={filtrarProvincia}>
    <option  className="dropdown-menu" value="">Provincia</option>
    <option  value="todos">Todos</option>
    {provincias?.map(el => (
      <option key={el.id} value={el.nombre_prov}>{el.nombre_prov}</option>
    ))}
  </select>
</div>



      {/*  OPERACION */}
      <div className="dropdown m-2">
        <button
          className="btn btn-info dropdown-toggle  opacity-75"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Operacion
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#">
            Opción 1
          </a>
          <a className="dropdown-item" href="#">
            Opción 2
          </a>
          <a className="dropdown-item" href="#">
            Opción 3
          </a>
        </div>
      </div>
      {/* TIPO PROPIEDAD*/}
      <div className="dropdown m-2">
        <button
          className="btn btn-info dropdown-toggle  opacity-75"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Propiedad
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#">
            Opción 1
          </a>
          <a className="dropdown-item" href="#">
            Opción 2
          </a>
          <a className="dropdown-item" href="#">
            Opción 3
          </a>
        </div>
      </div>
      {/* precio*/}
      <div className="dropdown m-2">
        <button
          className="btn btn-info dropdown-toggle  opacity-75"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Precio
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#">
            Opción 1
          </a>
          <a className="dropdown-item" href="#">
            Opción 2
          </a>
          <a className="dropdown-item" href="#">
            Opción 3
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Filtros;
