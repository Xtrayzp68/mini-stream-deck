import { useRef } from 'react';
import type { StreamDeckConfig } from '../types';
import { Upload, Download, RotateCcw } from 'lucide-react';
import { DEFAULT_CONFIG } from '../types';

interface ConfigManagerProps {
  config: StreamDeckConfig;
  onConfigChange: (config: StreamDeckConfig) => void;
}

export function ConfigManager({ config, onConfigChange }: ConfigManagerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stream-deck-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string) as StreamDeckConfig;
        // Validate basic structure
        if (imported.buttons && Array.isArray(imported.buttons)) {
          onConfigChange(imported);
          alert('Configuration importée avec succès!');
        } else {
          alert('Format de fichier invalide');
        }
      } catch {
        alert('Erreur lors de la lecture du fichier');
      }
    };
    reader.readAsText(file);
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleReset = () => {
    if (confirm('Réinitialiser toute la configuration? Cette action est irréversible.')) {
      onConfigChange(DEFAULT_CONFIG);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
      <h3 className="text-sm font-medium text-gray-300 mb-3">Configuration</h3>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 
            text-gray-300 rounded-lg text-sm transition-colors"
        >
          <Download className="w-4 h-4" />
          Exporter JSON
        </button>
        
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 
            text-gray-300 rounded-lg text-sm transition-colors"
        >
          <Upload className="w-4 h-4" />
          Importer JSON
        </button>
        
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-3 py-2 bg-red-900/50 hover:bg-red-800/50 
            text-red-300 rounded-lg text-sm transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Réinitialiser
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </div>
    </div>
  );
}
