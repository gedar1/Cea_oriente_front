import React, { useState, useEffect, useRef,useContext } from "react";
import {Panel} from 'primereact/panel';
import {DataTable} from 'primereact/datatable';
import { classNames } from "primereact/utils";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import DialogNomina from "./Dialognomina";
import { requestToken } from "../../../login/authContext";
import {ContextNom} from '../../../context/Contextnomina';
import NominaContext from '../../../context/nominaContext/NominaContext';
import axios from 'axios';

const ListNomina = ({children}) => {

  let emptyCuenta = {
    id: "",
    id_cotizacion: "",
    id_consecutivo: "",
    id_estudiante: "",
    valor_cotizacion: "",
  };
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [cuentas, setCuentas] = useState(null);
  const [cuenta, setCuenta] = useState(emptyCuenta);
  const [datanomina,setDatanomina] = useState();
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const {instruct} = useContext(ContextNom);
  const {idinstructor} = useContext(ContextNom);
  const {dialogView} = useContext(ContextNom);
  const {setDialogView} = useContext(ContextNom);
  const {nominalist} = useContext(ContextNom);
  const dtnomina ={...nominalist,...instruct};

  const ctxnom = useContext(NominaContext);

  const {readNominas,nominas}=ctxnom
  useEffect(() => {
    
    datNomina();
  },[])

  const datNomina = () => {
    const dtnomina ={...nominalist};
    console.log(dtnomina)
    return setDatanomina([dtnomina,...instruct])
  }
  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Nomina</h5>
      
    </div>
  );
  console.log(dtnomina)
  console.log(datanomina)
  //console.log(instruct)
  //const mapear= instruct.find(({id}) => id === idinstructor)
  //console.log(mapear)
  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          
          className="p-button-rounded p-button-success mr-2" style={{width:"35px",height:"35px",fontSize:"10px"}}
          onClick={() => editProduct(rowData)}
        />
      </>
    );
  };

  const editProduct = (cuenta) => {
    setCuenta({ ...cuenta });
    setDialogView(true);
  };

  const balanceBodyCotizacion = (rowData) => {
    let valor = (rowData.valorCotizacion != null) ? rowData.valorCotizacion : 0;
    return formatCurrency(valor);
  };

  const balanceBodyPago = (rowData) => {
    let valor = (rowData.valorPago != null) ? rowData.valorPago : 0;
    return formatCurrency(valor);
  };
  const balanceBodyAdeuda = (rowData) => {
    let valor = (rowData.adeuda != null) ? rowData.adeuda : 0;
    return formatCurrency(valor);
  };
  const formatCurrency = (value) => {
    return value.toLocaleString('es-CO', { style: 'currency', currency: 'COP',
    minimumFractionDigits: 0 });
  }
  return (

    <>

      <div className="datatable-crud-demo ">
      <DataTable
        scrollHeight="400px"
        scrollDirection="both"
        ref={dt}
        value={nominas}
        selection={selectedProducts}
        onSelectionChange={(e) => setSelectedProducts(e.value)}
        dataKey="id"
        paginator
        rows={20}
        // rowsPerPageOptions={[5, 10, 25]}
        style={{ fontSize: 14 }}
        showGridlines
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} cuentas"
        size="small"
        globalFilter={globalFilter}
        header={header}
        responsiveLayout="scroll"
      >
        <Column
          field="id"
          header="Id"
          style={{ minWidth: "3rem" }}
        ></Column>
        <Column
          field="nombres"
          header="Nombres"
          style={{ minWidth: "6rem" }}
        ></Column>
        <Column
          field="apellidos"
          header="Apellidos"
          style={{ minWidth: "9rem" }}
        ></Column>
        <Column
          field="documento"
          header="Documento"
          style={{ minWidth: "4rem" }}
        ></Column>
        <Column
          field="correo"
          header="Email"
          style={{ minWidth: "10rem" }}
        ></Column>
        <Column
          field="tipoInstructor"
          header="Tipo instructor"
          style={{ minWidth: "10rem" }}
        ></Column>
        <Column
          field="periodo"
          header="Periodo"
          style={{ minWidth: "4rem" }}
        ></Column>
        <Column
          field="valor_hora"
          header="Valor Hora"
          dataType="numeric"
          style={{ minWidth: "8rem" }}
          body={balanceBodyCotizacion}
        ></Column>
        <Column
          field="nrohoras"
          header="Nro Horas"
          dataType="numeric"
          style={{ minWidth: "9rem" }}
          body={balanceBodyPago}
        ></Column>
        <Column
          field="valor_pagar"
          header="Valor a pagar"
          dataType="numeric"
          style={{ minWidth: "9rem" }}
          body={balanceBodyAdeuda}
        ></Column>
        <Column
          body={actionBodyTemplate}
          exportable={false}
          style={{ minWidth: "3rem" }}
        ></Column>
      </DataTable>
    </div>
    {/* {dialogView ? <DialogNomina /> : null} */}
    </>

    
  );
};

export default ListNomina;