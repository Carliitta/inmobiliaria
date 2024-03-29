import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import {
  filter_by_Operacion,
  filter_by_Provincias,
  filter_by_precio,
  filter_by_propiedad,
  filter_clear,
  get_All_Propiedad,
  get_All_Provincias,
} from "../Redux/actions";
import Mensaje from "./Mensaje";

const Filtros = ({setPagina}) => {
  const provincias = useSelector((state) => state.provincias);
  const Propiedad = useSelector((state) => state.propiedad);
  const inmuebles = useSelector((state) => state.inmuebles);
  const [filtroProv, setFiltroprov] = useState('Provincias');
  const [filtroOpe, setFiltroOpe] = useState('Operación');
  const [filtroProp, setFiltroprop] = useState('Propiedad');
  const [filtroPrecio, setFiltroprecio] = useState('Precio')
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_All_Provincias());
    dispatch(get_All_Propiedad());
  }, []);

  const filtrarProvincia = (e) => {
    dispatch(filter_by_Provincias(e.target.value));
    setFiltroprov(filtroProv)
    setPagina(1)
  };

  const filtrarOperacion = (e) => {
    dispatch(filter_by_Operacion(e.target.value));
    setFiltroOpe(filtroOpe)
    setPagina(1)
  };

  const filtrarPropiedad = (e) => {
    dispatch(filter_by_propiedad(e.target.value));
    setFiltroprop(filtroProp)
    setPagina(1)
  };

  const filtrarPrecio = (e) => {
    dispatch(filter_by_precio(e.target.value));
    setFiltroprecio(filtroPrecio)
    setPagina(1)
  };
  const LimpiarFiltros = () => {
    dispatch(filter_clear());
    setFiltroprov(filtroProv)
    setFiltroOpe(filtroOpe)
    setFiltroprecio(filtroPrecio)
    setFiltroprop(filtroProp)
    dispatch(get_All_Provincias());
    dispatch(get_All_Propiedad());
  };


 
  return (
    <nav className="selected navbar justify-content-center ">
    
      <div className=" dropdown m-1">
        <select onChange={filtrarProvincia}>
          <option className="dropdown-menu" value="">
            {filtroProv}
          </option>
          <option value="todos">Todos</option>
          {provincias?.map((el) => (
            <option key={el.id} value={el.nombre_prov}>
              {el.nombre_prov}
            </option>
          ))}
        </select>
      </div>

      {/*  OPERACION */}
      <div className="dropdown m-1">
        <select onChange={filtrarOperacion}>
          <option className="dropdown-menu" value="">
            {filtroOpe}
          </option>
          <option value="todos">Todos</option>
          <option value="venta">Venta</option>
          <option value="alquiler">Alquiler</option>
        </select>
      </div>
      {/* TIPO PROPIEDAD*/}
      <div className="dropdown m-1">
        <select onChange={filtrarPropiedad}>
          <option className="dropdown-menu" value="">
            {filtroProp}
          </option>
          <option value="todos">Todos</option>
          {Propiedad?.map((el) => (
            <option key={el.id} value={el.nombre}>
              {el.nombre}
            </option>
          ))}
        </select>
      </div>
      {/* precio*/}
      <div className="dropdown m-1">
        <select onChange={filtrarPrecio}>
          <option className="dropdown-menu" value="">
            {filtroPrecio}
          </option>
          <option value="defecto">por defecto</option>
          <option value="mayor">Mayor</option>
          <option value="menor">Menor</option>
        </select>
      </div>
      {/* Limpiar*/}
      <div style={{margin:'5px'}}>
        <button onClick={LimpiarFiltros} className="btn  btn-sm " style={{backgroundColor:'#e5d62473'}}>Limpiar Filtros</button>
      </div>
      
    </nav>
  );
};

export default Filtros;
