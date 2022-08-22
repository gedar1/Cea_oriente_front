import {
  GET_APRENDIZ,
  FIND_APRENDIZ,
  CREATE_APRENDIZ,
  GET_APRENDIZ_CXC,
  UPDATE_APRENDIZ,
  RESET_ITEM,
} from "../../actionTypes/Types";
import initialState from "./AprendizState";

const reducer = (globalAprendizState, action) => {
  console.log(action);
  switch (action.type) {
    case GET_APRENDIZ:
      return {
        ...globalAprendizState,
        aprendices: action.payload,
      };
    case GET_APRENDIZ_CXC:
      return {
        ...globalAprendizState,
        aprendizcxc: action.payload,
      };
    case FIND_APRENDIZ:
      return {
        ...globalAprendizState,
        aprendiz: action.payload,
      };

      case UPDATE_APRENDIZ:
      return {
        ...globalAprendizState,
        aprendizupdate: [...globalAprendizState.aprendizupdate,action.payload],
      };

    case CREATE_APRENDIZ:
      return {
        ...globalAprendizState,
        aprendizcreate: [...globalAprendizState.aprendizcreate, action.payload],
      };

    case RESET_ITEM:
      return {
        ...globalAprendizState,
        aprendiz: action.payload,
      };

    default:
      return globalAprendizState;
  }
};
export default reducer;
