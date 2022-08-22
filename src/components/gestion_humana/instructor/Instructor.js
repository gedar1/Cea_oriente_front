import React,{useState,useContext} from 'react'
import {Panel} from 'primereact/panel';
import {Button} from 'primereact/button';
import ToolbarInstructor from './ToolbarInstructor'
import InstructorContext from "../../../context/instructorContext/InstructorContext";
const Instructor = ({children}) => {

  const ctxins = useContext(InstructorContext);
  const {reset } = ctxins;
  const handleClickBack = () => {
    window.history.back();
    //reset();
    //setInstructor('');
    //getIdInstructor("");
  };

  const header = (
    <>
      <div className="flex justify-content-space-around">
        <div className="flex flex-start">
         
          <div
            className="justify-content-start ml-2 mr-8 mt-2"
            style={{ width: "60px" }}
          > <h5>Instructor</h5></div>

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
  
<Panel className="px-2" header={header}>
  <div className="flex justify-content-center">
  {children }
  </div>
</Panel> 
 
  )
}

export default Instructor;