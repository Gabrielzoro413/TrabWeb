import { useEffect, useState } from "react";
import AppointmentCard from "../componentes/AgendamentosCard";
import axios from "axios";




function AgendamentosVer () {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {axios.get('/data/appointments.json').then(res => {
  setAppointments(res.data);
});
  }, []);

  const filtered = appointments.filter((item) =>
    item.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 p-4 bg-white rounded-xl">
        {/* Lista */}
        <div className="w-1/2 pr-4 border-r">
          <h2 className="text-2xl font-bold mb-4">Bem-vindo, ********</h2>

          <div className="flex items-center mb-4">
            <input
              className="border rounded-full px-4 py-1 flex-1"
              placeholder="Pesquisar status..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="ml-2 bg-blue-600 text-white rounded-full px-3 py-1">
              🔍
            </button>
          </div>

          <div className="overflow-y-auto h-[70vh] pr-2">
            {filtered.map((item) => (
              <AppointmentCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Informações */}
        <div className="w-1/2 pl-4 flex flex-col justify-center items-center">
          <h2 className="text-xl font-semibold mb-2">
            Informações do Agendamento
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Selecione um agendamento para exibir as informações ou agende uma
            nova consulta
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full">
            Agendar nova consulta
          </button>
        </div>
      </div>
    </div>
  );
}
export default AgendamentosVer ;