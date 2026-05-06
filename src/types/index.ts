// Types for Mini Stream Deck Configuration

export type ActionType = 'keyboard' | 'launch' | 'command' | 'none';

export interface ButtonAction {
  type: ActionType;
  label: string;
  // For keyboard action
  keys?: string;
  // For launch action
  executable?: string;
  args?: string;
  // For command action
  command?: string;
}

export interface ButtonConfig {
  id: number;
  name: string;
  color: string;
  icon: string;
  action: ButtonAction;
}

export interface StreamDeckConfig {
  version: string;
  port: string;
  baudRate: number;
  buttons: ButtonConfig[];
}

export interface SerialConnection {
  port: SerialPort | null;
  reader: ReadableStreamDefaultReader<Uint8Array> | null;
  writer: WritableStreamDefaultWriter<Uint8Array> | null;
  isConnected: boolean;
  isConnecting: boolean;
}

export const DEFAULT_BUTTONS: ButtonConfig[] = [
  {
    id: 1,
    name: 'Bouton 1',
    color: '#3b82f6',
    icon: '1',
    action: { type: 'none', label: 'Non configuré' }
  },
  {
    id: 2,
    name: 'Bouton 2',
    color: '#10b981',
    icon: '2',
    action: { type: 'none', label: 'Non configuré' }
  },
  {
    id: 3,
    name: 'Bouton 3',
    color: '#f59e0b',
    icon: '3',
    action: { type: 'none', label: 'Non configuré' }
  },
  {
    id: 4,
    name: 'Bouton 4',
    color: '#ef4444',
    icon: '4',
    action: { type: 'none', label: 'Non configuré' }
  },
  {
    id: 5,
    name: 'Bouton 5',
    color: '#8b5cf6',
    icon: '5',
    action: { type: 'none', label: 'Non configuré' }
  },
  {
    id: 6,
    name: 'Bouton 6',
    color: '#ec4899',
    icon: '6',
    action: { type: 'none', label: 'Non configuré' }
  }
];

export const DEFAULT_CONFIG: StreamDeckConfig = {
  version: '1.0.0',
  port: '',
  baudRate: 9600,
  buttons: DEFAULT_BUTTONS
};
