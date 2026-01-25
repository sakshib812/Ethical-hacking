import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../theme';
import MarathiText from '../shared/MarathiText';

export default function BankingSafetyToggle({ encryption = 'OPEN', hasSSL = false }) {
    // Banking is safe if encryption is WPA2/WPA3 AND SSL is available
    const isSafe = (encryption === 'WPA3' || encryption === 'WPA2') && hasSSL;

    const color = isSafe ? theme.colors.status.safe : theme.colors.status.danger;
    const icon = isSafe ? 'shield-check' : 'shield-alert';

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <MaterialCommunityIcons name={icon} size={32} color={theme.colors.neutral.white} />

            <View style={styles.textContainer}>
                <Text style={styles.mainText}>
                    {isSafe ? '✓ Safe for Banking' : '✗ NOT Safe for Banking'}
                </Text>
                <MarathiText style={styles.marathiText}>
                    {isSafe ? 'बँकिंगसाठी सुरक्षित' : 'बँकिंगसाठी असुरक्षित'}
                </MarathiText>
            </View>

            {!isSafe && (
                <View style={styles.warningContainer}>
                    <Text style={styles.warningText}>
                        Do NOT enter passwords or bank details
                    </Text>
                    <MarathiText style={styles.warningTextMarathi}>
                        पासवर्ड किंवा बँक तपशील टाकू नका
                    </MarathiText>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        ...theme.shadows.md,
        marginVertical: theme.spacing.sm,
    },
    textContainer: {
        flex: 1,
        marginLeft: theme.spacing.md,
    },
    mainText: {
        color: theme.colors.neutral.white,
        fontSize: theme.typography.fontSize.lg,
        fontFamily: theme.typography.fontFamily.bold,
    },
    marathiText: {
        color: theme.colors.neutral.white,
        fontSize: theme.typography.fontSize.md,
        marginTop: theme.spacing.xs,
    },
    warningContainer: {
        marginTop: theme.spacing.sm,
        paddingTop: theme.spacing.sm,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.3)',
    },
    warningText: {
        color: theme.colors.neutral.white,
        fontSize: theme.typography.fontSize.sm,
        fontFamily: theme.typography.fontFamily.medium,
    },
    warningTextMarathi: {
        color: theme.colors.neutral.white,
        fontSize: theme.typography.fontSize.xs,
    },
});
