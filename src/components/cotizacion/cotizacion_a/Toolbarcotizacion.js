import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import { SplitButton } from "primereact/splitbutton";
import CotizacionContext from "../../../context/cotizacionContext/CotizacionContex";


const ToolbarCotizacion = ({ children }) => {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const [idpago, setIdpago] = useState();


  const ctxCot = useContext(CotizacionContext);
  const { findCotizacion,readCotizacion,findCotizxId,cotizxid} = ctxCot;
  /*const onChangeInput=(e) =>{
  setEst(e.target.value);
  

}*/
useEffect(() => {
        
  const getResponse = async () => {
    await readCotizacion();
    return;
  };
  getResponse();
 // getListarest();

},[])

  const handleClickNew = () => {
    
    navigate("ingresar");
    setDisable(true);
  };

  const handleClickUpdate = () => {
    navigate("abono");
    setDisable(true);
  };

  const handleClickListar = () => {
    setDisable(true);
    setIdpago();
    navigate("listar");
  };
  const handleClickBack = () => {
    window.history.back();
    setDisable(true);
  };
  const leftContents = (
    <>
      <Button
        label="Ingresar"
        disabled={disable}
        onClick={handleClickNew}
        icon="pi pi-plus"
        className="p-button mr-4 p-button-danger"
      />
      <Button
        label="Abono"
        disabled={disable}
        onClick={handleClickUpdate}
        icon="pi pi-upload"
        className="p-button mr-4 p-button-danger"
      />
    </>
  );

  const rightContents = (
    <>
      <div className="px-2">

      
        <Button
          icon="pi pi-list"
          disabled={disable}
          tooltip="Listar"
          tooltipOptions={{position: 'top'}}
          onClick={handleClickListar}
          className="p-button-danger ml-4 "
        />
        
      </div>
   
     
    </>
  );
  console.log(cotizxid)
  return (
    <div>
      <Toolbar
        className="p-toolbar px-2"
        left={leftContents}
        right={rightContents}
      />
      {children}
    </div>
  );
};

export default ToolbarCotizacion;
