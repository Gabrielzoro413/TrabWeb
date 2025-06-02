function AgendamentosCard({ item }) {
  const borderColors = {
    Solicitado: "border-yellow-500",
    Confirmado: "border-green-500",
    Concluido: "border-cyan-500",
    Cancelado: "border-red-500"
  };

  return (
    <div
      className={`border-2 rounded-xl p-4 mb-4 ${
        borderColors[item.status] || "border-gray-300"
      }`}
    >
      <p><strong>Especialidade:</strong> {item.especialidade}</p>
      <p><strong>Data:</strong> {item.data}</p>
      <p><strong>Status:</strong> {item.status}</p>
    </div>
  );
}

export default AgendamentosCard;