/**
 * Mini Stream Deck - Presets de configurations
 * =============================================
 * Configurations prédéfinies pour différents usages
 */

import type { StreamDeckConfig } from '../types';

export const GAMING_PRESET: StreamDeckConfig = {
  version: '1.0.0',
  port: '',
  baudRate: 9600,
  buttons: [
    {
      id: 1,
      name: 'Copier',
      color: '#3b82f6',
      icon: '1',
      action: {
        type: 'keyboard',
        keys: 'ctrl+c',
        label: 'Copier'
      }
    },
    {
      id: 2,
      name: 'Coller',
      color: '#10b981',
      icon: '2',
      action: {
        type: 'keyboard',
        keys: 'ctrl+v',
        label: 'Coller'
      }
    },
    {
      id: 3,
      name: 'Annuler',
      color: '#f59e0b',
      icon: '3',
      action: {
        type: 'keyboard',
        keys: 'ctrl+z',
        label: 'Annuler'
      }
    },
    {
      id: 4,
      name: 'Explorateur',
      color: '#ef4444',
      icon: '4',
      action: {
        type: 'keyboard',
        keys: 'win+e',
        label: 'Explorateur Windows'
      }
    },
    {
      id: 5,
      name: 'Terminal',
      color: '#8b5cf6',
      icon: '5',
      action: {
        type: 'launch',
        executable: 'wt.exe',
        args: '',
        label: 'Windows Terminal'
      }
    },
    {
      id: 6,
      name: 'Verrouiller',
      color: '#ec4899',
      icon: '6',
      action: {
        type: 'keyboard',
        keys: 'win+l',
        label: 'Verrouiller PC'
      }
    }
  ]
};

export const STREAMING_PRESET: StreamDeckConfig = {
  version: '1.0.0',
  port: '',
  baudRate: 9600,
  buttons: [
    {
      id: 1,
      name: 'OBS',
      color: '#f97316',
      icon: '1',
      action: {
        type: 'launch',
        executable: 'C:\\Program Files\\obs-studio\\bin\\64bit\\obs64.exe',
        args: '',
        label: 'Lancer OBS Studio'
      }
    },
    {
      id: 2,
      name: 'Mute Micro',
      color: '#ef4444',
      icon: '2',
      action: {
        type: 'keyboard',
        keys: 'ctrl+shift+m',
        label: 'Mute/Démute Micro'
      }
    },
    {
      id: 3,
      name: 'Discord',
      color: '#5865f2',
      icon: '3',
      action: {
        type: 'launch',
        executable: 'C:\\Users\\%USERNAME%\\AppData\\Local\\Discord\\Update.exe',
        args: '--processStart Discord.exe',
        label: 'Lancer Discord'
      }
    },
    {
      id: 4,
      name: 'Plein Écran',
      color: '#10b981',
      icon: '4',
      action: {
        type: 'keyboard',
        keys: 'alt+enter',
        label: 'Plein écran'
      }
    },
    {
      id: 5,
      name: 'Capture',
      color: '#3b82f6',
      icon: '5',
      action: {
        type: 'keyboard',
        keys: 'win+alt+printscreen',
        label: 'Capture Xbox'
      }
    },
    {
      id: 6,
      name: 'Black Screen',
      color: '#000000',
      icon: '6',
      action: {
        type: 'keyboard',
        keys: 'ctrl+shift+b',
        label: 'Black Screen'
      }
    }
  ]
};

export const PRODUCTIVITY_PRESET: StreamDeckConfig = {
  version: '1.0.0',
  port: '',
  baudRate: 9600,
  buttons: [
    {
      id: 1,
      name: 'Copier',
      color: '#3b82f6',
      icon: '1',
      action: {
        type: 'keyboard',
        keys: 'ctrl+c',
        label: 'Copier'
      }
    },
    {
      id: 2,
      name: 'Coller',
      color: '#10b981',
      icon: '2',
      action: {
        type: 'keyboard',
        keys: 'ctrl+v',
        label: 'Coller'
      }
    },
    {
      id: 3,
      name: 'Couper',
      color: '#f59e0b',
      icon: '3',
      action: {
        type: 'keyboard',
        keys: 'ctrl+x',
        label: 'Couper'
      }
    },
    {
      id: 4,
      name: 'Rechercher',
      color: '#8b5cf6',
      icon: '4',
      action: {
        type: 'keyboard',
        keys: 'ctrl+f',
        label: 'Rechercher'
      }
    },
    {
      id: 5,
      name: 'Sélectionner Tout',
      color: '#ec4899',
      icon: '5',
      action: {
        type: 'keyboard',
        keys: 'ctrl+a',
        label: 'Tout sélectionner'
      }
    },
    {
      id: 6,
      name: 'Nouveau Tab',
      color: '#06b6d4',
      icon: '6',
      action: {
        type: 'keyboard',
        keys: 'ctrl+t',
        label: 'Nouvel onglet'
      }
    }
  ]
};

export const CODING_PRESET: StreamDeckConfig = {
  version: '1.0.0',
  port: '',
  baudRate: 9600,
  buttons: [
    {
      id: 1,
      name: 'VS Code',
      color: '#007acc',
      icon: '1',
      action: {
        type: 'launch',
        executable: 'code.exe',
        args: '',
        label: 'VS Code'
      }
    },
    {
      id: 2,
      name: 'Terminal',
      color: '#1e1e1e',
      icon: '2',
      action: {
        type: 'keyboard',
        keys: 'ctrl+`',
        label: 'Terminal VS Code'
      }
    },
    {
      id: 3,
      name: 'Rechercher',
      color: '#3b82f6',
      icon: '3',
      action: {
        type: 'keyboard',
        keys: 'ctrl+shift+f',
        label: 'Recherche globale'
      }
    },
    {
      id: 4,
      name: 'Command Palette',
      color: '#f59e0b',
      icon: '4',
      action: {
        type: 'keyboard',
        keys: 'ctrl+shift+p',
        label: 'Palette de commandes'
      }
    },
    {
      id: 5,
      name: 'Debugger',
      color: '#ef4444',
      icon: '5',
      action: {
        type: 'keyboard',
        keys: 'f5',
        label: 'Démarrer debug'
      }
    },
    {
      id: 6,
      name: 'Format',
      color: '#10b981',
      icon: '6',
      action: {
        type: 'keyboard',
        keys: 'shift+alt+f',
        label: 'Formater le code'
      }
    }
  ]
};

// Export de toutes les presets
export const PRESETS = {
  gaming: GAMING_PRESET,
  streaming: STREAMING_PRESET,
  productivity: PRODUCTIVITY_PRESET,
  coding: CODING_PRESET
};

export const PRESET_NAMES = {
  gaming: '🎮 Gaming',
  streaming: '🎬 Streaming',
  productivity: '⚡ Productivité',
  coding: '💻 Développement'
};
