import axios from 'axios'

const baseUrl = 'http://localhost:8082/cea_oriente/store/';


export const getTipoDocumento = () => axios
            .get(baseUrl+'identificacion');

export const getTipoSexo = () => axios
            .get(baseUrl+'sexo');

export const getCajaCompensacion = () => axios
            .get(baseUrl+'cajacompensacion');

export const getLicencia = () => axios
            .get(baseUrl+'licencia');

export const getFormaPago = () => axios
            .get(baseUrl+'formapago');

export const getTipoEps = () => axios
            .get(baseUrl+'eps');

export const getTipoArl = () => axios
            .get(baseUrl+'arl');

export const getInstructor = () => axios
            .get(baseUrl+'instructor');

export const getDepartamento = () => axios
            .get(baseUrl+'departamentos');

