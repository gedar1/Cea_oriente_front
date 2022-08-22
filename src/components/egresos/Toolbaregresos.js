import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { Tooltip } from "primereact/tooltip";
//import Dialogingresar from "./pagos/FomIngresar";
import PagosContext from "../../context/pagosContext/PagosContext";


const ToolbarPagos = ({ children }) => {
  const navigate = useNavigate();
  const [pagos, setPagos] = useState();
  const [pagov, setPagov] = useState("");
  const [pago, setPago] = useState();
  //const [idpago, setIdpago] = useState();
  const [dialogoview, setDialogoView] = useState(false);
  const [selectedPago, setSelectedPago] = useState(null);
  const [disable, setDisable] = useState(false);
  const [disablefind, setDisableFind] = useState(false);
  const [disableback, setDisableback] = useState(false);

 
  //let data={pagos}
 
 
 
  

  const ctxpag = useContext(PagosContext);
  const {setIdpago,findPagos,getIdPago,readPagos } = ctxpag;
  const [displayBasic, setDisplayBasic] = useState(false);

  const handleClickFind = () => {
    navigate("buscar");
    setDisable(true);
  };
  const openNew = () => {
    navigate("ingresar");
    //setDialogoView(true);
    //setDisplayBasic(true)
    //setDisableback(false);
  };
 // console.log(data)
   const findPago = () => {
  //   const pagoencon = data.filter((pag) =>{ return pag.idProveedor === pagov.idProveedor})
      
  //   setDisable(true);
  //   setPago(pagoencon);
  //   setData(pagoencon);
  //   setDisable(true);
  //   setDisableback(false);
    findPagos();
     navigate("listar");
    
   };
  useEffect(() => {
      
    const getResponse = async () => {
      await readPagos();
      return;
    };
    getResponse();
   // getListarest();
   return  ()=> {console.log('cleanup')}

  },[])
  const onInputChangeBuscar = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _pagov = { ...pagov };
    _pagov[`${name}`] = val;

    setPagov(_pagov);
  };
  const handleClickBack = () => {
    window.history.back();
    //getPagos();
    setDisable(false);
  };
  const onHide = () => {
  setDialogoView(false);
}
  const handleClickListar = () => {
    //getPagos();
    setDisable(true);
    setDisableback(false);
    //setIdpago( data );
    navigate("listar");
  };
  console.log(pago);
  console.log(pagov);
  console.log(pagos);
  //console.log(data);
  //console.log(pagoxid);
  console.log(disable);
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

  const leftToolbarPagos = () => {
    return (
      <>
        <div className="field-group">
          <label htmlFor="name"></label>
          <div className=" p-inputgroup">
           
            
            <Button
              label="Pago nuevo"
              icon="pi pi-plus"
              className="p-button-danger mr-4"
              onClick={openNew}
              disabled={disable}
            />
            <Button
              label="ingresar abono"
              icon="pi pi-plus"
              className="p-button-danger mr-4"
              //onClick={ editPago}
              disabled={disable}
            />
          </div>
        </div>
      </>

      
    );
  };

 

  const rightToolbarpagos = () => {
    return (
      <>
        <div className="px-2 ml-4">
          <Button
            icon="pi pi-list"
            tooltip="Listar"
            tooltipOptions={{ position: "top" }}
            disabled={disable}
            onClick={handleClickListar}
            className="p-button-danger "
          />
        </div>
       
      </>
    );
  };

  return (
    <div>
       
          <Dialog
            header="Buscar proveedor"
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
        
        className="p-toolbar"
        left={leftToolbarPagos}
        right={rightToolbarpagos}
      />
      {children}
      
    </div>
  );
};

export default ToolbarPagos;
