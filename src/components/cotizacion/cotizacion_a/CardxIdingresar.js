import React, { useState, useContext, useEffect } from "react";
import { useData } from "../../../provider/DataProvider";
import { Card } from "primereact/card";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import {InputText} from "primereact/inputtext";
import { classNames } from "primereact/utils";
import CotizacionContext from "../../../context/cotizacionContext/CotizacionContex";

const CardxId = () => {
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
    consecutivo: 0,
    estudiante: cotizacion,
    valorCotizacion: 0,
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
    
    e.preventDefault();
    registerCotizacion(data);
    setData({})
  };
  const onSubmit = (e) => {
    e.preventDefault();
    registerCotizacion(data);
  };

  const onClickCancelar = () => {
    //window.location.reload();
    //getIdInstructor('');
    window.history.back();
  };
  const onInputChangeCot = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _editcot = { ...data };
    _editcot[`${name}`] = val;

    setData(_editcot);
    //dropValues[`${name}`](e.value);
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
        <div className="flex flex-start">
         
          <Badge
            className="justify-content-start ml-2 mr-8 mt-2"
            size="large"
            severity={enabledApren}
            tooltip="activo"
            
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
  console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          <div className="formgrid grid">
            <div className="field col mr-1 ">
              <label htmlFor="id">Nro Cotizacion</label>
              <InputNumber
                id="consecutivo"
                value={data?.id}
                onChange={(e) => onInputNumberChange(e, "consecutivo")}
                required
                className={classNames({ "p-invalid": submitted && !data.id })}
              />
              {submitted && !data.id && (
                <small className="p-error">Id es requerido.</small>
              )}
            </div>

            <div className="field col">
              <label htmlFor="valorCotizacion">Valor Cotizacion</label>
              <InputNumber
                id="valorCotizacion"
                value={data.cotizacion_vlr}
                onChange={(e) => onInputNumberChange(e, "valorCotizacion")}
                required
                className={classNames({
                  "p-invalid": submitted && !data.documento,
                })}
              />
              {submitted && !data.documento && (
                <small className="p-error">valor es requerido.</small>
              )}

              {/* <div className="field col">
              <label htmlFor="tipopago">Tipo pago</label>
                <Dropdown
                  id="tipoPago"
                  value={data.tipo_recaudo}
                  onChange={(e) => onInputChange(e, "tipo_recaudo")}
                  options={state.formaPago}
                  optionLabel="nombre"
                />
              </div> */}
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default CardxId;
