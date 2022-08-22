import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useData } from "../../../provider/DataProvider";
import { InputText } from "primereact/inputtext";
import {Divider} from "primereact/divider"
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";


export const FormRecibocaja = () => {

  const { state, readData, setDptoxId, findMunicipio } = useData();

  const [departamento, setDepartamento] = useState();
  const [tipodoc, setTipodoc] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

  const defaultValues = {
    id_aprendiz: "",
    nombres: "",
    apellidos: "",
    nrodocumento: "",
    tipodocumento: null,
    direccion: "",
    telefono: "",
    celular: "",
    email: "",
    valorcotizacion: null,
    municipio: null,
    departamento: null,
    date: null,
    accept: false,
  };
 

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    setFormData(data);
    setShowMessage(true);

    reset();
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };
  console.log(state)
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

      <form onSubmit={handleSubmit(onSubmit)} className="form-demo p-fluid">

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
                  autoFocus
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
                  autoFocus
                  className={classNames({ "p-invalid": fieldState.invalid })}
                />
              )}
            />
            <label
              htmlFor="nrodocumento"
              className={classNames({ "p-error": errors.name })}
            >
              Numero documento*
            </label>
          </span>
          {getFormErrorMessage("nrodocumento")}
        </div>

        <div className="field">
          <span className="p-float-label">
            <Controller
              name="tipodocumento"
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
              name="date"
              control={control}
              render={({ field }) => (
                <Calendar
                  id={field.name}
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  dateFormat="dd/mm/yy"
                  mask="99/99/9999"
                  showIcon
                />
              )}
            />
            <label htmlFor="date">Fecha Cotizacion</label>
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
                  autoFocus
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
                  //options={dpto.rows}
                  optionLabel="nombremunicipio"
                />
              )}
            />
            <label htmlFor="municipio">Municipio</label>
          </span>
        </div>

        <div className="field">
          <span className="p-float-label">
            <Controller
              name="departamento"
              control={control}
              render={({ field }) => (
                <Dropdown
                  id={field.name}
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  //options={dpto.rows}
                  optionLabel="nombre_departamento"
                />
              )}
            />
            <label htmlFor="departamento">Departamento</label>
          </span>
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
                  autoFocus
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
                  autoFocus
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

        <div className="field">
          <span className="p-float-label">
            <Controller
              name="valorrecibo"
              control={control}
              rules={{ required: "El valor es obligatorio." }}
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
              htmlFor="valorrecibo"
              className={classNames({ "p-error": errors.name })}
            >
              Valor *
            </label>
          </span>
          {getFormErrorMessage("valorrecibo")}
        </div>
        <Divider />
        <Button
          type="submit"
          label="Registrar"
          className="mt-2"
          style={{ width: "20%", backgroundColor: "#e40505d5" }}
        />
      </form>
    </div>
  );
};

export default FormRecibocaja;