import api from "../services/axios.js";

const login = async (credentials) => {
  return api.post("/auth/login", credentials);
};

const cadastro = async (credentials) => {
  return api.post("/users/criarUser", credentials);
};

const removerUser = async (credentials) => {
  return api.delete("/users/remover", {
  headers: {
    Authorization: `Bearer ${credentials}`,
  },
   }) } ;
   
const atualizarUser = async (credentials) => {
  return api.put("/users/atualizar",{
  headers: {
    Authorization: `Bearer ${credentials}`,
  },
   }) } ;
   
const buscarPorId =  async (credentials) => {
  return api.get("/users/perfil",{
  headers: {
    Authorization: `Bearer ${credentials}`,
  },
   }) } ;

   
export default { login , cadastro , removerUser, atualizarUser,buscarPorId};