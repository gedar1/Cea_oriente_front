import {
  UPDATE_PAGOS,
  FIND_PAGOS,
  CREATE_PAGOS,
  LIST_PAGOS,
  GET_PAGOS,
  FIND_PAGO_DOC
} from "../../actionTypes/Types";

const pagosReducer = (globalPagosState, action) => {
  console.log(action);
  switch (action.type) {
    case GET_PAGOS:
      return {
        ...globalPagosState,
        idprov: action.payload,
      };
      
      case FIND_PAGO_DOC:
      return {
        ...globalPagosState,
        pagoxdoc: action.payload,
      };


    case LIST_PAGOS:
      return {
        ...globalPagosState,
        pagos: action.payload.dataPagos,
      };

    case FIND_PAGOS:
      return {
        ...globalPagosState,
        pago: action.payload,
      };

    case CREATE_PAGOS:
      return {
        ...globalPagosState,
        pagocreate: [...globalPagosState.pagocreate, action.payload],
      };

    default:
      return globalPagosState;
  }
};
export default pagosReducer;
