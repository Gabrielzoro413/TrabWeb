 const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  cpf: {
    type: String,
    required: true,
    unique: true
  },
  dataNascimento: {
    type: Date,
    required: true
  },
  telefone: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  }
}, { timestamps: true }); 


module.exports = mongoose.model('User', userSchema);
