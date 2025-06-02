import Butao from "../componentes/Botao";
import InputBox from "../componentes/InputBox";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
function Login() {
  const [credentials, setCredentials] = useState({
    cpf: "",
    senha: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // estado para mensagem de erro
  const navigate = useNavigate();

  const changeInfo = (key) => (e) => {
    setCredentials((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleLogin = () => {
  // Aqui você pode colocar lógica de autenticação depois, se quiser
  navigate("/layout/agendamentos");
};

return (
  
  <div className="flex h-screen w-full  items-center justify-center">
        <div className="flex w-[900px] h-[470px]  rounded-lg overflow-hidden shadow-lg-[0 8px 30px rgba(141, 130, 130, 0.7)]" >
  
          {/* Esquerda - Formulário */}
          <div className="w-1/2 bg-white p-10 flex flex-col justify-center">
  
             {/* Logo + Texto (com margin-top) */}
             <div className=" mb-5 text-center flex flex-col items-center">
              <img
                src="https://uol.unifor.br/acesso/app/autenticacao/assets/img/logos/icon-unifor.svg"
                className="w-13 mb-5"
                alt="Logo Unifor"
              />
              <h2 className="text-xl font-bold text-[#212529]">Acesso ao Adendimento Nami</h2>
              <p className="text-sm text-[#212529] mt-2 text-center">Aqui você encontra os serviços 
              <br />de agendamento do NAMI</p>
            </div>
  
            {/* Formulario */}
            
            <InputBox label={"CPF"} onChange={changeInfo("cpf")} />
            <InputBox label={"Senha"} type="password" onChange={changeInfo("senha")} />
            
            < Link className="text-sm text-blue-600 hover:underline mb-2 self-end" 
             to={"/senha"}>
              Esqueceu sua senha?
            </Link>
             <div onClick={handleLogin} >
              <Butao  text="Acessar" />
            </div>

  <p className="text-sm text-[#212529] mt-2 text-center"> 
    Não tem uma conta?  
    <Link className="text-sm text-blue-600 hover:underline mb-4 ml-1"
    to={"/cadastro"}>
      Faça aqui!
    </Link>
  </p>
  
  </div>

  
          {/* painel da direita */}
          <div className="w-1/2 bg-blue-600  flex items-center justify-center">
           
            <img
              src="https://unifor.br/documents/20143/0/Nami400.jpg/5aa24b8d-b9a7-1dae-c186-eda1613bcebc?t%3D1614972278449"
              alt="Painel direito"
              className="inset-0 w-[430px] h-[450px] object-cover"
            />
          </div>

        </div>

      </div>

 
             

)}


export default Login