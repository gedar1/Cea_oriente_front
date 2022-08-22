import React,{useContext} from 'react'
import {Panel} from 'primereact/panel';
import { Button } from 'primereact/button';
import CotizacionContext from "../../../context/cotizacionContext/CotizacionContex";



const Cotizacion = ({children}) => {

  const ctxCot = useContext(CotizacionContext);

  const { setIdestudiante,setNrocot,reset} = ctxCot;

  const handleClickBack = () => {
    window.history.back();
    setIdestudiante('')
    
    //reset()
  };

  const header = (
    <>
      <div className="flex justify-content-space-around">
        <div className="flex flex-start">
         
          <div
            className="justify-content-start ml-2 mr-8 mt-2"
            style={{ width: "60px" }}
          > <h5>Cotizacion</h5></div>

          <div className="mr-8 ml-8" style={{ width: "100px" }}></div>
        </div>
        <div className="cardUserheader ml-8 pt-1">
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

    <>
   
      <Panel className="px-2" header={header} >
          
          <div className="flex justify-content-center">
          {children}
          </div>
      </Panel>
    
    </>
    

    
  )
}

export default Cotizacion;