import React, { createContext, useState, useEffect } from "react";
import { requestToken } from "../login/authContext";
import axios from "axios";
import { getFormaPago } from './../service/store';

export const ContextNom = createContext();

export const Nomina = ({ children }) => {
  const [datosttl, setDatosttl] = useState(null);
  const [instructor, setInstructor] = useState(null);
  const [dialogView, setDialogView] = useState(false);
  const [instruct, setInstruct] = useState([]);
  const [idinstructor, setIdinstructor] = useState();
  const [tipopago, setTipopago] = useState();
  
  const [tipoinstructor, setTipoinstructor] = useState();
  const [mapid, setMapid] = useState(null);
  const [nominalist, setNominalist] = useState();

  const getListarinst = () => {
    axios
      .get("http://localhost:8082/cea_oriente/docentes/listar", requestToken)
      .then((response) => {
        setInstruct(response.data);
      })
      .catch((error) => console.log(error));
      
  };
  const getListarNomina = () => {
    axios
      .get("http://localhost:8082/cea_oriente/nomina/listar", requestToken)
      .then((response) => {
        setNominalist(response.data);
      })
      .catch((error) => console.log(error));
      
  };

  const getFormaPago = () => {
    axios
      .get("http://localhost:8082/cea_oriente/store/formapago", requestToken)
      .then((response) => {
        setTipopago(response.data);
      })
      .catch((error) => console.log(error));
      
  };
  const getTipoInstructor = () => {
    axios
      .get("http://localhost:8082/cea_oriente/store/instructor", requestToken)
      .then((response) => {
        setTipoinstructor(response.data);
      })
      .catch((error) => console.log(error));
      
  };

 
   useEffect(() => {
     getListarinst();
  //   getFormaPago();
  //   getTipoInstructor();
     //getListarNomina();
  //   console.log(idinstructor)
      
    
   }, []);
  
  
 
  console.log(idinstructor);
  //console.log(tipopago)
  //console.log(tipoinstructor)
  //console.log(instruct)
  //console.log(nominalist)
  return (
    <ContextNom.Provider
      value={{
        instruct,
        setInstruct,
        getListarinst,
        dialogView,
        setDialogView,
        idinstructor,
        setIdinstructor,
        mapid,
        setMapid,
        getFormaPago,
        tipopago,
        setTipopago,
        tipoinstructor,
        getListarNomina,
        nominalist
      }}
    >
      {children}
    </ContextNom.Provider>
  );
};
