import axios from "axios";
/* desde aca se implementa el cliente a la api con la url raiz */
const clientAxios = axios.create({
  baseURL: 'http://localhost:8082/cea_oriente/',
});
export default clientAxios;