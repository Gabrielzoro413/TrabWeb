const express = require('express');
const {
  listarAgendamentos,
  obterAgendamento,
  criarAgendamento,
  atualizarAgendamento,
  deletarAgendamento,
  listarQuery
} = require( '../controllers/agendamentocontroller.js');
const { autenticarToken } = require( '../middlewares/authMiddleware.js');
const router = express.Router();

// localhost:3000/agendamentos/criarAg

router.get('/listarAg',autenticarToken, listarAgendamentos);
router.get('/listaId/:id',autenticarToken, obterAgendamento);
router.post('/criarAg',autenticarToken, criarAgendamento);
router.put('/:id',autenticarToken, atualizarAgendamento);
router.delete('/:id',autenticarToken, deletarAgendamento);
router.get('/listaquery',autenticarToken, listarQuery);

// Rota inválida dentro de /agendamento/*
router.use((req, res) => {
  res.status(404).json({
    erro: 'Subrota de /agendamentos não encontrada',
    caminho: req.originalUrl
  });
}); 

module.exports = router; 
