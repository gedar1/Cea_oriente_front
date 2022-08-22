import React, { useState, useEffect, useContext } from "react";
import { useAppcontext } from "../../../provider/InstructorProvider";
import { useNavigate } from "react-router-dom";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import {
  ADD_INSTRUCTORID,
  LIST_INSTRUCTOR,
  GET_ID_INSTRUCTOR,
} from "../../../actionTypes/Types";

import InstructorContext from "../../../context/instructorContext/InstructorContext";

const ToolbarInstructor = ({ children }) => {
  const navigate = useNavigate();

  

  const ctxins = useContext(InstructorContext);
  const { setInstructor, findInstructor, getIdInstructor, readInstructores } =
    ctxins;
  const [instructorxid, setInstructorxid] = useState();
  //const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  const [instid, setInstid] = useState();

  const [disable, setDisable] = useState(false);

  const [disableback, setDisableback] = useState(false);

  useEffect(() => {
    const getResponse = async () => {
      await readInstructores();

      return;
    };
    getResponse();
    // getListarest();
    
  }, []);
  //    useEffect(() => {
  //      let isMounted = true;
  //  getListarinst();

  //   return () => {

  //     isMounted = false;
  //     };
  //    },[])
  //console.log(instruct);

  const reset = () => {
    setInstructorxid("");
  };

  const handleClickNew = () => {
    navigate("registrar");
    setDisable(true);

    //setDisableFind(false);
  };

  const onChangeInput = (e) => {
    setInstructor(e.value);
  };
  const handleClickUpdate = () => {
    navigate("editar");
    setDisable(true);
    //setDisableFind(false);
  };

  const handleClickFind = () => {
    //navigate("buscar");
    //findPagos();
    //getEst();
    findInstructor();
    onLoadingClick();

    //navigate("buscar");
    setDisable(true);

    //setDisableFind(false);
    //reset();
  };
  const onLoadingClick = () => {
    setLoading(true);

    setTimeout(() => {
      navigate("buscar");
      //setLoading(false);
    }, 300);
  };
  const handleClickBack = () => {
    getIdInstructor("");
    window.history.back();
    //ctx.setValor(false)
    //ctx.setInstrid(instructor)
    //return setDisablei('false');
    // setDisableFind(false);
    //navigate("/menu");
  };

  const handleClickListar = () => {
    // setValor(true);
    setDisable(true);
    navigate("listar");

    //return setDisablei('true');
    //setDisable(true);
  };
  //ctx.setInstrid(instructor)

  //console.log(instructorxid);
  //console.log(instid);

  //console.log(mapear)
  const leftToobaraprendiz = (
    <>
      <div className=" p-inputgroup ">
        <Button
          label="Ingresar"
          disabled={disable}
          onClick={handleClickNew}
          icon="pi pi-plus"
          className="p-button mr-2 p-button-danger"
        />

        <Button
          className="p-button-danger"
          icon="pi pi-search"
          disabled={disable}
          onClick={handleClickFind}
        />
        <InputText
          className="mr-2"
          placeholder="Ingrese nro documento"
          //onValueChange={(e) => setIdinstructor(e.value)}
          //onChange={(e)=>dispatch({type:GET_ID_INSTRUCTOR,idinstructor:(e.target.value)})}
          onChange={(e) => setInstructor(e.target.value)}
        />
      </div>
    </>
  );

  const rightToolbaraprendiz = (
    <>
      <div className="px-2">
        <Button
          icon="pi pi-list"
          disabled={disable}
          tooltip="Listar"
          tooltipOptions={{ position: "top" }}
          onClick={handleClickListar}
          className="p-button-danger "
        />
      </div>

     
    </>
  );

  return (
    <div>
      <Toolbar
        className="p-toolbar"
        left={leftToobaraprendiz}
        right={rightToolbaraprendiz}
      />
      {children}
    </div>
  );
};

export default ToolbarInstructor;
