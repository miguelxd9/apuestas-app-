#!/bin/bash

echo "🚀 Iniciando aplicación de apuestas deportivas..."

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado. Por favor instala Docker primero."
    exit 1
fi

# Verificar si Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose no está instalado. Por favor instala Docker Compose primero."
    exit 1
fi

# Crear archivo .env si no existe
if [ ! -f .env ]; then
    echo "📝 Creando archivo .env desde .env.example..."
    cp .env.example .env
fi

# Construir y levantar los servicios
echo "🔨 Construyendo y levantando servicios..."
docker-compose up -d --build

# Esperar a que PostgreSQL esté listo
echo "⏳ Esperando a que PostgreSQL esté listo..."
sleep 10

# Ejecutar migraciones (si existen)
echo "🗄️ Ejecutando migraciones..."
docker-compose exec backend npm run migration:run

# Poblar datos iniciales
echo "🌱 Poblando datos iniciales..."
docker-compose exec backend npm run seed

echo "✅ ¡Aplicación iniciada exitosamente!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:3001"
echo "🗄️ Base de datos: localhost:5432"
echo ""
echo "👤 Usuario demo: demo@example.com / demo123"
echo ""
echo "Para detener la aplicación: docker-compose down"
echo "Para ver logs: docker-compose logs -f"
