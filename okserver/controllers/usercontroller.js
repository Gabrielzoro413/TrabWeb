const { hashSenha, verificarSenha } = require( '../utils/bcrypt.js');
const User = require('../models/users.js') ;

 const listarUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

 const criarUser = async (req, res) => {
  try {
    
    console.log("Recebido CriarUser:", req.body);

    const { nome, email, cpf, telefone, dataNascimento, senha } = req.body; 
    
    
      if (!nome || !email || !cpf || !telefone || !dataNascimento || !senha) {
        return res.status(400).json({ erro: "Os campos são obrigatórias." });
      }

    const usuarioCpfExistente = await User.findOne({cpf});
    if (usuarioCpfExistente) {
      return res.status(400).json({ erro: 'Usuário já registrado com este cpf.' });
    }
    const usuarioEmailExistente = await User.findOne({email});
    if (usuarioEmailExistente) {
      return res.status(400).json({ erro: 'Usuário já registrado com este e-mail.' });
    }
    const senhaHash = await hashSenha(senha);

  const novo = new User({ nome, email, cpf, telefone, dataNascimento, senha: senhaHash});
  await novo.save(); 
    console.log("Enviando:", req.body);
  res.status(201).json(novo);

  } catch (err)  {
    res.status(500).json({ erro: 'Erro ao criar usuário.', detalhe: err.message });
  }
}; 
   
 const obterUser = async (req, res) => {
  
  try {
    console.log("Recebido obterUser:",req.user.user.id);
    const userId = req.user.user.id; 

    const usuario = await User.findById(userId);

    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
console.log("Enviando:",{ usuario});
    res.json({ usuario});
  } catch (err) {
    res.status(500).json({ erro: 'Perfil não encontrado', detalhes: err.message });
  }
}; 

 const atualizarUser = async (req, res) => {
  try {
    const userId = req.user.user.id;
    const { nome, email, cpf, dataNascimento, telefone} = req.body;

    const novosDados = {};

    // ✅ Só adiciona o campo se foi enviado e não está vazio
    if (nome) novosDados.nome = nome;
    if (email) novosDados.email = email;
    if (cpf) novosDados.cpf = cpf;
    if (dataNascimento) novosDados.dataNascimento = dataNascimento;
    if (telefone) novosDados.telefone = telefone;


    if (Object.keys(novosDados).length === 0) {
      return res.status(400).json({ erro: 'Nenhum campo foi enviado para atualização.' });
    }

    const usuarioAtualizado = await User.findByIdAndUpdate(
      userId,
      novosDados,
      { new: true, runValidators: true }
    );

    if (!usuarioAtualizado) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    res.json({
      mensagem: 'Perfil atualizado com sucesso.',
      usuario: {
        id: usuarioAtualizado._id,
        nome: usuarioAtualizado.nome,
        email: usuarioAtualizado.email,
        cpf: usuarioAtualizado.cpf,
        dataNascimento: usuarioAtualizado.dataNascimento,
        telefone: usuarioAtualizado.telefone,
      }
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar perfil.', detalhes: err.message });
  }
};

 const deletarUser = async (req, res) => {
  
    console.log("Recebido:", req.user);

    console.log("Recebido:",req.user.user.id);

  const userId = req.user.user.id;
  try {
    await User.findByIdAndDelete(userId);
    return res.json({ mensagem: 'Usuário excluído com sucesso.' });
  } catch (err) {
    console.error("Erro ao excluir usuário:", err);
    return res.status(500).json({ erro: 'Erro ao excluir usuário.' });
  }
};
 
module.exports = { listarUsers,obterUser,criarUser,atualizarUser,deletarUser};