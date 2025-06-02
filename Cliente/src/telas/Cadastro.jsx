import Butao from "../componentes/Botao";
import InputBox from "../componentes/InputBox";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";


function Cadastro() { 
    const navigate = useNavigate();
return (
  
<div className="flex  w-full  items-center justify-center">
      <div className="flex w-[770px]  border border-gray-300 bg-white p-10 flex flex-col items-center justify-center rounded-lg  shadow-lg-[ 8px 30px  rgba(141, 130, 130, 55.7)]" >

             <Link onClick={() => {if (window.history.length > 2) { navigate(-1);} else {navigate("/");}}} className="self-start mb-4 text-blue-700 hover:underline flex items-center ml-2 transition duration-300 transform hover:text-blue-700 hover:scale-105 cursor-pointer">
            ← Voltar </Link>

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


          <input
            type="text"
            placeholder="Nome Completo"
            className="mb-7 px-4 py-2 border border-gray-300  rounded-full focus:outline-none"
          />
          <input
            type="text"
            placeholder="CPF"
            className="mb-7 px-4 py-2 border border-gray-300  rounded-full focus:outline-none"
          />
          
          <input
            type="text"
            placeholder="Email"
            className="mb-7 px-4 py-2 border border-gray-300  rounded-full focus:outline-none"
          /> 
          <input
            type="text"
            placeholder="Data de Nascimento"
            className="mb-7 px-4 py-2 border border-gray-300  rounded-full focus:outline-none"
          /> 
        
          <input
            type="text"
            placeholder="Email"
            className="mb-7 px-4 py-2 border border-gray-300  rounded-full focus:outline-none"
          /> 
          <input
            type="password"
            placeholder="Senha"
            className="mb-7 px-4 py-2 border border-gray-300  rounded-full focus:outline-none"
          /> 
          <input
            type="password"
            placeholder="Confirme de novo sua senha"
            className="mb-7 px-4 py-2 border border-gray-300  rounded-full focus:outline-none"
          />
          <div>
          <Butao text="Confirmar" />
          </div>

          
          </div>

      </div>
    </div>

         

)}


export default Cadastro;
