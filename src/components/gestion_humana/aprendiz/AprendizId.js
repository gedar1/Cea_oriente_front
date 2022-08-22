import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../../provider/DataProvider";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import {InputSwitch} from "primereact/inputswitch"
import { Card } from "primereact/card";
import { Tooltip } from 'primereact/tooltip';
import { Badge } from "primereact/badge";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import AprendizContext from "../../../context/aprendizContext/AprendizContext";

const Aprendizid = () => {
  const navigate = useNavigate();
  const { state, findMunicipio } = useData();
  const [submitted, setSubmitted] = useState(false);
  

  const [enabledApren, setEnabledApren] = useState();
  const [dates2, setDates2] = useState();
  const [editest, setEditest] = useState(false);
  //const { estid } = useContext(Contexto);

  const ctx = useContext(AprendizContext); //

  const {
    aprendiz,
    resetAprendizs,
    setIdest,
    idest,
    updateAprendizs,
    aprendizupdate,
  } = ctx; //

  const [dpto, setDpto] = useState();
  

  
  const [idDpto, setIdDpto] = useState();
  const [cardwidth, setCardwidth] = useState("25em");
  const [data, setData] = useState({...aprendiz});
  console.log("aprendiz", aprendiz);

  //const {municipio :{codDepartamento:{nombreDepartamento }}} = aprendiz
  
  const dataValues = {
    id: aprendiz?.id,
    nombres: aprendiz?.nombres !== data?.nombres ? data.nombres  : aprendiz.nombres,
    apellidos: aprendiz?.apellidos !== data?.apellidos ? data.apellidos : aprendiz.apellidos,
    numeroDocumento: aprendiz?.numeroDocumento !== data?.numeroDocumento ? data.numeroDocumento : aprendiz.numeroDocumento,
    tipoDocumento: aprendiz?.tipoidentificacion !== data?.tipoidentificacion ? data.tipoidentificacion : aprendiz.tipoidentificacion,
    direccion: aprendiz?.direccion !== data?.direccion ? data.direccion : aprendiz.direccion,
    telefono: aprendiz?.telefono !== data?.telefono ? data.telefono : aprendiz.telefono,
    celular: aprendiz?.celular !== data?.celular ? data.celular : aprendiz.celular,
    correo: aprendiz?.correo !== data?.correo ? data.correo : aprendiz.correo,
    fechaNacimiento: aprendiz?.fechaNacimiento !== data?.fechaNacimiento ? data.fechaNacimiento : aprendiz.fechaNacimiento,
    departamento: aprendiz?.municipio?.codDepartamento?.nombreDepartamento ,
    municipio: aprendiz?.municipio?.nombreMunicipio !== data?.municipio?.nombreMunicipio ? data?.municipio : aprendiz?.municipio ,
    tipoSex: aprendiz?.tipoSex !== data?.tipoSex ? data.tipoSex : aprendiz?.tipoSex,
    date: aprendiz?.fechaNacimiento,
    tipoLicencia: aprendiz?.tipoLicencia !== data?.tipoLicencia ? data.tipoLicencia : aprendiz?.tipoLicencia,
    tipoEps: aprendiz?.eps !== data?.tipoEps ? data.eps : aprendiz?.eps,
    cajaCompensacion: aprendiz?.cajaCompensacion !== data?.cajaCompensacion ? data.cajaCompensacion : aprendiz.cajaCompensacion,
    tipoArl: aprendiz?.arl !== data?.tipoArl ? data.arl : aprendiz?.arl ,
    enabled: aprendiz?.enabled !== data?.enabled ? data.enabled : aprendiz.enabled,
    epss:aprendiz.eps,
    documento:aprendiz.tipoDocumento,
    sexs: aprendiz.tipoSex,
    arls: aprendiz.tipoArl,
    cajas: aprendiz.cajaCompensacion,
    //licencias: null,
    accept: true,
  };
  const [estdata, setEstdata] = useState();

  const valueObj= Object.assign(dataValues)
  console.log('valueObj :',valueObj.municipio);
  const {
    id_aprendiz,
    nombres,
    apellidos,
    numeroDocumento,
    tipoDocumento,
    tipoSex,
    correo,
    celular,
    telefono,
    direccion,
    tipoLicencia,
    fechaNacimiento,
    departamento,
    municipio,
    tipoEps,
    tipoArl,
    enabled,
    cajaCompensacion,
    documento,
    epss,
    arls,
    sexs,
    //licencias,
    cajas,
    ...datasub
  } = dataValues;
    const [tipodoc, setTipodoc] = useState(tipoDocumento);
    const [activo, setActivo] = useState();
    const [tiposex, setTiposex] = useState(tipoSex);
    const [tipoarl, setTipoarl] = useState(tipoArl);
    const [tipoeps, setTipoeps] = useState(tipoEps);
    const [tipolicencia,setTipolicencia] = useState(tipoLicencia)
    const [tipoccompensacion, setTipoccompensacion] = useState(cajaCompensacion);
   
    const enableAp = () => {
    {enabled ? setEnabledApren("success") : setEnabledApren("danger")};
    let chkd = enabled ? setChecked(true):setChecked(false);
    const sethooktpdoc = state.tipoDocumento.filter((tpdoc)=>tpdoc.nombre === tipoDocumento ?setTipodoc(tpdoc) : null)
    const sethooktpsex = state.tipoSexo.filter((tpsex)=>tpsex.nombre === tipoSex ?setTiposex(tpsex) : null)
    const sethooktpeps = state.eps.filter((tpeps)=>tpeps.nombre === tipoEps ?setTipoeps(tpeps) : null) 
    const sethooktparl = state.arls.filter((tparl)=>tparl.nombre === tipoArl ?setTipoarl(tparl) : null)
    const sethookccomp = state.cajaCompensacion.filter((tpccom)=>tpccom.nombre === cajaCompensacion ?setTipoccompensacion(tpccom) : null)
    return sethooktpsex,sethooktpdoc,sethooktparl,sethooktpeps
  };
  const [muni, setMuni] = useState();
  const [checked, setChecked] = useState();
  
  
   //const datau = structuredClone(dataValues)
  const dataUpd = {
    nombres:"" !== nombres ? nombres : "",
    apellidos:"" !==apellidos ?apellidos : "",
    direccion: "" !== direccion ? direccion : "",
    correo: "" !== correo ? correo : "",
    celular: "" !== celular ? celular : "",
    telefono: "" !== telefono ? telefono : "",
    numeroDocumento: "" !== numeroDocumento ? numeroDocumento : "",
    tipoDocumento: tipoDocumento !== tipodoc.nombre ? tipodoc.nombre : tipoDocumento,
    tipoEps:  tipoEps !== tipoeps.nombre ? tipoeps.nombre : tipoEps,
    tipoArl: tipoArl !== tipoarl.nombre ? tipoarl.nombre : tipoArl ,
    tipoSex: tipoSex !== tiposex.nombre  ? tiposex.nombre : tipoSex ,
    tipoLicencia: tipoLicencia, //!== tipolicencia.nombre ? tipolicencia.nombre : tipoLicencia,
    cajaCompensacion:  cajaCompensacion !== tipoccompensacion.nombre ?tipoccompensacion.nombre : cajaCompensacion ,
    enabledAprendiz: checked,
    municipio: data?.municipio  !== muni ? data?.municipio : muni,
    documento: tipodoc,
    epss: tipoeps,
    arls:tipoarl,
    sexs: tiposex ,
    //licencias: null !== data?.licencias ? data?.licencias : null,
    cajas: tipoccompensacion,
    
   }
   //const sethook = state.tipoDocumento.filter((tpdoc)=>tpdoc.nombre === tipoDocumento ?setTipodoc(tpdoc) : null) 
   //      const {municipio:{id,codMunicipio,nombreMunicipio}} = dataUpd
  //const estado = () => {enabled ? setActivo("desactivar") : setActivo("Activar");}   
   //const datau = {...dataUpd,nombres,apellidos,epss,arls,documento,sexs}
  //console.log("dataupdate", dataupdate);
  
  console.log("dataValues", dataValues);
  console.log("enabled", enabled);
  console.log("dataUpd nombreMunicipio", dataUpd);
  console.log("enabledApren", enabledApren);
  console.log("activo", activo);
  
  
  
  const onInputChangeInst = (e, name,dtdoc) => {
    const val = (e.target && e.target.value) || "";
    const vald =e.target.value.nombre ;
    const valdmun = name === "municipio" ? e.target.value : null;
    
    let _editest = { ...data };
    _editest[`${name}`] = val;
    _editest[`${dtdoc}`] = vald;
    
    setMuni(valdmun)
    setData(_editest);
    
  };

  useEffect(() => {
    enableAp();
    
    //setFormdata(dataupdate)
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAprendizs(dataUpd);
  };

  const handleInputChange = (e) => {
    setIdDpto(e.value);
    findMunicipio(e.value.id);
  };
  const header = (
    <>
      <div className="flex justify-content-space-around" >
        <div className="flex flex-start" >
          <Badge
            className="justify-content-start ml-2 mr-8 mt-2"
            size="large"
            severity={enabledApren}
            tooltip="activo"
          />
          <div
            className="justify-content-start ml-2 mr-8 mt-2"
            style={{ width: "50px" }}
          ></div>

          <div className="mr-8 ml-8" style={{ width: "100px" }}>
          {editest ?<InputSwitch className= "ml-8 mb-1 mt-3" tooltip={activo} checked={checked} onChange={(e) => setChecked(e.value)} />:null}
          </div>
         
        </div>
      </div>
    </>
  );
  console.log('checked',checked)
 
  const editDropdownDpto = () => (
    <>
      {editest ? (
        <Dropdown
          style={{ width: "250px" }}
          value={idDpto}
          onChange={handleInputChange}
          placeholder={departamento}
          //onChange={(e) => field.onChange(e.value)}
          //onChange={(e)=>onInputChangeInst(e,'municipio')}
          options={state?.departamentos}
          optionLabel={"nombreDepartamento"}
        />
      ) : null}
    </>
  );
  //<>{data?.[item]} (e)=>onInputChangeInst(e,`${[item]}`)</>
  const editar = (item) => (
    <>
      {editest ? (
        <InputText
          name={`${[item]}`}
          value={data?.[item]}
          onChange={(e) => onInputChangeInst(e, `${[item]}`)}
        />
      ) : null}
    </>
  );

  const subtitle = (
    <h4>
     
      {!editest && <>{aprendiz?.nombres}</>} {editar("nombres")}
      {!editest && <>{aprendiz?.apellidos}</>} {editar("apellidos")}
    </h4>
  );

  const onClickEdit = () => {
    //window.location.reload();
    //getIdInstructor('');
    setEditest(true);
    //navigate("editar")
    setIdest(aprendiz?.id);

    setCardwidth("40em");
  };
  const handleChangeValue = (e,nmdata) => {
    const { name, value } = e.target;
    setEstdata({ ...estdata, [name]: value });
    setEstdata({ ...estdata, [nmdata]: value.nombre });
    
  };

  console.log("state municipio", state.municipios);
  console.log("tipodoc", tipodoc);
  console.log("nombre hook tipo sexo", tiposex);
  console.log("nombre hook tipo eps", tipoeps);
  console.log("idDpto", idDpto);
  console.log("data", data);
  console.log("estdata", estdata);
  console.log("dates2", dates2);

  console.log("muni", muni);
  console.log("idest", idest);

  const onClickCancelar = () => {
    //window.location.reload();
    //getIdInstructor('');
    setEditest(false);
    setCardwidth("35em");
  };
  const onClickEnviar = () => {
    //window.location.reload();
    //getIdInstructor('');
    //setEditest(false);
    //setCardwidth("35em")
    updateAprendizs(data);
  };

  const footer = (
    <span>
      {!editest && (
        <Button
          type="button"
          label="Editar"
          icon="pi pi-check"
          className="p-button-danger"
          onClick={onClickEdit}
        />
      )}

      <>
        {editest && (
          <>
            {" "}
            <Button
              type="submit"
              label="Guardar"
              icon="pi pi-save"
              className="p-button-danger ml-2"
              //onClick={onClickEnviar}
            />
            <Button
              label="Cancelar"
              icon="pi pi-times"
              className="p-button-danger ml-2"
              onClick={onClickCancelar}
            />
          </>
        )}
      </>
    </span>
  );

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <Card
            //title={numeroDocumento}
            subTitle={subtitle}
            style={{ width: { cardwidth } }}
            footer={footer}
            header={header}
          >
            <Divider />
            <h6>
              Nro documento : {!editest && <>{aprendiz?.numeroDocumento}</>}
              {editar("numeroDocumento")}
            </h6>
            <br />
            <ul className="ulcard ">
              <li className="ml-2">
                Tipo documento :{"  "}
                {!editest ? (
                  <>{aprendiz?.tipoidentificacion}</>
                ) : (
                  <>
                    <Dropdown
                      
                      style={{ width: "250px" }}
                      value={tipodoc}
                      //onChange={handleInputChangetipoDoc}
                      placeholder={tipoDocumento}
                      onChange={(e) => setTipodoc(e.value)}
                      // onChange={(e) =>
                      //   onInputChangeInst(e, "documento", "tipoidentificacion","tipoDocumento")
                      // }
                      options={state?.tipoDocumento}
                      optionLabel={"nombre"}
                    />
                  </>
                )}
              </li>
              <br />
              <li className="ml-2">
                Tipo licencia :{'  '}  
                {!editest ? (
                  <>{aprendiz?.tipoLicencia}</>
                ) : (
                  <>
                    <Dropdown
                      style={{ width: "250px" }}
                      value={data?.tipoLicencia}
                      //onChange={handleInputChangetipoDoc}
                      placeholder={tipoLicencia}
                      //onChange={(e) => field.onChange(e.value)}
                      onChange={(e) => onInputChangeInst(e, "licencias", "tipoLicencia","tipoLicencia")}
                      options={state?.licencia}
                      optionLabel={"nombre"}
                    />
                  </>
                )}
              </li>
              <br />
              
              <li className="ml-2">
                Genero :{'   '}
                {!editest ? (
                  <>{aprendiz?.tipoSex}</>
                ) : (
                  <>
                    <Dropdown
                      style={{ width: "250px" }}
                      value={tiposex}
                      //onChange={handleInputChangetipoDoc}
                      placeholder={tipoSex}
                      onChange={(e) => setTiposex(e.value)}
                      //onChange={(e) => onInputChangeInst(e, "sexs","tipoSex")}
                      options={state?.tipoSexo}
                      optionLabel={"nombre"}
                    />
                  </>
                )}
              </li>
              <br />
              <Divider />
              <li className="ml-2">
                {" "}
                Correo : {!editest && <>{aprendiz?.correo}</>}{" "}
                {editar("correo")}{" "}
              </li>
              <br />
              <li className="ml-2">
                {" "}
                Celular : {!editest && <>{aprendiz?.celular}</>}{" "}
                {editar("celular")}{" "}
              </li>
              <br />
              <li className="ml-2">
                {" "}
                Telefono : {!editest && <>{aprendiz?.telefono}</>}{" "}
                {editar("telefono")}{" "}
              </li>
              <br />
              <li className="ml-2">
                {" "}
                Direccion : {!editest && <>{aprendiz?.direccion}</>}{" "}
                {editar("direccion")}{" "}
              </li>
              <br />
              <li className=" ml-2">
                Municipio :{" "}
                {!editest ? (
                  <>{aprendiz?.municipio?.nombreMunicipio}</>
                ) : (
                  <>
                    <Dropdown
                      style={{ width: "250px" }}
                      value={muni}
                      //onChange={handleInputChangetipoDoc}
                      placeholder={municipio.nombreMunicipio}
                      //onChange={(e) => field.onChange(e.value)}
                      onChange={(e) => onInputChangeInst(e,"municipio")}
                      options={state?.municipios}
                      optionLabel={"nombreMunicipio"}
                    />
                  </>
                )}
              </li>
              <br />
              <li className="ml-2">
                Departamento :{" "}
                {!editest && (
                  <>
                    {aprendiz?.municipio?.codDepartamento?.nombreDepartamento}
                  </>
                )}{" "}
                {editDropdownDpto()}
              </li>
              <br />
              <Divider />
              <li className="ml-2">
                {" "}
                E.P.S :{" "}
                {!editest ? (
                  <>{aprendiz?.eps}</>
                ) : (
                  <Dropdown
                    style={{ width: "250px" }}
                    value={tipoeps}
                    //onChange={handleInputChangetipoDoc}
                    placeholder={tipoEps}
                    onChange={(e) => setTipoeps(e.value)}
                    //onChange={(e) => onInputChangeInst(e, "epss", "eps","tipoEps")}
                    options={state?.eps}
                    optionLabel={"nombre"}
                  />
                )}{" "}
              </li>
              <br />
              <li className="ml-2">
                {" "}
                A.R.L :{" "}
                {!editest ? (
                  <>{aprendiz?.arl}</>
                ) : (
                  <Dropdown
                    style={{ width: "250px" }}
                    value={tipoarl}
                    //onChange={handleInputChangetipoDoc}
                    placeholder={tipoArl}
                    onChange={(e) => setTipoarl(e.value)}
                    //onChange={(e) => onInputChangeInst(e, "arls", "arl",'tipoArl')}
                    options={state?.arls}
                    optionLabel={"nombre"}
                  />
                )}
              </li>
              <br />
              <li className="ml-2">
                {" "}
                C Compensacion :{" "}
                {!editest ? (
                  <>{aprendiz?.cajaCompensacion}</>
                ) : (
                  <Dropdown
                    style={{ width: "250px" }}
                    value={tipoccompensacion}
                    //onChange={handleInputChangetipoDoc}
                    placeholder={cajaCompensacion}
                    onChange={(e) => setTipoccompensacion(e.value)}
                    //onChange={(e) =>
                   //   onInputChangeInst(e, "cajas", "cajaCompensacion","cajaCompensacion")
                    //}
                    options={state?.cajaCompensacion}
                    optionLabel={"nombre"}
                  />
                )}
              </li>
              <br />
            </ul>
            <Divider />
          </Card>
        </form>
      </div>
    </>
  );
};

export default Aprendizid;
