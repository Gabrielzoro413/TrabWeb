import { useNavigate, Link } from "react-router-dom";
import { useState , useEffect} from "react";
import authService from "../services/auth.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
function PerfilEditar() {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    dataNascimento: "",
    telefone: "",
    senha: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = localStorage.getItem("token");
        if (!user) return; 
        
        const response = await authService.buscarPorId(user);
        setUserData(response.data.usuario);
        setFormData({
          nome: response.data.usuario.nome || "",
          cpf: response.data.usuario.cpf || "",
          email: response.data.usuario.email || "",
          dataNascimento: response.data.usuario.dataNascimento?.substring(0, 10) || "",
          telefone: response.data.usuario.telefone || "",
          senha: response.data.usuario.senha || "",
        });
      } catch (err) {
        console.error("Erro ao buscar dados do usuário:", err);
        toast.error("Erro ao carregar dados do perfil.");
      }
    };

    fetchUserData();
  }, []);


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

  setFormData((prev) => ({
    ...prev,
    [key]: valor,
  }));
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

function validarCampos(dados) {
  if (!dados.nome || !dados.email || !dados.cpf || !dados.dataNascimento || !dados.telefone) {
  return "Preencha todos os campos obrigatórios.";
}
  if (!dados.nome.includes(" ")) return "Digite seu nome completo (nome e sobrenome).";

  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(dados.email)) return "E-mail inválido.";

  if (dados.cpf.replace(/\D/g, '').length !== 11) return "CPF inválido.";

  const data = new Date(dados.dataNascimento);
  if (isNaN(data.getTime()) || data > new Date()) return "Data de nascimento inválida.";

  if (dados.telefone.replace(/\D/g, '').length < 10) return "Telefone inválido.";

  return null;
};




  const handleSalvar = async () => {
    
          if (loading) return;
          setLoading(true);
          
          const erro = validarCampos(formData);
          if (erro) {
             toast.error(erro);
              setLoading(false);
               return;
              }

    try {
      
      const payload = {
  ...formData,
  cpf: formData.cpf.replace(/\D/g, ''),
  telefone: formData.telefone.replace(/\D/g, ''),
};

      await authService.atualizarUser(payload);
      toast.success("Perfil atualizado com sucesso.");
      
          // Espera 2 segundos antes de navegar (tempo do toast)
          setTimeout(() => { 
            setLoading(false); 
            navigate("/layout/perfil");
          }, 2000);
      
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
      toast.error("Erro ao salvar mudanças.");
    }
  };

  return (
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

      <main className="max-w-3xl mx-auto p-5">
        <div className="flex items-center mb-5">
          <img
            src="https://i.pravatar.cc/100"
            alt="Foto de perfil"
            className="w-24 h-24 rounded-full border-2 border-gray-300 mr-6 object-cover"
          />
          <div>
            <h1 className="text-2xl font-semibold mb-1">{formData.nome}</h1>
            <h3 className="text-gray-600 text-lg">Dados pessoais :</h3>
          </div>
        </div>

        <div className="w-full bg-white border border-gray-300 rounded-lg p-5 shadow-sm">
          <div className="space-y-5">
            <div className="space-y-5">
  <div>
    <label className="block font-semibold mb-1">Nome completo</label>
    <input
      type="text"
      name="nome"
      value={formData.nome}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label className="block font-semibold mb-1">CPF</label>
    <input
      type="text"
      name="cpf"
      value={formData.cpf}
      onChange={changeInfo("cpf")}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label className="block font-semibold mb-1">Email</label>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label className="block font-semibold mb-1">Data de nascimento</label>
    <input
      type="date"
      name="dataNascimento"
      value={formData.dataNascimento}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label className="block font-semibold mb-1">Telefone</label>
    <input
      type="text"
      name="telefone"
      value={formData.telefone}
      onChange={changeInfo("telefone")}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label className="block font-semibold mb-1">Senha</label>
    <input
      type="password"
      name="senha"
      value={formData.senha}
      disabled // senha somente para visualização
      className="w-full bg-gray-100 text-gray-500 border border-gray-300 rounded-lg px-3 py-2"
    />
  </div>
</div>

            <div>
</div>

          </div>

          <div className="flex gap-4 mt-6"><button
  onClick={handleSalvar}
  className="flex-1 bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition duration-300 disabled:opacity-50"
  disabled={loading}
>
  {loading ? "Salvando..." : "Salvar Mudanças"}
</button>

            <button onClick={() => navigate(-1)} className="flex-1 bg-red-700 text-white py-2 rounded-lg hover:bg-red-800 transition duration-300">
              Cancelar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PerfilEditar;