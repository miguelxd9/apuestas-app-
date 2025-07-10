'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Trophy, User, LogOut, Home } from 'lucide-react';

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Trophy className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-800">Apuestas Deportivas</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              <Home className="h-5 w-5" />
            </Link>

            {user ? (
              <>
                <Link
                  href="/events"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Eventos
                </Link>
                <Link
                  href="/bets"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Mis Apuestas
                </Link>
                <Link
                  href="/profile"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <User className="h-5 w-5" />
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <LogOut className="h-5 w-5" />
                </button>
                <div className="text-sm text-gray-600">
                  Balance: ${user && typeof user.balance === 'number' ? user.balance.toFixed(2) : '0.00'}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
