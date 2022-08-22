import React,{useContext,useState} from 'react'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
//import Login from './components/login/Login';
import Menu from './components/Menu'

import Aprendiz from './components/gestion_humana/aprendiz/Aprendiz';
import AprendizId from './components/gestion_humana/aprendiz/AprendizId'
import {FormAprendiz} from './components/gestion_humana/aprendiz/Form_aprendiz'
import {FormInstructor} from './components/gestion_humana/instructor/Form_instructor';
import FormRecibocaja from './components/cotizacion/recibocaja/Formrecibocaja'
import Instructor from './components/gestion_humana/instructor/Instructor';
import Cotizacion from './components/cotizacion/cotizacion_a/Cotizacion';
import Recibocaja from './components/cotizacion/recibocaja/Recibocaja';
import Listaraprendiz from './components/gestion_humana/aprendiz/Listaraprendiz';
//import ListarAprenId from './components/gestion_humana/aprendiz/Listar_aprenId';
import FormEditEst from './components/gestion_humana/aprendiz/FormEditEst'
import Instructorid from './components/gestion_humana/instructor/InstructorId';
import FormEditInstructor from './components/gestion_humana/instructor/FormEditar';
import Listarinstructor from './components/gestion_humana/instructor/Listarinstructor';
import Agendaclasepractica from './components/agenda/Agendaclasepractica';
import Clasepractica from './components/agenda/Clasepractica'
import Formuagenda from './components/agenda/Formuagenda'
import Pagos from './components/egresos/pagos/Pagos'
import CierreDiario from './components/egresos/cierrediario/Cierrediario'
import Formbalance from './components/egresos/cierrediario/Formcierrediario';
import Listpagos from './components/egresos/pagos/Listpagos'
import Liquidacion from './components/nomina/liquidacion/Liquidacion'
import ListNomina from './components/nomina/liquidacion/ListNomina'
import Saldos from './components/cartera/Saldos'
import Ctasxpagar from './components/cartera/Ctasxpagar'
import Ctasxcobrar from './components/cartera/Ctasxcobrar'
import FormUsuario from './components/gestion_humana/FormCambioClave'
import Formcuentas from './components/cartera/Tablacxc'
import Formcuentap from './components/cartera/Tablacxp'
//import url from './components/cotizacion/Crudcotizacion'
import Tablecotiz from './components/cotizacion/cotizacion_a/Tablecotiz'
import Ingresarcot from './components/cotizacion/cotizacion_a/Ingresarcot'
import Template from './components/Template'
import FormNomina from './components/nomina/liquidacion/Formnomina';
import { FormCotizacion } from './components/cotizacion/cotizacion_a/Formcotizacion';
import { AuthProvider } from "./core/authContext";
import CrudAbono from './components/cotizacion/cotizacion_a/Crudabono'
import ToolbarCotizacion  from './components/cotizacion/cotizacion_a/Toolbarcotizacion';
import ToolbarInstructor from './components/gestion_humana/instructor/ToolbarInstructor'
import ToolbarAprendiz from './components/gestion_humana/aprendiz/ToolbarAprendiz'
import ToolbarCrud from './components/cotizacion/cotizacion_a/Crudcotizacion';
import ToolbarPagos from './components/egresos/Toolbaregresos'
import ToolbarNomina from './components/nomina/Toolbarnomina';
import ToolbarReciboCaja from './components/cotizacion/recibocaja/ToolbarReciboCaja';
import ToolbarCrudRecibo from './components/cotizacion/recibocaja/CrudRecibocaja';
import CrudPagos from './components/egresos/pagos/CrudPagos'
import CardxIdingresar from './components/cotizacion/cotizacion_a/CardxIdingresar';
import CardxIdingresarR from './components/cotizacion/recibocaja/CardxIdingresraR'
import CardCotPdf from './components/cotizacion/recibocaja/CardCotPdf'
import CardxIdPagos from './components/egresos/pagos/CardxIdPagos';
import CardAbonoxNro from './components/cotizacion/cotizacion_a/CardAbonoxNro';
import CardAbonoxDoc from './components/cotizacion/cotizacion_a/CardAbonoxDoc';
import Proveedor from './components/egresos/proveedor/proveedor';
import ToolbarProveedor from './components/egresos/proveedor/toolbarproveedor';
import CrudProveedor from './components/egresos/proveedor/crudproveedor';
import CardProveedor from './components/egresos/proveedor/CardProveedor';




