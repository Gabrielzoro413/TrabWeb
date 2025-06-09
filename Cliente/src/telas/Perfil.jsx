import { useNavigate, Link } from "react-router-dom";
import { useState , useEffect} from "react";
import authService from "../services/auth.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Perfil () {
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState(null);

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = localStorage.getItem("token");
        if (!user) return; 
        
        const response = await authService.buscarPorId(user);
        setUserData(response.data.usuario);

      } catch (err) {
        console.error("Erro ao buscar dados do usuário:", err);
        toast.error("Erro ao carregar dados do perfil.");
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
  const confirmar = window.confirm("Tem certeza que deseja sair?");
  if (confirmar) {
    localStorage.clear(); // ou removeItem individualmente
    navigate("/");
  }
};


const handleRemover = async () => {
  const confirmar = window.confirm("Tem certeza que deseja excluir a conta?");
  if (!confirmar)  return;

    try { 
      const user = localStorage.getItem("token");  
      await authService.removerUser(user)
      ; 
      localStorage.clear();
      toast.success("Conta excluída com sucesso.");
      navigate("/"); // redireciona para login
    } catch (error) {
      toast.error("Erro ao excluir conta.");
      console.error(error);
    }
  };
    return(


    <div className="min-h-screen bg-gray-100 font-sans">

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      
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
            <h1 className="text-2xl font-semibold mb-1">{userData?.nome || "Usuário"}</h1>
            <h3 className="text-gray-600 text-lg">Dados pessoais :</h3>
          </div>

        </div>

        {/* Caixa com dados */}
        <div className="relative w-[900px] bg-white border border-gray-300 rounded-lg p-5 shadow-sm">
          <Link to={"/layout/perfileditar"} className="absolute top-4 right-4 text-blue-700 hover:underline flex items-center ml-2 transition duration-500 transform hover:text-blue-700 hover:scale-105 cursor-pointer">
            Alterar dados
          </Link>

{userData ? (
  <div className="space-y-4 mb-5 text-gray-800 text-base">
    <div><span className="font-semibold">Nome completo:</span> {userData.nome}</div>
    <div><span className="font-semibold">CPF:</span> {userData.cpf}</div>
    <div><span className="font-semibold">Email:</span> {userData.email}</div>
    <div><span className="font-semibold">Data de nascimento:</span> {userData.dataNascimento}</div>
    <div><span className="font-semibold">Telefone:</span> {userData.telefone}</div>
    <div><span className="font-semibold">Senha:</span> {userData.senha}</div>
  </div>
) : (
  <p className="text-gray-600">Carregando dados...</p>
)}
          
           <div className="flex gap-4 mt-4">
  <button onClick={handleLogout} className="bg-red-700 w-1/2 text-white px-4 py-2 rounded-lg transition duration-500 hover:scale-105">
    Sair
  </button>
  <button onClick={handleRemover} className="bg-red-700 w-1/2 text-white px-4 py-2 rounded-lg transition duration-500 hover:scale-105">
    Remover Conta
  </button>
</div>


        </div>

      </main>
      
    </div>
    
    )
}


export default Perfil;