import React, { useState, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import axios from "axios";
import { setToken, setUser,requestToken } from "../login/authContext";
import AuthContext from "../core/authContext";

import "./formulario_inicio.css";

export const Logineco = () => {
  //const {auth} = useContext(AuthContext);
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const defaultValues = {
    username: "",
    password: "",
  };

  async function login(username, password) {
    await axios
      .post("http://localhost:8082/cea_oriente/auth/login", {
        username: username,
        password: password,
      },requestToken)
      .then(
        (response) => respuesta(response.data) /*setToken(response.data.token)*/
      )
      .catch((error) => console.log(error));
  }

  async function respuesta(response) {
    if (response != null) {
      setToken(response.token);
      setUser(response.username);
      navigate("/menu");
      //this.props.history.push('/instructor')
      //<Redirect to="/instructor" />
    }

    //     //setShowMessage(false);
  }

  // useEffect(() => {

  //   }, []);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    //setFormData(data);
    //setShowMessage(token ? true : false);
    //login(formData.username,formData.password);
    login(data.username, data.password);
    
    reset();
  };
  const reLoad = (e) => {
    e.event.preventDefault();
    window.location.reload();
  };
  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error ">{errors[name].message}</small>
    );
  };

  const dialogFooter = (
    <div className="p-d-flex p-jc-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  );
  const passwordHeader = <h6>Elige una contraseña</h6>;
  const passwordFooter = (
    <>
      <Divider />
     
      
    </>
  );

  return (
    <>
      {/* formulario login */}

      <div className="form-demo-login " >
        <Dialog
          visible={showMessage}
          onHide={() => setShowMessage(false)}
          position="rigth"
          //footer={dialogFooter}
          showHeader={false}
          breakpoints={{ "960px": "80vw" }}
          style={{ width: "30vw" }}
        >
          <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
            <i
              className="pi pi-check-circle"
              style={{ fontSize: "5rem", color: "var(--green-500)" }}
            ></i>
            <h5>Registration Successful!</h5>
            <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
              Your account is registered under name <b>{formData.name}</b>{" "}
              <b>{formData.username}</b> for activation instructions.
            </p>
          </div>
        </Dialog>

        
          <div className="card ">
            <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
              <div className="p-field">
                <span className="p-float-label p-input-icon-right">
                  <i className="pi pi-envelope" />
                  <Controller
                    name="username"
                    control={control}
                    rules={{
                      required: "Username es Obligatorio.",
                      pattern: {
                        value: "^ [A-Za-z] \\ w {5, 29} $",
                        message: "Username invalido. E.j. user.name",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    )}
                  />
                  <label
                    htmlFor="username"
                    className={classNames({ "p-error": !!errors.username })}
                  >
                    Username*
                  </label>
                </span>
                {getFormErrorMessage("username")}
              </div>
              <div className="p-field">
                <span className="p-float-label">
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: "Password es Obligatorio." }}
                    render={({ field, fieldState }) => (
                      <Password
                        id={field.name}
                        {...field}
                        toggleMask
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        header={passwordHeader}
                        footer={passwordFooter}
                      />
                    )}
                  />
                  <label
                    htmlFor="password"
                    className={classNames({ "p-error": errors.password })}
                  >
                    Password*
                  </label>
                </span>
                {getFormErrorMessage("password")}
              </div>

              <br />
              <br />

              <Button
                type="submit"
                label="Iniciar Sesión"
                //onClick={()=>{ window.location.reload()}}
                className="button p-mt-2 p-button-danger "
              />
              <br />
              <br />
            </form>
          </div>
       
      </div>
    </>
  );
};

export default Logineco;
