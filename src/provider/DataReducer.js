import {
    GET_DATA,FIND_MUNICIPIO,RELOAD_PAGE
  } from "../actionTypes/Types";
  
  const dataReducer = (state, action) => {
    
    switch (action.type) {
      case GET_DATA:
       
        return {
          ...state,
         tipoDocumento:action.payload.res.data,
         tipoSexo:action.payload.resSex.data,
         cajaCompensacion:action.payload.resCaja.data,
         licencia:action.payload.resLicencia.data,
         departamentos:action.payload.resDptos.data,
         arls:action.payload.resArls.data,
         eps:action.payload.resEps.data,
         formaPago:action.payload.resFormP.data,
         instructor:action.payload.resInst.data

        };

        case FIND_MUNICIPIO:
          return {
            ...state,
            municipios: action.payload.data,
          };
        
          case RELOAD_PAGE:
            return { ...state}
  
      default:
        return state;
    }
  };
  export default dataReducer;
  