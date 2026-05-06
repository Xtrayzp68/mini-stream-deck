import { useState } from 'react';
import { Code2, Download, Copy, Check } from 'lucide-react';

const ARDUINO_CODE = `/*
 * ============================================================
 * MINI STREAM DECK - Arduino Code
 * ============================================================
 * 
 * Compatible avec: Arduino Pro Micro (ATmega32U4)
 * 
 * Ce programme lit 6 boutons et envoie des événements
 * via Serial USB au PC.
 * 
 * Format des messages: BTN_1, BTN_2, ..., BTN_6
 * 
 * Connexions:
 *   BTN1 = Pin D2
 *   BTN2 = Pin D3
 *   BTN3 = Pin D4
 *   BTN4 = Pin D5
 *   BTN5 = Pin D6
 *   BTN6 = Pin D7
 * 
 * Chaque bouton doit être connecté entre la pin et GND.
 * Le mode INPUT_PULLUP est utilisé (pas de résistance externe).
 * ============================================================
 */

// Configuration des pins des boutons
const int BUTTON_PINS[] = {2, 3, 4, 5, 6, 7};
const int NUM_BUTTONS = 6;
const unsigned long DEBOUNCE_DELAY = 50;
const unsigned long SERIAL_BAUD_RATE = 9600;

// Variables globales
int previousState[NUM_BUTTONS];
unsigned long lastDebounceTime[NUM_BUTTONS];
bool buttonState[NUM_BUTTONS];

void setup() {
  Serial.begin(SERIAL_BAUD_RATE);
  
  while (!Serial) {
    ; // Attendre le port série
  }
  
  for (int i = 0; i < NUM_BUTTONS; i++) {
    pinMode(BUTTON_PINS[i], INPUT_PULLUP);
    previousState[i] = HIGH;
    buttonState[i] = false;
    lastDebounceTime[i] = 0;
  }
  
  Serial.println("Mini Stream Deck v1.0");
  Serial.println("Pret!");
}

bool readButton(int index) {
  int currentState = digitalRead(BUTTON_PINS[index]);
  bool pressed = false;
  
  if (currentState == LOW && previousState[index] == HIGH) {
    unsigned long currentTime = millis();
    if ((currentTime - lastDebounceTime[index]) > DEBOUNCE_DELAY) {
      pressed = true;
      lastDebounceTime[index] = currentTime;
    }
  }
  
  previousState[index] = currentState;
  return pressed;
}

void loop() {
  for (int i = 0; i < NUM_BUTTONS; i++) {
    if (readButton(i)) {
      Serial.print("BTN_");
      Serial.println(i + 1);
    }
  }
  delay(1);
}`;

export function ArduinoCodeViewer() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(ARDUINO_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([ARDUINO_CODE], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mini_stream_deck.ino';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-gray-800 hover:bg-gray-750 border border-gray-700 rounded-xl p-4 
          flex items-center justify-center gap-3 transition-colors text-gray-300 hover:text-white"
      >
        <Code2 className="w-5 h-5" />
        Voir le code Arduino
      </button>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-750 border-b border-gray-700">
        <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
          <Code2 className="w-4 h-4" />
          mini_stream_deck.ino
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2 text-sm"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400" />
            )}
            <span className="text-gray-400">{copied ? 'Copié!' : 'Copier'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2 text-sm"
          >
            <Download className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400">Télécharger</span>
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400"
          >
            ×
          </button>
        </div>
      </div>

      {/* Code */}
      <pre className="p-4 overflow-x-auto text-sm text-gray-300 font-mono max-h-96 overflow-y-auto">
        <code>{ARDUINO_CODE}</code>
      </pre>
    </div>
  );
}
