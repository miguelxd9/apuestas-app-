'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventsAPI, betsAPI } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, ArrowLeft, Trophy } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

const betSchema = z.object({
  betType: z.enum(['TEAM1', 'TEAM2', 'DRAW']),
  amount: z.coerce.number().min(1, 'El monto debe ser mayor a 0'),
});

type BetForm = z.infer<typeof betSchema>;

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const eventId = params?.id as string;

  const { data: event, isLoading, error } = useQuery({
    queryKey: ['event', eventId],
    queryFn: async () => {
      const res = await eventsAPI.getById(eventId);
      return res.data;
    },
    enabled: !!eventId,
  });

  const { data: odds } = useQuery({
    queryKey: ['event-odds', eventId],
    queryFn: async () => {
      const res = await eventsAPI.getOdds(eventId);
      return res.data;
    },
    enabled: !!eventId,
  });

  const mutation = useMutation({
    mutationFn: (data: any) => betsAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bets'] });
      router.push('/bets');
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BetForm>({
    resolver: zodResolver(betSchema),
    defaultValues: { betType: 'TEAM1', amount: 10 },
  });

  const betType = watch('betType');
  const amount = watch('amount');
  let selectedOdds = 1;
  if (betType === 'TEAM1') selectedOdds = event?.odds1;
  else if (betType === 'TEAM2') selectedOdds = event?.odds2;
  else if (betType === 'DRAW') selectedOdds = event?.oddsDraw;

  // Calcular ganancia potencial de forma reactiva
  const potentialGain = useMemo(() => {
    const amt = Number(amount);
    const odds = Number(selectedOdds);
    if (!isNaN(amt) && !isNaN(odds)) {
      return (amt * odds).toFixed(2);
    }
    return '0.00';
  }, [amount, selectedOdds]);

  const onSubmit = (data: BetForm) => {
    if (!user) return router.push('/auth/login');
    mutation.mutate({
      eventId,
      betType: data.betType.toLowerCase(), // Mapeo a minúsculas
      amount: data.amount,
    });
  };

  return (
    <div>
      <Link href="/events" className="inline-flex items-center text-green-600 hover:underline mb-4">
        <ArrowLeft className="h-4 w-4 mr-1" /> Volver a eventos
      </Link>
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          Error al cargar el evento
        </div>
      )}
      {event && (
        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
          <div className="flex items-center space-x-2 mb-2">
            <Trophy className="h-6 w-6 text-green-600" />
            <span className="text-lg font-bold text-gray-900">{event.title}</span>
          </div>
          <div className="text-gray-600 mb-2">{event.description}</div>
          <div className="mb-4 text-sm text-gray-500">
            {new Date(event.startTime).toLocaleString('es-ES', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </div>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-gray-800">{event.team1}</span>
              <span className="font-semibold text-gray-800">{event.team2}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700 font-bold">Cuota: <span className="text-gray-900">{event.odds1}</span></span>
              <span className="text-green-700 font-bold">Cuota: <span className="text-gray-900">{event.odds2}</span></span>
            </div>
            {event.oddsDraw && (
              <div className="text-center mt-2 text-green-700 font-bold">Empate: <span className="text-gray-900">{event.oddsDraw}</span></div>
            )}
          </div>

          {user ? (
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Selecciona tu apuesta</label>
                <select
                  {...register('betType')}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-black" // Color de texto negro
                >
                  <option value="TEAM1">{event.team1}</option>
                  <option value="TEAM2">{event.team2}</option>
                  {event.oddsDraw && <option value="DRAW">Empate</option>}
                </select>
                {errors.betType && (
                  <p className="mt-1 text-sm text-red-600">{errors.betType.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monto a apostar</label>
                <input
                  {...register('amount', { valueAsNumber: true })}
                  type="number"
                  min={1}
                  step={1}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-black" // Color de texto negro
                  placeholder="Monto"
                />
                {errors.amount && (
                  <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
                )}
              </div>
              <div className="text-sm text-gray-600">
                Cuota seleccionada: <span className="font-bold text-green-700">{selectedOdds}</span>
              </div>
              <div className="text-sm text-gray-600">
                Ganancia potencial: <span className="font-bold text-green-700">{potentialGain}</span>
              </div>
              <button
                type="submit"
                disabled={mutation.isLoading}
                className="w-full py-2 px-4 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 disabled:opacity-50"
              >
                {mutation.isLoading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : 'Apostar'}
              </button>
              {mutation.error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mt-2">
                  {(mutation.error as any)?.response?.data?.message || 'Error al apostar'}
                </div>
              )}
            </form>
          ) : (
            <div className="text-center mt-6">
              <Link href="/auth/login" className="text-green-600 hover:underline">
                Inicia sesión para apostar
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
