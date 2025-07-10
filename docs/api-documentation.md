# Documentación de la API REST

## Base URL
```
http://localhost:3001
```

## 🚀 Inicio Rápido

Para probar la API, primero levanta el proyecto usando el script de automatización:

```bash
./scripts/start.sh
```

Esto levantará automáticamente:
- ✅ Backend API en http://localhost:3001
- ✅ Base de datos PostgreSQL en localhost:5433
- ✅ Datos de ejemplo incluyendo usuario demo

### Usuario Demo
Para pruebas rápidas, usa el usuario demo que se crea automáticamente:
- **Email**: demo@example.com
- **Password**: demo123

## Autenticación
La API utiliza JWT (JSON Web Tokens) para la autenticación. Incluye el token en el header de las peticiones:

```
Authorization: Bearer <token>
```

## Endpoints

### 🔐 Autenticación

#### POST /auth/register
Registra un nuevo usuario.

**Request Body:**
```json
{
  "email": "usuario@example.com",
  "password": "password123",
  "firstName": "Juan",
  "lastName": "Pérez"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "usuario@example.com",
    "firstName": "Juan",
    "lastName": "Pérez",
    "role": "user"
  }
}
```

#### POST /auth/login
Inicia sesión de un usuario.

**Request Body:**
```json
{
  "email": "usuario@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "usuario@example.com",
    "firstName": "Juan",
    "lastName": "Pérez",
    "role": "user"
  }
}
```

#### GET /auth/profile
Obtiene el perfil del usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "uuid",
  "email": "usuario@example.com",
  "firstName": "Juan",
  "lastName": "Pérez",
  "role": "user",
  "balance": 1000.00
}
```

### ⚽ Eventos

#### GET /events
Obtiene todos los eventos disponibles.

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Real Madrid vs Barcelona",
    "description": "Clásico español en el Santiago Bernabéu",
    "sportType": "football",
    "team1": "Real Madrid",
    "team2": "Barcelona",
    "odds1": "2.10",
    "odds2": "3.20",
    "oddsDraw": "3.50",
    "status": "open",
    "startTime": "2025-07-11T21:56:06.873Z",
    "endTime": null,
    "winner": null,
    "totalBets": "0.00",
    "createdAt": "2025-07-10T21:56:06.873Z",
    "updatedAt": "2025-07-10T21:56:06.873Z"
  }
]
```

#### GET /events/open
Obtiene solo los eventos abiertos para apuestas.

#### GET /events/:id
Obtiene el detalle de un evento específico.

**Response:**
```json
{
  "id": "uuid",
  "title": "Real Madrid vs Barcelona",
  "description": "Clásico español en el Santiago Bernabéu",
  "sportType": "football",
  "team1": "Real Madrid",
  "team2": "Barcelona",
  "odds1": "2.10",
  "odds2": "3.20",
  "oddsDraw": "3.50",
  "status": "open",
  "startTime": "2025-07-11T21:56:06.873Z",
  "endTime": null,
  "winner": null,
  "totalBets": "0.00",
  "createdAt": "2025-07-10T21:56:06.873Z",
  "updatedAt": "2025-07-10T21:56:06.873Z"
}
```

#### GET /events/:id/odds
Obtiene las cuotas de un evento específico.

**Response:**
```json
{
  "team1": {
    "name": "Real Madrid",
    "odds": "2.10"
  },
  "team2": {
    "name": "Barcelona",
    "odds": "3.20"
  },
  "draw": {
    "odds": "3.50"
  }
}
```

### 💰 Apuestas

