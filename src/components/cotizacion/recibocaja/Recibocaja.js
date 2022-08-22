import React,{useContext} from "react";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { FormRecibocaja } from "./Formrecibocaja";
import CotizacionContext from "../../../context/cotizacionContext/CotizacionContex";

const Recibocaja = ({ children }) => {

  const ctxCot = useContext(CotizacionContext);

  const { setEstucotizacion} = ctxCot;

  const handleClickBack = () => {
    window.history.back();
    setEstucotizacion('')
  };

  const header = (
    <>
      <div className="flex justify-content-space-around">
        <div className="flex flex-start">
          <div
            className="justify-content-start ml-2 mr-8 mt-2"
            style={{ width: "200px" }}
          >
            
            <h5>Recibo de caja</h5>
          </div>
          <div className="mr-8 ml-6"></div>
         
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
      <Panel className="px-2" header={header}>
        <div className="flex justify-content-center">{children}</div>
      </Panel>
    </>
  );
};

export default Recibocaja;
