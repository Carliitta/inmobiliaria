
import { TYPES } from "./actions";
const initialState={
    inmuebles:[],
    inmuebleFiltrado:[],
    error:''
}
export function rootReducer(state = initialState, action){
    switch (action.type) { 
        case TYPES.GET_INMUEBLES:
          return {
            ...state,
            inmuebles: action.payload, 
            inmuebleFiltrado:action.payload
          };
          case TYPES.SEARCH_INMUEBLE:
            return {
              ...state,
              inmuebles: action.payload, 
             
            };
            case TYPES.ERROR_MENSAJE:
              return{
                
                error: action.payload
              }
              case TYPES.CLEAR_MENSAJE:
                return{
                  error: ''
                }
        default:
          return {
            ...state,
          };
      }
}
