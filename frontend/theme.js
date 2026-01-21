import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#27AE60', // Surakshit (Green) - Main Brand Color
        secondary: '#F2994A', // Savadh (Amber) - Warnings
        error: '#EB5757', // Dhoka (Red) - Critical Risks
        background: '#F5F5F5', // Light Grey Background
        surface: '#FFFFFF', // White Cards
        text: '#333333', // Dark Grey Text
        onPrimary: '#FFFFFF', // Text on Green
    },
    fonts: {
        ...DefaultTheme.fonts,
        // in a real app we would load custom fonts here (Poppins/Tiro)
        // for now we use system defaults but mapped logically
        displayLarge: { fontFamily: 'System', fontWeight: 'bold' },
        bodyLarge: { fontFamily: 'System' },
    }
};
