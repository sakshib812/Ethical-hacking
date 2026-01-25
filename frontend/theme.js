
import { MD3LightTheme as DefaultTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
    displayLarge: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 57,
        fontWeight: '700',
        letterSpacing: 0,
        lineHeight: 64,
    },
    displayMedium: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 45,
        fontWeight: '700',
        letterSpacing: 0,
        lineHeight: 52,
    },
    displaySmall: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 36,
        fontWeight: '700',
        letterSpacing: 0,
        lineHeight: 44,
    },
    headlineLarge: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 32,
        fontWeight: '700',
        letterSpacing: 0,
        lineHeight: 40,
    },
    headlineMedium: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 28,
        fontWeight: '600',
        letterSpacing: 0,
        lineHeight: 36,
    },
    headlineSmall: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 24,
        fontWeight: '600',
        letterSpacing: 0,
        lineHeight: 32,
    },
    titleLarge: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 22,
        fontWeight: '400',
        letterSpacing: 0,
        lineHeight: 28,
    },
    titleMedium: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 0.15,
        lineHeight: 24,
    },
    titleSmall: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: 0.1,
        lineHeight: 20,
    },
    labelLarge: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: 0.1,
        lineHeight: 20,
    },
    labelMedium: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 0.5,
        lineHeight: 16,
    },
    labelSmall: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 11,
        fontWeight: '500',
        letterSpacing: 0.5,
        lineHeight: 16,
    },
    bodyLarge: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        fontWeight: '400',
        letterSpacing: 0.15,
        lineHeight: 24,
    },
    bodyMedium: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        fontWeight: '400',
        letterSpacing: 0.25,
        lineHeight: 20,
    },
    bodySmall: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        fontWeight: '400',
        letterSpacing: 0.4,
        lineHeight: 16,
    },
};

export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#27AE60', // Surakshit (Green)
        onPrimary: '#FFFFFF',
        primaryContainer: '#D1F2EB',
        onPrimaryContainer: '#0E3E26',

        secondary: '#F2994A', // Savadh (Amber)
        onSecondary: '#000000',
        secondaryContainer: '#FDEBD0',
        onSecondaryContainer: '#5B2C00',

        error: '#EB5757', // Dhoka (Red)
        onError: '#FFFFFF',
        errorContainer: '#FADBD8',
        onErrorContainer: '#641E16',

        background: '#F7FFF9', // Very light green tint
        onBackground: '#1A1C19',
        surface: '#FFFFFF',
        onSurface: '#1A1C19',

        // Custom Trust Colors (Saffron & Blue accents for specific UI elements)
        custom: {
            saffron: '#FF9933',
            chakraBlue: '#000080',
            success: '#27AE60',
            warning: '#F2994A',
            danger: '#EB5757',
        }
    },
    fonts: configureFonts({ config: fontConfig }),
};

