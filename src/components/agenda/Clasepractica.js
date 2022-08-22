import React from 'react'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Panel} from 'primereact/panel';
import Toolbaragenda from '../Toolbaragenda'



const Clasepractica = ({children}) => {

  const navigate = useNavigate();
  const [date2, setDate2] = useState(null);
  
 
console.log(date2)
    
  return (
      
    <>
      <Panel className="px-2" header="Agenda clase practica" >
        <Toolbaragenda/>
        {children}
      </Panel>     
                  
                    
                  
            
          

      
    </>
    

    
  )
}

export default Clasepractica;