import React,{useEffect,useState,useContext} from 'react'
import {Panel} from 'primereact/panel';
import {useData} from '../../../provider/DataProvider'
import {Button} from 'primereact/button';
import ToolbarAprendiz from './ToolbarAprendiz'
import AprendizContext from "../../../context/aprendizContext/AprendizContext";



const Aprendiz = ({children}) => {

  const {readData,setPreload,reloadPage} =useData();

  const ctx = useContext(AprendizContext);
  const {setEstudiante, findAprendizs,aprendiz,reset} = ctx;

  const handleClickBack = () => {
    window.history.back();
    reset();
    setEstudiante('')
  };

  //reloadPage();
  const header = (
    <>
      <div className="flex justify-content-space-around">
        <div className="flex flex-start">
         
          <div
            className="justify-content-start ml-2 mr-8 mt-2"
            style={{ width: "60px" }}
          > <h5>Aprendiz</h5></div>

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
    
<Panel   className="px-2" header={header}  >
  {/* <ToolbarAprendiz /> */}
  <div className="flex justify-content-center">
  {children}
  </div>
</Panel>
 
  )
}

export default Aprendiz;