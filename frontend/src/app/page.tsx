import Link from 'next/link';
import { Trophy, Target, Clock, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-16">
        <Trophy className="h-16 w-16 text-green-600 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Apuestas Deportivas
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          La mejor plataforma para apostar en tus deportes favoritos. 
          Eventos en vivo, cuotas competitivas y una experiencia de usuario excepcional.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/events"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Ver Eventos
          </Link>
          <Link
            href="/auth/register"
            className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors"
          >
            Registrarse
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 py-16">
        <div className="text-center">
          <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Eventos Diversos</h3>
          <p className="text-gray-600">
            Fútbol, baloncesto, tenis y más. Siempre encontrarás eventos emocionantes.
          </p>
        </div>
        <div className="text-center">
          <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Apuestas en Tiempo Real</h3>
          <p className="text-gray-600">
            Cuotas actualizadas en tiempo real para maximizar tus ganancias.
          </p>
        </div>
        <div className="text-center">
          <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Comunidad Segura</h3>
          <p className="text-gray-600">
            Plataforma segura y confiable para todos los apostadores.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-100 rounded-lg p-8 mb-16">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-green-600">1000+</div>
            <div className="text-gray-600">Eventos Mensuales</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">50K+</div>
            <div className="text-gray-600">Usuarios Activos</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">$2M+</div>
            <div className="text-gray-600">Apuestas Procesadas</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">99.9%</div>
            <div className="text-gray-600">Tiempo de Actividad</div>
          </div>
        </div>
      </div>
    </div>
  );
}
