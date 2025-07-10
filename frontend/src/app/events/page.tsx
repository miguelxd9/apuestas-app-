'use client';

import { useQuery } from '@tanstack/react-query';
import { eventsAPI } from '@/lib/api';
import Link from 'next/link';
import { Event } from '@/types';
import { Loader2, Calendar, Users, ArrowRight } from 'lucide-react';

export default function EventsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const res = await eventsAPI.getOpen();
      return res.data as Event[];
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-black">Eventos Deportivos Disponibles</h1>
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          Error al cargar los eventos
        </div>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((event) => (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
          >
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-500">
                {new Date(event.startTime).toLocaleString('es-ES', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              {event.title}
            </h2>
            <p className="text-gray-600 mb-2 line-clamp-2">{event.description}</p>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
              <Users className="h-4 w-4" />
              <span>{event.sportType}</span>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-green-700 font-bold">
                {event.team1} vs {event.team2}
              </span>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
          </Link>
        ))}
      </div>
      {data?.length === 0 && !isLoading && (
        <div className="text-center text-gray-500 py-12">
          No hay eventos disponibles en este momento.
        </div>
      )}
    </div>
  );
}
