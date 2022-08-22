import React, { createContext, useReducer, useContext } from "react";
import {
  UPDATE_INSTRUCTOR,
  CREATE_INSTRUCTOR,
  FIND_INSTRUCTOR,
  LIST_INSTRUCTOR,
  ADD_INSTRUCTORID,
} from "../actionTypes/Types";

const AppContext = createContext();

const useAppcontext = () => {
  return useContext(AppContext);
};

const initialState = {
  documento: "",
  instructores: [],
};

const reducer = (state, action) => {
  console.log(action.payload);
  switch (action.type) {
    case ADD_INSTRUCTORID:
      return { ...state, documento: action.documento };

    case LIST_INSTRUCTOR:
      return { ...state, instructores: action.instructores };

    case UPDATE_INSTRUCTOR:
      return { ...state };

    case FIND_INSTRUCTOR:
      return { ...state };

    case CREATE_INSTRUCTOR:
      return { ...state };

    default:
      return state;
  }
};
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, useAppcontext };
