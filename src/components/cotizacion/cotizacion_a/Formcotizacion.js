import React, { useEffect, useState,useContext,useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import {useNavigate} from 'react-router-dom'
import { InputText } from "primereact/inputtext";
import { Divider } from 'primereact/divider';
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import urlcot from './Crudcotizacion';
import CotizacionContext from "../../../context/cotizacionContext/CotizacionContex";



export const FormCotizacion = () => {
 

 const ctxCot = useContext(CotizacionContext);
 const {readCotizacion,cotizaciones,cotizacion,cotizacionxId,registerCotizacion} = ctxCot;
 
  const [submitted, setSubmitted] = useState(false);
  
 
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const [data, setData] = useState();
  const [displayBasic4, setDisplayBasic4] = useState(false);
  const [cotxid,setCotxid] = useState()
 
  const [globalFilter, setGlobalFilter] = useState(null);
  const baseUrlcot={urlcot};
  const [disable,setDisable] = useState(false);
  const {id,nombres,apellidos,numeroDocumento,
        tipoidentificacion,municipio,celular,
        telefono,direccion,correo,
        tipoLicencia} =cotizacion

  
  
  const [datacot, setDatacot] = useState();
  const defaultValues = {
    id_estudiante:id,
    nombres: nombres,
    apellidos: apellidos,
    numeroDocumento:numeroDocumento,
    tipodocumento: tipoidentificacion,
    direccion: direccion ,
    telefono: telefono,
    celular: celular,
    correo: correo,
    licencia: tipoLicencia,
    departamento: municipio?.codDepartamento?.nombreDepartamento,
    municipio: municipio?.nombreMunicipio,
    id_consecutivo:'',
    id_estudiante:id,
    valorCotizacion:0,
    date: null,
    accept: false,
  };
  console.log(defaultValues);
  console.log(cotizacion);
  const dataCoti={
    id: "",
    consecutivo:"",
    estudiante:{
        id: cotizacion.id != null ? cotizacion.id : null,
    },
    valorCotizacion:null,
    id_estudiante: "",
    nombres: "",
    apellidos: "",
    nrodocumento: "",
    tipodocumento: "",
    direccion: "",
    telefono: "",
    celular: "",
    email: "",
    licencias: "",
    departamento: "",
    municipio: "",
    date: null,
    accept: false,
 };

 useEffect(() => { },[])

  const [aprendices,setAprendices]= useState(null)
  
 
  
  const onHide = (name) => {
   setDisplayBasic4(false);
    window.history.back();
  };

 const onClickDialog = () => {
    setDisplayBasic4(true);
    readCotizacion();
  }
  const header = (
    <> 
      <Button  label="Cotizacion" disabled="true" />
    </>
  );
  const {
    control,
    formState: { errors },
    handleSubmit,
    onChange,
    register,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = (data) => {

   registerCotizacion(data);
    reset();
  };
  
  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };
  console.log(formData)
  console.log(dataCoti)

  const renderFooter = (name) => {
    return (
      <>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          onClick={() => onHide(name)}
          autoFocus
         
        />
      </>
    );
  };
  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        style={{ color: "var(--green-500)" }}
        autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  );

  return (
    <div>
      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ "960px": "80vw" }}
        style={{ width: "30vw" }}
      >
        <div className="flex justify-content-center flex-column pt-6 px-3">
          <i
            className="pi pi-check-circle"
            style={{ fontSize: "5rem", color: "var(--green-500)" }}
          ></i>
          <h5>Registrado correctamente!</h5>
        </div>
      </Dialog>
      
    <div form onSubmit={handleSubmit(onSubmit)} className="form-demo  p-fluid">
      {/* 
      form onSubmit={handleSubmit(onSubmit)}
      <div className="field" hidden>
          <span className="p-float-label">
            <Controller
              name="estudiante.id"
              control={control}
              render={({ field, fieldState }) => (
                <InputText 
                  id={field.name}
                  {...field}
                  value={defaultValues.id_estudiante}
                />
              )}
            />
            <label
              htmlFor="estudiante.id"
            >
            </label>
          </span>
        </div> */}

        <div className="field">
          <span className="p-float-label">
            <Controller
              name="nombres"
              control={control}
              rules={{ required: "Nombre es obligatorio." }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  value={nombres}
                  // className={classNames({ "p-invalid": fieldState.invalid })}
                  disabled={true}
                />
              )}
            />
            <label
              htmlFor="nombres"
              // className={classNames({ "p-error": errors.name })}
            >
              Nombre 
            </label>
          </span>
          {/* {getFormErrorMessage("nombres")} */}
        </div>
        <div className="field">
          <span className="p-float-label">
            <Controller
              name="apellidos"
              control={control}
              rules={{ required: "apellido es obligatorio." }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  value={apellidos}
                  // className={classNames({ "p-invalid": fieldState.invalid })}
                  disabled={true}
                />
              )}
            />
            <label
              htmlFor="apellidos"
              // className={classNames({ "p-error": errors.name })}
            >
              Apellidos 
            </label>
          </span>
          {/* {getFormErrorMessage("apellidos")} */}
        </div>

        <div className="field">
          <span className="p-float-label">
            <Controller
              name="nrodocumento"
              control={control}
              rules={{ required: "Numero documento es obligatorio." }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  value={numeroDocumento}
                  // className={classNames({ "p-invalid": fieldState.invalid })}
                  disabled={true}
                />
              )}
            />
            <label
              htmlFor="nrodocumento"
              // className={classNames({ "p-error": errors.name })}
            >
              Nro documento
            </label>
          </span>
          {/* {getFormErrorMessage("nrodocumento")} */}
        </div>

          <div className="field">
            <span className="p-float-label">
              <Controller
                name="tipodocumento"
                control={control}
                rules={{ required: "Numero documento es obligatorio." }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    value={tipoidentificacion}
                    // className={classNames({ "p-invalid": fieldState.invalid })}
                    disabled={true}
                  />
                )}
              />
              <label
                htmlFor="tipodocumento"
                // className={classNames({ "p-error": errors.name })}
              >
                Tipo documento
              </label>
            </span>
            {/* {getFormErrorMessage("nrodocumento")} */}
          </div>


        {/* <div className="field">
          <span className="p-float-label">
            <Controller
              name="tipoidentificacion"
              control={control}
              render={({ field }) => (
                <Dropdown
                  id={field.name}
                  value={field.value}
                  //value={defaultValues.tipodocumento}
                  onChange={(e) => field.onChange(e.value)}
                  placeholder={defaultValues.tipodocumento}
                  //optionValue={defaultValues.tipodocumento}
                  //optionLabel="nombre_identificacion"
                  disabled={true}
                />
              )}
            />
            <label htmlFor="tipodocumento"></label>
          </span>
        </div> */}

        <div className="field">
          <span className="p-float-label">
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <Calendar
                  id={field.name}
                  value={new Date()}
                  onChange={(e) => field.onChange(e.value)}
                  dateFormat="yy/mm/dd"
                  mask="9999/99/99"
                  showIcon
                  disabled={true}
                />
              )}
            />
            <label htmlFor="name">Fecha nacimiento</label>
          </span>
        </div>

        <div className="field">
          <span className="p-float-label">
            <Controller
              name="direccion"
              control={control}
              rules={{ required: "Direccion es obligatorio." }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  value={direccion}
                  // className={classNames({ "p-invalid": fieldState.invalid })}
                  disabled={true}
                />
              )}
            />
            <label
              htmlFor="direccion"
              // className={classNames({ "p-error": errors.name })}
            >
            </label>
          </span>
          {/* {getFormErrorMessage("direccion")} */}
        </div>
        
        <div className="field">
          <span className="p-float-label">
            <Controller
              name="nombreMunicipio"
              control={control}
              rules={{ required: "Numero documento es obligatorio." }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  value={municipio.nombreMunicipio}
                  // className={classNames({ "p-invalid": fieldState.invalid })}
                  disabled={true}
                />
              )}
            />
            <label
              htmlFor="nombreMunicipio"
              // className={classNames({ "p-error": errors.name })}
            >
              Municipio
            </label>
          </span>
          {/* {getFormErrorMessage("nrodocumento")} */}
        </div>

        <div className="field">
          <span className="p-float-label">
            <Controller
              name="nombreDepartamento"
              control={control}
              rules={{ required: "Numero documento es obligatorio." }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  value={ municipio.codDepartamento?.nombreDepartamento}
                  // className={classNames({ "p-invalid": fieldState.invalid })}
                  disabled={true}
                />
              )}
            />
            <label
              htmlFor="nombreDepartamento"
              // className={classNames({ "p-error": errors.name })}
            >
              Departamento
            </label>
          </span>
          {/* {getFormErrorMessage("nrodocumento")} */}
        </div>
        

        
        <div className="field">
          <span className="p-float-label">
            <Controller
              name="telefono"
              control={control}
              rules={{ required: "Telefono es obligatorio." }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  value={telefono}
                  // className={classNames({ "p-invalid": fieldState.invalid })}
                  disabled={true}
                />
              )}
            />
            <label
              htmlFor="telefono"
              // className={classNames({ "p-error": errors.name })}
            >Telefono
            </label>
          </span>
          {/* {getFormErrorMessage("telefono")} */}
        </div>

        <div className="field">
          <span className="p-float-label">
            <Controller
              name="celular"
              control={control}
              rules={{ required: "Celular es obligatorio." }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  value={celular}
                  // className={classNames({ "p-invalid": fieldState.invalid })}
                  disabled={true}
                />
              )}
            />
            <label
              htmlFor="celular"
              // className={classNames({ "p-error": errors.name })}
            >Celular
            </label>
          </span>
          {/* {getFormErrorMessage("celular")} */}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-envelope" />
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address. E.g. example@email.com",
                },
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  value={correo}
                  // className={classNames({ "p-invalid": fieldState.invalid })}
                  disabled={true}
                />
              )}
            />
            <label
              htmlFor="email"
              // className={classNames({ "p-error": !!errors.email })}
            >Correo
            </label>
          </span>
          {/* {getFormErrorMessage("email")} */}
        </div>


        <div className="field">
          <span className="p-float-label">
            <Controller
              name="licencias"
              control={control}
              render={({ field }) => (
                <InputText
                  id={field.name}
                  {...field}
                  value={tipoLicencia}
                  //optionLabel="licencias"
                  disabled={true}
                />
              )}
            />
            <label
              htmlFor="Licencia"
            > Licencias
            </label>
          </span>
        </div>
        <Divider />

        <form className="form-demo  p-fluid">
       

        
       
        <Button
          //type="submit"
          onClick={onClickDialog}
          label="Ingresar"
          className="mr-2 mt-2 mb-2"
          style={{ width: "20%", backgroundColor: "#e40505d5" }}
        />
       
         </form>
      </div>
      <Dialog
          header={header}
          visible={displayBasic4}
        
          style={{ width: "50vw" }}
          footer={renderFooter("displayBasic2")}
          onHide={() => onHide("displayBasic2")}
        >
          <div className="formgrid grid">
            <div className="field col ">
              <label htmlFor="numeroDocumento"> Id</label>
              <InputText
                id="documento"
                //value={data?.id}
                //option="documento"
                //onChange={(e) => onInputChangeInst(e, "id")}
                required
                className={classNames({ "p-invalid": submitted && !data.id })}
              />
              {submitted && !data.id && (
                <small className="p-error">Id es requerido.</small>
              )}
            </div>

            <div className="field col">
              <label htmlFor="numerodocumento">Numero Documento</label>
              <InputText
                id="documento"
                //value={data?.documento}
                option="documento"
                //onChange={(e) => onInputChange(e, "documento")}
                required
                className={classNames({
                  "p-invalid": submitted && !data.documento,
                })}
              />
              {submitted && !data.documento && (
                <small className="p-error">documento es requerido.</small>
              )}
            </div>
          </div>
          </Dialog>
    </div>
  );
};
export default FormCotizacion;