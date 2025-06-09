const bcrypt = require('bcrypt') ;

 const hashSenha = async (senha) => {
  
    if (!senha) {
        throw new Error("Precisa de uma senha ");
    }

  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(senha, salt);
};

 const verificarSenha = async (senhaDigitada, senhaHash) => {

  
    if (!senhaDigitada || !senhaHash) {
        throw new Error("Senha e hash são obrigatórios para verificação.");
    }
  return await bcrypt.compare(senhaDigitada, senhaHash);
};

module.exports = { hashSenha, verificarSenha };