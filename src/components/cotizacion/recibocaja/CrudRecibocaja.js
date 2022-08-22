import React from "react";
import { useState, useEffect,useContext } from "react";
import { useNavigate} from "react-router-dom";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import AprendizContext from "../../../context/aprendizContext/AprendizContext";
import CotizacionContext from "../../../context/cotizacionContext/CotizacionContex";




const ToolbarCrudRecibo = ({children}) => {

  const navigate = useNavigate();
   let emptyEstudiante = {
    nrodocumento: "",
  };
 

   const ctx = useContext(AprendizContext);
   const { readAprendizCxC} = ctx;

  const ctxCot = useContext(CotizacionContext);
  const {setIdestudiante, findCotizxEst,estucotizacion} = ctxCot;


  
  const [cotizacion, setCotizacion] = useState({});
  const [disableback,setDisableback] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apren, setApren] = useState(true);
  const [disable, setDisable] = useState(false);

  
 
  // eslint-disable-line react-hooks/exhaustive-deps
  
  const onChangeInput=(e) =>{
    
    //setEstucotizacion(e.target.value);
    
  }

  const dataManage=() =>{
    
    
  }
  const handleClickBack = (e) => {
    window.history.back();
    //getPagos();
    setDisable(false);
    setIdestudiante('')
  };
  console.log(cotizacion);
  //console.log(urlcot);
  //console.log(estudiante)
  //let nrocons = aprendiz?.id
  //console.log('numero consecutivo',nrocons)
  const handleClickFind = () => {
    //setLoading1(true)
    //findAprendizs();
    //readAprendizCxC();
    findCotizxEst();
   
    
    onLoadingClick();
   
    //navigate("coti");
    setDisable(true);
    
  };
  // const reset = () => {
  //   setEstudiante('');
  // }
  const onLoadingClick = () => {
    setLoading(true)

    setTimeout(() => {
        navigate("id");
       // setLoading(false);
    }, 300);
}


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
          value={estucotizacion}
          placeholder="Ingrese nro documento"
          onChange={(e) => setIdestudiante(e.target.value)}
        />
      </div>
    </>
  );

  //console.log(estudiante);
  const rightContents = (
    <>
      
      <div className="px-2">
      
      </div>  
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

export default ToolbarCrudRecibo;
