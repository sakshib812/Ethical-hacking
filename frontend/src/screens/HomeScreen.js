import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import theme from '../theme';

// Dashboard Components
import SafetyScoreGauge from '../components/dashboard/SafetyScoreGauge';
import BankingSafetyToggle from '../components/dashboard/BankingSafetyToggle';
import KillSwitchButton from '../components/dashboard/KillSwitchButton';
import SessionTimer from '../components/dashboard/SessionTimer';

// Shared Components
import AnimatedCard from '../components/shared/AnimatedCard';
import StatusBadge from '../components/shared/StatusBadge';
import PulseIndicator from '../components/shared/PulseIndicator';
import MarathiText from '../components/shared/MarathiText';

export default function HomeScreen() {
    const [safetyScore, setSafetyScore] = useState(45);
    const [sessionStart] = useState(new Date());
    const [networkInfo, setNetworkInfo] = useState({
        ssid: 'CyberCafe_Free',
        encryption: 'OPEN',
        hasSSL: false,
        isMonitoring: true,
    });

    // Simulate fetching safety score from API
    useEffect(() => {
        // In production, this would fetch from backend
        const fetchSafetyScore = async () => {
            // Simulated API call
            setTimeout(() => {
                setSafetyScore(Math.floor(Math.random() * 100));
            }, 2000);
        };

        fetchSafetyScore();
    }, []);

    const handleDisconnect = () => {
        console.log('WiFi disconnected');
        // In production, this would call native WiFi disconnect
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>Digital Guard</Text>
                        <MarathiText style={styles.subtitle}>डिजिटल रक्षक</MarathiText>
                    </View>
                    <PulseIndicator
                        active={networkInfo.isMonitoring}
                        color={theme.colors.status.safe}
                        size={16}
                    />
                </View>

                {/* Current Network Info */}
                <AnimatedCard gradient>
                    <View style={styles.networkInfo}>
                        <Text style={styles.networkLabel}>Connected to:</Text>
                        <Text style={styles.networkName}>{networkInfo.ssid}</Text>
                        <View style={styles.encryptionBadge}>
                            <StatusBadge
                                status={networkInfo.encryption === 'OPEN' ? 'danger' : 'warning'}
                                text={networkInfo.encryption}
                                size="small"
                            />
                        </View>
                    </View>
                </AnimatedCard>

                {/* Safety Score Gauge */}
                <AnimatedCard>
                    <SafetyScoreGauge score={safetyScore} />
                </AnimatedCard>

                {/* Banking Safety Toggle */}
                <BankingSafetyToggle
                    encryption={networkInfo.encryption}
                    hasSSL={networkInfo.hasSSL}
                />

                {/* Session Timer */}
                <SessionTimer startTime={sessionStart} />

                {/* Kill Switch Button */}
                <KillSwitchButton onDisconnect={handleDisconnect} />

                {/* Quick Stats */}
                <View style={styles.statsContainer}>
                    <AnimatedCard style={styles.statCard}>
                        <Text style={styles.statValue}>12</Text>
                        <Text style={styles.statLabel}>Devices</Text>
                        <MarathiText style={styles.statLabelMarathi}>उपकरणे</MarathiText>
                    </AnimatedCard>

                    <AnimatedCard style={styles.statCard}>
                        <Text style={styles.statValue}>3</Text>
                        <Text style={styles.statLabel}>Alerts</Text>
                        <MarathiText style={styles.statLabelMarathi}>सूचना</MarathiText>
                    </AnimatedCard>
                </View>

                {/* Info Card */}
                <AnimatedCard>
                    <View style={styles.infoCard}>
                        <Text style={styles.infoTitle}>🛡️ Phase 1 MVP Features</Text>
                        <Text style={styles.infoText}>✓ Instant Safety Score Gauge</Text>
                        <Text style={styles.infoText}>✓ Banking Safety Indicator</Text>
                        <Text style={styles.infoText}>✓ Emergency Kill Switch</Text>
                        <Text style={styles.infoText}>✓ Session Duration Timer</Text>
                        <MarathiText style={styles.infoMarathi}>
                            सर्व वैशिष्ट्ये सक्रिय आहेत
                        </MarathiText>
                    </View>
                </AnimatedCard>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.neutral.offWhite,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: theme.spacing.md,
        paddingBottom: theme.spacing.xxxl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
        paddingTop: theme.spacing.sm,
    },
    title: {
        fontSize: theme.typography.fontSize.xxxl,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.primary.deepOrange,
    },
    subtitle: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.neutral.darkGray,
    },
    networkInfo: {
        alignItems: 'center',
    },
    networkLabel: {
        fontSize: theme.typography.fontSize.sm,
        fontFamily: theme.typography.fontFamily.medium,
        color: theme.colors.neutral.darkGray,
    },
    networkName: {
        fontSize: theme.typography.fontSize.xl,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.neutral.charcoal,
        marginTop: theme.spacing.xs,
    },
    encryptionBadge: {
        marginTop: theme.spacing.sm,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: theme.spacing.md,
    },
    statCard: {
        flex: 1,
        marginHorizontal: theme.spacing.xs,
        alignItems: 'center',
    },
    statValue: {
        fontSize: theme.typography.fontSize.xxxl,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.primary.deepOrange,
    },
    statLabel: {
        fontSize: theme.typography.fontSize.sm,
        fontFamily: theme.typography.fontFamily.medium,
        color: theme.colors.neutral.darkGray,
        marginTop: theme.spacing.xs,
    },
    statLabelMarathi: {
        fontSize: theme.typography.fontSize.xs,
        color: theme.colors.neutral.gray,
    },
    infoCard: {
        padding: theme.spacing.sm,
    },
    infoTitle: {
        fontSize: theme.typography.fontSize.lg,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.neutral.charcoal,
        marginBottom: theme.spacing.sm,
    },
    infoText: {
        fontSize: theme.typography.fontSize.base,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.neutral.darkGray,
        marginVertical: theme.spacing.xs / 2,
    },
    infoMarathi: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.status.safe,
        marginTop: theme.spacing.sm,
        textAlign: 'center',
    },
});
