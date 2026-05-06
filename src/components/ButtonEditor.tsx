import { useState } from 'react';
import type { ButtonConfig, ActionType, ButtonAction } from '../types';
import { X, Save, Keyboard, Terminal, AppWindow, CircleOff, Palette } from 'lucide-react';

interface ButtonEditorProps {
  button: ButtonConfig;
  onSave: (button: ButtonConfig) => void;
  onClose: () => void;
}

const ACTION_TYPES: { value: ActionType; label: string; icon: typeof Keyboard }[] = [
  { value: 'none', label: 'Aucune action', icon: CircleOff },
  { value: 'keyboard', label: 'Raccourci clavier', icon: Keyboard },
  { value: 'launch', label: 'Lancer programme', icon: AppWindow },
  { value: 'command', label: 'Commande Windows', icon: Terminal }
];

const PRESET_COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899',
  '#06b6d4', '#84cc16', '#f97316', '#6366f1', '#14b8a6', '#e11d48'
];

const PRESET_KEYS = [
  { label: 'Ctrl+C', value: 'ctrl+c' },
  { label: 'Ctrl+V', value: 'ctrl+v' },
  { label: 'Ctrl+Z', value: 'ctrl+z' },
  { label: 'Ctrl+X', value: 'ctrl+x' },
  { label: 'Alt+Tab', value: 'alt+tab' },
  { label: 'F1-F12', value: 'f1' },
  { label: 'Espace', value: 'space' },
  { label: 'Entrée', value: 'enter' },
  { label: 'Suppr', value: 'delete' },
  { label: 'Échap', value: 'escape' }
];

export function ButtonEditor({ button, onSave, onClose }: ButtonEditorProps) {
  const [editedButton, setEditedButton] = useState<ButtonConfig>({ ...button });

  const updateAction = (partial: Partial<ButtonAction>) => {
    setEditedButton(prev => ({
      ...prev,
      action: { ...prev.action, ...partial }
    }));
  };

  const handleSave = () => {
    onSave(editedButton);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-lg font-bold text-white">
            Modifier {button.name}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Nom du bouton */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Nom</label>
            <input
              type="text"
              value={editedButton.name}
              onChange={(e) => setEditedButton(prev => ({ ...prev, name: e.target.value }))}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Couleur */}
          <div>
            <label className="block text-sm text-gray-400 mb-1 flex items-center gap-1">
              <Palette className="w-4 h-4" />
              Couleur
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESET_COLORS.map(color => (
                <button
                  key={color}
                  onClick={() => setEditedButton(prev => ({ ...prev, color }))}
                  className={`w-8 h-8 rounded-lg transition-transform ${
                    editedButton.color === color ? 'ring-2 ring-white scale-110' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
              <input
                type="color"
                value={editedButton.color}
                onChange={(e) => setEditedButton(prev => ({ ...prev, color: e.target.value }))}
                className="w-8 h-8 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Type d'action */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Type d'action</label>
            <div className="grid grid-cols-2 gap-2">
              {ACTION_TYPES.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => updateAction({ type: value })}
                  className={`flex items-center gap-2 p-3 rounded-lg transition-all ${
                    editedButton.action.type === value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Configuration selon le type d'action */}
          {editedButton.action.type === 'keyboard' && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Raccourci clavier</label>
                <input
                  type="text"
                  value={editedButton.action.keys || ''}
                  onChange={(e) => updateAction({ keys: e.target.value.toLowerCase() })}
                  placeholder="ex: ctrl+shift+f"
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Préréglages</label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_KEYS.map(({ label, value }) => (
                    <button
                      key={value}
                      onClick={() => updateAction({ 
                        keys: value,
                        label: `${label}`
                      })}
                      className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-sm transition-colors"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {editedButton.action.type === 'launch' && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Chemin du programme</label>
                <input
                  type="text"
                  value={editedButton.action.executable || ''}
                  onChange={(e) => updateAction({ executable: e.target.value })}
                  placeholder="ex: C:\Program Files\App\app.exe"
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Arguments (optionnel)</label>
                <input
                  type="text"
                  value={editedButton.action.args || ''}
                  onChange={(e) => updateAction({ args: e.target.value })}
                  placeholder="ex: --fullscreen"
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          )}

          {editedButton.action.type === 'command' && (
            <div>
              <label className="block text-sm text-gray-400 mb-1">Commande Windows</label>
              <textarea
                value={editedButton.action.command || ''}
                onChange={(e) => updateAction({ command: e.target.value })}
                placeholder="ex: notepad.exe&#10;ex: shutdown /s /t 60"
                rows={3}
                className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono"
              />
              <p className="text-xs text-gray-500 mt-1">
                ⚠️ Attention: les commandes s'exécutent avec les permissions de l'utilisateur
              </p>
            </div>
          )}

          {/* Label personnalisé */}
          {editedButton.action.type !== 'none' && (
            <div>
              <label className="block text-sm text-gray-400 mb-1">Label affiché</label>
              <input
                type="text"
                value={editedButton.action.label}
                onChange={(e) => updateAction({ label: e.target.value })}
                placeholder="Description de l'action"
                className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-4 border-t border-gray-700">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
