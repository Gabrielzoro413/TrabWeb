const Agendamento = require('../models/agendamentos.js');

 const listarAgendamentos = async (req, res) => {
  try {
    const userId = req.user.user.id; 

    const usuario = await User.findById(userId);

    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });

    const agendamentos = await Agendamento.find({ usuario: userId });

    res.json({ agendamentos });
  } catch (err) {
    res.status(500).json({ erro: 'Agendamentos não encontrados', detalhes: err.message });
  }
}; 


 const criarAgendamento = async (req, res) => {
  const { data, hora, status, usuarioId, name, time } = req.body;
  const novo = new Agendamento({ data, hora, status, usuarioId, name, time });
  await novo.save();
  res.status(201).json(novo);

};


 const obterAgendamento = async (req, res) => {
  // const ag = await Agendamento.findById(req.params.id);
  // if (!ag) return res.status(404).json({ erro: 'Agendamento não encontrado' });
  // res.json(ag);

  console.log(req.params.id);
  res.send(agendamentos);
};

 const atualizarAgendamento = async (req, res) => {
  const { nome, data, horario } = req.body;
  const ag = await Agendamento.findByIdAndUpdate(req.params.id, { nome, data, horario }, { new: true });
  res.json(ag);
};

 const listarQuery = async (req, res) => {
  
  console.log(req.query);
  res.send("carregando...");
};


 const deletarAgendamento = async (req, res) => {
  await Agendamento.findByIdAndDelete(req.params.id);
  res.status(204).end();
}; 


module.exports = {listarAgendamentos,obterAgendamento,criarAgendamento,atualizarAgendamento,deletarAgendamento,
listarQuery};