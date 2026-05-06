/**
 * Mini Stream Deck - Preload Script
 * ==================================
 * Pont sécurisé entre le renderer et le main process
 */

const { contextBridge, ipcRenderer } = require('electron');

// Exposer les API sécurisées au renderer
contextBridge.exposeInMainWorld('electronAPI', {
  /**
   * Liste des ports série disponibles
   */
  listSerialPorts: () => ipcRenderer.invoke('serial:list'),
  
  /**
   * Ouvrir un port série
   */
  openSerialPort: (portPath, baudRate) => 
    ipcRenderer.invoke('serial:open', { path: portPath, baudRate }),
  
  /**
   * Fermer le port série
   */
  closeSerialPort: () => ipcRenderer.invoke('serial:close'),
  
  /**
   * Écouter les données série
   */
  onSerialData: (callback) => {
    ipcRenderer.on('serial-data', (event, data) => callback(data));
  },
  
  /**
   * Écouter la fermeture du port
   */
  onSerialClosed: (callback) => {
    ipcRenderer.on('serial-closed', () => callback());
  },
  
  /**
   * Exécuter une action
   */
  executeAction: (action) => ipcRenderer.invoke('action:execute', action),
  
  /**
   * Récupérer une valeur du store
   */
  storeGet: (key) => ipcRenderer.invoke('store:get', key),
  
  /**
   * Sauvegarder une valeur dans le store
   */
  storeSet: (key, value) => ipcRenderer.invoke('store:set', key, value),
  
  /**
   * Récupérer tout le store
   */
  storeGetAll: () => ipcRenderer.invoke('store:getAll'),
  
  /**
   * Informations sur l'environnement
   */
  platform: process.platform,
  isDev: process.env.NODE_ENV === 'development' || 
         process.defaultApp ||
         /node_modules[\\/]electron[\\/]/.test(process.execPath)
});
