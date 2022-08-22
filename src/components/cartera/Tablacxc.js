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
import { Calendar } from "primereact/calendar";
import { requestToken } from "../../login/authContext"
import axios from 'axios';

const Formcuentas = () => {
  let emptyCuenta = {
    id: "",
    documento: "",
    nombreCompleto: "",
    cotizacion: "",
    correo: "",
    telefono: null,
    valorCotizacion: "",
    valorPago: "",
    adeuda: "",
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

  useEffect(() => {
    axios.post("http://localhost:8082/cea_oriente/contabilidad/cuentas/cobrar", 
    {  "start": 1, "length": 10 },requestToken)
        .then(response => setCuentas(response.data.data))
        .catch(error => console.log(error));
        
  }, []);
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
      <h5 className="mx-0 my-1">Cuentas</h5>
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
    <div className="datatable-crud-demo px-2">
      <DataTable
        scrollHeight="400px"
        scrollDirection="both"
        ref={dt}
        value={cuentas}
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
          field="documento"
          header="Documento"
          style={{ minWidth: "6rem" }}
        ></Column>
        <Column
          field="nombreCompleto"
          header="Nombre"
          style={{ minWidth: "9rem" }}
        ></Column>
        <Column
          field="cotizacion"
          header="N° Cotización"
          style={{ minWidth: "4rem" }}
        ></Column>
        <Column
          field="correo"
          header="Correo"
          style={{ minWidth: "10rem" }}
        ></Column>
        <Column
          field="telefono"
          header="N° Contacto"
          style={{ minWidth: "8rem" }}
        ></Column>
        <Column
          field="valorCotizacion"
          header="Valor Cotización"
          dataType="numeric"
          style={{ minWidth: "8rem" }}
          body={balanceBodyCotizacion}
        ></Column>
        <Column
          field="valorPago"
          header="Pagado"
          dataType="numeric"
          style={{ minWidth: "9rem" }}
          body={balanceBodyPago}
        ></Column>
        <Column
          field="adeuda"
          header="Adeuda"
          dataType="numeric"
          style={{ minWidth: "9rem" }}
          body={balanceBodyAdeuda}
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
          <label htmlFor="name">Nombre</label>
          <InputText
            id="name"
            value={cuenta.name}
            onChange={(e) => onInputChange(e, "name")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !cuenta.name })}
          />
          {submitted && !cuenta.name && (
            <small className="p-error">Name is required.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="description">Descripcion</label>
          <InputTextarea
            id="description"
            value={cuenta.description}
            onChange={(e) => onInputChange(e, "description")}
            required
            rows={3}
            cols={20}
          />
        </div>

        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="nrofactura">Nro cuenta</label>
            <InputNumber
              id="nrofactura"
              value={cuenta.price}
              onValueChange={(e) => onInputNumberChange(e, "price")}
            />
          </div>
          <div className="field col">
            <label htmlFor="vlrfactura">Vlr factura</label>
            <InputNumber
              id="vlrfactura"
              value={cuenta.quantity}
              onValueChange={(e) => onInputNumberChange(e, "quantity")}
              mode="currency"
              currency="USD"
              locale="en-US"
            />
          </div>
        </div>

        <div className="formgrid grid">
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
    </div>
  );
};

export default Formcuentas;
