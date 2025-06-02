import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RecuperarSenha() {
  const navigate = useNavigate();

  const [etapa, setEtapa] = useState("email");

  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const textos = {
    email: {
      titulo: "Recuperar Senha",
      descricao: "Enviaremos um e-mail com instruções para redefinir sua senha.",
    },
    codigo: {
      titulo: "Verificar Código",
      descricao: "Digite o código que enviamos para seu e-mail.",
    },
    senha: {
      titulo: "Nova Senha",
      descricao: "Crie uma nova senha para acessar sua conta.",
    },
  };

  const { titulo, descricao } = textos[etapa];

  const handleVoltar = () => {
    if (etapa === "codigo") {
      setEtapa("email");
    } else if (etapa === "senha") {
      setEtapa("codigo");
    } else {
    if (window.history.length > 2) {
      navigate(-1); // Volta uma página se tiver histórico suficiente
    } else {
      navigate("/"); // Se não tiver, vai para o login
    }
    }
  };

  const handleEnviarCodigo = () => {
    if (!email) {
      alert("Por favor, preencha o e-mail.");
      return;
    }

    // Aqui você poderia enviar o código pro e-mail via API
    setEtapa("codigo");
  };

  const handleVerificarCodigo = () => {
    if (!codigo) {
      alert("Por favor, digite o código recebido.");
      return;
    }

    // Aqui você poderia validar o código via API
    setEtapa("senha");
  };

  const handleRedefinirSenha = () => {
    if (!novaSenha || !confirmarSenha) {
      alert("Preencha todos os campos.");
      return;
    }
    if (novaSenha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    // Aqui poderia chamar a API para redefinir a senha
    alert("Senha redefinida com sucesso!");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex bg-white w-[900px] h-[450px] rounded-2xl shadow-lg max-w-4xl">
        {/* Esquerda */}
        <div className="flex flex-col justify-center p-8 w-1/2 bg-blue-600 text-white rounded-l-2xl">
          <h1 className="text-3xl font-bold mb-4">{titulo}</h1>
          <p className="text-sm">{descricao}</p>
        </div>

        {/* Direita */}
        <div className="flex flex-col justify-center p-5 w-1/2">
          <button
            onClick={handleVoltar}
            className="self-start mb-4 text-blue-700 hover:underline flex items-center ml-2 transition duration-300 transform hover:text-blue-700 hover:scale-105 cursor-pointer">
            ← Voltar
          </button>

          {/* Etapa Email */}
          {etapa === "email" && (
            <div className="space-y-4 mt-5">
              <label className="block text-sm">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                className="w-full border rounded-xl px-4 py-2"
              />
              <button
                onClick={handleEnviarCodigo}
                className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
              >
                Enviar código
              </button>
            </div>
          )}

          {/* Etapa Código */}
          {etapa === "codigo" && (
            <div className="space-y-4 mt-5">
              <label className="block text-sm">Código</label>
              <input
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="Digite o código que recebeu"
                className="w-full border rounded-xl px-4 py-2"
              />
              <button
                onClick={handleVerificarCodigo}
                className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
              >
                Verificar código
              </button>
            </div>
          )}

          {/* Etapa Nova Senha */}
          {etapa === "senha" && (
            <div className="space-y-4 mt-5">
              <label className="block text-sm">Nova Senha</label>
              <input
                type="password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                placeholder="Digite sua nova senha"
                className="w-full border rounded-xl px-4 py-2"
              />
              <label className="block text-sm">Confirmar Nova Senha</label>
              <input
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder="Confirme sua nova senha"
                className="w-full border rounded-xl px-4 py-2"
              />
              <button
                onClick={handleRedefinirSenha}
                className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
              >
                Redefinir Senha
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecuperarSenha;
