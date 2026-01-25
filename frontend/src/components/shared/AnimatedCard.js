import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../../theme';

export default function AnimatedCard({ children, onPress, style, gradient = false }) {
    const CardWrapper = onPress ? TouchableOpacity : View;

    const cardContent = (
        <View style={[styles.card, style]}>
            {children}
        </View>
    );

    if (gradient) {
        return (
            <CardWrapper onPress={onPress} activeOpacity={0.9}>
                <LinearGradient
                    colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0.15)']}
                    style={[styles.card, style]}
                >
                    {children}
                </LinearGradient>
            </CardWrapper>
        );
    }

    return (
        <CardWrapper onPress={onPress} activeOpacity={0.9}>
            {cardContent}
        </CardWrapper>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.neutral.white,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        ...theme.shadows.md,
        marginVertical: theme.spacing.sm,
    },
});
