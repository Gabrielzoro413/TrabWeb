import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function PerfilEditar() {
    const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    nome: "João da Silva",
    cpf: "123.456.789-00",
    email: "joao.silva@email.com",
    nascimento: "1990-01-01",
    telefone: "(11) 91234-5678",
    senha: "********",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMudanca = () => {
  // Aqui você pode colocar lógica de autenticação depois, se quiser
  navigate("/layout/perfil");
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <main className="max-w-3xl mx-auto p-5">
        <div className="flex items-center mb-5">
          <img
            src="https://i.pravatar.cc/100"
            alt="Foto de perfil"
            className="w-24 h-24 rounded-full border-2 border-gray-300 mr-6 object-cover"
          />
          <div>
            <h1 className="text-2xl font-semibold mb-1">{formData.nome}</h1>
            <h3 className="text-gray-600 text-lg">Dados pessoais</h3>
          </div>
        </div>





        <div className="w-full bg-white border border-gray-300 rounded-lg p-5 shadow-sm">
          <div className="space-y-5">
            {/* Campos de edição */}
            {[
              { label: "Nome completo", name: "nome", type: "text" },
              { label: "CPF", name: "cpf", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Data de nascimento", name: "nascimento", type: "date" },
              { label: "Telefone", name: "telefone", type: "text" },
              { label: "Senha", name: "senha", type: "password" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block font-semibold mb-1">
                  {field.label}
                </label>
                <div className="flex items-center gap-4">
                  <span className="text-gray-500 w-1/2 truncate">
                    {field.type === "password" ? "********" : formData[field.name]}
                  </span>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>





          {/* Botões */}
          <div className="flex gap-4 mt-6">
            <button onClick={handleMudanca}  className="flex-1 bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-500 transform  hover:scale-105 cursor-pointer">
              Salvar Mudanças
            </button>
            <button onClick={() => { navigate(-1)}} className="flex-1 bg-red-700 text-white py-2 rounded-lg hover:bg-red-700 transition duration-500 transform hover:scale-105 cursor-pointer">
              Cancelar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PerfilEditar;
