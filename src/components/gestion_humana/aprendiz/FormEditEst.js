import React, { useEffect, useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import {Panel} from 'primereact/panel'
import { useData } from "../../../provider/DataProvider";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import AprendizContext from "../../../context/aprendizContext/AprendizContext";


export const FormEditEst = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState();
  

 
  const [municipio, setMunicipio] = useState();

  const { state, readData, setDptoxId, findMunicipio } = useData();
  //
  const ctxest = useContext(AprendizContext);
   //
  const {aprendiz,registerAprendiz} = ctxest; //
  const [aprendata, setAprendata] = useState(aprendiz);
  console.log('aprendiz', aprendiz)
  
  const defaultValues = {
    id_aprendiz: aprendata?.id,
    nombres:"",
    apellidos: "",
    numeroDocumento: "",
    documento: "",
    direccion: "",
    telefono: "",
    celular: "",
    email: "",
    fecha_nacimiento: null,
    municipio: null,
    sexs: null,
    date: null,
    epss: null,
    cajas: null,
    arls: null,
    instructor: null,
    accept: false,
  }; 
  
  
  console.log('aprendata', aprendata)
  const emptyValues = {
    id_aprendiz: aprendata?.id,
    nombres: aprendata?.nombres,
    apellidos: aprendata?.apellidos,
    numeroDocumento: aprendata?.numeroDocumento,
    tipoidentificacion: aprendata?.tipoidentificacion,
    direccion: aprendata?.direccion,
    telefono: aprendata?.telefono,
    celular: aprendata?.celular,
    email: aprendata?.correo,
    fecha_nacimiento: aprendata?.fecha_nacimiento,
    departamento:aprendata?.municipio?.codDepartamento?.nombreDepartamento,
    municipio: aprendata?.municipio?.nombreMunicipio,
    sexs: aprendata?.sexo,
    date: null,
    epss: aprendata?.eps,
    cajas: aprendata?.cajaCompensacion,
    arls: aprendata?.arl,
    instructor: aprendata?.tipoInstructor,
    accept: true,
  };
  

  const onInputChangeInst = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _editest = { ...aprendata };
    _editest[`${name}`] = val;

    setAprendata(_editest);
  };
  const handleChange=(e) => {
    
    setAprendata({...aprendata,[e.target.name]:e.target.value})
    //setData(pago)
  }
  const [idDpto, setIdDpto] = useState();
  useEffect(() => {
    
      readData();
      //findMunicipio();
      
    
   
    //setAprendata(aprendiz)
    setIdDpto(aprendata?.municipio?.codDepartamento?.nombreDepartamento)
  }, []);
  //const {nombres} = instdata;
  
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const handleInputChange = (e) => {
    setIdDpto(e.value);
    findMunicipio(e.value.id);
  };
  console.log(idDpto)
  console.log('aprendata',aprendata)
  const handleClickBack = () => {
    window.history.back();
    //reset();
    //setInstructor('');
    //getIdInstructor("");
  };
console.log(defaultValues)

