'use client';

import { useQuery } from '@tanstack/react-query';
import { betsAPI } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import { Loader2, ArrowRight, Trophy } from 'lucide-react';

export default function BetsPage() {
  const { user } = useAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ['bets'],
    queryFn: async () => {
      const res = await betsAPI.getUserBets();
      return res.data;
    },
    enabled: !!user,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-black">Historial de Apuestas</h1>
      {!user && (
        <div className="text-center text-gray-600 py-12">
          Debes iniciar sesión para ver tus apuestas.
        </div>
      )}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          Error al cargar el historial de apuestas
        </div>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((bet: any) => (
          <div
            key={bet.id}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
          >
            <div className="flex items-center space-x-2 mb-2">
              <Trophy className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-500">
                {new Date(bet.createdAt).toLocaleString('es-ES', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              {bet.event.title}
            </h2>
            <div className="text-gray-800 font-semibold">{bet.selectedTeam} ({bet.betType})</div>
            <div className="flex justify-between text-sm mb-2">
              <div className="text-gray-800">Monto: <span className="font-bold">${Number(bet.amount).toFixed(2)}</span></div>
              <div className="text-gray-800">Cuota: <span className="font-bold">{Number(bet.odds).toFixed(2)}</span></div>
            </div>
            <div className="text-gray-800">Ganancia potencial: <span className="font-bold">${
  !isNaN(Number(bet.potentialGain)) && Number(bet.potentialGain) > 0
    ? Number(bet.potentialGain).toFixed(2)
    : (!isNaN(Number(bet.amount)) && !isNaN(Number(bet.odds))
        ? (Number(bet.amount) * Number(bet.odds)).toFixed(2)
        : '0.00')
}</span></div>
            <div className="text-gray-800">Estado: <span className={bet.status === 'pending' ? 'text-green-600 font-bold' : 'font-bold'}>{bet.status}</span></div>
            {/* <Link
              href={`/bets/${bet.id}`}
              className="inline-flex items-center text-green-600 hover:underline mt-2"
            >
              Ver detalle <ArrowRight className="h-4 w-4 ml-1" />
            </Link> */}
          </div>
        ))}
      </div>
      {data?.length === 0 && !isLoading && (
        <div className="text-center text-gray-500 py-12">
          No has realizado apuestas aún.
        </div>
      )}
    </div>
  );
}
