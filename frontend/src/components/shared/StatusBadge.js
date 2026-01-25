import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../../theme';

export default function StatusBadge({ status, text, size = 'medium' }) {
    const getStatusColor = () => {
        switch (status.toLowerCase()) {
            case 'safe':
                return theme.colors.status.safe;
            case 'warning':
                return theme.colors.status.warning;
            case 'danger':
            case 'critical':
                return theme.colors.status.danger;
            case 'info':
                return theme.colors.status.info;
            default:
                return theme.colors.neutral.gray;
        }
    };

    const getSizeStyles = () => {
        switch (size) {
            case 'small':
                return { padding: theme.spacing.xs, fontSize: theme.typography.fontSize.xs };
            case 'large':
                return { padding: theme.spacing.sm, fontSize: theme.typography.fontSize.md };
            default:
                return { padding: theme.spacing.sm, fontSize: theme.typography.fontSize.sm };
        }
    };

    const color = getStatusColor();
    const sizeStyles = getSizeStyles();

    return (
        <View style={[styles.badge, { backgroundColor: color }, { padding: sizeStyles.padding }]}>
            <Text style={[styles.text, { fontSize: sizeStyles.fontSize }]}>
                {text || status.toUpperCase()}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        borderRadius: theme.borderRadius.sm,
        alignSelf: 'flex-start',
    },
    text: {
        color: theme.colors.neutral.white,
        fontFamily: theme.typography.fontFamily.semiBold,
        textTransform: 'uppercase',
    },
});
