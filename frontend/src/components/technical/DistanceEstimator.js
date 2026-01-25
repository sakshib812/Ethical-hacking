import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../theme';
import AnimatedCard from '../shared/AnimatedCard';
import StatusBadge from '../shared/StatusBadge';
import MarathiText from '../shared/MarathiText';

export default function DistanceEstimator({ signalDbm = -50, frequency = 2.4 }) {
    // Free Space Path Loss (FSPL) formula to estimate distance
    const calculateDistance = (rssi, freq) => {
        // FSPL (dB) = 20log10(d) + 20log10(f) + 32.44
        // Rearranged: d = 10^((FSPL - 32.44 - 20log10(f)) / 20)

        const fspl = Math.abs(rssi);
        const distance = Math.pow(10, (fspl - 32.44 - 20 * Math.log10(freq * 1000)) / 20);

        return Math.max(0.5, Math.min(distance, 100)); // Clamp between 0.5m and 100m
    };

    const distance = calculateDistance(signalDbm, frequency);

    const getDistanceQuality = (dist) => {
        if (dist < 5) return { text: 'Very Close', color: theme.colors.status.safe, icon: 'signal-cellular-3' };
        if (dist < 15) return { text: 'Close', color: theme.colors.status.safe, icon: 'signal-cellular-2' };
        if (dist < 30) return { text: 'Moderate', color: theme.colors.status.warning, icon: 'signal-cellular-1' };
        return { text: 'Far', color: theme.colors.status.danger, icon: 'signal-cellular-outline' };
    };

    const quality = getDistanceQuality(distance);

    return (
        <AnimatedCard>
            <View style={styles.header}>
                <MaterialCommunityIcons name="map-marker-distance" size={28} color={theme.colors.primary.deepOrange} />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Distance to Router</Text>
                    <MarathiText style={styles.subtitle}>राउटरपर्यंतचे अंतर</MarathiText>
                </View>
            </View>

            <View style={styles.distanceContainer}>
                <MaterialCommunityIcons name={quality.icon} size={64} color={quality.color} />

                <View style={styles.distanceInfo}>
                    <Text style={[styles.distanceValue, { color: quality.color }]}>
                        {distance.toFixed(1)} m
                    </Text>
                    <StatusBadge status={quality.text === 'Far' ? 'danger' : quality.text === 'Moderate' ? 'warning' : 'safe'} text={quality.text} />
                </View>
            </View>

            <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Signal Strength:</Text>
                    <Text style={styles.detailValue}>{signalDbm} dBm</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Frequency:</Text>
                    <Text style={styles.detailValue}>{frequency} GHz</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Estimation Method:</Text>
                    <Text style={styles.detailValue}>FSPL</Text>
                </View>
            </View>

            <View style={styles.infoBox}>
                <MaterialCommunityIcons name="information" size={16} color={theme.colors.status.info} />
                <Text style={styles.infoText}>
                    Distance is estimated using Free Space Path Loss. Actual distance may vary due to obstacles.
                </Text>
            </View>
            <MarathiText style={styles.infoTextMarathi}>
                अंतर फ्री स्पेस पाथ लॉस वापरून अंदाजित आहे. अडथळ्यांमुळे वास्तविक अंतर बदलू शकते.
            </MarathiText>
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
    distanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.neutral.offWhite,
        borderRadius: theme.borderRadius.lg,
        marginBottom: theme.spacing.md,
    },
    distanceInfo: {
        marginLeft: theme.spacing.lg,
        alignItems: 'center',
    },
    distanceValue: {
        fontSize: theme.typography.fontSize.display,
        fontFamily: theme.typography.fontFamily.bold,
        marginBottom: theme.spacing.sm,
    },
    detailsContainer: {
        marginVertical: theme.spacing.md,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: theme.spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.neutral.lightGray,
    },
    detailLabel: {
        fontSize: theme.typography.fontSize.base,
        fontFamily: theme.typography.fontFamily.medium,
        color: theme.colors.neutral.darkGray,
    },
    detailValue: {
        fontSize: theme.typography.fontSize.base,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.neutral.charcoal,
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: theme.spacing.sm,
        padding: theme.spacing.sm,
        backgroundColor: theme.colors.status.info + '20',
        borderRadius: theme.borderRadius.sm,
        marginTop: theme.spacing.md,
    },
    infoText: {
        flex: 1,
        fontSize: theme.typography.fontSize.xs,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.status.info,
    },
    infoTextMarathi: {
        fontSize: theme.typography.fontSize.xs - 1,
        color: theme.colors.status.info,
        marginTop: theme.spacing.xs,
        textAlign: 'center',
    },
});
