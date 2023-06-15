import React from 'react'
import img from '../utils/product-not-found.png'
const Mensaje = () => {
  return (
    <div className='container'>
      <img className="mx-auto d-block" src={img} alt="No se encontraron datos" style={{width:'35%', marginBottom:'10px' }} />
    </div>
  )
}

export default Mensaje