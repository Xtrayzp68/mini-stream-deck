#!/bin/bash

echo "========================================"
echo "  Mini Stream Deck - Build Script"
echo "========================================"
echo ""

echo "[1/4] Nettoyage des builds précédents..."
rm -rf release dist

echo "[2/4] Build du frontend React..."
npm run build
if [ $? -ne 0 ]; then
    echo "ERREUR: Echec du build frontend"
    exit 1
fi

echo "[3/4] Build de l'application Electron..."
npm run build:electron
if [ $? -ne 0 ]; then
    echo "ERREUR: Echec du build Electron"
    exit 1
fi

echo ""
echo "========================================"
echo "  Build terminé avec succès!"
echo "========================================"
echo ""
echo "Les fichiers sont dans le dossier 'release/'"
echo ""
