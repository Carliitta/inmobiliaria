import axios from "axios"
import Swal from 'sweetalert2'
export const TYPES={
    GET_INMUEBLES:'GET_INMUEBLES',
    GET_ALL_PROVINCIAS:'GET_ALL_PROVINCIAS',
    SEARCH_INMUEBLE:' SEARCH_INMUEBLE',
    ERROR_MENSAJE:'ERROR_MENSAJE',
    CLEAR_MENSAJE:'CLEAR_MENSAJE',
    GET_INMUEBLE_DETAIL:'GET_INMUEBLE_DETAIL',
    FILTRAR_PROVINCIAS:'FILTRAR_PROVINCIAS'
}

export const get_All_Inmuebles = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get("http://localhost:3001/inmuebles");
        const inmuebles = response.data;
        console.log(inmuebles);
        dispatch({ 
            type: TYPES.GET_INMUEBLES,
            payload: inmuebles
         });
      } catch (error) {
        console.log(error);
      }
    };
  };
  export const get_All_Provincias = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get("http://localhost:3001/provincias");
        const prov = response.data;
      console.log(prov);
        dispatch({ 
            type: TYPES.GET_ALL_PROVINCIAS,
            payload: prov
         });
      } catch (error) {
        console.log(error);
      }
    };
  };
  ///buscar
  
export const search_Inmuebles = (ubicacion) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/inmuebles?ubicacion=${ubicacion}`);
      const search = response.data;
       
      dispatch({ 
          type: TYPES.SEARCH_INMUEBLE,
          payload: search
       });
    } catch (error) {
      dispatch({ 
        type: TYPES.ERROR_MENSAJE,
        payload: error.response.data
     });
    }
  };
};
//error
export const clear_error = () => {
  return (dispatch) => {
    
      dispatch({ 
          type: TYPES.CLEAR_MENSAJE
       });
   
    
  };
};
///detalle
export const get_Inmueble = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/inmuebles/"+ id);
      const inmueble = response.data;
      console.log(inmueble);
      dispatch({ 
          type: TYPES.GET_INMUEBLE_DETAIL,
          payload: inmueble
       });
    } catch (error) {
      dispatch({ 
        type: TYPES.ERROR_MENSAJE,
        payload: error.response.data
     });
    }
  };
};
//filtros
export const filter_by_Provincias = (prov) => {
  return (dispatch) => {
    
      dispatch({ 
          type: TYPES.FILTRAR_PROVINCIAS,
          payload:prov
       });
   
    
  };
};