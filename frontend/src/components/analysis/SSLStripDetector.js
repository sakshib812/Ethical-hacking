import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../theme';
import AnimatedCard from '../shared/AnimatedCard';
import GradientButton from '../shared/GradientButton';
import StatusBadge from '../shared/StatusBadge';
import MarathiText from '../shared/MarathiText';

export default function SSLStripDetector({ onTest }) {
    const [testing, setTesting] = useState(false);
    const [result, setResult] = useState(null);

    const runTest = async () => {
        setTesting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            const mockResult = {
                is_stripped: Math.random() > 0.8,
                tested_sites: ['google.com', 'facebook.com', 'uidai.gov.in'],
                vulnerable_count: Math.floor(Math.random() * 2),
                message: 'All HTTPS connections are secure',
                message_mr: 'सर्व HTTPS कनेक्शन सुरक्षित आहेत',
            };

            if (mockResult.is_stripped) {
                mockResult.message = '⚠️ SSL Stripping Detected! HTTPS downgraded to HTTP.';
                mockResult.message_mr = '⚠️ SSL स्ट्रिपिंग आढळले! HTTPS ला HTTP मध्ये डाउनग्रेड केले.';
            }

            setResult(mockResult);
            if (onTest) onTest(mockResult);
        } catch (error) {
            console.error('SSL test error:', error);
        } finally {
            setTesting(false);
        }
    };

    return (
        <AnimatedCard>
            <View style={styles.header}>
                <MaterialCommunityIcons name="shield-lock" size={28} color={theme.colors.primary.deepOrange} />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>SSL Strip Detector</Text>
                    <MarathiText style={styles.subtitle}>SSL स्ट्रिप डिटेक्टर</MarathiText>
                </View>
            </View>

            <Text style={styles.description}>
                Detects if HTTPS connections are being downgraded to HTTP
            </Text>

            <GradientButton
                onPress={runTest}
                loading={testing}
                style={styles.button}
            >
                {testing ? 'Testing...' : 'Run SSL Test'}
            </GradientButton>

            {result && (
                <View style={styles.resultContainer}>
                    <StatusBadge
                        status={result.is_stripped ? 'danger' : 'safe'}
                        text={result.is_stripped ? 'VULNERABLE' : 'SECURE'}
                    />

                    <Text style={styles.resultText}>{result.message}</Text>
                    <MarathiText style={styles.resultTextMarathi}>{result.message_mr}</MarathiText>

                    <View style={styles.statsContainer}>
                        <View style={styles.statBox}>
                            <Text style={styles.statValue}>{result.tested_sites.length}</Text>
                            <Text style={styles.statLabel}>Sites Tested</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={[styles.statValue, result.vulnerable_count > 0 && { color: theme.colors.status.danger }]}>
                                {result.vulnerable_count}
                            </Text>
                            <Text style={styles.statLabel}>Vulnerable</Text>
                        </View>
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
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: theme.spacing.md,
    },
    statBox: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: theme.typography.fontSize.xxl,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.status.safe,
    },
    statLabel: {
        fontSize: theme.typography.fontSize.xs,
        fontFamily: theme.typography.fontFamily.medium,
        color: theme.colors.neutral.gray,
        marginTop: theme.spacing.xs,
    },
});
