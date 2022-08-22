import React, { useContext, useState,useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Contexto } from "../../../context/Contexto";
import { ContextNom } from "../../../context/Contextnomina";
import { requestToken } from "../../../login/authContext"
import axios from 'axios';

const DialogNomina = () => {
  const [submitted, setSubmitted] = useState(false);
  const { dialogView } = useContext(ContextNom);
  const [dates2, setDates2] = useState("");
  const { setDialogView } = useContext(ContextNom);
  const { instruct } = useContext(ContextNom);
  const { idinstructor } = useContext(ContextNom);
  const { mapid } = useContext(ContextNom);
  const { setMapid } = useContext(ContextNom);
  const { tipopago } = useContext(ContextNom);

  const [vlrhora,setVlrhora] = useState();
  const [nrohora,setNrohora] = useState();
  const [view,setView] = useState(false);
  const [ttlapagar,setTtlapagar] = useState();

  let emptyPago = {
    id:null,
    idProveedor: "",
    nombre: "",
    descripcion: "",
    numFactura: "",
    reciboPago: "",
    valorPago: null,
    tipoPago: "",
    instructor: "",
    fechaPago: "",
  };
  const mapear = instruct.find(({ id }) => id === idinstructor);
  setMapid(mapear)
  let instEmpty={
    id: null,
    id_instructor: mapear.id != null ? mapear.id :`${mapear.id}`,
    nombres:mapear.nombres != null ? mapear.nombres : `${mapear.nombres}`,
    apellidos: mapear.apellidos != null ? mapear.apellidos : `${mapear.apellidos}`,
    documento: mapear.documento != null ? mapear.documento : `${mapear.documento}`,
    correo: mapear.correo != null ? mapear.correo : `${mapear.correo}`,
    periodo:dates2 != null? dates2 : `${dates2}`,
    tipo_instructor:mapear.tipoInstructor != null ? mapear.tipoInstructor : `${mapear.tipoInstructor}`,
    
  };
  const [pagoinst,setPagoinst] = useState(instEmpty);
  console.log(dates2)
  let instNomina ={
    consecutivoNomina:mapear.id != null ? mapear.id :`${mapear.id}`,
    id_instructor: mapear.id != null ? mapear.id :`${mapear.id}`,
    periodoPago:"",
    valorHora:0, 
    nroHoras:0,
    valorPagar:0
    }
  console.log(mapid);
  const [pago, setPago] = useState(instNomina);
  const [data,setData] = useState()
  const [total,setTotal] = useState()
  console.log(pago);


  useEffect(() => {
    setView(false)
  },[])
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _pago = { ...pago };
    _pago[`${name}`] = val;

    setPago(_pago);
  };
  const ttlPago =()=>{
   const total= pago.valorHora * pago.nroHoras
   setView(true)
    
   console.log(total)
   console.log(pagoinst)
   
   
   return setTotal(pago.valorPagar=total)
  }

  console.log(total)
  

  const onSubmit = (e) => {
   e.preventDefault();
   console.log(pago);
    axios.post(`http://localhost:8082/cea_oriente/nomina/crear`,pago,requestToken)
    .then(response => console.log(response))
    .catch(error => console.log(error)); 
    console.log(pago)
    
    // setShowMessage(true);
    //reset();
  };


  const onInputChangeInst = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _pagoinst = { ...pagoinst };
    _pagoinst[`${name}`] = val;

    setPagoinst(_pagoinst);
  };
  const handleChange=(e) => {
    
    setPago({...pago,[e.target.name]:e.target.value})
    setData(pago)
  }
  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _pago = { ...pago };
    _pago[`${name}`] = val;

    setPago(_pago);
  };
  console.log(pagoinst)
  const onInputNumberChangeInst = (e, name) => {
    const val = e.value || 0;
    let _pagoinst = { ...pagoinst };
    let _pago={...pago};
    _pagoinst[`${name}`] = val;
    _pago[`${name}`] = val;
    setPago(_pago)
    setPagoinst(_pagoinst);
    ttlPago();
  };


  const hideDialog = () => {
    setDialogView(false);
    setSubmitted(false);
  };

  const editPago = (pago) => {
    setPago({ ...pago });
  };
  const productDialogNomina = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={onSubmit}
      />
    </>
  );

  return (
    <>
      <Dialog
        visible={dialogView}
        style={{ width: "600px" }}
        header="Ingresar pago"
        modal
        //value={mapear}
        className="p-fluid"
        footer={productDialogNomina}
        onHide={hideDialog}
      >
        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="id">Id</label>
            <InputText
              id="id"
              value={mapear.id}
              option="id"
              //onChange={(e) => onInputChangeInst(e, "id")}
              required
              className={classNames({ "p-invalid": submitted && !data.id })}
            />
            {submitted && !data.id && (
              <small className="p-error">Id es requerido.</small>
            )}
          </div>

          <div className="field col">
            <label htmlFor="idinstructor">Id instructor</label>
            <InputNumber
              id="id_instructor"
              value={mapear.id}
              option="id"
              //onChange={(e) => handleChange(e,"id")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !pago.id_instructor,
              })}
            />
            {submitted && !data.idProveedor && (
              <small className="p-error">Id proveedor es requerido.</small>
            )}
          </div>
        </div>
        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="nombres">Nombres</label>
            <InputText
              id="nombres"
              value={mapear.nombres}
              option="nombre"
              onChange={(e) => onInputChange(e, "nombre")}
              required
              className={classNames({ "p-invalid": submitted && !pago.nombre })}
            />
            {submitted && !data.nombre && (
              <small className="p-error">Nombre es requerido.</small>
            )}
          </div>

          <div className="field col">
            <label htmlFor="apellidos">Apellidos</label>
            <InputText
              id="apellidos"
              value={mapear.apellidos}
              option="apellidos"
              onChange={(e) => onInputChange(e, "nombre")}
              required
              className={classNames({ "p-invalid": submitted && !pago.nombre })}
            />
            {submitted && !data.nombre && (
              <small className="p-error">apellido es requerido.</small>
            )}
          </div>
        </div>

        <div className="formgrid grid">        
        <div className="field col">
          <label htmlFor="documento">Documento</label>
          <InputText
            id="documento"
            value={mapear.documento}
            option="correo"
            onChange={(e) => onInputChange(e, "documento")}
            required
            className={classNames({ "p-invalid": submitted && !mapear.documento })}
          />
          {submitted && !mapear.documento && (
            <small className="p-error">documento es requerido.</small>
          )}
        </div>
        <div className="field col">
          <label htmlFor="correo">Correo</label>
          <InputText
            id="correo"
            value={mapear.correo}
            option="correo"
            onChange={(e) => onInputChange(e, "correo")}
            required
            className={classNames({ "p-invalid": submitted && !pago.correo })}
          />
          {submitted && !mapear.nombre && (
            <small className="p-error">correo es requerido.</small>
          )}
        </div>
        </div>

        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="fechaPago">Periodo</label>
            <Calendar
              id="periodo"
              value={dates2}
              option="fechaPago"
              onChange={(e) => setDates2(e.value)}
              dateFormat="dd/mm/yy"
              mask="99/99/9999"
              showIcon
              selectionMode="range" 
              readOnlyInput
            />
          </div>
        </div>

        <div className="formgrid grid">
          

          <div className="field col">
            <label htmlFor="valorHora">Vlr Hora</label>
            <InputNumber
              id="valorHora"
              value={data}
              onValueChange={(e) => onInputNumberChangeInst(e, "valorHora")}
              mode="currency"
              currency="USD"
              locale="en-US"
              className={classNames({
                "p-invalid": submitted && !pago.valorHora,
              })}
            />
          </div>
          <div className="field col">
            <label htmlFor="nroHoras">Nro horas</label>
            <InputNumber
              id="nroHoras"
              value={data}
              option="numeroHoras"
              onValueChange={(e) => onInputNumberChangeInst(e, "nroHoras")}
              required
              className={classNames({
                "p-invalid": submitted && !pago.nroHoras,
              })}
            />
            {submitted && !pago.nroHoras && (
              <small className="p-error">Nro es requerido.</small>
            )}
          </div>
        </div>
        <div className="formgrid grid justify-content-around">
          <Button icon="pi pi-dollar"
           className="p-button-rounded p-button-danger "
           onClick={ttlPago}/>
        </div>
        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="tipoPago">Valor a pagar</label>
            <InputNumber
              id="valorPagar"
              value={pago.valorPagar}
              option="tipoPago"
              onChange={(e) => onInputNumberChangeInst(e, "valorpagar")}
              required
              mode="currency"
              currency="USD"
              locale="en-US"
              className={classNames({
                "p-invalid": submitted && !pago.valorPagar,
              })}
            />
            {submitted && !pago.valorPagar && (
              <small className="p-error">Tipo de pago es requerido.</small>
            )}
          </div>

          <div className="field col">
            <label htmlFor="instructor">Tipo instructor</label>
            <InputText
              id="tipo_instructor"
              value={mapear.tipoInstructor}
              option="instructor"
              onChange={(e) => onInputChange(e, "tipo_instructor")}
              required
              className={classNames({
                "p-invalid": submitted && !pago.instructor,
              })}
            />
            {submitted && !pago.instructor && (
              <small className="p-error">Instructor es requerido.</small>
            )}
          </div>
        </div>

        
      </Dialog>
    </>
  );
};

export default DialogNomina;
