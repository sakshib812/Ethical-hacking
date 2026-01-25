import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../theme';
import MarathiText from '../shared/MarathiText';

export default function KillSwitchButton({ onDisconnect }) {
    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => {
        Alert.alert(
            'Disconnect WiFi?',
            'This will immediately disconnect you from the current network for your safety.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Disconnect',
                    style: 'destructive',
                    onPress: () => {
                        if (onDisconnect) {
                            onDisconnect();
                        }
                        Alert.alert(
                            'Disconnected',
                            'WiFi has been disabled for your safety.\n\nवाय-फाय सुरक्षिततेसाठी बंद केले आहे.'
                        );
                    },
                },
            ]
        );
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handlePress}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            activeOpacity={0.9}
        >
            <LinearGradient
                colors={[theme.colors.status.danger, theme.colors.status.critical]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.gradient, isPressed && styles.pressed]}
            >
                <MaterialCommunityIcons
                    name="power"
                    size={40}
                    color={theme.colors.neutral.white}
                />

                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>EMERGENCY DISCONNECT</Text>
                    <MarathiText style={styles.marathiText}>आपत्कालीन डिस्कनेक्ट</MarathiText>
                </View>

                <View style={styles.pulseContainer}>
                    <View style={styles.pulse} />
                    <View style={[styles.pulse, styles.pulseDelay]} />
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: theme.borderRadius.xl,
        overflow: 'hidden',
        ...theme.shadows.lg,
        marginVertical: theme.spacing.md,
    },
    gradient: {
        paddingVertical: theme.spacing.lg,
        paddingHorizontal: theme.spacing.xl,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 120,
    },
    pressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
    textContainer: {
        alignItems: 'center',
        marginTop: theme.spacing.sm,
    },
    mainText: {
        color: theme.colors.neutral.white,
        fontSize: theme.typography.fontSize.xl,
        fontFamily: theme.typography.fontFamily.bold,
        textAlign: 'center',
        letterSpacing: 1,
    },
    marathiText: {
        color: theme.colors.neutral.white,
        fontSize: theme.typography.fontSize.md,
        marginTop: theme.spacing.xs,
    },
    pulseContainer: {
        position: 'absolute',
        top: theme.spacing.md,
        right: theme.spacing.md,
    },
    pulse: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: theme.colors.neutral.white,
        position: 'absolute',
    },
    pulseDelay: {
        opacity: 0.5,
    },
});
