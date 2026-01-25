import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import technical components
import ChannelGraph from '../components/technical/ChannelGraph';
import PacketLossMonitor from '../components/technical/PacketLossMonitor';
import DistanceEstimator from '../components/technical/DistanceEstimator';
import SignalMeter from '../components/technical/SignalMeter';

// Import shared components
import AnimatedCard from '../components/shared/AnimatedCard';
import MarathiText from '../components/shared/MarathiText';

export default function TechnicalScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Technical Analysis</Text>
                <MarathiText style={styles.subtitle}>तांत्रिक विश्लेषण</MarathiText>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <AnimatedCard>
                    <View style={styles.infoBox}>
                        <MaterialCommunityIcons name="information" size={20} color={theme.colors.status.info} />
                        <Text style={styles.infoText}>
                            Advanced tools for network optimization and troubleshooting
                        </Text>
                    </View>
                </AnimatedCard>

                <SignalMeter signalDbm={-65} ssid="CyberCafe_Free" />

                <DistanceEstimator signalDbm={-65} frequency={2.4} />

                <PacketLossMonitor />

                <ChannelGraph band="2.4GHz" />

                <AnimatedCard>
                    <Text style={styles.tipTitle}>💡 Optimization Tips</Text>
                    <Text style={styles.tipText}>
                        • Use Channel Graph to find the least congested channel{'\n'}
                        • Monitor Packet Loss to detect network issues{'\n'}
                        • Check Distance to ensure good signal coverage{'\n'}
                        • Upgrade to 5GHz for better performance
                    </Text>
                    <MarathiText style={styles.tipTextMarathi}>
                        नेटवर्क ऑप्टिमायझेशनसाठी या साधनांचा वापर करा
                    </MarathiText>
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
    header: {
        padding: theme.spacing.md,
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
    content: {
        flex: 1,
    },
    contentContainer: {
        padding: theme.spacing.md,
        paddingBottom: theme.spacing.xxxl,
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
        padding: theme.spacing.sm,
        backgroundColor: theme.colors.status.info + '20',
        borderRadius: theme.borderRadius.sm,
    },
    infoText: {
        flex: 1,
        fontSize: theme.typography.fontSize.sm,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.status.info,
    },
    tipTitle: {
        fontSize: theme.typography.fontSize.md,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.neutral.charcoal,
        marginBottom: theme.spacing.sm,
    },
    tipText: {
        fontSize: theme.typography.fontSize.sm,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.neutral.darkGray,
        lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.sm,
    },
    tipTextMarathi: {
        fontSize: theme.typography.fontSize.xs,
        color: theme.colors.neutral.gray,
        marginTop: theme.spacing.sm,
        textAlign: 'center',
    },
});
