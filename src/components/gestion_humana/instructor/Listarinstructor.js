import React, { useState, useEffect ,useRef,useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Panel} from 'primereact/panel';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import InstructorContext from "../../../context/instructorContext/InstructorContext";

export const Listarinstructor = () => {
 
    const dt = useRef(null);
    
    const [globalFilter, setGlobalFilter] = useState(null);
    const [selectedPagoId, setSelectedPagoId] = useState(null);
   
    
    

  const ctxins = useContext(InstructorContext);
  const {instructores } = ctxins;
    
   

    // const editPago = (inst) => {
    //     setPago({ ...inst });
    //     setProductDialog(true);
    //   };
    
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
    
   
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" /*onClick={() => editPago(rowData)}*/ />
                
            </React.Fragment>
        );
    }

    return (
       
            <DataTable
          ref={dt}
          value={instructores}
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
          <Column field="id" header="Id" style={{ minWidth: "3rem" }}></Column>
          <Column
            field="nombres"
            header="Nombres"
            style={{ minWidth: "6rem" }}
          ></Column>
          <Column
            field="apellidos"
            header="Apellidos"
            style={{ flexGrow: 1, flexBasis: "160px" }}
          ></Column>
          <Column
            field="tipoDocumento"
            header="Tipo documento"
            style={{ flexGrow: 1, flexBasis: "160px" }}
          ></Column>
          <Column
            field="documento"
            header="N° Documento"
            style={{ minWidth: "6rem" }}
          ></Column>
          <Column
            field="correo"
            header="Email"
            style={{ minWidth: "8rem" }}
          ></Column>
          <Column
            field="telefono"
            header="Telefono"
            style={{ minWidth: "6rem" }}
          ></Column>
          <Column
            field="fechaNacimiento"
            header="Fecha nacimiento"
            style={{ minWidth: "7rem" }}
          ></Column>
          <Column
            field="celular"
            header="Celular"
            style={{ minWidth: "6rem" }}
          ></Column>
          
        </DataTable>
        
       
    );
}

export default Listarinstructor;