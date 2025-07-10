import { betsAPI } from '@/lib/api';
import { notFound } from 'next/navigation';

export default async function BetDetailPage({ params }: { params: { id: string } }) {
  let bet;
  try {
    const res = await betsAPI.getById(params.id);
    bet = res.data;
  } catch (e) {
    return notFound();
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-2">Detalle de Apuesta</h1>
      <div className="mb-2 text-gray-800"><b>Evento:</b> {bet.event.title}</div>
      <div className="mb-2 text-gray-800"><b>Equipo:</b> {bet.selectedTeam} ({bet.betType})</div>
      <div className="mb-2 text-gray-800"><b>Monto:</b> ${Number(bet.amount).toFixed(2)}</div>
      <div className="mb-2 text-gray-800"><b>Cuota:</b> {Number(bet.odds).toFixed(2)}</div>
      <div className="mb-2 text-gray-800"><b>Ganancia potencial:</b> ${Number(bet.potentialGain).toFixed(2)}</div>
      <div className="mb-2 text-gray-800"><b>Estado:</b> <span className={bet.status === 'pending' ? 'text-green-600 font-bold' : 'font-bold'}>{bet.status}</span></div>
      <div className="mt-4">
        <a href="/bets" className="text-green-600 hover:underline">Volver al historial</a>
      </div>
    </div>
  );
} 