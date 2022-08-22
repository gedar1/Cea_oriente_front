import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import InstructorContext from "../../../context/instructorContext/InstructorContext";

import PagosContext from "../../../context/pagosContext/PagosContext";

const CrudProveedor = ({ children }) => {
  const navigate = useNavigate();
  let emptyEstudiante = {
    nrodocumento: "",
  };

  const ctxins = useContext(InstructorContext);
  const { instructor, getIdInstructor, findInstructor } = ctxins;

  const ctxpag = useContext(PagosContext);
  const { pagos, findPagoxdoc, getIdPago, readPagos } = ctxpag;

  const [loading, setLoading] = useState(false);
  const [docum,setDocum] = useState();
  const [disable, setDisable] = useState(false);

  // eslint-disable-line react-hooks/exhaustive-deps

  const onChangeInput = (e) => {
    //setInstid(e.target.value);
    //setEstucotizacion(e.target.value);
  };

  const dataManage = () => {};
  const handleClickBack = (e) => {
    window.history.back();
    //getPagos();
    setDisable(false);
    //setEstucotizacion('')
  };
  console.log(instructor);
  //console.log(urlcot);
  //console.log(estudiante)

  const handleClickFind = () => {
    //setLoading1(true)
    //readAprendizCxC();
    //findCotizxEst();
    //findInstructor();
    findPagoxdoc(docum)

    onLoadingClick();

    //navigate("coti");
    setDisable(true);
  };
  // const reset = () => {
  //   setEstudiante('');
  // }
  const onLoadingClick = () => {
    setLoading(true);

    setTimeout(() => {
      navigate("pagoid");
      // setLoading(false);
    }, 300);
  };
  const leftContents = (
    <>
      <div className=" p-inputgroup">
        <Button
          className="p-button-danger"
          icon="pi pi-search"
          disabled={disable}
          onClick={handleClickFind}
          loading={loading}
        />

        <InputText
          className="mr-2"
          id="nrodocumento"
          //value={estucotizacion}
          placeholder="Ingrese nro documento"
          onChange={(e) => setDocum(e.target.value)}
        />
      </div>
    </>
  );

  //console.log(estudiante);
  const rightContents = (
    <>
      <div className="px-2"></div>
    </>
  );

  return (
    <>
      <Toolbar
        className="p-toolbar"
        left={leftContents}
        right={rightContents}
      />
      {children}
    </>
  );
};

export default CrudProveedor;
