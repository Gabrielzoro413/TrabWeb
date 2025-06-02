import { createBrowserRouter } from "react-router-dom";

import Login from "./telas/Login";
import Cadastro from "./telas/Cadastro";
import RecuperarSenha from "./telas/RecuperarSenha";
import Agendamentos from "./telas/Agendamentos";
import Perfil from "./telas/Perfil"; 
import PerfilEditar from "./telas/PerfilEditar"; 
import Layout from "./telas/Layout";
const router = createBrowserRouter([
  
  {
        path: "/", 
        element: <Login />,
      },
      {  
        path: "/cadastro", 
        element: <Cadastro />,
      },
      
      {
        path:     "/senha", 
        element: <RecuperarSenha />,
      },
  
  {
    path: "/layout",
    element: <Layout/>,
     children: [
      
      {
        path: "agendamentos", 
        element: <Agendamentos />,
      },
      {  
        path: "perfil", 
        element: <Perfil />,
      },
      
      {  
        path: "perfileditar", 
        element: <PerfilEditar />,
      },
    ],
  }, 
]);

export default router;