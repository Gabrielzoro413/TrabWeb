import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
function Perfil () {
  const navigate = useNavigate(); 
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };




    return(


    <div className="min-h-screen bg-gray-100 font-sans">

      {/* Conteúdo principal */}
      <main className="max-w-3xl mx-auto p-5 ">
        <div className="flex items-center mb-5">
          {/* Imagem de perfil */}
          <img
            src="https://i.pravatar.cc/100"
            alt="Foto de perfil"
            className="w-24 h-24 rounded-full border-2 border-gray-300 mr-6 object-cover"
          />
          {/* Nome e dados pessoais */}
          <div>
            <h1 className="text-2xl font-semibold mb-1">João da Silva</h1>
            <h3 className="text-gray-600 text-lg">Dados pessoais</h3>
          </div>
        </div>

        {/* Caixa com dados */}
        <div className="relative w-[900px] bg-white border border-gray-300 rounded-lg p-5 shadow-sm">
          <Link to={"/layout/perfileditar"} className="absolute top-4 right-4 text-blue-700 hover:underline flex items-center ml-2 transition duration-500 transform hover:text-blue-700 hover:scale-105 cursor-pointer">
            Alterar dados
          </Link>

          <div className="space-y-4 mb-5 text-gray-800 text-base">
            <div>
              <span className="font-semibold">Nome completo:</span> João da Silva
            </div>
            <div>
              <span className="font-semibold">CPF:</span> 123.456.789-00
            </div>
            <div>
              <span className="font-semibold">Email:</span> joao.silva@email.com
            </div>
            <div>
              <span className="font-semibold">Data de nascimento:</span> 01/01/1990
            </div>
            <div>
              <span className="font-semibold">Telefone:</span> (11) 91234-5678
            </div>
            <div>
              <span className="font-semibold">Senha:</span> ********
            </div> 

          </div>     
    <button  onClick={handleLogout} className="bg-red-700 text-white px-4 w-full py-2 rounded-lg transition duration-500 transform hover:bg-red-700 hover:scale-105 cursor-pointer"> 
        Sair    </button>
        </div>

      </main>
      
    </div>
    
    )
}


export default Perfil;