console.log(emptyValues)
console.log(ctxest);
  const onSubmit = (data) => {
    registerAprendiz(data);
    setShowMessage(true);
    reset();
  };
  //console.log(formData);
  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
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

  const header = (
    <>
      <div className="flex justify-content-space-around">
        <div className="flex flex-start">
         
          <div
            className="justify-content-start ml-2 mr-8 mt-2"
            style={{ width: "60px" }}
          > <h5>Estudiante </h5></div>

        <div className="mr-8 ml-8 mt-2" style={{ width: "500px" }}><h5>editar</h5></div>
        </div>
        <div className="cardUserheader ml-8 pt-1" style={{ width: "300px" }}>
          <Button
            icon="pi pi-arrow-left"
            tooltip="Regresar"
            tooltipOptions={{ position: "top" }}
            onClick={handleClickBack}
            className="p-button-danger "
          />
        </div>
      </div>
    </>
  );

  return (
    <div>
      <Panel className="px-2" header={header}>
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

      <form onSubmit={handleSubmit(onSubmit)} className="form-demo  p-fluid">
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
                  value={aprendata?.nombres}
                  onChange={handleChange}
                  //autoFocus
                  className={classNames({ "p-invalid": fieldState.invalid })}
                />
              )}
            />
            <label
              htmlFor="name"
              className={classNames({ "p-error": errors.name })}
            >
              Nombre*
            </label>
          </span>
          {getFormErrorMessage("name")}
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
                  value={aprendiz?.apellidos}
                  onChange={handleChange}
                  className={classNames({ "p-invalid": fieldState.invalid })}
                />
              )}
            />
            <label
              htmlFor="apellidos"
              className={classNames({ "p-error": errors.name })}
            >
              Apellidos*
            </label>
          </span>
          {getFormErrorMessage("name")}
        </div>

        <div className="field" style={{ width: "160px" }}>
          <span className="p-float-label">
            <Controller
              name="numeroDocumento"
              control={control}
              rules={{ required: "Numero documento es obligatorio." }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  value={aprendata?.numeroDocumento}
                  onChange={(e)=>onInputChangeInst(e,'numeroDocumento')}
                  //onChange={handleChange}
                  className={classNames({ "p-invalid": fieldState.invalid })}
                />
              )}
            />
            <label
              htmlFor="documento"
              className={classNames({ "p-error": errors.name })}
            >
              documento*
            </label>
          </span>
          {getFormErrorMessage("name")}
        </div>

        <div className="field">
          <span className="p-float-label">
            <Controller
              name="tipoidentificacion"
              control={control}
              render={({ field }) => (
                <Dropdown
                  id={field.name}
                  value={aprendata?.tipoidentificacion}
                  editable
                  onChange={(e)=>onInputChangeInst(e,'tipoidentificacion')}
                  //onChange={handleChange}
                  options={state.tipoDocumento}
                  optionLabel="nombre"
                  //placeholder={instdata?.tipoDocumento}
                />
              )}
            />
            <label htmlFor="tipoDocumento">Tipo Documento</label>
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
                  value={aprendata?.direccion}
                  onChange={handleChange}
                  className={classNames({ "p-invalid": fieldState.invalid })}
                />
              )}
            />
            <label
              htmlFor="direccion"
              className={classNames({ "p-error": errors.name })}
            >
              Direccion*
            </label>
          </span>
          {getFormErrorMessage("name")}
        </div>
        <div className="field" style={{ width: "200px" }}>
          <span className="p-float-label">
            <Controller
              name="departamento"
              control={control}
              render={({ field }) => (
                <Dropdown
                  id={field.name}
                  value={idDpto}
                  editable
                  onChange={handleInputChange}
                  options={state.departamentos}
                  optionLabel="nombreDepartamento"
                />
              )}
            />
            <label htmlFor="departamento">Departamento</label>
          </span>
        </div>

        <div className="field">
          <span className="p-float-label">
            <Controller
              name="municipio"
              control={control}
              render={({ field }) => (
                <Dropdown
                  id={field.name}
                  value={aprendata?.municipio?.nombreMunicipio}
                  editable
                  //onChange={(e) => field.onChange(e.value)}
                  onChange={(e)=>onInputChangeInst(e,'municipio')}
                  options={state.municipios}
                  optionLabel="nombreMunicipio"
                />
              )}
            />
            <label htmlFor="municipio">Municipio</label>
          </span>
        </div>

        <div className="field" style={{ width: "160px" }}>
          <span className="p-float-label">
            <Controller
              name="telefono"
              control={control}
              rules={{ required: "Telefono es obligatorio." }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  value={aprendata?.telefono}
                  onChange={handleChange}
                  className={classNames({ "p-invalid": fieldState.invalid })}
                />
              )}
            />
            <label
              htmlFor="telefono"
              className={classNames({ "p-error": errors.name })}
            >
              Telefono*
            </label>
          </span>
          {getFormErrorMessage("name")}
        </div>

        <div className="field" style={{ width: "160px" }}>
          <span className="p-float-label">
            <Controller
              name="celular"
              control={control}
              rules={{ required: "Celular es obligatorio." }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  value={aprendata?.celular}
                  onChange={handleChange}
                  className={classNames({ "p-invalid": fieldState.invalid })}
                />
              )}
            />
            <label
              htmlFor="celular"
              className={classNames({ "p-error": errors.name })}
            >
              Celular*
            </label>
          </span>
          {getFormErrorMessage("name")}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-envelope" />
            <Controller
              name="correo"
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
                  value={aprendata?.correo}
                  onChange={handleChange}
                  className={classNames({ "p-invalid": fieldState.invalid })}
                />
              )}
            />
            <label
              htmlFor="email"
              className={classNames({ "p-error": !!errors.email })}
            >
              Email*
            </label>
          </span>
          {getFormErrorMessage("email")}
        </div>

        <div className="field" style={{ width: "180px" }}>
          <span className="p-float-label">
            <Controller
              name="sexs"
              control={control}
              render={({ field }) => (
                <Dropdown
                  id={field.name}
                  value={aprendata?.sexo}
                  editable
                  onChange={(e)=>onInputChangeInst(e,'sexo')}
                  options={state.tipoSexo}
                  optionLabel="nombre"
                />
              )}
            />
            <label htmlFor="sexo">Sexo</label>
          </span>
        </div>

        <div className="field">
          <span className="p-float-label">
            <Controller
              name="epss"
              control={control}
              render={({ field }) => (
                <Dropdown
                  id={field.name}
                  value={aprendata?.eps}
                  editable
                  onChange={(e)=>onInputChangeInst(e,'eps')}
                  options={state.eps}
                  optionLabel="nombre"
                />
              )}
            />
            <label htmlFor="eps">E.P.S</label>
          </span>
        </div>

        <div className="field">
          <span className="p-float-label">
            <Controller
              name="arls"
              control={control}
              render={({ field }) => (
                <Dropdown
                  id={field.name}
                  value={aprendata?.arl}
                  editable
                  onChange={(e)=>onInputChangeInst(e,'arl')}
                  options={state.arls}
                  optionLabel="nombre"
                />
              )}
            />
            <label htmlFor="arl">A.R.L</label>
          </span>
        </div>

        <div className="field">
          <span className="p-float-label">
            <Controller
              name="cajas"
              control={control}
              render={({ field }) => (
                <Dropdown
                  id={field.name}
                  value={aprendata?.cajaCompensacion}
                  editable
                  onChange={(e)=>onInputChangeInst(e,'cajaCompensacion')}
                  options={state.cajaCompensacion}
                  optionLabel="nombre"
                />
              )}
            />
            <label htmlFor="cajacompensacion">Caja Compensacion</label>
          </span>
        </div>

        <div className="field" style={{ width: "200px" }}>
          <span className="p-float-label">
            <Controller
              name="instructor"
              control={control}
              render={({ field }) => (
                <Dropdown
                  id={field.name}
                  value={aprendata?.tipoInstructor}
                  editable
                  onChange={(e)=>onInputChangeInst(e,'instructor')}
                  options={state.instructor}
                  optionLabel="nombre"
                />
              )}
            />
            <label htmlFor="instructor">Tipo Instructor</label>
          </span>
        </div>
        <Divider />
        <div className="field">
          <Button
            type="submit"
            label="Registrar"
            className="mt-2"
            style={{ backgroundColor: "#e40505d5" }}
          />
        </div>
      </form>
      </Panel>
    </div>
  );
};
 export default FormEditEst;