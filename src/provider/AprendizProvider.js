import React, { createContext, useReducer, useContext } from "react";
import {
  UPDATE_APRENDIZ,
  CREATE_APRENDIZ,
  FIND_APRENDIZ,
  LIST_APRENDIZ,
  ADD_APRENDIZ,
  GET_APRENDIZ
} from "../actionTypes/Types";

const AprendizContext = createContext();

const useAprendizcontext = () => {
  return useContext(AprendizContext);
};

const initialState = {
  documento: "",
  aprendiz: [],
};

const reducerAprendiz = (state, action) => {
  console.log(action.payload);
  switch (action.type) {

    case LIST_APRENDIZ:
      return { ...state, instructores: action.instructores };

    case UPDATE_APRENDIZ:
      return { ...state };

    case FIND_APRENDIZ:
      return { ...state };

    case CREATE_APRENDIZ:
      return { ...state };

      case GET_APRENDIZ:
        return { ...state };

    default:
      return state;
  }
};
const AprendizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerAprendiz, initialState);
  console.log(state);
  return (
    <AprendizContext.Provider value={{ state, dispatch }}>
      {children}
    </AprendizContext.Provider>
  );
};

export { AprendizProvider, useAprendizcontext };
