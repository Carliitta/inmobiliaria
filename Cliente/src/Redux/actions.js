import axios from "axios";
import Swal from "sweetalert2";
export const TYPES = {
  GET_INMUEBLES: "GET_INMUEBLES",
  GET_ALL_PROVINCIAS: "GET_ALL_PROVINCIAS",
  GET_ALL_PROPIEDAD: "GET_ALL_PROPIEDAD",
  SEARCH_INMUEBLE: " SEARCH_INMUEBLE",
  ERROR_MENSAJE: "ERROR_MENSAJE",
  CLEAR_MENSAJE: "CLEAR_MENSAJE",
  GET_INMUEBLE_DETAIL: "GET_INMUEBLE_DETAIL",
  FILTRAR_PROVINCIAS: "FILTRAR_PROVINCIAS",
  FILTRAR_OPERACION: "FILTRAR_OPERACION",
  FILTRAR_PROPIEDAD: "FILTRAR_PROPIEDAD",
  FILTRAR_PECIO: "FILTRAR_PECIO",
  LIMPIAR_FILTROS: " LIMPIAR_FILTROS",
  CREAR_USUARIO: "CREAR_USUARIO",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOG_OUT: "LOG_OUT",
  PUBLICAR_INMUEBLE: "PUBLICAR_INMUEBLE",
  ENVIAR_EMAIL: "ENVIAR_EMAIL",
  ENVIAR_EMAIL_SOPORT: "ENVIAR_EMAIL_SOPORT",
  MIS_PUBLICACIONES: "MIS_PUBLICACIONES",
  ELIMINAR_POST: "ELIMINAR_POST",
  ACTUALIZAR_POST: "ACTUALIZAR_POST",
  ACTUALIZAR_PERFIL: "ACTUALIZAR_PERFIL",
  DELETE_FOTO_SUCCESS: "DELETE_FOTO_SUCCESS",
  DELETE_FOTO_FAILURE: "DELETE_FOTO_FAILURE",
};

export const get_All_Inmuebles = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/inmuebles");
      const inmuebles = response.data;
      console.log(inmuebles);
      dispatch({
        type: TYPES.GET_INMUEBLES,
        payload: inmuebles,
      });
    } catch (error) {
      throw error;
    }
  };
};
export const get_All_Provincias = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/provincias");
      const prov = response.data;
      // console.log(prov);
      dispatch({
        type: TYPES.GET_ALL_PROVINCIAS,
        payload: prov,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const get_All_Propiedad = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/propiedad");
      const prop = response.data;
      // console.log(prop);
      dispatch({
        type: TYPES.GET_ALL_PROPIEDAD,
        payload: prop,
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
      const response = await axios.get(
        `http://localhost:3001/inmuebles?ubicacion=${ubicacion}`
      );
      const search = response.data;

      dispatch({
        type: TYPES.SEARCH_INMUEBLE,
        payload: search,
      });
    } catch (error) {
      dispatch({
        type: TYPES.ERROR_MENSAJE,
        payload: error.response.data,
      });
    }
  };
};
//error
export const clear_error = () => {
  return (dispatch) => {
    dispatch({
      type: TYPES.CLEAR_MENSAJE,
    });
  };
};
///detalle
export const get_Inmueble = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/inmuebles/" + id);
      const inmueble = response.data;
      // console.log(inmueble);
      dispatch({
        type: TYPES.GET_INMUEBLE_DETAIL,
        payload: inmueble,
      });
    } catch (error) {
      dispatch({
        type: TYPES.ERROR_MENSAJE,
        payload: error.response.data,
      });
    }
  };
};
//filtros
export const filter_by_Provincias = (prov) => {
  return (dispatch) => {
    dispatch({
      type: TYPES.FILTRAR_PROVINCIAS,
      payload: prov,
    });
  };
};

export const filter_by_Operacion = (op) => {
  return (dispatch) => {
    dispatch({
      type: TYPES.FILTRAR_OPERACION,
      payload: op,
    });
  };
};
export const filter_by_propiedad = (prop) => {
  return (dispatch) => {
    dispatch({
      type: TYPES.FILTRAR_PROPIEDAD,
      payload: prop,
    });
  };
};

