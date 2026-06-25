@echo off
setlocal EnableDelayedExpansion

echo ========================================
echo  EternalEchoesStore - Local Dev Setup
echo ========================================
echo.

REM ---- Prerequisites -------------------------------------------------------

dotnet --version 2>nul | findstr /R "^10\." >nul
if errorlevel 1 (
    echo [ERROR] .NET 10 SDK is required.
    echo         Download: https://dotnet.microsoft.com/download
    exit /b 1
)
echo [OK] .NET 10 SDK

docker info >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker is not running. Start Docker Desktop and try again.
    exit /b 1
)
echo [OK] Docker

node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js 22+ is required.
    echo         Download: https://nodejs.org
    exit /b 1
)
echo [OK] Node.js

REM ---- PostgreSQL ----------------------------------------------------------

echo.
echo [1/5] Starting PostgreSQL...
docker-compose up -d postgres_db
if errorlevel 1 (
    echo [ERROR] Failed to start PostgreSQL container.
    exit /b 1
)

echo Waiting for PostgreSQL to accept connections...
:pg_wait
docker exec postgres pg_isready -U admin >nul 2>&1
if errorlevel 1 (
    timeout /t 2 /nobreak >nul
    goto pg_wait
)
echo [OK] PostgreSQL is ready

REM ---- .NET restore --------------------------------------------------------

echo.
echo [2/5] Restoring .NET packages...
dotnet restore EternalEchoesStore.sln --verbosity quiet
if errorlevel 1 (
    echo [ERROR] dotnet restore failed.
    exit /b 1
)
echo [OK] Packages restored

REM ---- .NET build ----------------------------------------------------------

echo.
echo [3/5] Building .NET solution...
dotnet build EternalEchoesStore.sln -c Release --no-restore --verbosity quiet
if errorlevel 1 (
    echo [ERROR] Build failed.
    exit /b 1
)
echo [OK] Build succeeded

REM ---- EF Core migrations --------------------------------------------------

echo.
echo [4/5] Applying database migrations...
dotnet ef database update ^
    --project EternalEchoesStore.Infrastructure ^
    --startup-project EternalEchoesStore.Presentation ^
    --context ProductDbContext
dotnet ef database update ^
    --project EternalEchoesStore.Infrastructure ^
    --startup-project EternalEchoesStore.Presentation ^
    --context UserDbContext
echo [OK] Migrations applied

REM ---- npm install ---------------------------------------------------------

echo.
echo [5/5] Installing frontend dependencies...
pushd EternalEchoesStore.Presentation\Client\EternalEchoesStore
if not exist node_modules (
    npm install
) else (
    npm install --prefer-offline
)
if errorlevel 1 (
    popd
    echo [ERROR] npm install failed.
    exit /b 1
)
popd
echo [OK] Frontend dependencies ready

REM ---- Launch --------------------------------------------------------------

echo.
echo Starting services...
start "EternalEchoesStore API" cmd /c "dotnet run --project EternalEchoesStore.Presentation\EternalEchoesStore.Presentation.csproj --no-build -c Release"
timeout /t 3 /nobreak >nul
start "EternalEchoesStore Frontend" cmd /c "cd /d EternalEchoesStore.Presentation\Client\EternalEchoesStore && npm run dev"

echo.
echo ========================================
echo  All services started
echo.
echo  API:      http://localhost:5000
echo  Docs:     http://localhost:5000/scalar/v1
echo  Frontend: http://localhost:3000
echo  DB:       localhost:5433
echo ========================================
