import React, {
    useState,
    useEffect,
    useContext,
    useRef,
    useReducer,
  } from "react";
  import { useNavigate } from "react-router-dom";
  import {useData} from '../../../provider/DataProvider'
  import { Toolbar } from "primereact/toolbar";
  import { Toast } from 'primereact/toast';
  import { Button } from "primereact/button";
  import { InputText } from "primereact/inputtext";
  import AprendizContext from "../../../context/aprendizContext/AprendizContext";
  
  const ToolbarAprendiz = ({ children }) => {
    const navigate = useNavigate();
    const ctx = useContext(AprendizContext);
    const {setEstudiante, findAprendizs,aprendiz} = ctx;
    const {readData,setPreload,reloadPage} =useData();
    const toast = useRef(null);
    //const { setEstudiante } = useContext(Contexto);
    // const { getEst } = useContext(Contexto);
    // const { getListarest } = useContext(Contexto);
    // const { est } = useContext(Contexto);
    // const { estid } = useContext(Contexto);
    // const { setEst } = useContext(Contexto);
    // const { setEstid } = useContext(Contexto);
    // const {clicklistEst}= useContext(Contexto);
    // const {setClicklistEst}= useContext(Contexto);
    // const {clickfindEst}= useContext(Contexto);
    // const {setClickfindEst}= useContext(Contexto);
  
    // const{instruct} = useContext(ContextNom);
    // const{setInstruct} = useContext(ContextNom);
  
  
    const [disable, setDisable] = useState(false);
    const [loading, setLoading] = useState(false);
   
    const [instid,setInstid] = useState()
   
    const [disablefind, setDisableFind] = useState(false);
   
   
    
    const [disableback, setDisableback] = useState(false);
    const searchRef= useRef();
  //  let isMounted = true;
  //  useEffect(() => {
    
     
    
  // return () => {
  //   isMounted = false;
  //   };
  //  },[])
    
    //console.log(estid)
    //console.log(instruct)
   
    const resetest = () => {
      setEstudiante("");
    };
    const showError = () => {
      toast.current.show({severity:'error', summary: 'Error Message', detail:'Message Content', life: 3000});
  }
     const onShowError = ()=> aprendiz ? false :showError(); 
  
    const handleClickNew = () => {
      
      navigate("registrar");
      //setDisable(true);
      //setDisableFind(false);
    };
    
   console.log(aprendiz)
    
    const onChangeInput=(e) =>{
      //setInstid(e.target.value);
      setEstudiante(e.target.value);
    }
    const handleClickUpdate = () => {
      navigate("buscarid");
      //setDisable(true);
      //setDisableFind(false);
    };
    
    const handleClickFind = () => {
      //navigate("buscar");
      //findPagos();
      //getEst();
      //setPreload(true);
      findAprendizs();
      //onShowError();
      onLoadingClick();
     
      //setClickfindEst(true);
      //setClicklistEst(false);
  
     
      setDisable(true);
      setDisableFind(false);
      //reset();
    };
    const onLoadingClick = () => {
      setLoading(true);
      
      setTimeout(() => {
        navigate("buscar");
        //setLoading(false);
      }, 300);
    };
    
    
    
   
    
  
    const handleClickListar = () => {
      //getListarest();
      
      //setClicklistEst(true);
      //setClickfindEst(false);
      //setDisable(true);
      //setDisableFind(false);
      navigate("listar");
    };
    //console.log(clicklistEst);
    //console.log(instid);
    //console.log(instidencon);
    //console.log(instruct);
    const leftToobaraprendiz = (
      <>
        <div className=" p-inputgroup ">
          <Button
          
            label="Ingresar"
            disabled={disable}
            onClick={handleClickNew}
            icon="pi pi-plus"
            className="p-button mr-2 p-button-danger"
          />
  
          <Button
            className="p-button-danger"
            icon="pi pi-search"
            disabled={disable}
            onClick={handleClickFind}
          />
          <InputText
            ref={searchRef}
            className="mr-2"
            placeholder="Ingrese nro documento"
            onChange= {onChangeInput}
          />
        </div>
      </>
    );
  
    const rightToolbaraprendiz = (
      <>
        <div className="px-2">
          <Button
            icon="pi pi-list"
            disabled={disable}
            tooltip="Listar"
            
            onClick={handleClickListar}
            className="p-button-danger "
          />
        </div>
  
       
      </>
    );
  
    return (
      <div>
        <Toolbar
          className="p-toolbar"
          left={leftToobaraprendiz}
          right={rightToolbaraprendiz}
        />
        {/* <Toast ref={toast} onShow={onShowError}></Toast> */}
        {children}

        
      </div>
    );
  };
  
  export default ToolbarAprendiz;
  