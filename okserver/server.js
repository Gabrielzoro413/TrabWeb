const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv'); 

const {connectDB} = require('./config/database'); 
const agendamentoRoutes =require('./routes/agendamentoroutes.js'); 
const userRoutes = require('./routes/userroutes.js');  
const authRoutes = require('./routes/authroutes');   
const {autenticarToken} = require('./middlewares/authMiddleware');

// POST /auth/login

// POST /auth/recuperar (envia código)

// POST /auth/redefinir (troca senha)

// POST /usuarios (cadastro)

// GET /perfil (autenticado)

// PUT /perfil (autenticado)

// GET /agendamentos (autenticado)

// POST /agendamentos (autenticado)

// PUT /agendamentos/:id (autenticado)

// DELETE /agendamentos/:id (autenticado)

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

 app.use('/agendamentos', agendamentoRoutes); 
 app.use('/users', userRoutes);
 app.use('/auth', authRoutes); 

 app.get('/verificar-token', autenticarToken, (req, res) => {
     res.json({
         usuario: req.user,
         mensagem: 'Token válido'
     });
});

// Rota raiz
app.get('/', (req, res) => {
    res.send('API do Sistema de Agendamentos Online');
  });

// Rota coringa: deve ser a **última**
app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada',
    caminho: req.originalUrl
  });
}); 

// Conecta no MongoDB e só depois inicia o servidor
connectDB().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
  }).catch(err => {
    console.error('Erro ao conectar ao banco:', err);
  });

