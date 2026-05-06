import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

export function Instructions() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-750 transition-colors"
      >
        <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
          <HelpCircle className="w-4 h-4" />
          Guide d'installation
        </h3>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="px-4 pb-4 space-y-4 text-sm text-gray-300">
          {/* Matériel */}
          <div>
            <h4 className="font-medium text-white mb-2">🔧 Matériel nécessaire</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>Arduino Pro Micro (ATmega32U4, 5V/16MHz)</li>
              <li>6 boutons poussoirs (momentary)</li>
              <li>Câble USB Micro</li>
              <li>Câble jumper (optionnel)</li>
            </ul>
          </div>

          {/* Connexions */}
          <div>
            <h4 className="font-medium text-white mb-2">🔌 Schéma de câblage</h4>
            <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs">
              <p className="text-gray-500"># Chaque bouton: une patte → Pin, l'autre → GND</p>
              <p className="text-blue-400">BTN1 → Pin D2 (GPIO 0)</p>
              <p className="text-green-400">BTN2 → Pin D3 (GPIO 1)</p>
              <p className="text-yellow-400">BTN3 → Pin D4 (GPIO 2)</p>
              <p className="text-red-400">BTN4 → Pin D5 (GPIO 3)</p>
              <p className="text-purple-400">BTN5 → Pin D6 (GPIO 4)</p>
              <p className="text-pink-400">BTN6 → Pin D7 (GPIO 5)</p>
            </div>
          </div>

          {/* Installation Arduino */}
          <div>
            <h4 className="font-medium text-white mb-2">📥 Installation Arduino</h4>
            <ol className="list-decimal list-inside space-y-1 text-gray-400">
              <li>Installer Arduino IDE 2.x 
                <a href="https://www.arduino.cc/en/software" target="_blank" rel="noopener"
                   className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 ml-1">
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>Connecter le Pro Micro en USB</li>
              <li>Sélectionner: <span className="text-white">Outils → Carte → Arduino Leonardo</span></li>
              <li>Sélectionner le bon port COM</li>
              <li>Copier le code Arduino (bouton ci-dessus)</li>
              <li>Compiler et téléverser (→)</li>
            </ol>
          </div>

          {/* Utilisation */}
          <div>
            <h4 className="font-medium text-white mb-2">🎮 Utilisation</h4>
            <ol className="list-decimal list-inside space-y-1 text-gray-400">
              <li>Cliquer sur "Connecter l'Arduino"</li>
              <li>Sélectionner le port dans le navigateur</li>
              <li>Tester les boutons (ils apparaissent dans la console)</li>
              <li>Configurer chaque bouton (clic sur un bouton)</li>
              <li>Sauvegarder la configuration</li>
            </ol>
          </div>

          {/* Navigateur */}
          <div>
            <h4 className="font-medium text-white mb-2">🌐 Navigateur requis</h4>
            <p className="text-gray-400">
              La Web Serial API ne fonctionne que sur:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>Google Chrome ✅</li>
              <li>Microsoft Edge ✅</li>
              <li>Opera ✅</li>
              <li>Firefox ❌ (non supporté)</li>
              <li>Safari ❌ (non supporté)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