const Rutas = () => {
  

  return (
    //<AuthProvider>
    <Router>
        <Routes>
        <Route  path="/usuarios" element={<Template children={<FormUsuario/>}/>}/>
        <Route  path="/aprendiz" element={<Template children={<Aprendiz children={<ToolbarAprendiz/>}/>}/>}/>
        <Route  path="/aprendiz/registrar"  element={<Aprendiz children={<FormAprendiz/>}/>}/>
        {/* <Route  path="/aprendiz/buscar/editar"  element={<FormEditEst/>}/> */}
        <Route  path="/aprendiz/listar"  element={<Aprendiz children={<Listaraprendiz/>}/>}/>
        <Route  path="/aprendiz/buscar"  element={<Template children={<Aprendiz children={<AprendizId/>} />}/>}/>
        
        <Route  path="/instructor" element={<Template children={<Instructor children={<ToolbarInstructor/>} />}/>}/>
        <Route  path="/instructor/registrar"  element={<Instructor children={<FormInstructor/>}/>}/>
        <Route  path="/instructor/buscar/editar"  element={<FormEditInstructor/>}/>
        <Route  path="/instructor/listar"  element={<Instructor children={<Listarinstructor/>}/>}/>
        <Route  path="/instructor/buscar"  element={<Template children={<Instructor children={<Instructorid/>} />}/>}/>
        <Route  path="/instructor/buscar/id"  element={<Template children={ <Instructorid/>}/>}/>

        <Route  path="/recibocaja" element={<Template children={<Recibocaja children={<ToolbarReciboCaja/>}/>}/>}/>
        <Route  path="/recibocaja/ingresar" element={<Template children={<Recibocaja children={<ToolbarCrudRecibo/>}/>}/>}/>
        <Route  path="/recibocaja/ingresar/id" element={<Template children={<Recibocaja children={<CardxIdingresar/>}/>}/>}/>
        <Route  path="/recibocaja/imprimir" element={<Template children={<Recibocaja children={<ToolbarCrudRecibo/>}/>}/>}/>
        <Route  path="/recibocaja/imprimir/id" element={<Template children={<Recibocaja children={<CardxIdingresarR/>}/>}/>}/>  
        <Route  path="/recibocaja/imprimir/pdf" element={<CardCotPdf/>}/>

        <Route  path="/cotizacion" element={<Template children={<Cotizacion children={<ToolbarCotizacion/>}/>}/>}/>
        <Route  path="/cotizacion/ingresar" element={<Template children={<Cotizacion children={<ToolbarCrud/>}/>}/>}/>
        <Route  path="/cotizacion/ingresar/coti" element={<Template children={<Cotizacion children={<CardxIdingresar/>}/>}/>}/>
        <Route  path="/cotizacion/abono" element={<Template children={<Cotizacion children={<CrudAbono/>}/>}/>}/>
        <Route  path="/cotizacion/abono/nro" element={<Template children={<Cotizacion children={<CardAbonoxNro/>}/>}/>}/>
        <Route  path="/cotizacion/abono/doc" element={<Template children={<Cotizacion children={<CardAbonoxDoc/>}/>}/>}/>
        <Route  path="/cotizacion/listar" element={<Template children={<Cotizacion children={<Tablecotiz/>}/>}/>}/>
        <Route  path="/cotizacion/editar/abono" element={<Template children={<Cotizacion children={<FormCotizacion children={<Tablecotiz/>}/>}/>}/>}/>

        <Route  path="/aprendiz/listaraprendiz" element={<Template children={<Listaraprendiz />}/>}/>
        <Route  path="/aprendiz/listarinstructor" element={<Template children={<Listarinstructor/>}/>}/>

        <Route  path="/agenda" element={<Template children={<Agendaclasepractica/>}/>}/>
        <Route  path="/agenda/agendar" element={<Template children={<Agendaclasepractica children={<Formuagenda/> }/> }/>}/>

        <Route  path="/proveedor" element={<Template children={<Proveedor children={<ToolbarProveedor/>} />}/>}/>
        <Route  path="/proveedor/buscar" element={<Template children={<Proveedor children={<CrudProveedor/>} />}/>}/>
        <Route  path="/proveedor/ingresar" element={<Template children={<Proveedor children={<CardProveedor/>} />}/>}/>

        <Route  path="/pagos" element={<Template children={<Pagos children={<ToolbarPagos/>} />}/>}/>
        <Route  path="/pagos/ingresar" element={<Template children={<Pagos children={<CrudPagos/>} />}/>}/>
        <Route  path="/pagos/ingresar/pagoid" element={<Template children={<Pagos children={<CardxIdPagos/>} />}/>}/>
        <Route  path="/pagos/listar" element={<Pagos  children={<Listpagos/>}/>}/>
        {/* <Route  path="/cierrediario" element={<Template children={<Formcierrediario/>}/>}/> */}
        <Route  path="/cierrediario" element={<Template children={<CierreDiario children={<Formbalance/>}/>}/>}/>
        <Route  path="/liquidacion" element={<Template children={<Liquidacion children={<ToolbarNomina/>} />}/>}/>
        <Route  path="/liquidacion/listar" element={<Liquidacion children={<ListNomina/>}/>}/>
        <Route  path="/liquidacion/id" element={<Template children={<Liquidacion  />}/>}/>
        <Route  path="/liquidacion/buscar" element={<Liquidacion children={<FormNomina  />}/>}/>
        <Route  path="/nomina" element={<Template children={<Liquidacion/>}/>}/>
        <Route  path="/saldos" element={<Template children={<Saldos/>}/>}/>
        <Route  path="/ctasxpagar" element={<Template children={<Ctasxpagar children={<Formcuentap/>}/>}/>}/>
        <Route  path="/ctasxcobrar" element={<Template children={<Ctasxcobrar children={<Formcuentas/>}/>}/>}/>
        <Route  exact path="/menu" element={<Template /> }/>
        <Route exact path="/" element={<Menu /> }/>
        </Routes>
    </Router>
   // </AuthProvider>
  )
}

export default Rutas