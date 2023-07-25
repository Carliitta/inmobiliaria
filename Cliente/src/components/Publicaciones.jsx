
import {useDispatch, useSelector} from "react-redux"
import { delete_Post, get_Posts, get_All_Inmuebles } from '../Redux/actions'
import {Button} from "reactstrap"
import React, { useEffect , useState} from 'react';
import Footer from "../../src/components/Footer"
import { useParams, Link } from "react-router-dom";
import {BsFillArrowLeftSquareFill} from "react-icons/bs"

import Swal from "sweetalert2";
import { icons } from "react-icons/lib";
const Publicaciones = () => {
  const publicaciones = useSelector(state => state.publicaciones);
  const dispatch = useDispatch();
  const storedUserData = localStorage.getItem('user-log');
  const userData = JSON.parse(storedUserData); 
/*   const  usuario= useSelector((state)=>state.user)
  const dataUser= usuario */
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    dispatch(get_Posts(userData?.id))
      .then(() => {
        setLoading(false); 
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); 
      }); 
     // console.log(userData);
  }, [dispatch]);
 
  if (loading) {
    return (
      <div className="loadingDiv">
        <p className="spinner"></p>
        <p className="loadingp">Cargando...</p>
      </div>
    );
  }

  const Eliminar_Post =(id)=>{
    Swal.fire({
      title: 'Eliminar',
      text: "Está seguro que desea eliminar este post?",
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar',
      
    }).then( respuesta=>{
      //console.log(respuesta);
      if(respuesta.isConfirmed ===true){
        dispatch(delete_Post(id))
    Swal.fire({
      text:'Eliminado correctamente!',
      icon:'success'
    })
  }
})
setTimeout(function(){

  dispatch(get_Posts(userData.id))
 
}, 4000);
        
}

  return (
    <>
    <div className="d-flex flex-column min-vh-100" style={{  alignItems: 'center'}}>

    <h2 className="text-center mt-2 ">Mis publicaciones</h2> <br />
    <Link to={"/"} style={{display :'flex', justifyContent:'center'}}>
        <BsFillArrowLeftSquareFill style={{fontSize:'35px', marginBottom:'10px',color:'#80808096'}}/>
    </Link>
    <div className="container mb-3" style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:'10px' }}>
  
   {
    publicaciones.length?
    publicaciones.map(el=>{
      return (
        <div key={el.id} className="card " style={{width:'16rem'}}>
           <div style={{ height:'200px'}}>
           <img src={el?.fotos[0]?.url} className="card-img-top p-1" alt="Foto de la publicación" style={{ height: '100%', width: '100%', objectFit: 'cover' }}/>

          </div>
        <div style={{ height: '100px' }}>

        <h5  className="card-title text-center">{el.titulo}</h5>
        <p className="card-text text-center">{el.descripcion.slice(0, 30)}...</p>
        </div>
        <div className="d-flex " style={{justifyContent:'center'}}>
        <Button className="m-1" style={{backgroundColor:"#ffe307cf", color:'#000'}} onClick={()=>Eliminar_Post(el.id)}>
          Eliminar
        </Button>{' '}
        <br />
        <Link to={'/actualizar/' + el.id}>
        <Button className="m-1"  style={{backgroundColor:"#ffe307cf", color:'#000'}}>
          Modificar
        </Button>{' '}

        </Link>
        </div> 
    </div>
      )
    }) :
  
      <p className="text-center fs-4 " style={{width:'500px'}}>No se encontraron publicaciones</p>    
  }  
    </div>
    </div>
    <Footer/>
    </>
  );
};

export default Publicaciones;
