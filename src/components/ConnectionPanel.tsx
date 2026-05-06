import { PlugZap, Loader2, Unplug, Plug } from 'lucide-react';

interface ConnectionPanelProps {
  isConnected: boolean;
  isConnecting: boolean;
  portName: string;
  onConnect: () => void;
  onDisconnect: () => void;
  lastButton: number | null;
}

export function ConnectionPanel({
  isConnected,
  isConnecting,
  portName,
  onConnect,
  onDisconnect,
  lastButton
}: ConnectionPanelProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <PlugZap className="w-5 h-5" />
        Connexion Série
      </h2>
      
      <div className="flex flex-col gap-4">
        {/* Status */}
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
          <span className="text-gray-300">
            {isConnected ? `Connecté - ${portName}` : 'Non connecté'}
          </span>
        </div>
        
        {/* Dernier bouton pressé */}
        {lastButton && (
          <div className="bg-green-900/50 border border-green-700 rounded-lg p-3">
            <span className="text-green-400 text-sm">
              Dernier signal: BTN_{lastButton}
            </span>
          </div>
        )}
        
        {/* Bouton connexion */}
        <button
          onClick={isConnected ? onDisconnect : onConnect}
          disabled={isConnecting}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all
            ${isConnected 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          {isConnecting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Connexion...
            </>
          ) : isConnected ? (
            <>
              <Unplug className="w-5 h-5" />
              Déconnecter
            </>
          ) : (
            <>
              <Plug className="w-5 h-5" />
              Connecter l'Arduino
            </>
          )}
        </button>
        
        {/* Info Web Serial */}
        <div className="text-xs text-gray-500 mt-2">
          <p className="mb-1">💡 La Web Serial API nécessite:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Chrome, Edge ou Opera (pas Firefox/Safari)</li>
            <li>Connexion HTTPS ou localhost</li>
            <li>Arduino avec drivers installés</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
