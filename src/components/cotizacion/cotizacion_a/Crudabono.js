import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Toolbar } from "primereact/toolbar";
import { SelectButton } from "primereact/selectbutton";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import Crudcotizacion from "./Crudcotizacion";
import AprendizContext from "../../../context/aprendizContext/AprendizContext";
import CotizacionContext from "../../../context/cotizacionContext/CotizacionContex";

const CrudAbono = ({ children }) => {
  const navigate = useNavigate();
  let emptyEstudiante = {
    nrodocumento: "",
  };

  const ctx = useContext(AprendizContext);
  const { readAprendizCxC } = ctx;

  const ctxCot = useContext(CotizacionContext);
  const {
    setDocumento,
    findCotizxId,
    findCotizxCons,
    findCotizxEst,
    documento,
    estudiante,
    nrocot,
    idCot,
    cotizxcons,
    cotizxid,
    setNrocot,
    setIdestudiante,
    idestudiante,
  } = ctxCot;

  const [cotizacion, setCotizacion] = useState({});
  const [disableback, setDisableback] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checksearch, setCheckSearch] = useState(false);
  const [apren, setApren] = useState(true);
  const [disable, setDisable] = useState(false);
  const [nroconsecutivo, setNroconsecutivo] = useState();
  const [searchxcot, setSearchxcot] = useState(false);

  // eslint-disable-line react-hooks/exhaustive-deps

  const onChangeInput = (e) => {
    //setIdestudiante(idCot);
    setDocumento(e.target.value);
  };

  /* A promise that is resolved when the function `findCotizxEst()` is executed. */
  //let dataManage =new Promise (function(resolve,reject){
  //resolve(//findCotizxEst(),
  //console.log(idCot)
  //);
  //});

  //dataManage();
  const handleClickBack = (e) => {
    window.history.back();
    //getPagos();
    setDisable(false);
    setDocumento("");
  };
  console.log(cotizacion);
  //console.log(urlcot);
  //console.log(estudiante)

  const paymentOptions = [
    { name: "Documento", value: 1 },
    { name: "Nro Cotizacion", value: 2 },
  ];

  const handleClickFind = async () => {
    await findCotizxEst();
    onLoadingClickDoc();
    setDisable(true);
  };

  const handleClickFindNroCon = () => {
    findCotizxCons(nroconsecutivo);
    onLoadingClick();

    setDisable(true);
  };

  const buscarxdoc = (
    <>
      <Button
        label="Ingresar"
        disabled={disable}
        //onClick={handleClickNew}
        icon="pi pi-plus"
        className="p-button mr-4 p-button-danger"
      />
      <Button
        label="Abono"
        disabled={disable}
        //onClick={handleClickUpdate}
        icon="pi pi-upload"
        className="p-button mr-4 p-button-danger"
      />
    </>
  );

  const handleClickBuscarxDoc = () => {
    setSearchxcot(false);
    setCheckSearch(true);
  };

  const handleClickBuscarxCon = () => {
    setSearchxcot(true);
    setCheckSearch(true);
  };
  // const reset = () => {
  //   setEstudiante('');
  // }
  const onLoadingClick = () => {
    setLoading(true);
    //setCheckSearch(false)

    setTimeout(() => {
      navigate("nro");
    }, 300);
  };
  const onLoadingClickDoc = () => {
    setLoading(true);
    //findCotizxId();
    //setCheckSearch(false)

    setTimeout(() => {
      navigate("doc");
      //navigate("coti");
      //setLoading(false);
    }, 300);
  };
  console.log("nrocot", nrocot);
  console.dir(checksearch);
  console.dir(searchxcot);
  const leftContents = (
    <>
      <div className=" p-inputgroup">
        {!checksearch ? (
          //{!searchxdoc?
          <>
            <Button
              className="p-button-danger"
              icon="pi pi-search"
              label="Documento"
              //disabled={disable}
              onClick={handleClickBuscarxDoc}
              //loading={loading}
            />
            <Button
              className="p-button-danger ml-2"
              label="Nro Cotizacion"
              icon="pi pi-search"
              //disabled={disable}
              onClick={handleClickBuscarxCon}
              //loading={loading}
            />
          </>
        ) : (
          <>
            {!searchxcot ? (
              <>
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
                  value={estudiante}
                  placeholder="Ingrese nro documento"
                  onChange={(e) => setDocumento(e.target.value)}
                />
              </>
            ) : (
              <>
                <Button
                  className="p-button-danger"
                  icon="pi pi-search"
                  disabled={disable}
                  onClick={handleClickFindNroCon}
                  loading={loading}
                />

                <InputText
                  className="mr-2"
                  id="nroconsecutivo"
                  value={nrocot}
                  placeholder="Ingrese nro cotizacion"
                  onChange={(e) => setNroconsecutivo(e.target.value)}
                />
              </>
            )}
          </>
        )}
      </div>
    </>
  );

  //console.log(estudiante);
  const rightContents = (
    <>
      <div className="px-2"></div>
    </>
  );
  console.log(cotizxid);
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

export default CrudAbono;
