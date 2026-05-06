@echo off
echo ========================================
echo   Mini Stream Deck - Build Script
echo ========================================
echo.

echo [1/4] Nettoyage des builds précédents...
if exist release rmdir /s /q release
if exist dist rmdir /s /q dist

echo [2/4] Build du frontend React...
call npm run build
if errorlevel 1 (
    echo ERREUR: Echec du build frontend
    pause
    exit /b 1
)

echo [3/4] Build de l'application Electron (Windows)...
call npm run build:win
if errorlevel 1 (
    echo ERREUR: Echec du build Electron
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Build termine avec succes!
echo ========================================
echo.
echo Les fichiers sont dans le dossier 'release/' :
echo   - Mini-Stream-Deck Setup x.x.x.exe (Installer)
echo   - Mini-Stream-Deck-Portable-x.x.x.exe (Portable)
echo.
pause
