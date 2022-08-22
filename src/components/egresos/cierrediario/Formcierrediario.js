import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import {Dropdown} from "primereact/dropdown";
import { Toast } from 'primereact/toast';

//import pagosdata from "../../assets/data/pagosdata.json";
//import tipago from '../../assets/data/tipopago.json'
import axios from 'axios';

const Formbalance = () => {
  let emptyPago = {
    id:null,
    id_proveedor: null,
    nombre: "",
    descripcion: "",
    num_factura: "",
    valor_ingreso: 0,
    id_instructor: null,
    tipopago: []
  };
  let emptyEgreso = {
    id:'',
    id_proveedor: null,
    nombres: "",
    descripcion: "",
    num_factura: "",
    vlr_ingreso: 0,
    vlr_egreso:0,
    id_instructor: null,
    tipopago: []
  };

  //const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [tippago, setTippago] = useState([]);
  const [pagos, setPagos] = useState(null);
  const [pago, setPago] = useState(emptyPago);
  const [egresos,setEgresos] = useState(emptyEgreso);
  const [egreso,setEgreso] = useState(null);
  const [tipopago,setTipopago] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  //const productService = new ProductService();

  useEffect(() => {
    axios.post("http://localhost:8082/cea_oriente/contabilidad/cierrediario", 
    { "fechaCierre": "2022-03-01T00:00:00", "start": 1, "length": 10 })
        .then(response => setPagos(response.data.dataPagos,response.data.dataRecaudo))
        .catch(error => console.log(error));
        console.log(pagos)
  }, []);
  // useEffect(() => {
  //   setPagos(pagosdata.data);
  //   setTippago(tipago.tipo)
  //   //productService.getProducts().then(data => setProducts(data));
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps
  //console.log(tipago.tipo)
  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const savePago = () => {
    setSubmitted(true);

    if (pago.nombre.trim()) {
      let _pagos = [...pagos];
      let _pago = { ...pago };
      
      if (pago.id) {
        const index = findIndexById(pago.id);

        _pagos[index] = _pagos;
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Pago Actualizado",
          life: 3000,
        });
      } else {
        _pago.id = createId();
        _pagos.push(_pago);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Pago creado",
          life: 3000,
        });
      }

      setPagos(_pagos);
      setProductDialog(false);
      setPago(emptyPago);
    }
  };
