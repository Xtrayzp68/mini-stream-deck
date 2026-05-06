/*
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
 * Le mode INPUT_PULLUP est utilisé (pas de résistance externe nécessaire).
 * 
 * Auteur: Mini Stream Deck Project
 * Version: 1.0.0
 * ============================================================
 */

// ============================================================
// CONFIGURATION
// ============================================================

// Définition des pins des boutons
const int BUTTON_PINS[] = {2, 3, 4, 5, 6, 7};
const int NUM_BUTTONS = 6;

// Paramètres de debounce
const unsigned long DEBOUNCE_DELAY = 50;  // 50ms de debounce
const unsigned long SERIAL_BAUD_RATE = 9600;

// ============================================================
// VARIABLES GLOBALES
// ============================================================

// États précédents des boutons (pour détection de changement)
int previousState[NUM_BUTTONS];

// Temps du dernier changement d'état (pour debounce)
unsigned long lastDebounceTime[NUM_BUTTONS];

// État débounced actuel
bool buttonState[NUM_BUTTONS];

// ============================================================
// FONCTIONS
// ============================================================

/**
 * Initialisation du programme
 */
void setup() {
  // Initialisation de la communication série
  Serial.begin(SERIAL_BAUD_RATE);
  
  // Attente de la connexion série (important pour Pro Micro)
  while (!Serial) {
    ; // Attendre que le port série soit prêt
  }
  
  // Configuration des pins en entrance avec pullup interne
  for (int i = 0; i < NUM_BUTTONS; i++) {
    pinMode(BUTTON_PINS[i], INPUT_PULLUP);
    previousState[i] = HIGH;  // État initial (non pressé avec pullup)
    buttonState[i] = false;
    lastDebounceTime[i] = 0;
  }
  
  // Message de démarrage
  Serial.println("Mini Stream Deck v1.0");
  Serial.println("Pret!");
}

/**
 * Lecture et debounce d'un bouton
 * Retourne true si le bouton vient d'être pressé (front descendant)
 */
bool readButton(int index) {
  int currentState = digitalRead(BUTTON_PINS[index]);
  bool pressed = false;
  
  // Détection du front descendant (HIGH -> LOW avec INPUT_PULLUP)
  if (currentState == LOW && previousState[index] == HIGH) {
    unsigned long currentTime = millis();
    
    // Vérification du debounce
    if ((currentTime - lastDebounceTime[index]) > DEBOUNCE_DELAY) {
      pressed = true;
      lastDebounceTime[index] = currentTime;
    }
  }
  
  // Mise à jour de l'état précédent
  previousState[index] = currentState;
  
  return pressed;
}

/**
 * Boucle principale
 */
void loop() {
  // Lecture de chaque bouton
  for (int i = 0; i < NUM_BUTTONS; i++) {
    if (readButton(i)) {
      // Envoi du message de bouton
      Serial.print("BTN_");
      Serial.println(i + 1);  // Numérotation de 1 à 6
    }
  }
  
  // Petite pause pour CPU (optionnel, améliore stabilité)
  delay(1);
}
