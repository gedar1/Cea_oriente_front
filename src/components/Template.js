import React,{useEffect, useState,useContext} from 'react'
import {useData} from '../provider/DataProvider'

import Menulateral from './Menulateral';


const Template = ({children}) => {
const {readData,setPreload} =useData();

useEffect(() => {
        
  const getResponse = async () => {
    await readData();
    //findMunicipio();
    return;
  };
  getResponse();
  setPreload(true)

},[])
 
  return (
      <>
      
      <div className="card pt-4 ">
           <Menulateral/> 
          {children}
           
      </div>
     
          
        
      </>
    
  )
}

export default Template;