//  console.log(pago)
  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < pagos.length; i++) {
      if (pagos[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return id;
  };
 
  const openNew = () => {
    setPago(emptyPago);
    setSubmitted(false);
    setProductDialog(true);
  };

  const editProduct = (pago) => {
    setPago({ ...pago });
    setProductDialog(true);
  };

  

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

  const leftToolbarTemplate = () => {
    return (
      <>
      <div className="table-header">
          <h5 className="mx-0 my-1">Balance:</h5>
      </div>  
      </>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success mr-2"
          onClick={openNew}
        />
      </>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Balance diario</h5>
      <h5 className="mx-0 my-1">01/01/2022</h5>
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

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 " style={{width:"35px",height:"35px",fontSize:"10px"}}
          
          onClick={() => editProduct(rowData)}
        />
      </>
    );
  };
  const onTipoPagoChange = (e) => {
    setTipopago(e.value);
    onInputChange(e, "tipopago")
}

  const balanceBodyPago = (rowData) => {
    let valor = (rowData.valorPago != null) ? rowData.valorPago : 0;
    return formatCurrency(valor);
  }
  const balanceBodyIngreso = (rowData) => {
    let valor = (rowData.valorIgreso != null) ? rowData.valorIgreso : 0;
    return formatCurrency(valor);
  }
  const formatCurrency = (value) => {
    return value.toLocaleString('es-CO', { style: 'currency', currency: 'COP',
    minimumFractionDigits: 0 });
  }
  
  const productDialogFooter = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={savePago}
      />
    </>
  );

 


  return (
    <div className="datatable-crud-demo px-2">
      <Toast ref={toast} />
      <Toolbar
        className="mb-4"
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
      ></Toolbar>
      
        <DataTable
          scrollHeight="400px"
          scrollDirection="both"
          ref={dt}
          value={pagos}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="id"
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25]}
          style={{ fontSize: 14 }}
          showGridlines
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} pagos"
          size="small"
          globalFilter={globalFilter}
          header={header}
          responsiveLayout="scroll"
        >
          <Column
            field="documento"
            header="Documento"
            style={{ minWidth: "6rem" }}
          ></Column>
          <Column
            field="nombreCompleto"
            header="Nombre"
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="instructor"
            header="Responsable"
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="descripcion"
            header="Descripcion"
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="valorIgreso"
            header="Vlr ingreso"
            dataType="numeric"
            style={{ minWidth: "7rem" }}
            body={balanceBodyIngreso}
          ></Column>
          <Column
            field="valorPago"
            header="Vlr egreso"
            dataType="numeric"
            style={{ minWidth: "7rem" }}
            body={balanceBodyPago}
          ></Column>
          <Column
            key="name"
            field="tipoPago"
            header="Tipo pago"
            style={{ minWidth: "6rem" }}
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "3rem" }}
          ></Column>
        </DataTable>
      
      <Dialog
        visible={productDialog}
        style={{ width: "700px" }}
        header="Nuevo Ingreso"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="formgrid grid px-2">
        <div className="field">
          <label htmlFor="id_proveedor">Id proveedor</label>
          <InputText
            id="id_proveedor"
            value={pago.id_proveedor}
            onChange={(e) => onInputChange(e, "id_proveedor")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !pago.id_proveedor })}
          />
          {submitted && !pago.id_proveedor && (
            <small className="p-error">Id proveedor es requerido.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <InputText
            id="nombre"
            value={pago.nombre}
            onChange={(e) => onInputChange(e, "nombre")}
            required
            className={classNames({ "p-invalid": submitted && !pago.nombre })}
          />
          {submitted && !pago.nombre && (
            <small className="p-error">id proveedor es requerido.</small>
          )}
        </div>
        </div>
        <div className="field">
          <label htmlFor="descripcion">Descripcion</label>
          <InputTextarea
            id="descripcion"
            value={pago.descripcion}
            onChange={(e) => onInputChange(e, "descripcion")}
            required
            rows={2}
            cols={20}
          />
        </div>

        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="nrofactura">Nro factura</label>
            <InputNumber
              id="nrofactura"
              value={pago.num_factura}
              onValueChange={(e) => onInputNumberChange(e, "num_factura")}
            />
          </div>
          <div className="field col">
            <label htmlFor="valor_ingreso">Vlr ingreso</label>
            <InputNumber
              id="valorIgreso"
              value={pago.valorIgreso}
              onValueChange={(e) => onInputNumberChange(e, "valorIgreso")}
              mode="currency"
              currency="USD"
              locale="en-US"
            />
          </div> <div className="field col">
            <label htmlFor="valor_pago">Vlr ingreso</label>
            <InputNumber
              id="valorPago"
              value={pago.valorPago}
              onValueChange={(e) => onInputNumberChange(e, "valorPago")}
              mode="currency"
              currency="USD"
              locale="en-US"
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="id_instructor">Autorizo</label>
          <InputText
            id="id_instructor"
            value={pago.id_instructor}
            onChange={(e) => onInputChange(e, "id_instructor")}
            required
            className={classNames({ "p-invalid": submitted && !pago.id_instructor })}
          />
          {submitted && !pago.nombre && (
            <small className="p-error">id instructor es requerido.</small>
          )}
        </div>
        <div className="dropdown-demo">
            
                <Dropdown
                 value={tipopago}
                 options={tippago}
                 onChange={onTipoPagoChange} 
                 optionLabel="name" 
                 optionValue="name"
                 placeholder="Tipo pago" 
                 required
                 
                 className={classNames({ "p-invalid": submitted && !tippago.name })}
                />
            {submitted && !tippago.name && (
            <small className="p-error">tipo pago es requerido.</small>
          )}   
          </div> 
      </Dialog> 
    </div>
  );
};

export default Formbalance;
