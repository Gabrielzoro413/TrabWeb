import Butao from "../componentes/Botao";
import InputBox from "../componentes/InputBox";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authService from "../services/auth.js";

function Cadastro() { 
  const [loading, setLoading] = useState(false);

  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [credentials, setCredentials] = useState({
    nome: "",
    email: "",
    cpf: "",
    dataNascimento: "",
    telefone: "",
    senha: "", 
  });
  
  const navigate = useNavigate();

function formatarCPF(valor) {
  return valor
    .replace(/\D/g, '') // Remove tudo que não é dígito
    .replace(/(\d{3})(\d)/, '$1.$2') 
    .replace(/(\d{3})(\d)/, '$1.$2') 
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    .slice(0, 14); // Limita para 14 caracteres (com máscara)
}

function formatarTelefone(valor) {
  return valor
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{1,4})$/, '$1-$2')
    .slice(0, 15);
}

const changeInfo = (key) => (e) => {
  let valor = e.target.value;

  if (key === "cpf") {
    valor = formatarCPF(valor);
  } else if (key === "telefone") {
    valor = formatarTelefone(valor);
  }

  setCredentials((prev) => ({
    ...prev,
    [key]: valor,
  }));
};

function validarCampos() {

  
  if (!credentials.nome || !credentials.email || !credentials.cpf || !credentials.dataNascimento || !credentials.telefone || !credentials.senha) {
    return "Preencha todos os campos obrigatórios.";
  }
  if (credentials.senha !== confirmarSenha) return "As senhas não coincidem.";

  if (!credentials.nome.includes(" ")) return "Digite seu nome completo (nome e sobrenome).";

  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(credentials.email)) return "E-mail inválido.";

  if (credentials.cpf.replace(/\D/g, '').length !== 11) return "CPF inválido.";

  const data = new Date(credentials.dataNascimento);
  if (isNaN(data.getTime()) || data > new Date()) return "Data de nascimento inválida.";

  if (credentials.telefone.replace(/\D/g, '').length < 10) return "Telefone inválido.";

  return null;
}

      const handleCadastro =  async () => {
        
        
          if (loading) return;
          setLoading(true);
          
          const erro = validarCampos();
          if (erro) {
            toast.error(erro);
            setLoading(false);
            return;
          }


        try { 
           const payload = {
            ...credentials,
             cpf: credentials.cpf.replace(/\D/g, ''),
              telefone: credentials.telefone.replace(/\D/g, ''),
            };
          const response = await authService.cadastro(payload); 
          toast.success(`Cadastro de ${credentials.nome} realizado com sucesso!`);

          
          // Espera 2 segundos antes de navegar (tempo do toast)
          setTimeout(() => { 
            setLoading(false);
            navigate("/");
          }, 2000);

        } catch (error) {
          if (error.response?.data?.erro) {
          toast.error(error.response.data.erro);
          } else {
          toast.error("Erro ao tentar fazer Cadastro.");
    }
        }
    };
return (
  
<div className="flex  w-full  items-center justify-center">
      <div className="flex w-[770px]  border border-gray-300 bg-white p-10 flex flex-col items-center justify-center rounded-lg  " style={{ boxShadow: "15px 40px rgba(141, 130, 130, 0.45)" }} >

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
             <button onClick={() => {if (window.history.length > 2) { navigate(-1);} else {navigate("/");}}} className="self-start mb-4 text-blue-700 hover:underline flex items-center ml-2 transition duration-300 transform hover:text-blue-700 hover:scale-105 cursor-pointer">
            ← Voltar </button>

           {/* Logo + Texto (com margin-top) */}
           <div className="   text-center flex flex-col items-center">
            <img
              src="https://uol.unifor.br/acesso/app/autenticacao/assets/img/logos/icon-unifor.svg"
              className="w-13 mb-5"  
              alt="Logo Unifor"
            />
            
            <h2 className="text-xl font-bold text-[#212529]">Cadastro do Adendimento Nami</h2>
            <p className="text-sm text-[#212529] mt-2 text-center">Informe seus dados para utilizar dos serviços 
            <br /> de agendamento do NAMI</p>
          </div>
          
        {/*  Formulário */}
        <div className="w-full  bg-white p-5 flex flex-col justify-start">
          
          <InputBox label={"Nome Completo"} value={credentials.nome} onChange={changeInfo("nome")} />
          <InputBox label={"Email"} type="email" value={credentials.email} onChange={changeInfo("email")} />

            <InputBox label={"CPF"} value={credentials.cpf} onChange={changeInfo("cpf")} />

           <InputBox label={"Data de Nascimento"} type="date" value={credentials.dataNascimento} onChange={changeInfo("dataNascimento")} />

            <InputBox label={"Telefone"} value={credentials.telefone} onChange={changeInfo("telefone")} /> 
            
            <InputBox label={"Senha"} type="password" value={credentials.senha} onChange={changeInfo("senha")} />

            <InputBox 
            label={"Confirmar a Senha"} 
            type="password" 
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            />

            
          <div onClick={handleCadastro} className="mt-10" >
            <Butao text={loading ? "Cadastrando..." : "Confirmar"} />
          </div>

          
          </div>

      </div>
    </div>

         

)}


export default Cadastro;
