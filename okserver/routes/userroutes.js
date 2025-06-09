const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const {
  listarUsers,
  obterUser,
  criarUser,
  atualizarUser,
  deletarUser
} = require('../controllers/usercontroller.js');
const { autenticarToken } = require( '../middlewares/authMiddleware.js');


// localhost:3000/users/criarUser

router.get('/listarUser', autenticarToken,  listarUsers);
router.get('/perfil',autenticarToken, obterUser);
router.post('/criarUser',  criarUser);
router.put('/atualizar',autenticarToken, atualizarUser);
router.delete('/remover',autenticarToken, deletarUser);

// Rota inválida dentro de /user/*
router.use((req, res) => {
  res.status(404).json({
    erro: 'Subrota de /user não encontrada',
    caminho: req.originalUrl
  });
});


module.exports = router;
