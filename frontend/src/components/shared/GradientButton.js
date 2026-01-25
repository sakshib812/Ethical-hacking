import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../../theme';

export default function GradientButton({
    onPress,
    children,
    colors = theme.colors.gradients.primary,
    loading = false,
    disabled = false,
    style
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
            style={[styles.container, style]}
        >
            <LinearGradient
                colors={disabled ? ['#9E9E9E', '#757575'] : colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
            >
                {loading ? (
                    <ActivityIndicator color={theme.colors.neutral.white} />
                ) : (
                    <Text style={styles.text}>{children}</Text>
                )}
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: theme.borderRadius.md,
        overflow: 'hidden',
        ...theme.shadows.sm,
    },
    gradient: {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 48,
    },
    text: {
        color: theme.colors.neutral.white,
        fontSize: theme.typography.fontSize.md,
        fontFamily: theme.typography.fontFamily.semiBold,
        textAlign: 'center',
    },
});
