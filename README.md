# 🎮 Mini Stream Deck - Application Desktop

Application desktop complète pour configurer et contrôler un Mini Stream Deck USB basé sur Arduino Pro Micro.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)

## 📋 Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Matériel nécessaire](#matériel-nécessaire)
- [Schéma de câblage](#schéma-de-câblage)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Build de l'application](#build-de-lapplication)
- [Création du .exe](#création-du-exe)
- [Configuration des boutons](#configuration-des-boutons)
- [Dépannage](#dépannage)

---

## ✨ Fonctionnalités

### Interface Graphique
- ✅ Interface moderne et intuitive
- ✅ Configuration visuelle des 6 boutons
- ✅ Couleurs personnalisables par bouton
- ✅ Console de débogage en temps réel
- ✅ Import/Export de configuration JSON

### Actions Supportées
- ✅ **Raccourcis clavier** (Ctrl+C, Alt+Tab, F1-F12, etc.)
- ✅ **Lancement de programmes** (.exe, .app, scripts)
- ✅ **Commandes Windows** (cmd, PowerShell, bash)
- ✅ **Macros complexes** (séquences de touches)

### Fonctionnalités Système
- ✅ **Tray icon** dans la barre des tâches
- ✅ **Démarrage automatique** (optionnel)
- ✅ **Mode veille** (économie d'énergie)
- ✅ **Mises à jour automatiques** (configurable)

### Arduino
- ✅ **Web Serial API** pour la communication
- ✅ **Debounce automatique** des boutons
- ✅ **Détection automatique** du port
- ✅ **Code source fourni** et modifiable

---

## 🔧 Matériel nécessaire

| Composant | Spécifications | Prix approx. |
|-----------|---------------|--------------|
| **Arduino Pro Micro** | ATmega32U4, 5V/16MHz | ~5€ |
| **Boutons poussoirs** | 6x Momentary (12x12mm) | ~2€ |
| **Câble USB** | Micro-USB | ~2€ |
| **Câbles jumper** | Optionnel pour prototype | ~3€ |

**Total estimé : ~12€**

### Où acheter ?
- [AliExpress](https://www.aliexpress.com) - Arduino Pro Micro
- [Amazon](https://amazon.com) - Boutons et câbles
- [Adafruit](https://adafruit.com) - Composants de qualité

---

## 🔌 Schéma de câblage

```
┌─────────────────────────────────┐
│      ARDUINO PRO MICRO          │
│  ┌─────────────────────────┐    │
│  │                         │    │
│  │  D2 ○────────── BTN1 ───┤    │
│  │  D3 ○────────── BTN2 ───┤    │
│  │  D4 ○────────── BTN3 ───┤    │
│  │  D5 ○────────── BTN4 ───┤    │
│  │  D6 ○────────── BTN5 ───┤    │
│  │  D7 ○────────── BTN6 ───┤    │
│  │                         │    │
│  │  GND ○──────────────────┤    │
│  │                         │    │
│  └─────────────────────────┘    │
│         ▲        ▲              │
│         │        │              │
│      USB      Alimentation      │
└─────────────────────────────────┘
```

### Instructions de câblage

1. **Pour chaque bouton :**
   - Une patte → Pin Arduino (D2-D7)
   - L'autre patte → GND

2. **Pas de résistance nécessaire !**
   - Le code utilise `INPUT_PULLUP`
   - La résistance interne est activée

3. **Vérification :**
   - Appuyez sur un bouton
   - La connexion doit être fermée (continuité)

---

## 📥 Installation

### Prérequis

#### 1. Node.js (v20+)
```bash
# Vérifier la version
node --version

# Installer depuis https://nodejs.org/
# Ou utiliser nvm :
nvm install 20
```

#### 2. Arduino IDE (pour le code)
```bash
# Télécharger depuis https://www.arduino.cc/en/software
# Version recommandée : Arduino IDE 2.x
```

### Installation de l'application

```bash
# 1. Cloner le repository
git clone https://github.com/yourusername/mini-stream-deck.git
cd mini-stream-deck

# 2. Installer les dépendances
npm install

# 3. Lancer en développement
npm run dev
```

### Premier lancement

1. **Compiler le code Arduino :**
   ```bash
   # Ouvrir Arduino IDE
   # Outils → Carte → Arduino Leonardo
   # Copier le code de public/arduino/mini_stream_deck.ino
   # Compiler et téléverser
   ```

2. **Lancer l'application :**
   ```bash
   npm run dev
   ```

3. **Connecter l'Arduino :**
   - Cliquez sur "Connecter"
   - Sélectionnez le port COM
   - Testez les boutons !

---

## 🎮 Utilisation

### Configuration d'un bouton

1. **Cliquez sur un bouton** dans la grille
2. **Choisissez le type d'action :**
   - 🎹 Raccourci clavier
   - 🚀 Lancer programme
   - 💻 Commande Windows

3. **Configurez l'action :**

#### Exemple 1: Raccourci Ctrl+C
```
Type: Raccourci clavier
Touches: ctrl+c
Label: Copier
```

#### Exemple 2: Lancer Chrome
```
Type: Lancer programme
Exécutable: C:\Program Files\Google\Chrome\Application\chrome.exe
Arguments: (optionnel)
Label: Google Chrome
```

#### Exemple 3: Ouvrir Notepad
```
Type: Commande Windows
Commande: notepad.exe
Label: Bloc-notes
```

### Exemples d'utilisations

#### 🎮 Pour le Gaming
| Bouton | Action | Utilisation |
|--------|--------|-------------|
| BTN1 | `alt+tab` | Changer de fenêtre |
| BTN2 | `ctrl+shift+s` | Capture d'écran |
| BTN3 | `win+d` | Afficher le bureau |
| BTN4 | `mute` | Couper le son |
| BTN5 | Lancer OBS | Streaming |
| BTN6 | Lancer Discord | Chat vocal |

#### 💻 Pour la Productivité
| Bouton | Action | Utilisation |
|--------|--------|-------------|
| BTN1 | `ctrl+c` | Copier |
| BTN2 | `ctrl+v` | Coller |
| BTN3 | `ctrl+z` | Annuler |
| BTN4 | `win+e` | Explorateur |
| BTN5 | `ctrl+alt+t` | Terminal |
| BTN6 | `win+l` | Verrouiller |

#### 🎬 Pour le Streaming
| Bouton | Action | Utilisation |
|--------|--------|-------------|
| BTN1 | Lancer OBS | Démarrer OBS |
| BTN2 | `ctrl+shift+m` | Mute micro |
| BTN3 | Lancer Streamlabs | Dashboard |
| BTN4 | `win+g` | Xbox Game Bar |
| BTN5 | `alt+enter` | Plein écran |
| BTN6 | `ctrl+shift+b` | Black screen |

---

## 🔨 Build de l'application

### Build de développement
```bash
# Build du frontend React
npm run build

# Preview du build
npm run preview
```

### Build pour production

#### Windows (.exe)
```bash
# Build Windows (NSIS installer + Portable)
npm run build:win

# Output dans le dossier 'release/'
# - Mini-Stream-Deck Setup x.x.x.exe (Installer)
# - Mini-Stream-Deck-Portable-x.x.x.exe (Portable)
```

#### macOS (.dmg)
```bash
npm run build:mac
```

#### Linux (.AppImage)
```bash
npm run build:linux
```

### Build personnalisé

```bash
# Build pour toutes les plateformes
npm run build:electron

# Build avec options spécifiques
npx electron-builder --win --x64
npx electron-builder --mac --arm64
npx electron-builder --linux --x64
```

---

## 📦 Création du .exe

### Option 1: Installer avec NSIS (Recommandé)

**Fichier créé :** `release/Mini-Stream-Deck Setup x.x.x.exe`

**Installation :**
1. Double-cliquez sur le fichier
2. Choisissez le dossier d'installation
3. Cochez "Lancer Mini Stream Deck"
4. Cliquez sur "Terminer"

**Avantages :**
- ✅ Création de raccourcis automatiques
- ✅ Désinstallateur inclus
- ✅ Mise à jour possible

### Option 2: Version Portable

**Fichier créé :** `release/Mini-Stream-Deck-Portable-x.x.x.exe`

**Utilisation :**
1. Double-cliquez pour lancer
2. Pas d'installation nécessaire
3. Peut être utilisé sur une clé USB

**Avantages :**
- ✅ Portable (clé USB)
- ✅ Pas de droits admin requis
- ✅ Pas de fichiers système

### Personnalisation de l'icône

1. **Créer une icône 256x256** en format .ico
2. **Placer dans :** `public/icon.ico`
3. **Rebuild :** `npm run build:win`

### Création d'un installateur personnalisé

Modifier `electron-builder.json` :

```json
{
  "nsis": {
    "oneClick": false,
    "allowToChangeInstallationDirectory": true,
    "installerHeaderIcon": "public/icon.ico",
    "installerIcon": "public/icon.ico",
    "uninstallerIcon": "public/icon.ico",
    "license": "LICENSE",
    "welcomeFile": "build/welcome.txt",
    "finishFile": "build/finish.txt"
  }
}
```

---

## 🎛️ Configuration avancée

### Fichier de configuration

**Emplacement :** `%APPDATA%/mini-stream-deck-config`

**Structure :**
```json
{
  "buttons": [
    {
      "id": 1,
      "name": "Copier",
      "color": "#3b82f6",
      "action": {
        "type": "keyboard",
        "keys": "ctrl+c",
        "label": "Copier"
      }
    }
  ],
  "serialPort": "COM3",
  "baudRate": 9600
}
```

### Démarrage automatique (Windows)

1. Ouvrez `regedit`
2. Naviguez vers : `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run`
3. Ajoutez une nouvelle valeur String :
   - Nom : `MiniStreamDeck`
   - Valeur : `"C:\Program Files\Mini Stream Deck\Mini Stream Deck.exe"`

### Raccourcis clavier spéciaux

| Touche | Code |
|--------|------|
| Espace | `space` |
| Entrée | `enter` |
| Échap | `escape` |
| Suppr | `delete` |
| Flèche haut | `up` |
| Flèche bas | `down` |
| Flèche gauche | `left` |
| Flèche droite | `right` |
| F1-F12 | `f1`, `f2`, ... `f12` |

**Combinaisons :**
- `ctrl+c`
- `alt+tab`
- `shift+delete`
- `ctrl+alt+delete`
- `win+r` (Run)

---

## 🐛 Dépannage

### L'Arduino n'est pas détecté

**Problème :** Aucun port série dans la liste

**Solutions :**
1. Vérifiez le câble USB (certains sont charge-only)
2. Installez les drivers CH340/CP2102
3. Essayez un autre port USB
4. Redémarrez l'Arduino IDE

### Les boutons ne fonctionnent pas

**Problème :** Rien ne se passe quand on appuie

**Solutions :**
1. Vérifiez la connexion série (vert = connecté)
2. Regardez la console pour les messages
3. Testez avec le moniteur série Arduino
4. Vérifiez le câblage des boutons

### L'application plante au démarrage

**Problème :** Black screen ou crash

**Solutions :**
```bash
# Effacer le cache
rm -rf ~/.config/mini-stream-deck-config

# Rebuild
npm run build:win

# Mode debug
npm run dev -- --enable-logging
```

### Erreur de compilation Arduino

**Problème :** "avrdude: verification error"

**Solutions :**
1. Appuyez sur le bouton RESET au bon moment
2. Sélectionnez le bon bootloader
3. Réinstallez les drivers

---

## 📁 Structure du projet

```
mini-stream-deck/
├── electron/
│   ├── main.js              # Processus principal Electron
│   └── preload.js           # Preload script (IPC)
├── public/
│   ├── arduino/
│   │   └── mini_stream_deck.ino  # Code Arduino
│   ├── icon.svg             # Icône SVG
│   └── README.md            # Documentation Arduino
├── src/
│   ├── components/
│   │   ├── ArduinoCodeViewer.tsx
│   │   ├── ButtonEditor.tsx
│   │   ├── ButtonGrid.tsx
│   │   ├── ConfigManager.tsx
│   │   ├── ConnectionPanel.tsx
│   │   ├── ConsoleLog.tsx
│   │   └── Instructions.tsx
│   ├── hooks/
│   │   └── useSerial.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── build/                   # Assets pour l'installateur
├── release/                 # Builds de production
├── electron-builder.json    # Config Electron Builder
├── package.json
└── README.md
```

---

## 🚀 Pour aller plus loin

### Ajouter plus de boutons

1. **Modifier le code Arduino :**
   ```cpp
   const int BUTTON_PINS[] = {2, 3, 4, 5, 6, 7, 8, 9}; // 8 boutons
   const int NUM_BUTTONS = 8;
   ```

2. **Modifier les types :**
   ```typescript
   // src/types/index.ts
   export const DEFAULT_BUTTONS = [...Array(8)].map((_, i) => ({
     id: i + 1,
     // ...
   }));
   ```

### Intégrer robotjs (contrôle clavier réel)

```bash
npm install robotjs
```

```javascript
// Dans electron/main.js
const robot = require('robotjs');

async function executeKeyboardAction(action) {
  const keys = action.keys.split('+');
  robot.keyTap(keys);
}
```

### Ajouter des macros

Créez un nouveau type d'action `macro` qui exécute une séquence de commandes avec des délais.

---

## 📝 Licence

MIT License - Libre d'utilisation personnelle et commerciale

---

## 🤝 Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à :
- Ouvrir une issue pour les bugs
- Proposer des fonctionnalités
- Faire des pull requests

---

## 📧 Support

- **GitHub Issues :** [Report a bug](https://github.com/yourusername/mini-stream-deck/issues)
- **Email :** support@ministreamdeck.com

---

**Fabriqué avec ❤️ pour les créateurs et gamers**

Made with ⚡ by Mini Stream Deck Team
