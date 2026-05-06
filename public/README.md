# 🎮 Mini Stream Deck - Web Interface

Interface web moderne pour configurer et contrôler un Mini Stream Deck USB basé sur Arduino.

## 📋 Table des matières

- [Matériel nécessaire](#matériel-nécessaire)
- [Schéma de câblage](#schéma-de-câblage)
- [Installation Arduino](#installation-arduino)
- [Utilisation de l'interface web](#utilisation-de-linterface-web)
- [Configuration des boutons](#configuration-des-boutons)
- [Limitations](#limitations)

---

## 🔧 Matériel nécessaire

| Composant | Description |
|-----------|-------------|
| Arduino Pro Micro | ATmega32U4, 5V/16MHz |
| 6 boutons poussoirs | Momentary (non maintainu) |
| Câble USB | Micro-USB |
| Câbles jumper | Optionnel, pour prototype |

---

## 🔌 Schéma de câblage

```
Arduino Pro Micro
┌─────────────────┐
│                 │
│  D2 ●─────── BTN1 ────┐
│  D3 ●─────── BTN2 ────┤
│  D4 ●─────── BTN3 ────┤
│  D5 ●─────── BTN4 ────┼──── GND
│  D6 ●─────── BTN5 ────┤
│  D7 ●─────── BTN6 ────┘
│                 │
│  GND ●─────────────────│
│                 │
└─────────────────┘
```

**Important:** Chaque bouton doit être connecté entre la pin correspondante et GND. Le mode `INPUT_PULLUP` est activé dans le code, donc aucune résistance externe n'est nécessaire.

---

## 📥 Installation Arduino

### 1. Installer Arduino IDE

Téléchargez et installez **Arduino IDE 2.x** depuis:
👉 https://www.arduino.cc/en/software

### 2. Configurer l'IDE

1. Connectez l'Arduino Pro Micro via USB
2. Allez dans **Outils → Carte**
3. Sélectionnez **Arduino Leonardo** (le Pro Micro utilise le même chip)
4. Sélectionnez le bon **Port** (COMx sur Windows, /dev/ttyACMx sur Linux)

### 3. Téléverser le code

1. Copiez le code depuis l'onglet "Voir le code Arduino" dans l'interface web
2. Collez-le dans Arduino IDE
3. Cliquez sur **Upload** (→)
4. Attendez que la compilation et le transfert soient terminés

### 4. Vérifier le fonctionnement

1. Ouvrez le **Moniteur Série** (🔍 en haut à droite)
2. Réglez la vitesse à **9600 bauds**
3. Appuyez sur un bouton
4. Vous devriez voir `BTN_1`, `BTN_2`, etc.

---

## 🌐 Utilisation de l'interface web

### Prérequis

L'interface web utilise la **Web Serial API** qui nécessite:
- **Google Chrome** (✅)
- **Microsoft Edge** (✅)
- **Opera** (✅)
- Firefox (❌ non supporté)
- Safari (❌ non supporté)

### Connexion

1. Ouvrez l'application dans un navigateur supporté
2. Cliquez sur **"Connecter l'Arduino"**
3. Sélectionnez le port USB dans la popup
4. Le statut passe à "Connecté" si tout fonctionne

### Tester les boutons

1. Appuyez sur un bouton physique
2. Le numéro apparaît dans la **Console Série**
3. Un indicateur visuel s'affiche sur le bouton correspondant

---

## 🎛️ Configuration des boutons

Pour configurer un bouton:

1. **Cliquez sur un bouton** dans la grille
2. Une fenêtre de configuration s'ouvre
3. Modifiez les paramètres:
   - **Nom**: Nom personnalisé du bouton
   - **Couleur**: Couleur d'affichage
   - **Type d'action**: 
     - Aucune action
     - Raccourci clavier
     - Lancer programme
     - Commande Windows
4. Cliquez sur **"Enregistrer"**

### Types d'actions

#### 🎹 Raccourci clavier
Entrez le raccourci au format: `ctrl+c`, `alt+tab`, `f1`, etc.

#### 🚀 Lancer programme
Entrez le chemin complet du programme: `C:\Program Files\App\app.exe`

#### 💻 Commande Windows
Entrez la commande à exécuter: `notepad.exe`, `shutdown /s /t 60`, etc.

---

## 💾 Sauvegarde de configuration

### Exporter

1. Cliquez sur **"Exporter JSON"**
2. Le fichier `stream-deck-config.json` est téléchargé

### Importer

1. Cliquez sur **"Importer JSON"**
2. Sélectionnez votre fichier de configuration

### Réinitialiser

1. Cliquez sur **"Réinitialiser"**
2. Confirmez l'action

---

## ⚠️ Limitations

### Web Serial API

L'interface web ne peut **PAS** réellement:
- Exécuter des raccourcis clavier
- Lancer des programmes
- Exécuter des commandes Windows

Ces fonctionnalités nécessitent une application desktop (Electron/Python).

### Solutions alternatives

Pour une **vraie** exécution d'actions, utilisez:
- [Electron + Web Serial](https://www.electronjs.org/)
- Python + pyserial + pyautogui
- AutoHotKey avec un script série

---

## 📁 Structure du projet

```
mini-stream-deck/
├── public/
│   ├── arduino/
│   │   └── mini_stream_deck.ino    # Code Arduino
│   └── README.md                    # Cette documentation
├── src/
│   ├── components/
│   │   ├── ArduinoCodeViewer.tsx    # Afficheur de code
│   │   ├── ButtonEditor.tsx         # Éditeur de bouton
│   │   ├── ButtonGrid.tsx           # Grille des boutons
│   │   ├── ConfigManager.tsx        # Gestion config
│   │   ├── ConnectionPanel.tsx      # Panneau connexion
│   │   ├── ConsoleLog.tsx           # Console série
│   │   └── Instructions.tsx         # Guide d'aide
│   ├── hooks/
│   │   └── useSerial.ts            # Hook communication série
│   ├── types/
│   │   └── index.ts                 # Types TypeScript
│   ├── App.tsx                      # Composant principal
│   ├── index.css                    # Styles
│   └── main.tsx                     # Point d'entrée
└── package.json
```

---

## 🔧 Commandes utiles

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

---

## 📝 Licence

Ce projet est open source. Utilisez-le librement !

---

## 🤝 Contribuer

Les améliorations sont bienvenues! N'hésitez pas à ouvrir une issue ou un PR.

---

**Fabriqué avec ❤️ pour les créateurs de contenu et les gamers**
