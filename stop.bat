@echo off
echo Stopping EternalEchoesStore services...

taskkill /FI "WindowTitle eq EternalEchoesStore API*" /F /T >nul 2>&1
taskkill /FI "WindowTitle eq EternalEchoesStore Frontend*" /F /T >nul 2>&1

docker-compose stop postgres_db

echo Done.
