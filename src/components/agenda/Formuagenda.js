import React from "react";
import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import itemagenda from '../../assets/data/itemagenda.json'

const Formuagenda = () => {
  const [expandedRows, setExpandedRows] = useState(null);
  const [data,setData] = useState();
  const [nrodata,setNrodata] = useState([])
  
  useEffect(() => {
    //    countryservice.getCountries().then(data => setCountries(data));
        setData(itemagenda.data);
        setNrodata(itemagenda.data)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    const headerTemplate = (data) => {
        return (
            <>
                
                <label className="mr-2">{data.hora}</label>
            </>
        );
    }

    
  const header = <div className="table-header-container"></div>;
    
  const columns = [
    {field:"horas",header:"Hora"},
    { field: "nombres", header: "Nombres" },
    { field: "apellidos", header: "Apellidos" },
    { field: "nrodocumento", header: "Nro documento" },
  ];
  
  const dynamicColumns = columns.map((col, i) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        header={col.header}
        style={{ width: "200px" }}
      />
    );
  });
  const footerTemplate = (data) => {
    return (
        <>
            <td colSpan="3" style={{ textAlign: 'center' }}>Total Aprendiz</td>
            <td>{calculateCustomerTotal(itemagenda.data.nombres)}</td>
        </>
    );
}
  console.log(nrodata)
  const calculateCustomerTotal = (data,nrodata) => {
    let total = 0;
    
    if (nrodata) {
        for (let data of nrodata) {
            if (itemagenda.data.keys === columns.field.nombres) {
                total++;
                
            }
        }
    }

    return total;
}
  return (
    <div className="datatable-rowexpansion-demo">
      <div className="datatable-rowgroup-demo">
        <div className="card">
          <DataTable
            value={data}
            
            rowGroupMode="subheader"
            groupRowsBy="hora"
            showGridlines
            rowGroupHeaderTemplate={headerTemplate}
            sortMode="single"
            size="small"
            sortField="representative.name"
            sortOrder={1}
            responsiveLayout="scroll"
            expandableRowGroups
            expandedRows={expandedRows}
            onRowToggle={(e) => setExpandedRows(e.data)}
            rowGroupFooterTemplate={footerTemplate}
          >
            {dynamicColumns}
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Formuagenda;
