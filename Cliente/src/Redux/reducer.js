import { TYPES } from "./actions";
const initialState = {
  inmuebles: [],
  provincias: [],
  All_inmueble: [],
  detalle: [],
  propiedad: [],
  user: [],
  publicaciones:[],
  error: "",
  isAuthenticated: false,
};
export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.GET_INMUEBLES:
      return {
        ...state,
        inmuebles: action.payload,
        All_inmueble: action.payload,
      };
    case TYPES.GET_ALL_PROVINCIAS:
      return {
        ...state,
        provincias: action.payload,
      };
    case TYPES.GET_ALL_PROPIEDAD:
      return {
        ...state,
        propiedad: action.payload,
      };
    case TYPES.SEARCH_INMUEBLE:
      return {
        ...state,
        inmuebles: action.payload,
      };
    case TYPES.GET_INMUEBLE_DETAIL:
      return {
        ...state,
        detalle: action.payload,
      };
    case TYPES.CREAR_USUARIO:
      return {
        ...state,
      };
    case TYPES.ERROR_MENSAJE:
      return {
        error: action.payload,
      };
    case TYPES.CLEAR_MENSAJE:
      return {
        error: "",
      };
    //filtros
    case TYPES.FILTRAR_PROVINCIAS:
      if (action.payload === "todos") {
        return {
          ...state,
          inmuebles: state.All_inmueble,
        };
      } else {
        return {
          ...state,
          inmuebles: state.All_inmueble?.filter(
            (el) => el.provincia === action.payload
          ),
        };
      }

    case TYPES.FILTRAR_OPERACION:
      if (action.payload === "todos") {
        return {
          ...state,
          inmuebles: state.All_inmueble,
        };
      } else {
        return {
          ...state,
          inmuebles: state.inmuebles.filter(
            (el) => el.operacion === action.payload
          ),
        };
      }

    case TYPES.FILTRAR_PROPIEDAD:
      if (action.payload === "todos") {
        return {
          ...state,
          inmuebles: state.All_inmueble,
        };
      } else {
        return {
          ...state,
          inmuebles: state.inmuebles.filter(
            (el) => el.propiedad === action.payload
          ),
        };
      }

    case TYPES.FILTRAR_PECIO:
      if (action.payload === "defecto") {
        return {
          ...state,
          inmuebles: state.All_inmueble,
        };
      } else if (action.payload === "mayor") {
        const sortedInmuebles = [state.inmuebles].sort((a, b) => {
          if (parseFloat(a.precio) > parseFloat(b.precio)) {
            return -1;
          }
          if (parseFloat(a.precio) < parseFloat(b.precio)) {
            return 1;
          }
          return 0;
        });
        return {
          ...state,
          inmuebles: sortedInmuebles,
        };
      } else {
        const sortedInmuebles = [...state.inmuebles].sort((a, b) => {
          if (parseFloat(a.precio) < parseFloat(b.precio)) {
            return -1;
          }
          if (parseFloat(a.precio) > parseFloat(b.precio)) {
            return 1;
          }
          return 0;
        });
        return {
          ...state,
          inmuebles: sortedInmuebles,
        };
      }
    case TYPES.LIMPIAR_FILTROS:
      return {
        inmuebles: state.All_inmueble,
      };
    //SESION
    case TYPES.LOGIN_SUCCESS:
    
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case TYPES.LOG_OUT:
      window.localStorage.removeItem("user-log");
      return {
        ...state,
        user: {},
        isAuthenticated: false
      };
      case TYPES.PUBLICAR_INMUEBLE:
        return {
          ...state,
        
        };
        case TYPES.ENVIAR_EMAIL:
          return {
            ...state,
          
          };
          case TYPES.ENVIAR_EMAIL_SOPORT:
          return {
            ...state,
          
          };
          case TYPES.MIS_PUBLICACIONES:
            return {
              ...state,
              publicaciones:action.payload
            };
          
          


    default:
      return {
        ...state,
      };
  }
}
