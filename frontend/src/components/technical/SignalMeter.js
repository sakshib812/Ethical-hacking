import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';
import theme from '../../theme';
import AnimatedCard from '../shared/AnimatedCard';
import MarathiText from '../shared/MarathiText';

export default function SignalMeter({ signalDbm = -50, ssid }) {
    // Convert dBm to percentage (approximate)
    const getSignalPercentage = (dbm) => {
        if (dbm >= -50) return 100;
        if (dbm <= -100) return 0;
        return Math.round(((dbm + 100) / 50) * 100);
    };

    const getSignalQuality = (dbm) => {
        if (dbm >= -50) return { text: 'Excellent', color: theme.colors.status.safe };
        if (dbm >= -60) return { text: 'Good', color: theme.colors.status.safe };
        if (dbm >= -70) return { text: 'Fair', color: theme.colors.status.warning };
        return { text: 'Poor', color: theme.colors.status.danger };
    };

    const percentage = getSignalPercentage(signalDbm);
    const quality = getSignalQuality(signalDbm);
    const angle = (percentage / 100) * 180; // 0-180 degrees

    return (
        <AnimatedCard>
            <View style={styles.container}>
                <Text style={styles.title}>Signal Strength</Text>
                <MarathiText style={styles.subtitle}>सिग्नल शक्ती</MarathiText>

                <View style={styles.gaugeContainer}>
                    <Svg width={200} height={120} viewBox="0 0 200 120">
                        {/* Background arc */}
                        <Path
                            d="M 20 100 A 80 80 0 0 1 180 100"
                            fill="none"
                            stroke={theme.colors.neutral.lightGray}
                            strokeWidth={15}
                            strokeLinecap="round"
                        />

                        {/* Colored arc */}
                        <Path
                            d={`M 20 100 A 80 80 0 ${angle > 90 ? 1 : 0} 1 ${100 + 80 * Math.cos((180 - angle) * Math.PI / 180)} ${100 - 80 * Math.sin((180 - angle) * Math.PI / 180)}`}
                            fill="none"
                            stroke={quality.color}
                            strokeWidth={15}
                            strokeLinecap="round"
                        />

                        {/* Center text */}
                        <SvgText
                            x="100"
                            y="80"
                            textAnchor="middle"
                            fontSize="32"
                            fontWeight="bold"
                            fill={quality.color}
                        >
                            {signalDbm}
                        </SvgText>
                        <SvgText
                            x="100"
                            y="100"
                            textAnchor="middle"
                            fontSize="14"
                            fill={theme.colors.neutral.gray}
                        >
                            dBm
                        </SvgText>
                    </Svg>
                </View>

                <View style={styles.infoContainer}>
                    <View style={[styles.qualityBadge, { backgroundColor: quality.color }]}>
                        <Text style={styles.qualityText}>{quality.text}</Text>
                    </View>

                    <Text style={styles.percentage}>{percentage}%</Text>
                </View>

                {ssid && (
                    <Text style={styles.ssid}>Network: {ssid}</Text>
                )}

                <View style={styles.legend}>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: theme.colors.status.safe }]} />
                        <Text style={styles.legendText}>≥ -60 dBm</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: theme.colors.status.warning }]} />
                        <Text style={styles.legendText}>-70 to -60</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: theme.colors.status.danger }]} />
                        <Text style={styles.legendText}>≤ -70 dBm</Text>
                    </View>
                </View>
            </View>
        </AnimatedCard>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    title: {
        fontSize: theme.typography.fontSize.lg,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.neutral.charcoal,
    },
    subtitle: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.neutral.gray,
        marginBottom: theme.spacing.md,
    },
    gaugeContainer: {
        marginVertical: theme.spacing.md,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
        marginTop: theme.spacing.sm,
    },
    qualityBadge: {
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.md,
        borderRadius: theme.borderRadius.full,
    },
    qualityText: {
        color: theme.colors.neutral.white,
        fontSize: theme.typography.fontSize.sm,
        fontFamily: theme.typography.fontFamily.semiBold,
    },
    percentage: {
        fontSize: theme.typography.fontSize.xl,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.neutral.charcoal,
    },
    ssid: {
        fontSize: theme.typography.fontSize.sm,
        fontFamily: theme.typography.fontFamily.medium,
        color: theme.colors.neutral.darkGray,
        marginTop: theme.spacing.sm,
    },
    legend: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: theme.spacing.md,
        paddingTop: theme.spacing.md,
        borderTopWidth: 1,
        borderTopColor: theme.colors.neutral.lightGray,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.xs,
    },
    legendDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    legendText: {
        fontSize: theme.typography.fontSize.xs,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.neutral.gray,
    },
});