#### POST /bets
Crea una nueva apuesta.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "eventId": "uuid",
  "betType": "team1",
  "amount": 100
}
```

**Response:**
```json
{
  "id": "uuid",
  "amount": 100,
  "odds": "2.10",
  "potentialWinnings": 210,
  "betType": "team1",
  "status": "pending",
  "selectedTeam": "Real Madrid",
  "createdAt": "2025-07-10T15:30:00Z",
  "event": {
    "id": "uuid",
    "title": "Real Madrid vs Barcelona",
    "team1": "Real Madrid",
    "team2": "Barcelona"
  }
}
```

#### GET /bets
Obtiene el historial de apuestas del usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": "uuid",
    "amount": 100,
    "odds": "2.10",
    "potentialWinnings": 210,
    "betType": "team1",
    "status": "pending",
    "selectedTeam": "Real Madrid",
    "createdAt": "2025-07-10T15:30:00Z",
    "event": {
      "id": "uuid",
      "title": "Real Madrid vs Barcelona",
      "team1": "Real Madrid",
      "team2": "Barcelona"
    }
  }
]
```

#### GET /bets/:id
Obtiene el detalle de una apuesta específica.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "uuid",
  "amount": 100,
  "odds": "2.10",
  "potentialWinnings": 210,
  "betType": "team1",
  "status": "pending",
  "selectedTeam": "Real Madrid",
  "createdAt": "2025-07-10T15:30:00Z",
  "event": {
    "id": "uuid",
    "title": "Real Madrid vs Barcelona",
    "team1": "Real Madrid",
    "team2": "Barcelona"
  }
}
```

### 👤 Usuarios

#### GET /users/profile
Obtiene el perfil del usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "uuid",
  "email": "usuario@example.com",
  "firstName": "Juan",
  "lastName": "Pérez",
  "role": "user",
  "balance": 900.00,
  "createdAt": "2025-07-10T21:56:06.873Z"
}
```

#### PUT /users/profile
Actualiza el perfil del usuario.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "firstName": "Juan Carlos",
  "lastName": "Pérez García"
}
```

**Response:**
```json
{
  "message": "Profile updated successfully"
}
```

## Códigos de Estado HTTP

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

## Ejemplos de Uso

### Ejemplo: Login con usuario demo
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "password": "demo123"
  }'
```

### Ejemplo: Obtener eventos
```bash
curl -X GET http://localhost:3001/events \
  -H "Content-Type: application/json"
```

### Ejemplo: Crear una apuesta (requiere autenticación)
```bash
# Primero obtén el token con login
TOKEN=$(curl -s -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "demo@example.com", "password": "demo123"}' | \
  jq -r '.accessToken')

# Luego crea la apuesta
curl -X POST http://localhost:3001/bets \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "uuid-del-evento",
    "betType": "team1",
    "amount": 50
  }'
```

### Ejemplo: Obtener perfil del usuario
```bash
curl -X GET http://localhost:3001/users/profile \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

## Tipos de Datos

### Tipos de Deporte (sportType)
- `football` - Fútbol
- `basketball` - Baloncesto
- `tennis` - Tenis
- `baseball` - Béisbol

### Estados de Evento (status)
- `open` - Abierto para apuestas
- `closed` - Cerrado para apuestas
- `finished` - Finalizado

### Tipos de Apuesta (betType)
- `team1` - Equipo 1
- `team2` - Equipo 2
- `draw` - Empate (solo disponible en algunos deportes)

### Estados de Apuesta (status)
- `pending` - Pendiente
- `won` - Ganada
- `lost` - Perdida
- `cancelled` - Cancelada

## Notas Importantes

1. **Autenticación**: Todos los endpoints de apuestas y usuarios requieren autenticación JWT
2. **Balance**: Las apuestas se descuentan automáticamente del balance del usuario
3. **Validaciones**: La API valida que el evento esté abierto y que el usuario tenga saldo suficiente
4. **Cuotas**: Las cuotas se devuelven como strings para mantener precisión decimal
5. **Fechas**: Todas las fechas se devuelven en formato ISO 8601

## Solución de Problemas

### Error 401 - Unauthorized
- Verifica que el token JWT sea válido
- Asegúrate de incluir el header `Authorization: Bearer <token>`

### Error 400 - Bad Request
- Verifica que el evento exista y esté abierto
- Asegúrate de tener saldo suficiente para la apuesta
- Valida que el tipo de apuesta sea válido para el deporte

### Error 404 - Not Found
- Verifica que el ID del evento o apuesta sea correcto
- Asegúrate de que el recurso exista en la base de datos
