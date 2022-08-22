import {
    GET_COTIZACION,
    FIND_COTIZACION,
    CREATE_COTIZACION,
    FIND_COTIZACION_ID,
    FIND_NRO_CONSECUTIVO,
    RESET_ITEM
  } from "../../actionTypes/Types";
  
  const cotizacionReducer = (globalCotizacionState, action) => {
    console.log(action);
    switch (action.type) {
      case GET_COTIZACION:
        return {
          ...globalCotizacionState,
          cotizaciones: action.payload.data,
        };
      case FIND_COTIZACION:
        return {
          ...globalCotizacionState,
          cotizacion: action.payload,
          idCot:action.payload.id,
         
        };
      case FIND_COTIZACION_ID:
        return {
          ...globalCotizacionState,
          findcotizacionxid: action.payload,
          cotizacionxId:action.payload
        };
        case FIND_NRO_CONSECUTIVO:
        return {
          ...globalCotizacionState,
          findcotizacionxcons: action.payload,
          
        };
      case CREATE_COTIZACION:
        return {
          ...globalCotizacionState,
         cotizacioncreate:action.payload,
        };
        case RESET_ITEM:
      return {
        globalCotizacionState,
        
      };
  
      default:
        return globalCotizacionState;
    }
  };
  export default cotizacionReducer;