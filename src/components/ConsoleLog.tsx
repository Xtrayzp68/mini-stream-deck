import { useEffect, useRef } from 'react';
import { Terminal, Trash2 } from 'lucide-react';

interface ConsoleLogProps {
  logs: string[];
  onClear: () => void;
}

export function ConsoleLog({ logs, onClear }: ConsoleLogProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          Console Série
        </h3>
        <button
          onClick={onClear}
          className="p-1 hover:bg-gray-700 rounded transition-colors"
          title="Effacer les logs"
        >
          <Trash2 className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Logs */}
      <div
        ref={scrollRef}
        className="h-48 overflow-y-auto p-3 font-mono text-sm"
      >
        {logs.length === 0 ? (
          <p className="text-gray-500 italic">
            En attente de connexion...
          </p>
        ) : (
          logs.map((log, index) => (
            <div
              key={index}
              className={`py-0.5 ${
                log.includes('succès') || log.includes('Connecté')
                  ? 'text-green-400'
                  : log.includes('Erreur') || log.includes('error')
                  ? 'text-red-400'
                  : log.includes('annulée') || log.includes('attention')
                  ? 'text-yellow-400'
                  : log.includes('BTN_')
                  ? 'text-blue-400 font-bold'
                  : 'text-gray-300'
              }`}
            >
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
