import{useReducer,useState}from'react'
import InstructorContext from'./InstructorContext'
import InstructorReducer from './InstructorReducer'
import {LIST_INSTRUCTOR,
        FIND_INSTRUCTOR,
        CREATE_INSTRUCTOR,
        GET_ID_INSTRUCTOR,
      RESET_ITEM } from '../../actionTypes/Types';
import { requestToken } from "../../login/authContext";
import clientAxios from '../../config/axios'
/* creamos el estado inicial de los datos que van a consumir los componentes */
const InstructorState=({children})=>{
  const initialState={
    instructores:[],
    instructor:{},
    instructorcreate:[],
    //idinstructor:''
    
 };
/* creamos el reducer*/
 const [globalInstructorState,dispatch] = useReducer(InstructorReducer,initialState);
 /*creamos el action que contiene la peticion a la api*/
 const readInstructores = async() => {

    try{
        const res=await clientAxios.get("docentes/listar",requestToken,
        { start: 1, length: 10 });
        console.log(res)
        dispatch({
          type:LIST_INSTRUCTOR,
          payload:res.data,
        });
      }catch(error){
        console.log(error);
      }
  };
  const [instructor, setInstructor] = useState(null);
  const url =`estudiantes/buscar/cc/${instructor}`
  const findInstructor = async() => {
   
    try{
       
        const mapear= globalInstructorState?.instructores.filter((instruct) =>instruct.documento === instructor)
       console.log(mapear)
        dispatch({
          type:FIND_INSTRUCTOR,
          payload:mapear,
        });
      }catch(error){
        console.log(error);
      }
  };

  const registerInstructor = async(data) => {
    const res=await clientAxios.post("docentes/crear",data,requestToken);
    console.log(res)
    try{
        
        dispatch({
          type:CREATE_INSTRUCTOR,
          payload:res.data,
        });
      }catch(error){
        console.log(error);
      }
  };

  const getIdInstructor = async(id) => {
   
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
  const reset=()=>{
    try{
        
      dispatch({
        type:RESET_ITEM,
        payload:{},
      });
    }catch(error){
      console.log(error);
    }
  };
 console.log(instructor)
 console.log(url)
 console.log(globalInstructorState)
  return(
    /* retornamos el proveedor del contexto
     con los valores a consumir por los componentes */
    <InstructorContext.Provider
      value={{
        instructor:globalInstructorState.instructor,
        instructores:globalInstructorState.instructores,
        registrarinstructor:globalInstructorState.instructorcreate,
        //idinstructor:globalInstructorState.idinstructor,
        readInstructores,
        findInstructor,
        getIdInstructor,
        setInstructor,
        registerInstructor,
        reset
      }}
    >
      {children}
    </InstructorContext.Provider>
 )
    
}
export default InstructorState