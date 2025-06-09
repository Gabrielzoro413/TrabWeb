const { verificarSenha } = require( '../utils/bcrypt.js');
const { gerarToken } = require( '../utils/jwt.js');
const User = require('../models/users.js') ; 


const login = async (req, res) => {
  try {
    
    console.log("Recebido:", req.body);
    const { cpf, senha } = req.body;

    
      if (!cpf || !senha) {
        return res.status(400).json({ erro: "Cpf e senha são obrigatórias." });
      }

    const usuario = await User.findOne({ cpf });
    if (!usuario) return res.status(400).json({ erro: 'Usuário não encontrado com esse cpf.' });

    const senhaCorreta = await verificarSenha(senha, usuario.senha);
    if (!senhaCorreta) return res.status(400).json({ erro: 'Senha incorreta.' });  
    
    const token = gerarToken({id: usuario._id });

    console.log("Enviando:",{ token, user: { nome: usuario.nome } });
    res.status(200).json({ token, user: { nome: usuario.nome } }); 
  } catch (err) {
    res.status(500).json({ erro: 'Erro no login', err:JSON.stringify(err) });
  }};

module.exports = {login};
