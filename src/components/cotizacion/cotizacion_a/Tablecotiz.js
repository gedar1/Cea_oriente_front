import React, { useState, useEffect, useRef,useContext } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import CotizacionContext from "../../../context/cotizacionContext/CotizacionContex";


const Tablecotiz = () => {
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
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const ctxCot = useContext(CotizacionContext);
  const {readCotizacion,cotizaciones} = ctxCot;

 

  useEffect(() => {
        
    const getResponse = async () => {
      await readCotizacion();
      return;
    };
    getResponse();
   // getListarest();

  },[])
  console.log(cuentas);
  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);

    if (cuenta.name.trim()) {
      let _cuentas = [...cuentas];
      let _cuenta = { ...cuenta };
      if (cuenta.id) {
        const index = findIndexById(cuenta.id);

        _cuentas[index] = _cuentas;
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Cuenta Actualizado",
          life: 3000,
        });
      } else {
        _cuenta.id = createId();
        _cuentas.push(_cuenta);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Cuenta creado",
          life: 3000,
        });
      }

      setCuentas(_cuentas);
      setProductDialog(false);
      setCuenta(emptyCuenta);
    }
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < cuentas.length; i++) {
      if (cuentas[i].id === id) {
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
    setCuenta(emptyCuenta);
    setSubmitted(false);
    setProductDialog(true);
  };

  const editProduct = (cuenta) => {
    setCuenta({ ...cuenta });
    setProductDialog(true);
  };

  const deleteProduct = () => {
    let _cuentas = cuentas.filter((val) => val.id !== cuenta.id);
    setCuentas(_cuentas);
    setDeleteProductDialog(false);
    setCuenta(emptyCuenta);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _cuenta = { ...cuenta };
    _cuenta[`${name}`] = val;

    setCuenta(_cuenta);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _cuenta = { ...cuenta };
    _cuenta[`${name}`] = val;

    setCuenta(_cuenta);
  };

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Abonos</h5>
      
    </div>
  );

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
        onClick={saveProduct}
      />
    </>
  );

  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );

  const deleteProductsDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductsDialog}
      />
    </>
  );

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
      <DataTable
        scrollHeight="400px"
        scrollDirection="both"
        ref={dt}
        value={cotizaciones}
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
          field="cotizacion"
          header="Nro"
          style={{ minWidth: "3rem" }}
        ></Column>
        <Column
          field="nombreCompleto"
          header="Nombre"
          style={{ minWidth: "8rem" }}
        ></Column>
       
        <Column
          field="correo"
          header="Correo"
          style={{ minWidth: "4rem" }}
        ></Column>
        <Column
          field="documento"
          header="Documento"
          style={{ minWidth: "10rem" }}
        ></Column>
        <Column
          field="valor_cotizacion"
          header="Valor"
          dataType="numeric"
          style={{ minWidth: "6rem" }}
          body={balanceBodyCotizacion}
        ></Column>
        <Column
          field="valorPago"
          header="Pagado"
          dataType="numeric"
          style={{ minWidth: "6rem" }}
          body={balanceBodyPago}
        ></Column>
        <Column
          field="adeuda"
          header="Adeuda"
          dataType="numeric"
          style={{ minWidth: "6rem" }}
          body={balanceBodyAdeuda}
        ></Column>
        <Column
          body={actionBodyTemplate}
          exportable={false}
          style={{ minWidth: "3rem" }}
        ></Column>
      </DataTable>

      <Dialog
        visible={productDialog}
        style={{ width: "600px" }}
        header="Ingresar pago"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="id">Id</label>
          <InputText
            id="id"
            value={cuenta.id}
            onChange={(e) => onInputChange(e, "id")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !cuenta.name })}
          />
          {submitted && !cuenta.id && (
            <small className="p-error">Id is required.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="id_cotizacion">Id cotizacion</label>
          <InputText
            id="cotizacion"
            value={cuenta.cotizacion}
            onChange={(e) => onInputChange(e, "id_cotizacion")}
            required
            
          />
        </div>

        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="idestudiante">Id estudiante</label>
            <InputText
              id="documento"
              value={cuenta.documento}
              onValueChange={(e) => onInputNumberChange(e, "id_estudiante")}
            />
          </div>
          <div className="field col">
            <label htmlFor="vlrcotizacion">Vlr Cotizacion</label>
            <InputNumber
              id="vlrfactura"
              value={cuenta.valorCotizacion}
              onValueChange={(e) => onInputNumberChange(e, "quantity")}
              mode="currency"
              currency="USD"
              locale="en-US"
            />
          </div>
        </div>

        <div className="formgrid grid">

        <div className="field col">
            <label htmlFor="vlrpago">Vlr Pago</label>
            <InputNumber
              id="vlrpago"
              value={cuenta.valorPago}
              onValueChange={(e) => onInputNumberChange(e, "quantity")}
              mode="currency"
              currency="USD"
              locale="en-US"
            />
          </div>
          <div className="field col">
            <label htmlFor="fechapago">Fecha pago</label>
            <Calendar
              id="fechapago"
              value={cuenta}
              onChange={(e) => e.value}
              dateFormat="dd/mm/yy"
              mask="99/99/9999"
              showIcon
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {cuenta && (
            <span>
              Are you sure you want to delete <b>{cuenta.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductsDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {cuenta && (
            <span>Are you sure you want to delete the selected products?</span>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default Tablecotiz;
