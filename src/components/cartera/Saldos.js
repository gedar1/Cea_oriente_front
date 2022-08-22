import React from 'react'
import {Panel} from 'primereact/panel';
//import ToolbarMenu from '../Toolbargestion'
const Saldos = ({children}) => {

  
  return (
    
<Panel className="px-2" header="Saldos" >
  {/* <ToolbarMenu/> */}
  {children}
</Panel>
 
  )
}

export default Saldos;