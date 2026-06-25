# EternalEchoesStore

Online store built with Clean Architecture, CQRS, .NET 10, and Next.js 15.

## Tech Stack

| Layer | Technology |
|---|---|
| API | ASP.NET Core 10 Minimal APIs |
| ORM | Entity Framework Core 10 + Npgsql |
| CQRS | MediatR 12 |
| Validation | FluentValidation 11 |
| Mapping | Mapster 7 |
| API Docs | Microsoft.AspNetCore.OpenApi + Scalar |
| Database | PostgreSQL (Docker) |
| Frontend | Next.js 15, React 19, Tailwind CSS 3 |
| Container | Docker + docker-compose |

## Architecture

```
EternalEchoesStore/
├── EternalEchoesStore.Domain/          # Entities — no external dependencies
├── EternalEchoesStore.Contracts/       # DTOs, requests, responses, exceptions
├── EternalEchoesStore.Infrastructure/  # EF Core contexts + migrations (PostgreSQL)
├── EternalEchoesStore.Application/     # MediatR handlers, validators, mappings
└── EternalEchoesStore.Presentation/   # ASP.NET Core host, endpoint modules
    └── Client/EternalEchoesStore/     # Next.js 15 frontend
```

## Quick Start

### Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Node.js 22+](https://nodejs.org)

### Run locally

```bat
start.bat
```

Checks prerequisites, starts PostgreSQL in Docker, applies EF Core migrations, builds the API,
installs frontend dependencies, and launches both the API and the Next.js dev server.

### Stop all services

```bat
stop.bat
```

### Full Docker stack

```bat
docker-compose up --build
```

Runs API + PostgreSQL as containers. Start the frontend separately via `start.bat` or
navigate to `EternalEchoesStore.Presentation/Client/EternalEchoesStore` and run `npm run dev`.

## Environment Variables

Configured in `EternalEchoesStore.Presentation/appsettings.json`:

| Key | Default |
|---|---|
| `ConnectionStrings:DbConnectionString` | `Host=localhost;Port=5433;Username=admin;Password=root;Database=eternal_echoes_store` |

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/EternalEchoesStore/product` | List products |
| POST | `/api/EternalEchoesStore/product` | Create product |
| PUT | `/api/EternalEchoesStore/product` | Update product |
| DELETE | `/api/EternalEchoesStore/product` | Delete product |
| GET | `/api/EternalEchoesStore/user` | List users |
| POST | `/api/EternalEchoesStore/user` | Create user |
| PUT | `/api/EternalEchoesStore/user` | Update user |
| DELETE | `/api/EternalEchoesStore/user` | Delete user |

API docs (dev only): `http://localhost:5000/scalar/v1`

## Database

PostgreSQL runs on port `5433` (mapped from container port `5432`).
Credentials: `admin` / `root` / database `eternal_echoes_store`.
