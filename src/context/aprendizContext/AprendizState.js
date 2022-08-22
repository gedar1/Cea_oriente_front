import{useReducer,useState,useRef}from'react'
import AprendizContext from'./AprendizContext'
import AprendizReducer from './AprendizReducer'
import { GET_APRENDIZ,FIND_APRENDIZ,CREATE_APRENDIZ,GET_APRENDIZ_CXC,RESET_ITEM,UPDATE_APRENDIZ } from '../../actionTypes/Types';
import { requestToken } from "../../login/authContext";
import clientAxios from '../../config/axios'
/* creamos el estado inicial de los datos que van a consumir los componentes */
const AprendizState=({children})=>{
  const initialState={
    aprendices:[],
    aprendiz:[],
    aprendizcreate:[],
    aprendizupdate:[],
    aprendizcxc:{}
    
 };
 const toast = useRef(null);
/* creamos el reducer*/
 const [globalAprendizState,dispatch] = useReducer(AprendizReducer,initialState);
 /*creamos el action que contiene la peticion a la api*/
 const readAprendizs = async() => {

    try{
        const res=await clientAxios.get("estudiantes/listar",requestToken);
        console.log(res)
        dispatch({
          type:GET_APRENDIZ,
          payload:res.data,
        });
      }catch(error){
        console.log(error);
       
      }
  };

  const readAprendizCxC = async() => {

    try{
        const res=await clientAxios.post("estudiantes/cuentas/cobrar", {  "start": 1, "length": 10 },requestToken);
        console.log(res)
        dispatch({
          type:GET_APRENDIZ_CXC,
          payload:res.data,
        });
      }catch(error){
        console.log(error);
      }
  };
  const [estudiante, setEstudiante] = useState(null);
  const [idest, setIdest] = useState(null);
  const url =`estudiantes/buscar/cc/${estudiante}`
  const urlupdate = `estudiantes/update/${idest}`
  
  const findAprendizs = async() => {
   
    try{
        const res=await clientAxios.get(`estudiantes/buscar/cc/${estudiante}`,requestToken);
        console.log(res.data)
        dispatch({
          type:FIND_APRENDIZ,
          payload:res.data,
        });
      }catch(error){
        console.log(error);
       
      }
  };

  const updateAprendizs = async(data) => {
    const res=await clientAxios.put(`estudiantes/update/${idest}`,data,requestToken);
    
      console.log(res)
    try{
        
        dispatch({
          type:UPDATE_APRENDIZ,
          payload:res.data,
        });
      }catch(error){
        console.log(error);
       
      }
  };
  const registerAprendiz = async(data) => {
    console.log(data)
    const res=await clientAxios.post("estudiantes/crear",data,requestToken);
    console.log(res)
    try{
        
        dispatch({
          type:CREATE_APRENDIZ,
          payload:res.data,
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
 console.log(estudiante)
 console.log (idest)
 console.log(url)
 console.log(urlupdate)
 console.log(globalAprendizState);
 console.log(globalAprendizState.aprendizupdate)
 console.log(requestToken)
  return(
    /* retornamos el proveedor del contexto
     con los valores a consumir por los componentes */
    <AprendizContext.Provider
      value={{
        aprendiz:globalAprendizState.aprendiz,
        aprendices:globalAprendizState.aprendices,
        registraraprendiz:globalAprendizState.aprendizcreate,
        aprendizcxc:globalAprendizState.aprendizcxc,
        aprendizupdate:globalAprendizState.aprendizupdate,
        readAprendizs,
        findAprendizs,
        setEstudiante,
        registerAprendiz,
        readAprendizCxC,
        reset,
        idest,
        setIdest,
        updateAprendizs
      }}
    >
      {children}
    </AprendizContext.Provider>
 )
    
}
export default AprendizState