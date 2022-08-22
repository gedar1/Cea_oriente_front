import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../../provider/DataProvider";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";

import InstructorContext from "../../../context/instructorContext/InstructorContext";

  const CardProveedor = () => {
  const navigate = useNavigate();
  const { state, findMunicipio } = useData();
  const ctxins = useContext(InstructorContext);
  const { instructor } = ctxins;
  const [instdata, setInstdata] = useState();
  const [dpto, setDpto] = useState();

  const [idDpto, setIdDpto] = useState();

  const [editinst, setEditinst] = useState(true);
  const [cardwidth, setCardwidth] = useState("35em");

  console.log(instructor);

  useEffect(() => {
    //setData(...instructor)
  }, []);
  //const [dta] = instructor;
  //console.log(dta);

  //console.log(datasub);
  const onValueDrop = (e, item) => {
    valueDrop[`${item}`](e.value);
  };
  //console.log(onDrop);

  //console.log(tipodoc.length);
  const dataValues = {
    nombres: '',
    apellidos: '',
    documento: '',
    tipoDocumento:'',
    direccion: '',
    telefono: '',
    celular: '',
    correo: '',
    razon:'',
    rlegal:'',
    //fecha_nacimiento: fecha_nacimiento,
    departamento: '', //aprendiz?.municipio?.codDepartamento?.nombreDepartamento,
    municipio: '', //aprendiz?.municipio?.nombreMunicipio,
    sexo: '',
    date: null,
    eps: '',
    tipoInstructor: '',
    cajaCompensacion:'' ,
    arl: '',
    accept: true,
  };
  const [data, setData] = useState(dataValues);
  console.log(dataValues);

  //const [dta] = instructor;
  const {
    nombres,
    apellidos,
    tipoDocumento,
    documento,
    sexo,
    arl,
    eps,
    celular,
    razon,
    rlegal,
    correo,
    telefono,
    direccion,
    tipoInstructor,
    cajaCompensacion,
    municipio,
    departamento,
    ...dtainst
  } = dataValues;

  const valueDrop = {
    tipoDoc: tipoDocumento,
    tipoSex: sexo,
  };
  console.log(valueDrop);

  const { tipoDoc, tipoSex } = valueDrop;
  const [tipodoc, setTipodoc] = useState(tipoDocumento);
  const [tiposex, setTiposex] = useState(sexo);
  const [tipoinst, setTipoinst] = useState(tipoInstructor);
  const [tipoarl, setTipoarl] = useState(arl);
  const [tipoeps, setTipoeps] = useState(eps);
  const [tipoccompensacion, setTipoccompensacion] = useState(cajaCompensacion);
  const [muni, setMuni] = useState(null);

  const dropValues = {
    tipoDocumento: tipodoc,
    tipoSexo: tiposex,
    departamento: setIdDpto,
    tipoInstructor: tipoinst,
    municipio: setMuni,
    arl: tipoarl,
    eps: tipoeps,
    cajaCompensacion: tipoccompensacion,
    
  };
  const onDrop = (e, valor, item, nom) => {
    dropValues[`${valor}`](e.value);
  };

  //const[id,codigo,nombre]=tipodoc;
  //onDrop();
  useEffect(() => {
    // onDrop()
  }, []);
  console.log(tipodoc);
  console.log(tiposex);
  console.log(tipoinst);
  console.log(muni);
  console.log(tipoarl);
  console.log(tipoeps);
  console.log(tipoccompensacion);
  
  const handleInputChange = (e) => {
    setIdDpto(e.value);
    findMunicipio(e.value.id);
  };

  const onInputChangeInst = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _editest = { ...dropValues };
    _editest[`${name}`] = val;
    setData(_editest);

    //dropValues[`${name}`](e.value);
  };
  const editar = (item) => (
    <>
    
      {editinst ? (<>
        {/* <label htmlFor={`${[item]}`} className="block"><h6 className="mb-1" style={{fontSize:'18px'}}>{`${[item]}`}</h6></label> */}
        <InputText className="mr-1"
          name={`${[item]}`}
          value={data?.[item]}
          onChange={(e) => onInputChangeInst(e, `${[item]}`)}
        />
        </>
      ) : null}
    </>
  );

  const subtitle = (
    <>
    <div className="flex justify-content-around">
    <label htmlFor="nombres" className="block" style={{width: '100px'}}>Nombres</label>
    <label htmlFor="nombres" className="block" style={{width: '100px'}}>Apellidos</label>
    </div> 
      {!editinst && <>{nombres}</>} {editar("nombres")}
      {!editinst && <>{apellidos}</>}{editar("apellidos")}

    <div className="flex justify-content-around mt-2">
    <label htmlFor="razon" className="block" style={{width: '150px'}}>Razon social</label>
    <label htmlFor="rlegal" className="block" style={{width: '200px'}}>Representante Legal</label>
    </div> 
      {!editinst && <>{razon}</>} {editar("razon")}
      {!editinst && <>{rlegal}</>}{editar("rlegal")}
    </>
  );

  const handleClickBack = () => {
    window.history.back();
  };

  const header = (
    <>
      <div className="flex justify-content-space-around">
        <div className="flex flex-start">
          <div
            className="justify-content-start ml-2 mr-8 mt-2"
            style={{ width: "50px" }}
          ></div>

          <div className="mr-8 ml-8" style={{ width: "100px" }}></div>
        </div>
      </div>
    </>
  );
  const editDropdown = (item, option, val, valor) => (
    <>
      {editinst ? (
        <Dropdown
          name={`${[item]}`}
          style={{ width: "250px" }}
          //value={tipodoc}
          //onChange={(e) => field.onChange(e.value)}
          onChange={(e) => onInputChangeInst(e, `${[item]}`)}
          options={state?.[val]}
          optionLabel={option}
        />
      ) : null}
    </>
  );

  const editDropdownDpto = () => (
    <>
      {editinst ? (
        <Dropdown
          style={{ width: "250px" }}
          value={idDpto}
          onChange={handleInputChange}
          placeholder={departamento}
          //onChange={(e) => field.onChange(e.value)}
          //onChange={(e)=>onInputChangeInst(e,'departamento')}
          options={state?.departamentos}
          optionLabel={"nombreDepartamento"}
        />
      ) : null}
    </>
  );

  const onClickEdit = () => {
    //window.location.reload();
    //getIdInstructor('');
    setEditinst(true);
    setCardwidth("40em");
  };

  const onClickCancelar = () => {
    //window.location.reload();
    //getIdInstructor('');
    //window.history.back();
    setCardwidth("35em");
    setEditinst(false);
  };
  const footer = (
    <span>
      <Button
        type="submit"
        label="Editar"
        icon="pi pi-check"
        className="p-button-danger"
        onClick={onClickEdit}
      />
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-danger ml-2"
        onClick={onClickCancelar}
      />
    </span>
  );

  //console.log(correo);
  console.log(instructor);
  console.log(data);
  //console.log(codDepartamento)
  console.log(dataValues);
  console.log ('dropValues',dropValues)
  console.log(state);
  console.log(tipodoc);
  console.log(idDpto);
  return (
    <>
      <div>
        <Card
        
          //title={numeroDocumento}
          subTitle={subtitle}
          style={{ width: { cardwidth } }}
          footer={footer}
          header={header}
        >
          <Divider />
          
          <h5>
            Nro documento : {!editinst && <>{documento}</>}
            {editar("documento")}
          </h5>
          <br />
          <ul className="ulcard ">
            <li className="ml-2">
              {" "}
              Tipo documento :{" "}
              {!editinst ? (
                <>{tipoDocumento}</>
              ) : (
                <>
                  <Dropdown
                    style={{ width: "250px" }}
                    value={tipodoc}
                    //onChange={handleInputChangetipoDoc}
                    placeholder={tipoDocumento}
                    onChange={(e) => setTipodoc(e.value)}
                    //onChange={(e) => onInputChangeInst(e, "tipoDocumento")}
                    options={state?.tipoDocumento}
                    optionLabel={"nombre"}
                  />
                </>
              )}{" "}
            </li>
            <br />
            <li className="ml-2">
              {" "}
              Genero :{" "}
              {!editinst ? (
                <>{sexo}</>
              ) : (
                <>
                  <Dropdown
                    style={{ width: "250px" }}
                    value={tiposex}
                    //onChange={handleInputChangetipoDoc}
                    placeholder={sexo}
                    onChange={(e) => setTiposex(e.value)}
                    //onChange={(e) => onInputChangeInst(e, "tipoSexo")}
                    options={state?.tipoSexo}
                    optionLabel={"nombre"}
                  />
                </>
              )}{" "}
            </li>
            <br />
            <li className="ml-2">
              {" "}
              Tipo Instructor :{" "}
              {!editinst ? (
                <>{tipoInstructor}</>
              ) : (
                <>
                  <Dropdown
                    style={{ width: "250px" }}
                    value={tipoinst}
                    //onChange={handleInputChangetipoDoc}
                    placeholder={tipoInstructor}
                    onChange={(e) => setTipoinst(e.value)}
                    //onChange={(e) => onInputChangeInst(e, "tipoInstructor")}
                    options={state?.instructor}
                    optionLabel={"nombre"}
                  />
                </>
              )}{" "}
            </li>
            <br />
            <Divider />
            <li className="ml-2">
              {" "}
              Correo : {!editinst && <>{correo}</>} {editar("correo")}{" "}
            </li>
            <br />
            <li className="ml-2">
              Celular : {!editinst && <>{celular}</>}
              {editar("celular")}
            </li>
            <br />
            <li className="ml-2">
              {" "}
              Telefono : {!editinst && <>{telefono}</>}
              {editar("telefono")}{" "}
            </li>
            <br />
            <li className="ml-2">
              {" "}
              Direccion : {!editinst && <>{direccion}</>}
              {editar("direccion")}{" "}
            </li>
            <br />
            <li className="ml-2">
              Municipio :{" "}
              {!editinst ? (
                <>{municipio}</>
              ) : (
                <>
                  <Dropdown
                    style={{ width: "250px" }}
                    value={muni}
                    //onChange={handleInputChangetipoDoc}
                    placeholder={municipio}
                    //onChange={(e) => field.onChange(e.value)}
                    onChange={(e) => onInputChangeInst(e, "municipio")}
                    options={state?.municipios}
                    optionLabel={"nombreMunicipio"}
                  />
                </>
              )}{" "}
            </li>
            <br />
            <li className="ml-2">
              Departamento : {!editinst && <>{departamento}</>}{" "}
              {editDropdownDpto()}
            </li>
            <br />
            <Divider />
            <li className="ml-2">
              {" "}
              E.P.S :{" "}
              {!editinst ? (
                <>{eps}</>
              ) : (
                <Dropdown
                  style={{ width: "250px" }}
                  value={tipoeps}
                  //onChange={handleInputChangetipoDoc}
                  placeholder={eps}
                  onChange={(e) => setTipoeps(e.value)}
                  //onChange={(e) => onInputChangeInst(e, "eps")}
                  options={state?.eps}
                  optionLabel={"nombre"}
                />
              )}{" "}
            </li>
            <br />
            <li className="ml-2">
              {" "}
              A.R.L :{" "}
              {!editinst ? (
                <>{arl}</>
              ) : (
                <Dropdown
                  style={{ width: "250px" }}
                  value={tipoarl}
                  //onChange={handleInputChangetipoDoc}
                  placeholder={arl}
                  onChange={(e) => setTipoarl(e.value)}
                  //onChange={(e) => onInputChangeInst(e, "arl")}
                  options={state?.arls}
                  optionLabel={"nombre"}
                />
              )}{" "}
            </li>
            <br />
            <li className="ml-2">
              {" "}
              C Compensacion :{" "}
              {!editinst ? (
                <>{cajaCompensacion}</>
              ) : (
                <Dropdown
                  style={{ width: "250px" }}
                  value={tipoccompensacion}
                  //onChange={handleInputChangetipoDoc}
                  placeholder={cajaCompensacion}
                  onChange={(e) => setTipoccompensacion(e.value)}
                  //onChange={(e) => onInputChangeInst(e, "cajaCompensacion")}
                  options={state?.cajaCompensacion}
                  optionLabel={"nombre"}
                />
              )}{" "}
            </li>
            <br />
          </ul>
          <Divider />
        </Card>
      </div>
    </>
  );
};

export default CardProveedor;
