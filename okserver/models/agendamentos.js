const mongoose = require('mongoose');

const agendamentoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  especialidade: {
    type: String,
    required: true
  },
  data: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['solicitado', 'confirmado', 'concluido', 'cancelado'],
    default: 'solicitado'
  },
  anexo: {
    type: String, // Caminho/URL do arquivo
    required: false
  },
  comentario: {
    type: String,
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Agendamento', agendamentoSchema);

/**
 
const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  idade: {
    type: Number,
    min: 0,
    max: 120
  },
  criadoEm: {
    type: Date,
    default: Date.now
  },
  ativo: {
    type: Boolean,
    default: true
  }
});

Subdocumentos (aninhados)
endereco: {
  rua: String,
  cidade: String,
  estado: String
}

Array de valores
hobbies: [String]

Enum
genero: {
  type: String,
  enum: ['masculino', 'feminino', 'outro']
} 
  
Validações personalizadas

idade: {
  type: Number,
  validate: {
    validator: function(v) {
      return v % 2 === 0; // Exemplo: idade deve ser par
    },
    message: props => `${props.value} não é um número par!`
  }
} 
  
Métodos e Statics

Método de instância

usuarioSchema.methods.saudar = function() {
  console.log(`Olá, meu nome é ${this.nome}`);
};

Static (no modelo, não na instância)

usuarioSchema.statics.encontrarPorNome = function(nome) {
  return this.find({ nome: new RegExp(nome, 'i') });
};         */   
