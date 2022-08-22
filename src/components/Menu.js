import React from 'react'
import {Panel} from 'primereact/panel';
import Menulateral from './Menulateral';
import Login from '../login/Login';
import { Badge } from 'primereact/badge';



const Menu = () => {

  
    
  
 
  return (
      <> 
     
          
            <Panel className="px-2" style={{width: '100%'}} header="Cea del Oriente"   >
              <Login/>
            </Panel>
        
      
        
           
        
      </>
    
  )
}

export default Menu;