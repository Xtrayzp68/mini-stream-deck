# 📦 Guide de Build - Mini Stream Deck

Ce fichier explique comment compiler et distribuer l'application.

## 🚀 Build Rapide

### Windows
```bash
# Build complet (frontend + Electron)
build.bat

# Ou manuellement
npm run build
npm run build:win
```

### Linux / macOS
```bash
chmod +x build.sh
./build.sh

# Ou manuellement
npm run build
npm run build:electron
```

## 📋 Scripts Disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lancer en mode développement |
| `npm run build` | Build du frontend React |
| `npm run build:win` | Build Windows (.exe) |
| `npm run build:mac` | Build macOS (.dmg) |
| `npm run build:linux` | Build Linux (.AppImage) |
| `npm run build:electron` | Build pour toutes plateformes |
| `npm run preview` | Prévisualiser le build |

## 📁 Résultats du Build

Après build, les fichiers sont dans `release/` :

### Windows
```
release/
├── Mini-Stream-Deck Setup 1.0.0.exe      # Installer NSIS
└── Mini-Stream-Deck-Portable-1.0.0.exe   # Version portable
```

### macOS
```
release/
├── Mini-Stream-Deck-1.0.0.dmg           # Installateur DMG
└── Mini-Stream-Deck-1.0.0.zip           # Archive ZIP
```

### Linux
```
release/
├── Mini-Stream-Deck-1.0.1.AppImage      # AppImage
└── mini-stream-deck_1.0.1_amd64.deb     # Debian/Ubuntu
```

## 🔧 Configuration du Build

Modifier `electron-builder.json` pour personnaliser :

### Changer la version
```json
{
  "version": "1.0.0"  // Dans package.json
}
```

### Changer l'icône
1. Créez une icône 256x256
2. Formats requis :
   - Windows : `public/icon.ico`
   - macOS : `public/icon.icns`
   - Linux : `public/icon.png`

### Personnaliser l'installateur
```json
{
  "nsis": {
    "oneClick": false,              // Mode manuel
    "allowToChangeInstallationDirectory": true,
    "createDesktopShortcut": true,
    "createStartMenuShortcut": true,
    "shortcutName": "Mini Stream Deck",
    "runAfterFinish": true
  }
}
```

## 🎯 Build pour Différentes Architectures

### Windows x64
```bash
npm run build:win
```

### Windows ARM64
```bash
npx electron-builder --win --arm64
```

### macOS Intel
```bash
npm run build:mac
```

### macOS Apple Silicon (M1/M2)
```bash
npx electron-builder --mac --arm64
```

### Linux x64
```bash
npm run build:linux
```

### Linux ARM (Raspberry Pi)
```bash
npx electron-builder --linux --arm64
```

## 🐳 Build Docker (Optionnel)

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

CMD ["npm", "run", "build:linux"]
```

## 🔍 Vérification du Build

```bash
# Vérifier les dépendances
npm ls

# Vérifier la taille du build
du -sh release/

# Tester l'application buildée
./release/Mini-Stream-Deck-1.0.0.AppImage
```

## 📊 Taille des Builds

Typiquement :
- Windows Installer : ~150 MB
- Windows Portable : ~120 MB
- macOS DMG : ~180 MB
- Linux AppImage : ~160 MB

## 🚨 Problèmes Courants

### Erreur de compilation native
```bash
npm install --global windows-build-tools
npm rebuild
```

### Erreur de permissions (Linux/macOS)
```bash
chmod +x build.sh
chmod +x release/*.AppImage
```

### Build trop lent
```bash
# Activer le cache
npm config set cache ~/.npm-cache

# Utiliser Yarn (plus rapide)
yarn install
yarn build:electron
```

## 📤 Distribution

### GitHub Releases
```bash
# Créer un tag
git tag v1.0.0
git push origin v1.0.0

# Uploader les fichiers sur GitHub Releases
```

### Auto-update
Configurer dans `electron/main.js` :
```javascript
const { autoUpdater } = require('electron-updater');

autoUpdater.checkForUpdatesAndNotify();
```

## 🎓 Ressources

- [Electron Builder Docs](https://www.electron.build/)
- [Electron Docs](https://www.electronjs.org/docs)
- [Vite Docs](https://vitejs.dev/)

---

**Dernière mise à jour : 2026**
