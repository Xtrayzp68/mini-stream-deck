import { useState, useCallback, useEffect, useRef } from 'react';
import { Settings, Gamepad2 } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import { ConnectionPanel } from './components/ConnectionPanel';
import { ButtonGrid } from './components/ButtonGrid';
import { ButtonEditor } from './components/ButtonEditor';
import { ConsoleLog } from './components/ConsoleLog';
import { ArduinoCodeViewer } from './components/ArduinoCodeViewer';
import { Instructions } from './components/Instructions';
import { ConfigManager } from './components/ConfigManager';
import type { ButtonConfig, StreamDeckConfig, ButtonAction } from './types';
import { DEFAULT_CONFIG } from './types';

// Fonction pour exécuter une action via Electron
async function executeAction(action: ButtonAction): Promise<{ success: boolean; message: string }> {
  if (window.electronAPI) {
    return await window.electronAPI.executeAction(action);
  } else {
    // Fallback pour le mode web
    console.log('Action simulée:', action);
    return { success: true, message: 'Mode web - action simulée' };
  }
}

// Chargement de la configuration
async function loadConfig(): Promise<StreamDeckConfig> {
  try {
    if (window.electronAPI) {
      const saved = await window.electronAPI.storeGet('buttons');
      if (saved && Array.isArray(saved)) {
        return { ...DEFAULT_CONFIG, buttons: saved };
      }
    } else {
      const saved = localStorage.getItem('stream-deck-config');
      if (saved) {
        return JSON.parse(saved);
      }
    }
  } catch (error) {
    console.error('Erreur chargement config:', error);
  }
  return DEFAULT_CONFIG;
}

// Sauvegarde de la configuration
async function saveConfig(config: StreamDeckConfig) {
  try {
    if (window.electronAPI) {
      await window.electronAPI.storeSet('buttons', config.buttons);
    } else {
      localStorage.setItem('stream-deck-config', JSON.stringify(config));
    }
  } catch (error) {
    console.error('Erreur sauvegarde config:', error);
  }
}

