import React from 'react';
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { SplitButton } from 'primereact/splitbutton';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';


const Toolbaragenda = ({children}) => {
const [date, setDate] = useState(null);
const navigate = useNavigate();
const [disable,setDisable] = useState(false);
addLocale('es', {
  firstDayOfWeek: 1,
  dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
  dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
  dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  today: 'Hoy',
  clear: 'Claro'
});



  const handleClickNew = () => {
    
      navigate ("agendar");
      setDisable(true);
     
      
  };

  const handleClickUpdate = () => {
    navigate ("editar");
     setDisable(true);
    
  };

  const handleClickFind = () => {
  navigate ("buscar");
  setDisable(true);
  
  };

  
    const leftContents = (
        <>
            <Button label="Agendar"  disabled={disable} onClick={handleClickNew} icon="pi pi-plus" className="p-button mr-2 p-button-danger" />
            <Button label="Editar" disabled={disable} onClick={handleClickUpdate} icon="pi pi-upload" className="p-button mr-2 p-button-danger" />
            
        </> 
    );

    const rightContents = (
        <>  
            
          <div className=" p-inputgroup">
            <Button className="p-button-danger" icon="pi pi-search" disabled={disable}  onClick={handleClickFind}  />
            <Calendar id="icon" value={date} onChange={(e) => setDate(e.value)} locale="es"  showIcon />
          </div>
                        
            
           
        </>
    );

    return (
        <div>
            <Toolbar className="p-toolbar" left={leftContents} right={rightContents} />
            {children}
        </div>
    );
}

export default Toolbaragenda;