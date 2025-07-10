# Aplicación de Apuestas Deportivas

## Descripción Técnica

Esta es una aplicación web completa de apuestas deportivas desarrollada con las siguientes tecnologías:

### Arquitectura
- **Frontend**: Next.js 15 con TypeScript
- **Backend**: NestJS con TypeScript
- **Base de Datos**: PostgreSQL con TypeORM
- **Contenerización**: Docker y Docker Compose
- **Autenticación**: JWT
- **Testing**: Jest y React Testing Library
- **Infraestructura**: Azure (ACR, Azure Pipeline, App Service, Cosmos DB con PostgreSQL)

### Estructura del Proyecto
```
apuestas-app/
├── frontend/          # Aplicación Next.js
├── backend/           # API NestJS
├── docker/           # Configuración Docker
├── scripts/          # Scripts de automatización
├── docs/             # Documentación adicional
│   ├── api-documentation.md      # Documentación completa de la API
│   ├── architecture_funcional.md # Diagrama de arquitectura funcional
│   └── ...                       # Otros documentos técnicos
└── README.md         # Este archivo
```

## 📚 Documentación

### Documentación Técnica
- **[API Documentation](./docs/api-documentation.md)** - Documentación completa de endpoints, ejemplos de uso, tipos de datos y solución de problemas
- **[Arquitectura Funcional](./docs/architecture_funcional.md)** - Diagrama de arquitectura, componentes principales, flujos de datos y características técnicas (se puede visualizar copiando el código del archivo en https://www.mermaidchart.com/)

### Documentación del Proyecto
- **README.md** (este archivo) - Guía principal de instalación y uso
- **Scripts de automatización** - `./scripts/start.sh` para despliegue plug-and-play

## Características Principales

### Funcionalidades Implementadas
1. **Autenticación de Usuarios**
   - Registro de usuarios con validación
   - Inicio de sesión con JWT
   - Protección de rutas

2. **Gestión de Eventos Deportivos**
   - Lista de eventos deportivos disponibles
   - Información detallada de cada evento
   - Estados de eventos (abierto, cerrado, finalizado)

3. **Sistema de Apuestas**
   - Creación de apuestas en eventos
   - Selección de equipos y montos
   - Validación de apuestas

4. **Historial de Apuestas**
   - Consulta de apuestas realizadas
   - Estados de apuestas (pendiente, ganada, perdida)
   - Filtros por fecha y estado

## Instalación y Configuración

### Prerrequisitos
- Docker y Docker Compose
- Node.js 18+ (para desarrollo local)
- Git

### 🚀 Levantar el Proyecto (Plug-and-Play)

**¡El proyecto es 100% plug-and-play!** Solo necesitas ejecutar un comando:

```bash
# Clonar el repositorio
git clone <repository-url>
cd apuestas-app

# Levantar toda la aplicación con un solo comando
./scripts/start.sh
```

Este script automáticamente:
1. ✅ Construye las imágenes Docker
2. ✅ Levanta todos los servicios (frontend, backend, PostgreSQL)
3. ✅ Ejecuta las migraciones de base de datos
4. ✅ Pobla datos iniciales de ejemplo
5. ✅ Verifica que todo esté funcionando

### Acceso a la Aplicación
- **📱 Frontend**: http://localhost:3000
- **🔧 Backend API**: http://localhost:3001
- **🗄️ Base de datos**: localhost:5433

### Usuario Demo
Para pruebas, se crea automáticamente un usuario demo:
- **Email**: demo@example.com
- **Password**: demo123

### Comandos Útiles
```bash
# Detener la aplicación
docker-compose down

# Ver logs en tiempo real
docker-compose logs -f

# Detener y limpiar volúmenes (reinicio completo)
docker-compose down -v
```

## API REST - Endpoints Disponibles

> 📖 **Documentación Completa**: Para información detallada, ejemplos de uso, tipos de datos y solución de problemas, consulta la **[Documentación Completa de la API](./docs/api-documentation.md)**

### Autenticación
- `POST /auth/register` - Registro de usuario
- `POST /auth/login` - Inicio de sesión
- `GET /auth/profile` - Perfil del usuario (protegido)

### Eventos Deportivos
- `GET /events` - Lista de eventos
- `GET /events/:id` - Detalle de evento
- `GET /events/:id/odds` - Cuotas del evento

### Apuestas
- `POST /bets` - Crear apuesta (protegido)
- `GET /bets` - Historial de apuestas (protegido)
- `GET /bets/:id` - Detalle de apuesta (protegido)

### Usuarios
- `GET /users/profile` - Perfil del usuario (protegido)
- `PUT /users/profile` - Actualizar perfil (protegido)

## Testing

### Tests Unitarios del Frontend

El frontend cuenta con una suite completa de tests unitarios implementada con **Jest** y **React Testing Library**.

#### Configuración de Testing
- **Jest**: Framework de testing principal
- **React Testing Library**: Para testing de componentes React
- **@testing-library/jest-dom**: Matchers adicionales para DOM
- **@testing-library/user-event**: Para simular interacciones de usuario
- **ts-jest**: Soporte para TypeScript

#### Estructura de Tests
```
frontend/
├── src/
│   ├── app/
│   │   ├── page.test.tsx              # Tests de HomePage
│   │   ├── auth/
│   │   │   ├── login/page.test.tsx    # Tests de LoginPage
│   │   │   └── register/page.test.tsx # Tests de RegisterPage
│   │   ├── events/page.test.tsx       # Tests de EventsPage
│   │   └── bets/page.test.tsx         # Tests de BetsPage
│   └── components/
│       └── layout/
│           └── navbar.test.tsx        # Tests de Navbar
├── jest.config.js                     # Configuración de Jest
└── jest.setup.js                      # Setup de Testing Library
```

#### Tests Implementados

1. **HomePage** (`src/app/page.test.tsx`)
   - Verifica que se muestre el título principal de la aplicación

2. **Navbar** (`src/components/layout/navbar.test.tsx`)
   - Verifica el logo de la aplicación
   - Verifica los enlaces de navegación principales
   - Verifica el balance del usuario
   - Verifica el botón de cerrar sesión

3. **LoginPage** (`src/app/auth/login/page.test.tsx`)
   - Verifica que se muestre el formulario de login
   - Verifica los campos de email y contraseña

4. **RegisterPage** (`src/app/auth/register/page.test.tsx`)
   - Verifica que se muestre el formulario de registro
   - Verifica los campos del formulario

5. **EventsPage** (`src/app/events/page.test.tsx`)
   - Verifica el título correcto de la página
   - Verifica el estado de carga inicial

6. **BetsPage** (`src/app/bets/page.test.tsx`)
   - Verifica el título correcto de la página
   - Verifica el estado de carga inicial

#### Ejecutar Tests

```bash
# Ejecutar todos los tests
cd frontend
npm run test

# Ejecutar tests en modo watch (desarrollo)
npm run test -- --watch

# Ejecutar tests con coverage
npm run test -- --coverage

# Ejecutar tests específicos
npm run test -- --testNamePattern="Navbar"
```

#### Características de los Tests
- **Mocks configurados** para Next.js router y contexto de autenticación
- **QueryClient** configurado para React Query
- **Tests asíncronos** para componentes que cargan datos
- **Verificaciones de UI** usando Testing Library
- **Cobertura básica** de funcionalidades principales

#### Resultados Actuales
- **6 test suites** ejecutándose
- **11 tests** pasando exitosamente
- **0 tests fallando**
- **Tiempo de ejecución**: ~2.4 segundos

#### Próximos Pasos para Testing
- Agregar tests de integración
- Implementar tests de interacciones de usuario
- Agregar tests de formularios con validaciones
- Implementar tests de navegación
- Agregar tests de estados de error
- Configurar CI/CD con tests automáticos

## Desarrollo Local

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

### Backend (NestJS)
```bash
cd backend
npm install
npm run start:dev
```

### Base de Datos
```bash
# Usando Docker
docker run --name postgres-betting -e POSTGRES_PASSWORD=password -e POSTGRES_DB=betting_db -p 5432:5432 -d postgres:15
```

## Despliegue en Azure

### Configuración de Azure DevOps Pipeline

1. **Azure Container Registry (ACR)**
   - Crear ACR en Azure
   - Configurar autenticación

2. **Azure App Service**
   - Configurar App Service para contenedores
   - Configurar variables de entorno

3. **Cosmos DB con PostgreSQL**
   - Configurar base de datos
   - Obtener cadena de conexión

4. **Azure Pipeline**
   - Configurar pipeline de CI/CD
   - Automatizar build y deploy

### Variables de Entorno para Producción
```env
# Base de Datos
DATABASE_URL=postgresql://username:password@host:port/database

# JWT
JWT_SECRET=your-super-secret-jwt-key

# Azure
AZURE_ACR_NAME=your-acr-name
AZURE_APP_SERVICE_NAME=your-app-service-name
```

## Decisiones Técnicas

> 🏗️ **Arquitectura Detallada**: Para un análisis completo de la arquitectura, componentes principales, flujos de datos y características técnicas, consulta la **[Documentación de Arquitectura Funcional](./docs/architecture_funcional.md)**

### Frontend
- **Next.js 15**: Para SSR, optimización y mejor SEO
- **TypeScript**: Para type safety y mejor desarrollo
- **Tailwind CSS**: Para estilos rápidos y responsivos
- **React Query**: Para manejo de estado del servidor
- **SWC**: Compilador rápido por defecto (sin Babel)

### Backend
- **NestJS**: Framework robusto con decoradores y DI
- **TypeORM**: ORM con soporte para migraciones
- **JWT**: Para autenticación stateless
- **Class-validator**: Para validación de DTOs

### Base de Datos
- **PostgreSQL**: Base de datos relacional robusta
- **Migraciones**: Para versionado del esquema
- **Seeds**: Para datos iniciales de prueba

### Seguridad
- **JWT con refresh tokens**: Autenticación segura
- **Validación de entrada**: Prevención de ataques
- **CORS configurado**: Seguridad en frontend
- **Variables de entorno**: Configuración segura

## Solución de Problemas

### Problemas Comunes

1. **Error de migración**: Si ves `relation "users" already exists`
   - Esto es normal si ya has ejecutado el proyecto antes
   - Las migraciones se ejecutan automáticamente
   - Puedes ignorar este error si la aplicación funciona

2. **Puerto de base de datos**: 
   - El puerto en el host es **5433** (mapeado desde 5432 del contenedor)
   - Si usas un cliente externo, conecta a `localhost:5433`

3. **Variables de entorno**:
   - El proyecto incluye configuraciones por defecto
   - No necesitas crear archivos `.env` manualmente para desarrollo

## Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
