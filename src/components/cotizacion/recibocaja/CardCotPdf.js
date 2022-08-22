import React, { useState, useContext, useEffect } from "react";


import { Card } from "primereact/card";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";
import CotizacionContext from "../../../context/cotizacionContext/CotizacionContex";

const CardCotPdf = () => {
  const ctxCot = useContext(CotizacionContext);
  

  const {
    setEstucotizacion,
    findCotizxEst,
    registerCotizacion,
    cotizacion,
    registrarcotizacion,
  } = ctxCot;
  const [submitted, setSubmitted] = useState(false);

  const [cotizacion_vlr, setCotizacion_vlr] = useState();
  const [consecutivo_id, setConsecutivo_id] = useState();
  const [estudiante_id, setEstudiante_id] = useState();

  const {
    id,
    nombres,
    apellidos,
    numeroDocumento,
    tipoidentificacion,
    municipio,
    celular,
    telefono,
    direccion,
    correo,
    tipoLicencia,
    enabled,
  } = cotizacion;

  

 

  
  

  const onClickCancelar = () => {
    //window.location.reload();
    //getIdInstructor('');
    window.history.back();
  };
 

  


 
 

  const header = (
    <>
      <div className="flex justify-content-space-around">
        <div className="flex flex-start">
         
          <Badge
            className="justify-content-start ml-2 mr-8 mt-2"
            size="large"
            //severity={enabledApren}
            tooltip="activo"
            tooltipOptions={{ position: "top" }}
          />
         
        </div>
        <div className="mr-8 ml-8" style={{width: "100px"}}></div>

        <div className="cardUserheader ml-8 pt-1">
        
        </div>
      </div>
    </>
  );
  const footer = (
    <span>
      <Button
        type="submit"
        label="guardar"
        icon="pi pi-check"
        className="p-button-danger"
      />
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-danger ml-2"
        onClick={onClickCancelar}
      />
    </span>
  );
  const subtitle =( <h4> {nombres + " " + apellidos}</h4>);
 

  return (
    <>
   
    </>
    
      
        
        
   
  );
};

export default CardCotPdf;
