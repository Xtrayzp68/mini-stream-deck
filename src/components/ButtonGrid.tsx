import type { ButtonConfig } from '../types';
import { Keyboard, Terminal, AppWindow, CircleOff } from 'lucide-react';

interface ButtonGridProps {
  buttons: ButtonConfig[];
  activeButton: number | null;
  lastPressedButton: number | null;
  onSelectButton: (button: ButtonConfig) => void;
}

const actionIcons = {
  keyboard: Keyboard,
  command: Terminal,
  launch: AppWindow,
  none: CircleOff
};

export function ButtonGrid({
  buttons,
  activeButton,
  lastPressedButton,
  onSelectButton
}: ButtonGridProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span className="text-2xl">🎛️</span>
        Boutons
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {buttons.map((button) => {
          const Icon = actionIcons[button.action.type];
          const isActive = activeButton === button.id;
          const isPressed = lastPressedButton === button.id;
          
          return (
            <button
              key={button.id}
              onClick={() => onSelectButton(button)}
              className={`relative aspect-square rounded-xl p-4 transition-all duration-200 
                flex flex-col items-center justify-center gap-2
                ${isActive 
                  ? 'ring-2 ring-white scale-105' 
                  : 'hover:scale-102'
                }
                ${isPressed ? 'animate-pulse ring-2 ring-green-400' : ''}
              `}
              style={{ backgroundColor: button.color }}
            >
              {/* Numéro du bouton */}
              <div className="absolute top-2 left-2 text-xs bg-black/30 px-2 py-0.5 rounded">
                BTN_{button.id}
              </div>
              
              {/* Icône d'action */}
              <Icon className="w-8 h-8 text-white" />
              
              {/* Nom du bouton */}
              <span className="text-white text-sm font-medium text-center">
                {button.name}
              </span>
              
              {/* Label de l'action */}
              <span className="text-white/70 text-xs text-center truncate max-w-full">
                {button.action.label}
              </span>
              
              {/* Indicateur d'action */}
              {button.action.type !== 'none' && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
