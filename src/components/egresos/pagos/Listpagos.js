import React, { useState, useEffect, useRef,useContext,memo } from "react";
import {useNavigate,useLocation} from 'react-router-dom'
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { requestToken } from "../../../login/authContext";
import {ContextEgresos } from "../../../context/Contexto"
import {Contexto } from "../../../context/Contexto"
import {Datos} from '../../../context/Contexto'
import axios from "axios";
import PagosContext from "../../../context/pagosContext/PagosContext";


const Formpagos = (props) => {
  //console.log(useParams())
  const navigate = useNavigate();
  let idenpago = {};
  let emptyPago = {
    id: "",
    idProveedor: "",
    nombre: "",
    descripcion: "",
    numFactura: "",
    reciboPago: "",
    valorPago: null,
    tipoPago: "",
    instructor: "",
    fechaPago: "",
  };

  
  //const [pagos, setPagos] = useState(null);
  const [pagov, setPagov] = useState('');
  const [pago, setPago] = useState(emptyPago);
  const [idpago, setIdpago] = useState(null);
  const [disableback,setDisableback] = useState(true);
  const [selPago, setSelPago] = useState(null);
  const [selectedPagoId, setSelectedPagoId] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [disable, setDisable] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);
  //const{data}=useContext(ContextEgresos);
  //const{data}=useContext(Contexto);
  //const{getPagos}=useContext(ContextEgresos);
  //const{getPagos}=useContext(Contexto);
  
  const ctxpag = useContext(PagosContext);
  const {pagos,findPagos,getIdPago,readPagos } = ctxpag;
  
  
  
  console.log(pago );
  console.log(pagos);
  //console.log(data);
  console.log(props.data)
  
  console.log(idpago);
  console.log(selPago)
 

 

  
 
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _pago = { ...pago };
    _pago[`${name}`] = val;

    setPago(_pago);
  };
  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _pago = { ...pago };
    _pago[`${name}`] = val;

    setPago(_pago);
  };

 

  
  

  const header = (
    <div className="table-header flex">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
        />
      </span>
    </div>
  );

  
  
  

  
  return (
    <>
      
        <DataTable
          ref={dt}
          value={pagos}
          selection={selectedPagoId}
          onSelectionChange={(e) => setSelectedPagoId(e.value)}
          dataKey="id"
          paginator
          rows={25}
          // rowsPerPageOptions={[5, 10, 25]}
          style={{ fontSize: 14 }}
          showGridlines
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} pagos"
          size="small"
          globalFilter={globalFilter}
          header={header}
          responsiveLayout="scroll"
        >
          <Column field="id" header="Id pago" style={{ minWidth: "3rem" }}></Column>
          <Column
            field="idProveedor"
            header="Id Proveedor"
            style={{ minWidth: "6rem" }}
          ></Column>
          <Column
            field="nombre"
            header="Nombre"
            style={{ flexGrow: 1, flexBasis: "160px" }}
          ></Column>
          <Column
            field="descripcion"
            header="Descripcion"
            style={{ flexGrow: 1, flexBasis: "160px" }}
          ></Column>
          <Column
            field="numFactura"
            header="N° factura"
            style={{ minWidth: "6rem" }}
          ></Column>
          <Column
            field="valorPago"
            header="Vlr factura"
            style={{ minWidth: "8rem" }}
          ></Column>
          <Column
            field="instructor"
            header="Instructor"
            style={{ minWidth: "8rem" }}
          ></Column>
          <Column
            field="fechaPago"
            header="Fecha pago"
            style={{ minWidth: "7rem" }}
          ></Column>
          <Column
            field="tipoPago"
            header="Tipo pago"
            style={{ minWidth: "9rem" }}
          ></Column>
        </DataTable>

        

       
    
    </>
  );
};

export default memo(Formpagos);
