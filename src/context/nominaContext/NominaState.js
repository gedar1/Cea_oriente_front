import{useReducer,useState,useContext}from'react'
import NominaContext from'./NominaContext';
import NominaReducer from './NominaReducer';
import InstructorContext from '../instructorContext/InstructorContext'

import {LIST_NOMINA,
        FIND_NOMINA,
        CREATE_NOMINA,
        GET_ID_NOMINA,
        GET_ID_INSTRUCTOR } from '../../actionTypes/Types';
import { requestToken } from "../../login/authContext";
import clientAxios from '../../config/axios'
/* creamos el estado inicial de los datos que van a consumir los componentes */
const NominaState=({children})=>{

  const {instructor,readInstructores,instructores} = useContext(InstructorContext);
  const initialState={
    nominas:[],
    nomina:{},
    proveedor:{},
    nominacreate:[],
    instructor:[]
    
 };

/* creamos el reducer*/
 const [globalNominaState,dispatch] = useReducer(NominaReducer,initialState);

 /*creamos el action que contiene la peticion a la api*/
 const readNominas = async() => {

    try{
        //const readinst= readInstructores();
        const res=await clientAxios.get("nomina/listar",requestToken,
        { start: 1, length: 10 });
        console.log(res)
        dispatch({
          type:LIST_NOMINA,
          payload :{res,instructor}
        });
      }catch(error){
        console.log(error);
      }
  };
  const [nomina, setNomina] = useState(null);
  //const url =`estudiantes/buscar/cc/${instructor}`
  const findNomina = async() => {
   
    try{
       
        const mapearnom= globalNominaState?.nominas.filter((nomina) =>nomina.documento === globalNominaState.idnomina)
       
        dispatch({
          type:FIND_NOMINA,
          payload:mapearnom,
        });
      }catch(error){
        console.log(error);
      }
  };

  const registerNomina = async(data) => {
    const res=await clientAxios.post("nomina/crear",data,requestToken);
    console.log(res)
    try{
        
        dispatch({
          type:CREATE_NOMINA,
          payload:res.data,
        });
      }catch(error){
        console.log(error);
      }
  };

  const getInstructorxId = async(id) => {
   
    try{
       
       // const mapear= globalInstructorState?.filter((instructor) =>instructor.documento === globalInstructorState.idinstructor)
       
        dispatch({
          type:GET_ID_INSTRUCTOR,
          payload:id,
        });
      }catch(error){
        console.log(error);
      }
  };

  // const findInstructorxId = async() => {
   
  //   try{
       
  //      // const mapear= globalInstructorState?.filter((instructor) =>instructor.documento === globalInstructorState.idinstructor)
  //      //const mapear= instructores.filter((instructor) =>instructor.documento === globalNominaState.idinstructor) 
  //       dispatch({
  //         type:GET_ID_NOMINA,
  //         payload:action,
  //       });
  //     }catch(error){
  //       console.log(error);
  //     }
  // };
 console.log(nomina)
 console.log(instructores)

 console.log(globalNominaState)
  return(
    /* retornamos el proveedor del contexto
     con los valores a consumir por los componentes */
    <NominaContext.Provider
      value={{
        nomina:globalNominaState.nomina,
        nominas:globalNominaState.nominas,
        registrarnomina:globalNominaState.nominacreate,
        instructor:instructor,
        proveedor:globalNominaState.nomina.proveedor,
        readNominas,
        findNomina,
        getInstructorxId,
        setNomina,
        registerNomina
      }}
    >
      {children}
    </NominaContext.Provider>
 )
    
}
export default NominaState