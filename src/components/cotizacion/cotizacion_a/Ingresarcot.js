import React from 'react'
import {Panel} from 'primereact/panel';
import  FormCotizacion  from './Formcotizacion';


import ToolbarCotizacion from './Toolbarcotizacion'




const Ingresarcot = ({children}) => {
  
  return (

    <>
   
      <Panel className="px-2" header="Cotizacion Nro:" >
          
          <ToolbarCotizacion/> 
          
          {children}

      </Panel>
    
    </>
    

    
  )
}

export default Ingresarcot;