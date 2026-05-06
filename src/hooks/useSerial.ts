import { useState, useCallback, useRef, useEffect } from 'react';

export interface SerialHook {
  isConnected: boolean;
  isConnecting: boolean;
  portName: string;
  logs: string[];
  lastButton: number | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  clearLogs: () => void;
}

interface UseSerialOptions {
  onButtonPress?: (buttonId: number) => void;
  baudRate?: number;
}

export function useSerial(options: UseSerialOptions = {}): SerialHook {
  const { onButtonPress, baudRate = 9600 } = options;
  
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [portName, setPortName] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [lastButton, setLastButton] = useState<number | null>(null);
  
  const portRef = useRef<SerialPort | null>(null);
  const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array> | null>(null);
  const keepReadingRef = useRef(false);

  const addLog = useCallback((message: string, _type: 'info' | 'success' | 'error' | 'warning' = 'info') => {
    const timestamp = new Date().toLocaleTimeString('fr-FR');
    setLogs(prev => [...prev.slice(-49), `[${timestamp}] ${message}`]);
  }, []);

  const processMessage = useCallback((message: string) => {
    const trimmed = message.trim();
    
    // Parse button messages (BTN_1 to BTN_6)
    const btnMatch = trimmed.match(/^BTN_(\d+)$/);
    if (btnMatch) {
      const buttonId = parseInt(btnMatch[1], 10);
      if (buttonId >= 1 && buttonId <= 6) {
        setLastButton(buttonId);
        addLog(`Bouton ${buttonId} pressé`, 'success');
        onButtonPress?.(buttonId);
        return;
      }
    }
    
    // Log other messages
    if (trimmed) {
      addLog(trimmed, 'info');
    }
  }, [addLog, onButtonPress]);

  const readFromPort = useCallback(async () => {
    if (!portRef.current?.readable) return;

    keepReadingRef.current = true;
    
    while (keepReadingRef.current && portRef.current?.readable) {
      try {
        readerRef.current = portRef.current.readable.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (keepReadingRef.current) {
          const { value, done } = await readerRef.current.read();
          
          if (done) {
            keepReadingRef.current = false;
            break;
          }
          
          buffer += decoder.decode(value, { stream: true });
          
          // Process complete lines
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          
          for (const line of lines) {
            processMessage(line);
          }
        }
      } catch (error) {
        if (keepReadingRef.current) {
          addLog(`Erreur de lecture: ${error}`, 'error');
          keepReadingRef.current = false;
        }
      } finally {
        if (readerRef.current) {
          try {
            readerRef.current.releaseLock();
          } catch {
            // Ignore error if already released
          }
        }
      }
    }
  }, [addLog, processMessage]);

  const connect = useCallback(async () => {
    if (!navigator.serial) {
      addLog('Web Serial API non supportée. Utilisez Chrome/Edge.', 'error');
      return;
    }

    try {
      setIsConnecting(true);
      addLog('Recherche de port série...', 'info');

      const port = await navigator.serial.requestPort();
      
      addLog('Connexion à 9600 bauds...', 'info');
      await port.open({ baudRate });
      
      portRef.current = port;
      setIsConnected(true);
      setPortName(`Port USB`);
      addLog('Connecté avec succès!', 'success');
      
      // Start reading
      readFromPort();
    } catch (error) {
      if ((error as Error).name !== 'NotFoundError') {
        addLog(`Erreur de connexion: ${error}`, 'error');
      } else {
        addLog('Connexion annulée', 'warning');
      }
    } finally {
      setIsConnecting(false);
    }
  }, [addLog, baudRate, readFromPort]);

  const disconnect = useCallback(async () => {
    keepReadingRef.current = false;
    
    try {
      if (readerRef.current) {
        await readerRef.current.cancel();
        readerRef.current.releaseLock();
      }
      
      if (portRef.current) {
        await portRef.current.close();
        portRef.current = null;
      }
      
      setIsConnected(false);
      setPortName('');
      addLog('Déconnecté', 'info');
    } catch (error) {
      addLog(`Erreur de déconnexion: ${error}`, 'error');
    }
  }, [addLog]);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      keepReadingRef.current = false;
      if (portRef.current) {
        portRef.current.close().catch(() => {});
      }
    };
  }, []);

  return {
    isConnected,
    isConnecting,
    portName,
    logs,
    lastButton,
    connect,
    disconnect,
    clearLogs
  };
}
