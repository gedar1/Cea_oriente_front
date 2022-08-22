import React from "react";
import Menulat from "./components/Menulateral";
import "./App.css";
//import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "./assets/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./assets/layout/layout.scss"; //icon
import { Nomina } from "./context/Contextnomina";

import { DataProvider } from './provider/DataProvider';
import { AuthProvider } from "./core/authContext";
import AprendizState from './context/aprendizContext/AprendizState'
import InstructorState from './context/instructorContext/InstructorState'
import PagosState from './context/pagosContext/PagosState'
import NominaState from "./context/nominaContext/NominaState";
import CotizacionState from "./context/cotizacionContext/CotizacionState"
import Rutas from "./Rutas";


function App() {
  return (
    <AuthProvider>
    <DataProvider>
  
      <AprendizState>
      <InstructorState>
      <PagosState>
      <NominaState>
      <CotizacionState>
        <Nomina>
         
          <div className="App">
            <div className="layout-main">
              <div className="layou-main-container">
                <Rutas />
              </div>
            </div>
          </div>
        
        </Nomina>
    </CotizacionState>
    </NominaState>
    </PagosState>
    </InstructorState>
    </AprendizState>
    
    </DataProvider>
    </AuthProvider>
  );
}

export default App;
