import React, { useState, useContext, useEffect } from "react";
import { useData } from "../../../provider/DataProvider";
import { Card } from "primereact/card";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";
import InstructorContext from "../../../context/instructorContext/InstructorContext";
import PagosContext from "../../../context/pagosContext/PagosContext";



const CardxIdPagos = () => {

  const { state } = useData();

  const ctxpag = useContext(PagosContext);
  const {setIdpago,findPagos,getIdPago,readPagos,pagos } = ctxpag;

  const ctxins = useContext(InstructorContext);
  const { instructor } = ctxins;


 
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState();

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
  } = instructor;

  const datapago = {
    id_consecutivo: null,
    id_estudiante: id,
    valor_cotizacion: 0,
  };

  const [dataPago, setDataPago] = useState();
  const [enabledApren, setEnabledApren] = useState("");
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _datapago = { ...dataPago };
    _datapago[`${name}`] = val;

    setDataPago(_datapago);
  };

  const handleSubmit = (e) => {
    console.log(data);
    e.preventDefault();
    //registerCotizacion(data);
  };
  const onSubmit = (e, data) => {
    e.preventDefault();
    //registerCotizacion(data);
  };

  const onClickCancelar = () => {
    //window.location.reload();
    //getIdInstructor('');
    window.history.back();
  };
  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _datapago = { ...dataPago };
    _datapago[`${name}`] = val;

    setDataPago(_datapago);
  };

  const enableAp = () => {
    //const {enabled,...rest} = estid
    console.log(enabled);
    //console.log(instructores)
    enabled ? setEnabledApren("success") : setEnabledApren("danger");
    return setEnabledApren;
  };
  console.log(instructor);
  console.log(enabledApren);

  useEffect(() => {
    enableAp();
  }, []);
 
  //console.log(registrarcotizacion);
  const header = (
    <>
      <div className="flex justify-content-space-around">
        <div className="flex flex-start">
         
          <Badge
            className="justify-content-start ml-2 mr-8 mt-2"
            size="large"
            severity={enabledApren}
            tooltip="activo"
            //tooltipOptions={{ position: "top" }}
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
  const subtitle =( <h4> {data?.nombres + " " + data?.apellidos}</h4>);
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
          <h5>Nit/CC : {data?.documento}</h5>
          <br />
          <ul className="ulcard ">
            <li className="ml-2"> Correo : {data?.correo} </li>
            <br />
            <li className="ml-2"> Celular : {data?.celular} </li>
            <br />
            <li className="ml-2"> Telefono : {data?.telefono} </li>
            <br />
            <li className="ml-2"> Municipio : {data?.municipio?.nombreMunicipio} </li>
            <br />
            <li className="ml-2"> Municipio :  {data?.municipio?.codDepartamento?.nombreDepartamento} </li>
            <br />
          </ul>
          <Divider />
          <div className="formgrid grid">
            <div className="field col mr-1 ">
              <label htmlFor="id_consecutivo">Nro Cotizacion</label>
              <InputNumber
                id="id_consecutivo"
                value={data?.id_consecutivo}
                onChange={(e) => onInputNumberChange(e, "id_consecutivo")}
                required
                className={classNames({ "p-invalid": submitted && !data.id })}
              />
              {submitted && !data.id && (
                <small className="p-error">Id es requerido.</small>
              )}
            </div>

            <div className="field col">
              <label htmlFor="Vlr_cotizacion">Valor Cotizacion</label>
              <InputNumber
                id="valor_cotizacion"
                value={data?.cotizacion_vlr}
                onChange={(e) => onInputNumberChange(e, "valor_cotizacion")}
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

export default CardxIdPagos;
