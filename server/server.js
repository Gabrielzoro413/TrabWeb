// Importações (com require)  "type": "commonjs",
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv'); 
const {connectDB} = require('./config/database'); 
// const usuarioRoutes = require('./routes/usuarioRoutes');
// const grupoRoutes = require('./routes/grupoRoutes');
// const imovelRoutes = require('./routes/imovelRoutes');
// const contratoRoutes = require('./routes/contratoRoutes');
// const pagamentoRoutes = require('./routes/pagamentoRoutes');
// const autenticacaoRoutes = require('./routes/autenticacaoRoutes');
// const autenticarToken = require('./middlewares/autenticarToken');




dotenv.config();

const app = express();




// Middlewares
app.use(cors());
app.use(express.json());


// // // // Rotas
 const userRoutes = require('./routes/userroutes');
 app.use('/users', userRoutes);
// app.use('/usuarios', usuarioRoutes);
// app.use('/grupos', grupoRoutes);
// app.use('/imoveis', imovelRoutes);
// app.use('/contratos', contratoRoutes);
// app.use('/pagamentos', pagamentoRoutes);
// app.use('/login', autenticacaoRoutes);

// Rota protegida — requer autenticação por token
// app.get('/verificar-token', autenticarToken, (req, res) => {
//     res.json({
//         usuario: req.user,
//         mensagem: 'Token válido'
//     });
// });
// app.use('/api/users', require('./routes/userRoutes'));

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

