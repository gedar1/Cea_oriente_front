import {
  LIST_NOMINA,
  FIND_NOMINA,
  CREATE_NOMINA,
  GET_ID_NOMINA,
  GET_ID_INSTRUCTOR
} from "../../actionTypes/Types";

const reducerNomina = (globalNominaState, action) => {
  console.log(action);
  switch (action.type) {

    case LIST_NOMINA:
      return {
        ...globalNominaState,
        nominas: action.payload.res.data,
        instructor: action.payload.instructor
      };

    case FIND_NOMINA:
      return {
        ...globalNominaState,
        nomina: action.payload,
      };

    case CREATE_NOMINA:
      return {
        ...globalNominaState,
        nominacreate: [
          ...globalNominaState.nominacreate,
          action.payload,
        ],
      };

      case GET_ID_INSTRUCTOR:
      return {
        ...globalNominaState,
        idinstructor: action.payload,
        
      };
      
      case GET_ID_NOMINA:
        return {
          ...globalNominaState,
          proveedor: action.payload
          
          
        };
    default:
      return globalNominaState;
  }
};



export default reducerNomina ;
