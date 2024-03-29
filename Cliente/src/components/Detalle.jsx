import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_Inmueble } from "../Redux/actions";
import { useParams, Link } from "react-router-dom";
import {BsFillArrowLeftSquareFill} from "react-icons/bs"
import Footer from "../components/Footer"
import ContactoForm from "./ContactoForm";
import NotFount from "./notFount/NotFount";
const Detalle = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const detail = useSelector((state) => state.detalle);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true); // Estado de carga

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    dispatch(get_Inmueble(id))
      .then(() => {
        setLoading(false); // Se establece el estado de carga en false una vez que se ha cargado el detalle
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Se establece el estado de carga en false en caso de que ocurra un error
      });
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="loadingDiv">
        <p className="spinner"></p>
        <p className="loadingp">Cargando...</p>
      </div>
    );
  }
if(!detail){
  return( <NotFount/>)
}
 
  return (
    <div className="card">
    <Link to={"/"} style={{display :'flex', justifyContent:'center'}}>
        <BsFillArrowLeftSquareFill style={{fontSize:'35px', marginBottom:'5px',color:'#80808096', marginTop:"3px"}}/>
    </Link>
    
    <h1 style={{textAlign:'center'}} >{detail?.titulo}</h1> 
    <div style={{display:'flex', justifyContent:'center'}}>
      <p style={{padding:'2px',textAlign:'center', fontWeight:'bolder', fontSize:'19px', border:'solid 1px' , borderColor:'black', width:'200px', backgroundColor:'rgb(255 210 7 / 52%)'}}>Precio: Usd${detail?.precio}</p>
    </div>
    <div className="container p-2 " style={{ display:'flex', justifyContent:'center'}}>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide "
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        
        <div className="carousel-inner">
          {detail?.fotos?.map((el, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={el.url}
                alt={`Slide ${index}`}
                style={{ width: "1100px", height: "400px", objectFit: "cover", textAlign:'center' }}
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden"  >Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon "
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>

   {/* Informacion */}
      
      <div className="info card text-center mx-auto mt-4 p-1 " style={{width:'1200px' , }}>
        <div className="card-body align-items-start mx-auto">

       <p className="text-start">Fecha de publicación: {detail?.fecha_publicacion?.slice(0,10)}</p>
       
      
        <p style={{maxWidth:'1000px'}}>{detail?.descripcion}</p>
      
        {/*  */}
        <p>
        <button
          style={{ border: 'none', background: 'none', color: 'blue' }}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded={expanded ? 'true' : 'false'}
          aria-controls="collapseExample"
          onClick={toggleExpand}
        >
          {expanded ? 'Ver menos' : 'Ver más...'}
        </button>
        </p>
        <div className={`collapse${expanded ? ' show' : ''}`} id="collapseExample">
            <div className="align-items-start" style={{display:'grid', gridTemplateColumns:'1fr 1fr' , gap:'15px'}}>
                <p  className="text-start">Ambientes: {detail?.ambientes}</p>
                <p className="text-start">Suerficie: {detail?.superficie} m2</p>
                <p className="text-start ">Antiguedad: {detail?.antiguedad}</p>
                <p className="text-start ">Operacion: {detail?.operacion}</p>
                <p className="text-start ">Ubicacion: {detail?.ubicacion}</p>
                <p className="text-start">Propiedad: {detail?.Propiedad?.nombre}</p>
                <p className="text-start ">Provincia: {detail?.Provincia?.nombre_prov}</p>
            </div>
        </div>
        </div>
    
      </div>
      <div>
        <ContactoForm idInmueble ={id}/>
      </div>
      <Footer/>
          
    </div>
  );
};

export default Detalle;
