import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../theme';
import AnimatedCard from '../shared/AnimatedCard';
import GradientButton from '../shared/GradientButton';
import StatusBadge from '../shared/StatusBadge';
import MarathiText from '../shared/MarathiText';

export default function DNSLeakTest({ onTest }) {
    const [testing, setTesting] = useState(false);
    const [result, setResult] = useState(null);

    const runTest = async () => {
        setTesting(true);
        try {
            // Simulate API call - in production, call backend
            await new Promise(resolve => setTimeout(resolve, 2000));

            const mockResult = {
                is_leaked: Math.random() > 0.7,
                dns_servers: ['8.8.8.8', '8.8.4.4'],
                expected_isp: 'Airtel',
                actual_isp: Math.random() > 0.7 ? 'Unknown' : 'Airtel',
                message: 'DNS queries are being routed correctly',
                message_mr: 'DNS क्वेरी योग्यरित्या रूट केल्या जात आहेत',
            };

            if (mockResult.is_leaked) {
                mockResult.message = 'DNS Leak Detected! Your queries are exposed.';
                mockResult.message_mr = 'DNS लीक आढळली! तुमच्या क्वेरी उघड आहेत.';
            }

            setResult(mockResult);
            if (onTest) onTest(mockResult);
        } catch (error) {
            console.error('DNS test error:', error);
        } finally {
            setTesting(false);
        }
    };

    return (
        <AnimatedCard>
            <View style={styles.header}>
                <MaterialCommunityIcons name="dns" size={28} color={theme.colors.primary.deepOrange} />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>DNS Leak Test</Text>
                    <MarathiText style={styles.subtitle}>DNS लीक चाचणी</MarathiText>
                </View>
            </View>

            <Text style={styles.description}>
                Checks if your DNS queries are being intercepted or leaked
            </Text>

            <GradientButton
                onPress={runTest}
                loading={testing}
                style={styles.button}
            >
                {testing ? 'Testing...' : 'Run DNS Test'}
            </GradientButton>

            {result && (
                <View style={styles.resultContainer}>
                    <StatusBadge
                        status={result.is_leaked ? 'danger' : 'safe'}
                        text={result.is_leaked ? 'LEAKED' : 'SECURE'}
                    />

                    <Text style={styles.resultText}>{result.message}</Text>
                    <MarathiText style={styles.resultTextMarathi}>{result.message_mr}</MarathiText>

                    <View style={styles.detailsContainer}>
                        <Text style={styles.detailLabel}>DNS Servers:</Text>
                        {result.dns_servers.map((server, idx) => (
                            <Text key={idx} style={styles.detailValue}>• {server}</Text>
                        ))}

                        <Text style={styles.detailLabel}>ISP:</Text>
                        <Text style={styles.detailValue}>{result.actual_isp}</Text>
                    </View>
                </View>
            )}
        </AnimatedCard>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    titleContainer: {
        marginLeft: theme.spacing.sm,
        flex: 1,
    },
    title: {
        fontSize: theme.typography.fontSize.lg,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.neutral.charcoal,
    },
    subtitle: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.neutral.gray,
    },
    description: {
        fontSize: theme.typography.fontSize.sm,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.neutral.darkGray,
        marginBottom: theme.spacing.md,
    },
    button: {
        marginVertical: theme.spacing.sm,
    },
    resultContainer: {
        marginTop: theme.spacing.md,
        padding: theme.spacing.sm,
        backgroundColor: theme.colors.neutral.offWhite,
        borderRadius: theme.borderRadius.md,
    },
    resultText: {
        fontSize: theme.typography.fontSize.base,
        fontFamily: theme.typography.fontFamily.medium,
        color: theme.colors.neutral.charcoal,
        marginTop: theme.spacing.sm,
    },
    resultTextMarathi: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.neutral.darkGray,
        marginTop: theme.spacing.xs,
    },
    detailsContainer: {
        marginTop: theme.spacing.md,
    },
    detailLabel: {
        fontSize: theme.typography.fontSize.sm,
        fontFamily: theme.typography.fontFamily.semiBold,
        color: theme.colors.neutral.darkGray,
        marginTop: theme.spacing.sm,
    },
    detailValue: {
        fontSize: theme.typography.fontSize.sm,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.neutral.gray,
        marginLeft: theme.spacing.sm,
    },
});
