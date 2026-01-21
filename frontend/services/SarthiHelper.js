import * as Speech from 'expo-speech';

const ALERTS_MARATHI = {
    'MITM': "Savadha raha! Konitari tumcha mahiti chornyacha prayatna karat aahe.",
    'OPEN': "He WiFi surakshit nahi. Krupaya VPN vapara.",
    'PHISHING': "Savadha! Hi website nakli asu shakate.",
    'SAFE': "Tumchya connection surakshit aahe.",
};

export const initSarthi = () => {
    // Check if TTS is available (optional setup)
    console.log("Sarthi Voice Assistant Initialized 🗣️");
};

export const playSecurityAlert = (alertType) => {
    const text = ALERTS_MARATHI[alertType] || "Savadha raha! Dhoka detect zala aahe.";

    console.log(`Sarthi Speaking: ${text}`);

    Speech.speak(text, {
        language: 'mr-IN', // Marathi(India) if available, else standard voice
        pitch: 1.0,
        rate: 0.9,
    });
};
