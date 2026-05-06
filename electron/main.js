/**
 * Mini Stream Deck - Main Process (Electron)
 * ==========================================
 * Gère la fenêtre principale, la communication série et l'exécution des actions
 */

const { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const Store = require('electron-store');
const log = require('electron-log');
const { SerialPort } = require('serialport');
const { exec, spawn } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Configuration du store
const store = new Store({
  name: 'mini-stream-deck-config',
  defaults: {
    buttons: [],
    serialPort: null,
    baudRate: 9600
  }
});

// Configuration du logging
log.transports.file.level = 'info';
log.info('Mini Stream Deck démarré');

// Variables globales
let mainWindow = null;
let tray = null;
let serialPort = null;
let isPortOpen = false;

/**
 * Création de la fenêtre principale
 */
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: 'Mini Stream Deck',
    icon: path.join(__dirname, '../public/icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    show: false,
    backgroundColor: '#111827'
  });

  // Charger l'application
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

/**
 * Création de la tray icon (system tray)
 */
function createTray() {
  const iconPath = path.join(__dirname, '../public/icon.png');
  const trayIcon = nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 });
  
  tray = new Tray(trayIcon);
  
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Ouvrir',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.focus();
        }
      }
    },
    {
      label: 'Quitter',
      click: () => {
        closeSerialPort();
        app.quit();
      }
    }
  ]);
  
  tray.setToolTip('Mini Stream Deck');
  tray.setContextMenu(contextMenu);
  
  tray.on('click', () => {
    if (mainWindow) {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    }
  });
}

/**
 * Gestion des ports série disponibles
 */
async function listSerialPorts() {
  try {
    const ports = await SerialPort.list();
    log.info('Ports série trouvés:', ports);
    return ports.map(port => ({
      path: port.path,
      manufacturer: port.manufacturer || 'Unknown',
      serialNumber: port.serialNumber || '',
      vendorId: port.vendorId,
      productId: port.productId
    }));
  } catch (error) {
    log.error('Erreur liste ports:', error);
    return [];
  }
}

/**
 * Ouvrir un port série
 */
async function openSerialPort(portPath, baudRate = 9600) {
  return new Promise((resolve, reject) => {
    try {
      closeSerialPort();

      serialPort = new SerialPort({
        path: portPath,
        baudRate: baudRate,
        autoOpen: false
      });

      serialPort.on('open', () => {
        log.info('Port série ouvert:', portPath);
        isPortOpen = true;
        resolve({ success: true, message: 'Port ouvert avec succès' });
      });

      serialPort.on('data', (data) => {
        const message = data.toString().trim();
        log.info('Données reçues:', message);
        
        // Envoyer au renderer
        if (mainWindow && mainWindow.webContents) {
          mainWindow.webContents.send('serial-data', message);
        }
      });

      serialPort.on('error', (error) => {
        log.error('Erreur port série:', error);
        isPortOpen = false;
        reject(error);
      });

      serialPort.on('close', () => {
        log.info('Port série fermé');
        isPortOpen = false;
        if (mainWindow && mainWindow.webContents) {
          mainWindow.webContents.send('serial-closed');
        }
      });

      serialPort.open((err) => {
        if (err) {
          log.error('Erreur ouverture port:', err);
          reject(err);
        }
      });

    } catch (error) {
      log.error('Erreur création port:', error);
      reject(error);
    }
  });
}

/**
 * Fermer le port série
 */
function closeSerialPort() {
  return new Promise((resolve) => {
    if (serialPort && isPortOpen) {
      serialPort.close((err) => {
        if (err) {
          log.error('Erreur fermeture port:', err);
        }
        isPortOpen = false;
        serialPort = null;
        resolve({ success: true });
      });
    } else {
      resolve({ success: true });
    }
  });
}

/**
 * Exécuter une action basée sur le type
 */
async function executeAction(action) {
  log.info('Exécution action:', action);

  try {
    switch (action.type) {
      case 'keyboard':
        return await executeKeyboardAction(action);
      case 'launch':
        return await executeLaunchAction(action);
      case 'command':
        return await executeCommandAction(action);
      default:
        return { success: false, message: 'Type d\'action inconnu' };
    }
  } catch (error) {
    log.error('Erreur exécution action:', error);
    return { success: false, message: error.message };
  }
}

/**
 * Exécuter un raccourci clavier
 * Note: Pour un vrai contrôle clavier, utiliser robotjs ou node-key-sender
 */
async function executeKeyboardAction(action) {
  if (!action.keys) {
    return { success: false, message: 'Aucune touche configurée' };
  }

  // Simulation de l'exécution (pour un vrai contrôle, il faudrait robotjs)
  log.info('Raccourci clavier configuré:', action.keys);
  
  // Dans une implémentation complète, on utiliserait:
  // const robot = require('robotjs');
  // robot.keyTap(action.keys);
  
  return { success: true, message: `Raccourci: ${action.keys}` };
}

/**
 * Lancer un programme
 */
async function executeLaunchAction(action) {
  if (!action.executable) {
    return { success: false, message: 'Aucun exécutable configuré' };
  }

  try {
    const args = action.args ? action.args.split(' ') : [];
    log.info('Lancement programme:', action.executable, args);
    
    const child = spawn(action.executable, args, {
      detached: true,
      stdio: 'ignore'
    });
    
    child.unref(); // Laisser le processus continuer après fermeture de l'app
    
    return { success: true, message: `Programme lancé: ${action.executable}` };
  } catch (error) {
    return { success: false, message: `Erreur: ${error.message}` };
  }
}

/**
 * Exécuter une commande Windows
 */
async function executeCommandAction(action) {
  if (!action.command) {
    return { success: false, message: 'Aucune commande configurée' };
  }

  try {
    log.info('Exécution commande:', action.command);
    
    if (process.platform === 'win32') {
      await execAsync(`start cmd /c "${action.command}"`, {
        shell: 'cmd.exe'
      });
    } else {
      await execAsync(`bash -c "${action.command}"`);
    }
    
    return { success: true, message: `Commande exécutée` };
  } catch (error) {
    return { success: false, message: `Erreur: ${error.message}` };
  }
}

/**
 * Handlers IPC
 */
ipcMain.handle('serial:list', async () => {
  return await listSerialPorts();
});

ipcMain.handle('serial:open', async (event, { path: portPath, baudRate }) => {
  return await openSerialPort(portPath, baudRate);
});

ipcMain.handle('serial:close', async () => {
  return await closeSerialPort();
});

ipcMain.handle('action:execute', async (event, action) => {
  return await executeAction(action);
});

ipcMain.handle('store:get', async (event, key) => {
  return store.get(key);
});

ipcMain.handle('store:set', async (event, key, value) => {
  store.set(key, value);
  return { success: true };
});

ipcMain.handle('store:getAll', async () => {
  return store.store;
});

/**
 * Événements de l'application
 */
app.whenReady().then(() => {
  createWindow();
  createTray();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    closeSerialPort().then(() => {
      app.quit();
    });
  }
});

app.on('before-quit', async () => {
  await closeSerialPort();
});

// Gestion des erreurs
process.on('uncaughtException', (error) => {
  log.error('Erreur non attrapée:', error);
});

process.on('unhandledRejection', (error) => {
  log.error('Promesse non gérée:', error);
});
