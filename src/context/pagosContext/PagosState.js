import{useReducer,useState}from'react'
import PagosContext from'./PagosContext'
import PagosReducer from './PagosReducer'
import { GET_PAGOS,
  FIND_PAGOS,
  CREATE_PAGOS,
  LIST_PAGOS,
  FIND_PAGO_DOC,
  FIND_PAGO_ID } from '../../actionTypes/Types';
import { requestToken } from "../../login/authContext";
import clientAxios from '../../config/axios'
/* creamos el estado inicial de los datos que van a consumir los componentes */
const PagosState=({children})=>{
  const initialState={
    pagos:[],
    pago:[],
    pagoxdoc:[],
    pagoxid:[],
    pagoscreate:[],
    idprov:''
    
 };

 console.log(requestToken)
/* creamos el reducer*/
 const [globalPagosState,dispatch] = useReducer(PagosReducer,initialState);
 /*creamos el action que contiene la peticion a la api*/
 const readPagos = async() => {

    try{
        const res=await clientAxios.post("egresos/pagos",
        { start: 1, length: 10 },requestToken);
        console.log(res)
        dispatch({
          type:LIST_PAGOS,
          payload:res.data,
        });
      }catch(error){
        console.log(error);
      }
  };
  const [idpago, setIdpago] = useState(null);
  const [documento,setDocumento] = useState(null);
  //const url =`estudiantes/buscar/cc/${estudiante}`
  const findPagoxdoc = async(doc) => {
   
    try{
      const res = await clientAxios.get(`proveedor/buscar/cc/${doc}`,requestToken)
      console.log(res)
        //const mapear= globalPagosState?.pagos.filter((pago) =>pago.documento === globalPagosState.idpago)
        //const pagoencon = globalPagosState?.pagos.filter((pag) =>{ return pag.idProveedor ===globalPagosState.idprov})
        dispatch({
          type:FIND_PAGO_DOC,
          payload:res.data,
        });
      }catch(error){
        console.log(error);
      }
  };

  const registerPago = async(data) => {
    const res=await clientAxios.post("egresos/pagar",data,requestToken);
    console.log(res)
    try{
        
        dispatch({
          type:CREATE_PAGOS,
          payload:res.data,
        });
      }catch(error){
        console.log(error);
      }
  };

  const getIdPago = async(id) => {
   
    try{
       
       // const mapear= globalInstructorState?.filter((instructor) =>instructor.documento === globalInstructorState.idinstructor)
        
        dispatch({
          type:GET_PAGOS,
          payload:id,
        });
      }catch(error){
        console.log(error);
      }
  };

 console.log(idpago)
 //console.log(url)
 console.log(globalPagosState)
  return(
    /* retornamos el proveedor del contexto
     con los valores a consumir por los componentes */
    <PagosContext.Provider
      value={{
        pagos:globalPagosState.pagos,
        pago:globalPagosState.pago,
        registrarpago:globalPagosState.pagocreate,
        readPagos,
        findPagoxdoc,
        setIdpago,
        getIdPago,
        registerPago
      }}
    >
      {children}
    </PagosContext.Provider>
 )
    
}
export default PagosState