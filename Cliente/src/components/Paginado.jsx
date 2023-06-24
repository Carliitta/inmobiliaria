import React from 'react'

const Paginado = ({inmuebles, pagina, setPagina}) => {

  const pages = [];
  for(let i=1 ; i<=inmuebles; i++){ //guardo cada numero de pagina en un array
      pages.push(i);
  }
  return (
    <nav aria-label="Page navigation example" style={{ zIndex: 1 }}>
    
    <ul className="pagination">
                {
                pages.map(number =>(//hago un map al array con los numeros y creo una lista con cada uno
                    <li className='page-item' key={number}>{/* con un link que al dar click setea el valor con el numero que presionamos y os lleva a esa pagina */}
                        <a style={{cursor:'pointer'}}  className="page-link" id='numeros' onClick={()=> setPagina(number)}> {number} </a> 
                    </li> 
                ))}
            </ul>
        <a className="page-link" href="#" aria-label="Next">
       
        </a>
      
    
  </nav>
  )
}

export default Paginado