import React, { useEffect, useState,useContext } from "react";
import {useData} from '../../../provider/DataProvider'
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { Divider } from "primereact/divider";

import AprendizContext from "../../../context/aprendizContext/AprendizContext";



export const FormAprendiz = () => {
 
  const [idDpto, setIdDpto] = useState();
  const [showMessage, setShowMessage] = useState(false);
 
  const {state,readData,setDptoxId,findMunicipio} = useData()
  const ctx = useContext(AprendizContext); // 
  const { registerAprendiz } = ctx; //

  const defaultValues = {
    id: "",
    nombres: "",
    apellidos: "",
    numeroDocumento: "",
    tipoDocumento: "",
    direccion: "",
    telefono: "",
    celular: "",
    correo: "",
    municipio: null,
    tipoSex: "",
    fechaNacimiento: null,
    tipoEps: "",
    cajaCompensacion: "",
    tipoArl: "",
    licencias: "",
    enabledAprendiz: false,
    accept: false,
  };
 const {municipio} = defaultValues
  
  useEffect(() => {
        
    const getResponse = async () => {
      await readData();
      //findMunicipio();
      return;
    };
    getResponse();
  },[])
  console.log(state);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });
  
  const handleInputChange = (e) => {
    setIdDpto(e.value);
    findMunicipio(e.value.id)
  };

  const onSubmit = (data) => {
    registerAprendiz(data);
   
    setShowMessage(true);
    reset();
  };
 console.log(idDpto);
 //console.log(setDptoxId);
 console.log(defaultValues)
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
                  autoFocus
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
          {getFormErrorMessage("nombres")}
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
          {getFormErrorMessage("apellidos")}
        </div>

        <div className="field"  style={{width:'180px'}}>
          <span className="p-float-label">
            <Controller
              name="numeroDocumento"
              control={control}
              rules={{ required: "Numero documento es obligatorio." }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({ "p-invalid": fieldState.invalid })}
                />
              )}
            />
            <label
              htmlFor="nrodocumento"
              className={classNames({ "p-error": errors.name })}
            >
              Nro documento*
            </label>
          </span>
          {getFormErrorMessage("nrodocumento")}
        </div>

        <div className="field">
          <span className="p-float-label">
            <Controller
              name="documento"
              control={control}
              render={({ field }) => (
                <Dropdown
                  id={field.name}
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  options={state.tipoDocumento}
                  optionLabel="nombre"
                />
              )}
            />
            <label htmlFor="tipodocumento">Tipo Documento</label>
          </span>
        </div>

        <div className="field">
          <span className="p-float-label">
            <Controller
              name="fechaNacimiento"
              control={control}
              render={({ field }) => (
                <Calendar
                  id={field.name}
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  dateFormat="dd/mm/yy"
                  mask="99/99/9999"
                  showIcon
                  monthNavigator
                  yearNavigator
                  yearRange="1940:2042"
                />
              )}
            />
            <label htmlFor="date">Fecha nacimiento</label>
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
          {getFormErrorMessage("direccion")}
        </div>

        <div className="field"  style={{width:'200px'}}>
          <span className="p-float-label">
            <Controller
              name="departamento"
              control={control}
              render={({ field }) => (
                <Dropdown
                  id={field.name}
                  value={idDpto}
                  onChange={handleInputChange}
                  //onChange={(e)=>findMunicipio(e.target.value)}
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
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  options={state.municipios}
                  optionLabel="nombreMunicipio"
                />
              )}
            />
            <label htmlFor="municipio">Municipio</label>
          </span>
        </div>
        
        <div className="field " style={{width:'180px'}}>
          <span className="p-float-label">
            <Controller
              name="telefono"
              control={control}
              rules={{ required: "Telefono es obligatorio." }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
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
          {getFormErrorMessage("telefono")}
        </div>

        <div className="field"  style={{width:'180px'}}>
          <span className="p-float-label">
            <Controller
              name="celular"
              control={control}
              rules={{ required: "Celular es obligatorio." }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
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
          {getFormErrorMessage("celular")}
        </div>

        <div className="field">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-envelope" />
            <Controller
              name="correo"
              control={control}
              rules={{
                required: "Correo es requerido.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address. E.g. example@email.com",
                },
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
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

        <div className="field"  style={{width:'180px'}}>
          <span className="p-float-label">
            <Controller
              name="sexs"
              control={control}
              render={({ field }) => (
                <Dropdown
                  id={field.name}
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  options={state.tipoSexo}
                  optionLabel="nombre"
                />
              )}
            />
            <label htmlFor="sexo">Sexo</label>
          </span>
        </div>

        <div className="field"  style={{width:'180px'}}>
          <span className="p-float-label">
            <Controller
              name="epss"
              control={control}
              render={({ field }) => (
                <Dropdown
                  id={field.name}
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
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
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
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
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  options={state.cajaCompensacion}
                  optionLabel="nombre"
                />
              )}
            />
            <label htmlFor="cajacompensacion">Caja Compensacion</label>
          </span>
        </div>
        <div className="field"  style={{width:'180px'}}>
          <span className="p-float-label">
            <Controller
              name="licencias"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  id={field.name}
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  options={state.licencia}
                  optionLabel="nombre"
                />
              )}
            />
            <label htmlFor="licencias">Licencia/s</label>
          </span>
        </div>

        <div className="field ">
            <Button
              icon="pi pi-dollar"
              className="p-button-rounded p-button-danger "
              //onClick={ttlPago}
            />
          </div>
        <Divider />
        <div className="formgrid grid ">
          <div className="field ">
            <Button
              type="submit"
              label="Registrar"
              className="mt-2"
              style={{ backgroundColor: "#e40505d5" }}
            />
          </div>

          
        </div>
      </form>
    </div>
  );
};
