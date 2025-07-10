'use client';

import { useAuth } from '@/lib/auth-context';
import { useQuery } from '@tanstack/react-query';
import { usersAPI } from '@/lib/api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, User, DollarSign, Calendar } from 'lucide-react';

const profileSchema = z.object({
  firstName: z.string().min(2, 'El nombre es requerido'),
  lastName: z.string().min(2, 'El apellido es requerido'),
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { user } = useAuth();
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await usersAPI.getProfile();
      return res.data;
    },
    enabled: !!user,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
    },
  });

  const onSubmit = (data: ProfileForm) => {
    // Implementar actualización de perfil
    console.log('Actualizar perfil:', data);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Mi Perfil</h1>
      {!user && (
        <div className="text-center text-gray-600 py-12">
          Debes iniciar sesión para ver tu perfil.
        </div>
      )}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          Error al cargar el perfil
        </div>
      )}
      {profile && (
        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
          <div className="flex items-center space-x-2 mb-6">
            <User className="h-6 w-6 text-green-600" />
            <span className="text-lg font-bold text-gray-900">Información Personal</span>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                {...register('firstName')}
                type="text"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-black"
                placeholder="Nombre"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
              <input
                {...register('lastName')}
                type="text"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-black"
                placeholder="Apellido"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 text-white rounded-md font-medium hover:bg-green-700"
            >
              Actualizar Perfil
            </button>
          </form>
          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="text-gray-700">Balance: <span className="font-bold">${profile.balance}</span></span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <span className="text-gray-700">Miembro desde: <span className="font-bold">{new Date(profile.createdAt).toLocaleDateString('es-ES')}</span></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