export const filter_by_precio = (precio) => {
  return (dispatch) => {
    dispatch({
      type: TYPES.FILTRAR_PECIO,
      payload: precio,
    });
  };
};

export const filter_clear = () => {
  return (dispatch) => {
    dispatch({
      type: TYPES.LIMPIAR_FILTROS,
    });
  };
};

//registrarse y logearse
export const registrarse = (data) => {
  return async (dispatch) => {
    try {
      await axios.post("http://localhost:3001/usuarios/registro", data);
      dispatch({
        type: TYPES.CREAR_USUARIO,
      });
    } catch (error) {
      throw error;
    }
  };
};

export function LoginSuccess(data) {
  return async function (dispatch) {
    window.localStorage.setItem("user-log", JSON.stringify(data));
    //console.log(data);
    dispatch({
      type: TYPES.LOGIN_SUCCESS,
      payload: data,
    });
  };
}
export function LogOut() {
  return async function (dispatch) {
    dispatch({
      type: TYPES.LOG_OUT,
    });
  };
}

//PUBLICAR INMUEBLE
export const publicar_Inmueble = (inmueble) => {
  return async (dispatch) => {
    try {
      const inmueb = await axios.post(
        "http://localhost:3001/inmuebles/publicar",
        inmueble
      );
      // console.log(inmueb)
      dispatch({
        type: TYPES.PUBLICAR_INMUEBLE,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const sendEmail = (id, data) => {
  return async (dispatch) => {
    try {
      await axios.post(`http://localhost:3001/contactar/${id}`, data);

      dispatch({
        type: TYPES.ENVIAR_EMAIL,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const sendEmailSoport = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(`http://localhost:3001/contactar/soporte`, data);

      dispatch({
        type: TYPES.ENVIAR_EMAIL_SOPORT,
      });
    } catch (error) {
      //console.log("Ocurrió un error en la solicitud:", error.message);
      throw error;
    }
  };
};

export const get_Posts = (id) => {
  return async (dispatch) => {
    try {
      const publicaciones = await axios.get(
        `http://localhost:3001/inmuebles/publicaciones/${id}`
      );
      // console.log(publicaciones.data);
      dispatch({
        type: TYPES.MIS_PUBLICACIONES,
        payload: publicaciones.data,
      });
    } catch (error) {
      console.log("Ocurrió un error en la solicitud:", error.response.data);
    }
  };
};
export const delete_Post = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:3001/inmuebles/publicaciones/${id}`);

      dispatch({
        type: TYPES.ELIMINAR_POST,
      });
    } catch (error) {
      console.log("Ocurrió un error en la solicitud:", error.response.data);
    }
  };
};

export const update_Post = (id, data) => {
  return async (dispatch) => {
    try {
      await axios.put(`http://localhost:3001/inmuebles/${id}`, data);

      dispatch({
        type: TYPES.ACTUALIZAR_POST,
        payload: data,
      });
    } catch (error) {
      console.log("Ocurrió un error en la solicitud:", error.response.data);
    }
  };
};

export const update_Profile = (id, data) => {
  return async (dispatch) => {
    try {
      await axios.put(`http://localhost:3001/usuarios/editar/${id}`, data);
      // Actualizar los datos en el localStorage
      const storedUserData = localStorage.getItem("user-log");
      const userData = JSON.parse(storedUserData);
      const updatedUserData = { ...userData, ...data };
      localStorage.setItem("user-log", JSON.stringify(updatedUserData));

      dispatch({
        type: TYPES.ACTUALIZAR_PERFIL,
        payload: updatedUserData,
      });
    } catch (error) {
      console.log("Ocurrió un error en la solicitud:", error.response.data);
    }
  };
};

// Acción para eliminar una foto de un inmueble
export const deleteFoto = (inmuebleId, fotoId) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/inmuebles/${inmuebleId}/fotos/${fotoId}`
    );
    const data = response.data;

    // Actualizar el estado de Redux con el inmueble actualizado
    dispatch({
      type: TYPES.DELETE_FOTO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPES.DELETE_FOTO_FAILURE,
      payload: error.response.data.error,
    });
  }
};
