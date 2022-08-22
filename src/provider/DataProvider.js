import React, { createContext, useReducer, useContext,useState } from "react";
import { requestToken } from "../login/authContext";
import clientAxios from "../config/axios";
import dataReducer from "./DataReducer";
import { GET_DATA,FIND_MUNICIPIO,RELOAD_PAGE } from "../actionTypes/Types";

const DataContext = createContext();

const useData = () => {
  return useContext(DataContext);
};

const initialState = {
  tipoDocumento: {},
  formaPago: {},
  departamentos: {},
  arls: {},
  eps: {},
  tipoSexo: {},
  cajaCompensacion: {},
  municipios:{},
  licencia:{},
  instructor:{},
  
};

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const [dptoxId,setDptoxId]= useState();
  const [preload,setPreload] = useState(false);


  const readData = async () => {
    try {
      const res = await clientAxios.get("store/identificacion", requestToken);
      const resSex = await clientAxios.get("store/sexo", requestToken);
      const resCaja = await clientAxios.get("store/cajacompensacion", requestToken);
      const resLicencia = await clientAxios.get("store/licencia", requestToken);
      const resDptos = await clientAxios.get("store/departamentos", requestToken);
      const resArls = await clientAxios.get("store/arl", requestToken);
      const resEps = await clientAxios.get("store/eps", requestToken);
      const resFormP = await clientAxios.get("store/formapago", requestToken);
      const resInst = await clientAxios.get("store/instructor", requestToken);
      
      dispatch({
        type: GET_DATA,
        payload: { res, resSex,resCaja,resLicencia,resDptos,resArls,resEps,resFormP,resInst },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const findMunicipio = async(id) => {
   
    try{
        const resMun=await clientAxios.get(`store/municipios/${id}`,requestToken);
        console.log(resMun)
        dispatch({
          type:FIND_MUNICIPIO,
          payload:resMun,
        });
      }catch(error){
        console.log(error);
      }
  };

  function reloadPage(){ 
    const pagereload = preload? window.location.reload():null; 
    dispatch({
      type:RELOAD_PAGE,
      payload:pagereload
    })
  }

  console.log(state);
  console.log(dptoxId);
  console.log(preload);
  return (
    <DataContext.Provider
     value={{ 
      state, 
      dispatch, 
      readData,setDptoxId,findMunicipio,reloadPage,setPreload }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, useData };
