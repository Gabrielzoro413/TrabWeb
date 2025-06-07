 const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  nome: String,
  email: String,
  cpf: String,
  telefone: String,
  dataNascimento: Date,
  senha: String,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