function App() {
  const [config, setConfig] = useState<StreamDeckConfig>(DEFAULT_CONFIG);
  const [selectedButton, setSelectedButton] = useState<ButtonConfig | null>(null);
  const [showButtonEditor, setShowButtonEditor] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [portName, setPortName] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [lastButton, setLastButton] = useState<number | null>(null);
  const [availablePorts, setAvailablePorts] = useState<SerialPortInfo[]>([]);

  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll des logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Initialisation
  useEffect(() => {
    loadConfig().then(setConfig);
  }, []);

  // Écoute des données série (Electron)
  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.onSerialData((data: string) => {
        handleSerialData(data);
      });

      window.electronAPI.onSerialClosed(() => {
        setIsConnected(false);
        setPortName('');
        addLog('Port série fermé', 'info');
      });
    }

    return () => {
      // Cleanup si nécessaire
    };
  }, []);

  const addLog = useCallback((message: string, _type: 'info' | 'success' | 'error' | 'warning' = 'info') => {
    const timestamp = new Date().toLocaleTimeString('fr-FR');
    setLogs(prev => [...prev.slice(-99), `[${timestamp}] ${message}`]);
  }, []);

  const handleSerialData = useCallback((data: string) => {
    const trimmed = data.trim();
    
    // Parse button messages
    const btnMatch = trimmed.match(/^BTN_(\d+)$/);
    if (btnMatch) {
      const buttonId = parseInt(btnMatch[1], 10);
      if (buttonId >= 1 && buttonId <= 6) {
        setLastButton(buttonId);
        addLog(`Bouton ${buttonId} pressé`, 'success');
        
        // Exécuter l'action associée
        const button = config.buttons.find(b => b.id === buttonId);
        if (button && button.action.type !== 'none') {
          executeAction(button.action).then(result => {
            if (result.success) {
              addLog(`Action exécutée: ${result.message}`, 'success');
            } else {
              addLog(`Erreur action: ${result.message}`, 'error');
            }
          });
        }
      }
    } else if (trimmed) {
      addLog(trimmed, 'info');
    }
  }, [config.buttons, addLog]);

  // Liste des ports série
  const fetchPorts = useCallback(async () => {
    if (!window.electronAPI) return;
    
    try {
      const ports = await window.electronAPI.listSerialPorts();
      setAvailablePorts(ports);
    } catch (error) {
      addLog('Erreur liste ports:', 'error');
    }
  }, [addLog]);

  // Connexion au port série
  const connect = useCallback(async () => {
    if (!window.electronAPI) {
      addLog('Mode web - connexion impossible', 'error');
      return;
    }

    if (availablePorts.length === 0) {
      await fetchPorts();
      if (availablePorts.length === 0) {
        addLog('Aucun port série détecté', 'error');
        return;
      }
    }

    setIsConnecting(true);
    addLog('Connexion au port...', 'info');

    try {
      const port = availablePorts[0]; // Utiliser le premier port par défaut
      const result = await window.electronAPI.openSerialPort(port.path, config.baudRate);
      
      if (result.success) {
        setIsConnected(true);
        setPortName(port.path);
        addLog('Connecté avec succès!', 'success');
        toast.success('Connecté à l\'Arduino');
      } else {
        addLog(`Erreur: ${result.message}`, 'error');
        toast.error('Échec de connexion');
      }
    } catch (error) {
      addLog(`Erreur connexion: ${error}`, 'error');
      toast.error('Erreur de connexion');
    } finally {
      setIsConnecting(false);
    }
  }, [availablePorts, config.baudRate, addLog, fetchPorts]);

  // Déconnexion
  const disconnect = useCallback(async () => {
    if (window.electronAPI) {
      await window.electronAPI.closeSerialPort();
    }
    setIsConnected(false);
    setPortName('');
    addLog('Déconnecté', 'info');
    toast.success('Déconnecté');
  }, [addLog]);

  // Gestion de la sélection de bouton
  const handleSelectButton = (button: ButtonConfig) => {
    setSelectedButton(button);
    setShowButtonEditor(true);
  };

  // Sauvegarde des modifications du bouton
  const handleSaveButton = async (updatedButton: ButtonConfig) => {
    setConfig(prev => {
      const newConfig = {
        ...prev,
        buttons: prev.buttons.map(b => 
          b.id === updatedButton.id ? updatedButton : b
        )
      };
      saveConfig(newConfig);
      return newConfig;
    });
    toast.success('Bouton sauvegardé');
  };

  // Mise à jour de la configuration
  const handleConfigChange = async (newConfig: StreamDeckConfig) => {
    setConfig(newConfig);
    await saveConfig(newConfig);
    toast.success('Configuration importée');
  };

  // Effacer les logs
  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#374151',
            color: '#fff',
          },
          success: {
            duration: 2000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Mini Stream Deck</h1>
                <p className="text-sm text-gray-400">
                  {window.electronAPI ? 'Application Desktop' : 'Mode Web'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Settings className="w-4 h-4" />
              <span>v1.0.0</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-4">
            <ConnectionPanel
              isConnected={isConnected}
              isConnecting={isConnecting}
              portName={portName}
              onConnect={connect}
              onDisconnect={disconnect}
              lastButton={lastButton}
            />
            
            <ConsoleLog
              logs={logs}
              onClear={clearLogs}
            />
            
            <ConfigManager
              config={config}
              onConfigChange={handleConfigChange}
            />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-4">
            <ButtonGrid
              buttons={config.buttons}
              activeButton={selectedButton?.id ?? null}
              lastPressedButton={lastButton}
              onSelectButton={handleSelectButton}
            />
            
            <ArduinoCodeViewer />
            
            <Instructions />
          </div>
        </div>
      </main>

      {/* Button Editor Modal */}
      {showButtonEditor && selectedButton && (
        <ButtonEditor
          button={selectedButton}
          onSave={handleSaveButton}
          onClose={() => setShowButtonEditor(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-8">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
          <p>Mini Stream Deck v1.0.0 • Electron Desktop Application</p>
          <p className="mt-1">
            {window.electronAPI?.platform === 'win32' ? 'Windows' : 
             window.electronAPI?.platform === 'darwin' ? 'macOS' : 'Linux'}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
