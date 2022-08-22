import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../../provider/DataProvider";
import { Card } from "primereact/card";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";
import CotizacionContext from "../../../context/cotizacionContext/CotizacionContex";

const CardxIdRecibo = () => {
  const navigate = useNavigate();
  const ctxCot = useContext(CotizacionContext);
  const { state } = useData();

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

  const datafactingresos = {
    id_consecutivo: null,
    id_estudiante: id,
    valor_cotizacion: 0,
  };

  const [data, setData] = useState(datafactingresos);
  const [enabledApren, setEnabledApren] = useState("");
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _datafactingresos = { ...datafactingresos };
    _datafactingresos[`${name}`] = val;

    setData(_datafactingresos);
  };

  const handleSubmit = (e) => {
    console.log(data);
    e.preventDefault();
    registerCotizacion(data);
  };
  const onSubmit = (e, data) => {
    e.preventDefault();
    registerCotizacion(data);
  };

  const onClickCancelar = () => {
    //window.location.reload();
    //getIdInstructor('');
    window.history.back();
  };
  const onClickImprimir = () => {
    //window.location.reload();
    //getIdInstructor('');
    navigate("/recibocaja/imprimir/pdf");
  };
  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _datafactingresos = { ...data };
    _datafactingresos[`${name}`] = val;

    setData(_datafactingresos);
  };

  const enableAp = () => {
    //const {enabled,...rest} = estid
    console.log(enabled);
    //console.log(instructores)
    enabled ? setEnabledApren("success") : setEnabledApren("danger");
    return setEnabledApren;
  };
  console.log(enabled);
  console.log(enabledApren);

  useEffect(() => {
    enableAp();
  }, []);
 
  console.log(registrarcotizacion);
  const header = (
    <>
      <div className="flex justify-content-space-around">
       
        <div className="mr-8  mt-3" style={{width: "250px"}}>
            <h5 >Nro Cotizacion :</h5>
        </div>

        <div className="cardUserheader ml-8 mr-4 pt-1" style={{width: "100"}}>
        
        </div>

        <div className="flex flex-end">
         
         <Badge
           className="justify-content-start ml-2 mr-2 mt-2"
           size="large"
           severity={enabledApren}
           tooltip="activo"
           tooltipOptions={{ position: "top" }}
         />
        
       </div>
      </div>
    </>
  );
  const footer = (
    <span>
      <Button
        type="submit"
        label="Imprimir"
        icon="pi pi-check"
        className="p-button-danger"
        onClick={onClickImprimir}
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
  console.log(data);

  return (
    <div>
      
        <Card
          //title={numeroDocumento}
          subTitle={subtitle}
          style={{ width: "35em" }}
          footer={footer}
          header={header}
        >
          <Divider />
          <h5>Nro documento : {numeroDocumento}</h5>
          <br />
          <ul className="ulcard ">
            <li className="ml-2"> Tipo documento : {tipoidentificacion} </li>
            <br />
            <li className="ml-2"> Licencias : {tipoLicencia} </li>
            <br />
            <li className="ml-2"> Correo : {correo} </li>
            <br />
            <li className="ml-2"> Celular : {celular} </li>
            <br />
            <li className="ml-2"> Telefono : {telefono} </li>
            <br />
            <li className="ml-2"> Municipio : {municipio?.nombreMunicipio} </li>
            <br />
          </ul>
          <Divider />
          
            
        </Card>
    
    </div>
  );
};

export default CardxIdRecibo;
