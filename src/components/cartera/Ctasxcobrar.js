import React from 'react'
import {Panel} from 'primereact/panel';
//import ToolbarMenu from '../Toolbargestion'
const Ctasxcobrar = ({children}) => {
  
  return (
    
<Panel className="px-2" header="Cuentas por cobrar" >
  {children}
</Panel>
 
  )
}

export default Ctasxcobrar;