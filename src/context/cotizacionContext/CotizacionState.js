import{useReducer,useState}from'react'
import CotizacionContext from'./CotizacionContex'
import CotizacionReducer from './CotizacionReducer'
import { GET_COTIZACION,
         FIND_COTIZACION,
         CREATE_COTIZACION,
         FIND_COTIZACION_ID,
        FIND_NRO_CONSECUTIVO,
        RESET_ITEM } from '../../actionTypes/Types';

import { requestToken } from "../../login/authContext";
import clientAxios from '../../config/axios'
/* creamos el estado inicial de los datos que van a consumir los componentes */
const CotizacionState=({children})=>{
  const initialState={
    cotizacionxId: {},
    cotizaciones: [],
    cotizacion:{},
    cotizacioncreate:{},
    findcotizacionxid: {},
    findcotizacionxcons: {},
    idCot:null,
    nrocotizacion:null
    
 };
/* creamos el reducer*/
 const {idCot,...rest} = initialState
 const [globalCotizacionState,dispatch] = useReducer(CotizacionReducer,initialState);
 /*creamos el action que contiene la peticion a la api*/
 let idCoti = globalCotizacionState.idCot
 const readCotizacion = async() => {

    try{
        const res=await clientAxios.post("contabilidad/cuentas/cobrar", {  "start": 1, "length": 10 },requestToken);
        console.log(res)
        dispatch({
          type:GET_COTIZACION,
          payload:res.data,
        });
      }catch(error){
        console.log(error);
      }
  };
  const [documento, setDocumento] = useState();
  const [nrocot, setNrocot] = useState();
  const [idestudiante,setIdestudiante] = useState();
  const url =`estudiantes/buscar/cc/${documento}`

 

 
  const findCotizxEst = async() => {
   
    try{
      console.log('hola desde est')
        const res=await clientAxios.get(`estudiantes/buscar/cc/${documento}`,requestToken);
       
        console.log(res)
        console.log (idestudiante)
        await console.log (res.data.id)
        const resid = await findCotizxId(res.data.id);
        console.log(resid)
        
        dispatch({
          type:FIND_COTIZACION,
          payload:res.data,
          
        
        });
      }catch(error){
        console.log(error);
      }
  };

  const findCotizxId = async(id) => {
  
    try{
      console.log('hola')
      console.log(idestudiante);
        const res=await clientAxios.get(`cotizacion/buscar/${id}`,requestToken);
        const resxcon = await findCotizxCons(res.data.consecutivo)
        console.log(res)
        dispatch({
          type:FIND_COTIZACION_ID,
          payload:res.data,
        });
      }catch(error){
        console.log(error);
      }
  };

  const findCotizxCons = async(cons) => {
   
    try{
        const res=await clientAxios.get(`cotizacion/buscar/cc/${cons}`,requestToken);
        console.log(res)
        dispatch({
          type:FIND_NRO_CONSECUTIVO,
          payload:res.data,
        });
      }catch(error){
        console.log(error);
      }
  };

  const registerCotizacion = async(data) => {
    
    const res=await clientAxios.post("cotizacion/crear",data,requestToken);
    console.log(res)
    try{
        
        dispatch({
          type:CREATE_COTIZACION,
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
        payload:globalCotizacionState,
      });
    }catch(error){
      console.log(error);
    }
  };

 console.log(documento)
 console.log(nrocot)
 console.log(idCot)
 console.log(idCoti)
 console.log(globalCotizacionState)
 console.log(globalCotizacionState.cotizacioncreate)
  return(
    /* retornamos el proveedor del contexto
     con los valores a consumir por los componentes */
    <CotizacionContext.Provider
      value={{
        cotizacion:globalCotizacionState.cotizacion,
        cotizaciones:globalCotizacionState.cotizaciones,
        registrarcotizacion:globalCotizacionState.cotizacioncreate,
        cotizacionxId:globalCotizacionState.cotizacionxId,
        cotizxid:globalCotizacionState.findcotizacionxid,
        cotxcons:globalCotizacionState.findcotizacionxcons,
        idCot:globalCotizacionState.idCot,
        nrocotizacion:globalCotizacionState.nrocotizacion,
        readCotizacion,
        findCotizxEst,
        findCotizxId,
        findCotizxCons,
        setDocumento,
        setNrocot,
        nrocot,
        setIdestudiante,
        registerCotizacion,
        documento,
        reset
        
      }}
    >
      {children}
    </CotizacionContext.Provider>
 )
    
}
export default CotizacionState