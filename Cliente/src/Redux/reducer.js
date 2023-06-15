
import { TYPES } from "./actions";
const initialState={
    inmuebles:[],
    provincias:[],
    All_inmueble:[],
    detalle:[],
    error:''
}
export function rootReducer(state = initialState, action){
    switch (action.type) { 
        case TYPES.GET_INMUEBLES:
          return {
            ...state,
            inmuebles: action.payload, 
            All_inmueble:action.payload
          };
          case TYPES.GET_ALL_PROVINCIAS:
            return {
              ...state,
              provincias: action.payload, 
             
            };
          case TYPES.SEARCH_INMUEBLE:
            return {
              ...state,
              inmuebles: action.payload, 
             
            };
            case TYPES.GET_INMUEBLE_DETAIL:
              return{
                ...state,
                detalle: action.payload
              }
            case TYPES.ERROR_MENSAJE:
              return{
                
                error: action.payload
              }
              case TYPES.CLEAR_MENSAJE:
                return{
                  error: ''
                }
                //filtros
                case TYPES.FILTRAR_PROVINCIAS:
                  if(action.payload ==="todos"){
                    return{
                      ...state,
                      inmuebles: state.All_inmueble
                    }
                  }else {
                    return{
                      ...state,
                      inmuebles:state.inmuebles.filter(el=>el.provincia=== action.payload)
                    }
                  }
                 
        default:
          return {
            ...state,
          };
      }
}
