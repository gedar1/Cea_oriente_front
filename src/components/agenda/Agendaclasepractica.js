import React from 'react'
import {Panel} from 'primereact/panel';
import Clasepractica from './Clasepractica';
import Toolbaragenda from '../Toolbaragenda'
const Agendapractica = ({children}) => {

  
  return (
    
<Panel className="px-2" header="Agenda clase practica" >
  <Toolbaragenda/>
  {children}
</Panel>
 
  )
}

export default Agendapractica;