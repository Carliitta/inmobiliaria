import axios from "axios"
import Swal from 'sweetalert2'
export const TYPES={
    GET_INMUEBLES:'GET_INMUEBLES',
    SEARCH_INMUEBLE:' SEARCH_INMUEBLE',
    ERROR_MENSAJE:'ERROR_MENSAJE',
    CLEAR_MENSAJE:'CLEAR_MENSAJE'
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
export const clear_error = () => {
  return (dispatch) => {
    
      dispatch({ 
          type: TYPES.CLEAR_MENSAJE
       });
   
    
  };
};