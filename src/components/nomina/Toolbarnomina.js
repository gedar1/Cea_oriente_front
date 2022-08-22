import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Tooltip } from "primereact/tooltip";
import { Dialog } from "primereact/dialog";
import DialogNomina from "./liquidacion/Dialognomina";
import InstructorContext from "../../context/instructorContext/InstructorContext";
import NominaContext from "../../context/nominaContext/NominaContext";
//import Formpagos from "./egresos/Formpagos";

const ToolbarNomina = ({ children }) => {
  const navigate = useNavigate();

  const [dialogoview, setDialogoView] = useState(false);
  const [instid, setInstid] = useState(null);
  const [disable, setDisable] = useState(false);
  const [data, setData] = useState();
  const [disablefind, setDisableFind] = useState(false);
  const [disableback, setDisableback] = useState(false);
  const [instrv, setInstrv] = useState(null);
  const [idinstr, setIdinstr] = useState([]);

  const ctxnom = useContext(NominaContext);
  const { readNominas, nominas, findInstructorxId, getInstructorxId } = ctxnom;
  const [displayBasic, setDisplayBasic] = useState(false);
  
  //const {state,readData,setDptoxId,findMunicipio} = useData()
  const ctxins = useContext(InstructorContext); //
  const {setInstructor,findInstructor,getIdInstructor,readInstructores,instructores } = ctxins;

  useEffect(() => {
    readNominas();
   
  }, []);
  const handleClickFind = () => {
    navigate("buscar");
    setDisable(true);
    findInstructor();
  };
  const openNew = () => {
    readInstructores();
    setDisplayBasic(true)
    setDisableback(false);
  };

  const findInstruct = (instid) => {
    //navigate("id");
    findInstructorxId();
    setDisable(true);
    setDisableback(false);
  };

  const handleClickBack = (e) => {
    window.history.back();
    setDisable(false);
  };

  const handleClickListar = () => {
    setDisable(true);
    setDisableback(false);

    navigate("listar");
  };

  const leftContentsDialog = (
    <>
      <div className=" p-inputgroup">
        <Button
          className="p-button-danger"
          icon="pi pi-search"
          disabled={disable}
          onClick={handleClickFind}
        />

        <InputText
          className="mr-2"
          placeholder="Ingrese nro documento"
          //onChange={(e) => setEstudiante(e.target.value)}
          onChange={(e) => getIdInstructor(e.target.value)}
        />
      </div>
    </>
  );

  const rightContentsDialog = (
    <>
      <Button
        icon="pi pi-refresh"
        disabled={disable}
        className="p-button-danger"
      />
     
    </>
  );
    console.log(instructores);
  const leftToolbarNomina = () => {
    return (
      <>
        <div className="field-group ">
          <label htmlFor="name"></label>
          <div className=" p-inputgroup ">
            <Button
              label="Nomina"
              icon="pi pi-plus"
              className="p-button-success mr-2"
              onClick={openNew}
              disabled={disable}
            />

            <Button
              label="listar periodo"
              icon="pi pi-plus"
              className="p-button-success mr-2"
              onClick={openNew}
              disabled={disable}
            />
          </div>
        </div>
      </>
    );
  };
  console.log(instid);
  const rightToolbarNomina = () => {
    return (
      <>
        <div className="px-2">
        
          
          <Button
            icon="pi pi-list"
            
            disabled={disable}
            onClick={handleClickListar}
            className="p-button-danger  "
          />
        </div>
       
        
       
      </>
    );
  };

  return (
    <div>
      <Dialog
        header="Buscar Instructor"
        visible={displayBasic}
        closable={false}
        style={{ width: "45vw" }}
        //footer={renderFooter("displayBasic")}
        onHide={displayBasic}
      >
        <Toolbar
          className="p-toolbar"
          left={leftContentsDialog}
          right={rightContentsDialog}
        />
      </Dialog>
      <Toolbar
        className="p-toolbar mb-2"
        left={leftToolbarNomina}
        right={rightToolbarNomina}
      />
      {children}
    </div>
  );
};

export default ToolbarNomina;
