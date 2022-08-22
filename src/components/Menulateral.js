
import React,{useEffect, useContext} from 'react';
import {useNavigate,useHistory} from 'react-router-dom';

import logo_cea from '../images/logo_cea.png';
import {TieredMenu} from 'primereact/tieredmenu';
import {Card} from 'primereact/card';
import {useData} from '../provider/DataProvider'
import { Button } from 'primereact/button';
import { useRef } from 'react';
import { Panel } from 'primereact/panel';
import Template from './Template'
import {Contexto} from '../context/Contexto'







const Menulat = () => {
    const {readData,setPreload,reloadPage} =useData();
    
    
   
 
  
  
   
    
    
    const header = (
        
        <img alt="logo"  src={logo_cea} style={{width:'130px',paddingTop:'30px'}}  />
       
       
    );
    
    const navigate = useNavigate();
   
    const items = [
        {   
            label:'Gestion Humana',
            icon:'pi pi-fw pi-user',
            items:[
                {
                    label:'Aprendiz',
                    icon:'pi pi-fw ',
                    role:'menuitem',
                    command: () => navigate('/aprendiz')    
                },
                {
                    label:'Instructor',
                    icon:'pi pi-fw ',
                    command: () => navigate('/instructor')
                },
                {
                    label:'Usuarios',
                    icon:'pi pi-fw ',
                    command: () => navigate('/usuarios'),
                }
                
                 
            ]
        },
        {
            label:'Cotizacion',
            icon:'pi pi-fw pi-file',
            items:[
                {
                    label:'Recibo de caja',
                    icon:'pi pi-fw ',
                    command: () => navigate('/recibocaja')
                },
                {
                    label:'Cotizacion',
                    icon:'pi pi-fw ',
                    command: () => navigate('/cotizacion')
                },
                

            ]
        },
        {
            label:'Egresos',
            icon:'pi pi-fw pi-sort-amount-up',
            items:[
                {
                    label:'Proveedor',
                    icon:'pi pi-fw ',
                    command: () => navigate('/proveedor')
                },
                {
                    label:'Pagos',
                    icon:'pi pi-fw ',
                    command: () => navigate('/pagos')
                },
                {
                    label:'Cierre Diario',
                    icon:'pi pi-fw ',
                    command: () => navigate('/cierrediario')
                },
                
            ]
        },
        {
            label:'Nomina',
            icon:'pi pi-fw pi-pencil',
            items:[
                {
                    label:'Liquidacion',
                    icon:'pi pi-fw ',
                    command: () => navigate('/liquidacion')
                },
                {
                    label:'Cotizacion Nomina',
                    icon:'pi pi-fw ',
                    command: () => navigate('/nomina')
                }
            ]
        },
        {
            label:'Cartera',
            icon:'pi pi-fw pi-dollar',
            items:[
                {
                    label:'Saldos',
                    icon:'pi pi-fw ',
                    command: () => navigate('/saldos')
                },
                {
                    label:'Cuentas x pagar',
                    icon:'pi pi-fw ',
                    command: () => navigate('/ctasxpagar')
                },
                {
                    label:'Cuentas x cobrar',
                    icon:'pi pi-fw ',
                    command: () => navigate('/ctasxcobrar')
                }
            ]
        },
        {
            label:'Agenda',
            icon:'pi pi-fw pi-calendar',
            items:[
                {
                    label:'Clase teorica',
                    icon:'pi pi-fw pi-calendar-plus', 
                    
                },
                {
                    label:'Clase Practica',
                    icon:'pi pi-fw pi-calendar-plus', 
                    command: () => navigate('/agenda')
                }
                    
                
            ]
        },
        {
            separator:true
        },
        {
            label:'Salir',
            icon:'pi pi-fw pi-power-off',
            command: () => navigate('/')
        }
    ];
    
    return (
        <>
                
            
                <Card className="p-card"  header={header}>
                
                    <TieredMenu  className="p-menu-list" model={items} />
                   
                </Card> 
                
               
               
                

                
            
        </>
    );
    }

    export default Menulat;