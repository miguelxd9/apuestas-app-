graph TB
    subgraph "Frontend (Next.js 15)"
        UI[Interfaz de Usuario]
        Auth[Autenticación]
        Events[Gestión de Eventos]
        Bets[Sistema de Apuestas]
        Profile[Perfil de Usuario]
        Testing[Tests Unitarios]
    end

    subgraph "Backend (NestJS)"
        API[API REST]
        AuthService[Servicio de Autenticación]
        UserService[Servicio de Usuarios]
        EventService[Servicio de Eventos]
        BetService[Servicio de Apuestas]
        JWT[JWT Strategy]
        Validation[Validación DTOs]
    end

    subgraph "Base de Datos"
        PostgreSQL[(PostgreSQL 15)]
        Users[(Tabla Users)]
        Events[(Tabla Events)]
        Bets[(Tabla Bets)]
        Migrations[Migraciones TypeORM]
        Seeds[Datos Iniciales]
    end

    subgraph "Automatización"
        StartScript[./scripts/start.sh]
        DockerCompose[Docker Compose]
        Build[Build Automático]
        Deploy[Despliegue Automático]
    end

    subgraph "Infraestructura"
        Docker[Docker Containers]
        Azure[Azure Cloud]
        ACR[Azure Container Registry]
        AppService[Azure App Service]
        CosmosDB[Cosmos DB PostgreSQL]
    end

    subgraph "Testing & QA"
        Jest[Jest Framework]
        RTL[React Testing Library]
        E2E[Tests E2E]
        Coverage[Cobertura de Tests]
    end

    %% Conexiones Frontend
    UI --> API
    Auth --> AuthService
    Events --> EventService
    Bets --> BetService
    Profile --> UserService
    Testing --> Jest
    Testing --> RTL

    %% Conexiones Backend
    API --> AuthService
    API --> UserService
    API --> EventService
    API --> BetService
    AuthService --> JWT
    AuthService --> Validation
    UserService --> Users
    EventService --> Events
    BetService --> Bets

    %% Conexiones Base de Datos
    Users --> PostgreSQL
    Events --> PostgreSQL
    Bets --> PostgreSQL
    Migrations --> PostgreSQL
    Seeds --> Users
    Seeds --> Events

    %% Conexiones Automatización
    StartScript --> DockerCompose
    DockerCompose --> Build
    Build --> Deploy
    Deploy --> Docker

    %% Conexiones Infraestructura
    Docker --> Azure
    ACR --> AppService
    AppService --> CosmosDB

    %% Conexiones Testing
    Jest --> Testing
    RTL --> Testing
    E2E --> Testing
    Coverage --> Testing

    %% Estilos
    classDef frontend fill:#e1f5fe
    classDef backend fill:#f3e5f5
    classDef database fill:#e8f5e8
    classDef automation fill:#fff3e0
    classDef infrastructure fill:#fce4ec
    classDef testing fill:#f1f8e9

    class UI,Auth,Events,Bets,Profile,Testing frontend
    class API,AuthService,UserService,EventService,BetService,JWT,Validation backend
    class PostgreSQL,Users,Events,Bets,Migrations,Seeds database
    class StartScript,DockerCompose,Build,Deploy automation
    class Docker,Azure,ACR,AppService,CosmosDB infrastructure
    class Jest,RTL,E2E,Coverage testing
