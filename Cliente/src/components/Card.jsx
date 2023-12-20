import React from "react";
import { Link } from "react-router-dom";
import "../../src/App.css"
const Card = ({id,titulo,ubicacion,precio,fotos,provincia}) => {
  return (
    <Link to={"/"+ id} className="card-hover col col-md-4 card border border-1" style={{margin:"20px" ,width: "25rem", height:"auto",textDecoration: "none"  }} >
     <div style={{ height:'200px'}}>
        <img src={fotos} className="card-img-top p-1" alt="img"  style={{ height: '100%', width: '100%', objectFit: 'cover' }}/>

     </div>
        <div className="card-body " style={{ height: '280px' }}>
          <p className="card-text fs-4">{titulo}</p>
          <p className="card-text fs-5">Usd$ {precio}</p>
          <p className="card-text fs-5">Provincia: {provincia}</p>
          <p className="card-text fs-5">Ubicación: {ubicacion}</p>
      </div>
    </Link>
  );
};

export default Card;
