/// <reference types="vite/client" />

// Web Serial API Type Declarations
interface SerialPort {
  open(options: { baudRate: number }): Promise<void>;
  close(): Promise<void>;
  readable: ReadableStream<Uint8Array> | null;
  writable: WritableStream<Uint8Array> | null;
  getInfo(): SerialPortInfo;
}

interface SerialPortInfo {
  usbVendorId?: number;
  usbProductId?: number;
}

interface Serial {
  requestPort(options?: SerialOptions): Promise<SerialPort>;
  getPorts(): Promise<SerialPort[]>;
}

interface SerialOptions {
  filters?: SerialPortFilter[];
}

interface SerialPortFilter {
  usbVendorId?: number;
  usbProductId?: number;
}

interface Navigator {
  serial?: Serial;
}

// Electron API Types
interface ElectronAPI {
  // Serial Port
  listSerialPorts: () => Promise<SerialPortInfo[]>;
  openSerialPort: (portPath: string, baudRate: number) => Promise<{ success: boolean; message: string }>;
  closeSerialPort: () => Promise<{ success: boolean }>;
  onSerialData: (callback: (data: string) => void) => void;
  onSerialClosed: (callback: () => void) => void;
  
  // Actions
  executeAction: (action: ButtonAction) => Promise<{ success: boolean; message: string }>;
  
  // Store
  storeGet: (key: string) => Promise<any>;
  storeSet: (key: string, value: any) => Promise<{ success: boolean }>;
  storeGetAll: () => Promise<any>;
  
  // Info
  platform: NodeJS.Platform;
  isDev: boolean;
}

interface Window {
  electronAPI: ElectronAPI;
}

interface SerialPortInfo {
  path: string;
  manufacturer: string;
  serialNumber: string;
  vendorId?: number;
  productId?: number;
}
