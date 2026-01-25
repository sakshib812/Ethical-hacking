import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryArea, VictoryTheme, VictoryLabel } from 'victory-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../theme';
import AnimatedCard from '../shared/AnimatedCard';
import GradientButton from '../shared/GradientButton';
import MarathiText from '../shared/MarathiText';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function ChannelGraph({ band = '2.4GHz' }) {
    const [networks, setNetworks] = useState([]);
    const [scanning, setScanning] = useState(false);

    useEffect(() => {
        scanChannels();
    }, [band]);

    const scanChannels = async () => {
        setScanning(true);
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Generate mock network data
        const mockNetworks = [
            { channel: 1, signal: -45, ssid: 'Network_A', color: theme.colors.status.danger },
            { channel: 6, signal: -60, ssid: 'Network_B', color: theme.colors.status.warning },
            { channel: 11, signal: -70, ssid: 'Network_C', color: theme.colors.status.safe },
            { channel: 3, signal: -55, ssid: 'Network_D', color: theme.colors.primary.deepOrange },
        ];

        setNetworks(mockNetworks);
        setScanning(false);
    };

    const generateBellCurve = (channel, signal) => {
        const points = [];
        const bandwidth = 4; // Channel bandwidth

        for (let i = channel - bandwidth; i <= channel + bandwidth; i += 0.5) {
            const distance = Math.abs(i - channel);
            const amplitude = signal + (distance * 5); // Signal decreases with distance
            points.push({ x: i, y: amplitude });
        }

        return points;
    };

    const getBestChannel = () => {
        if (networks.length === 0) return 'N/A';

        // Simple algorithm: find least congested channel
        const channelCongestion = {};

        for (let ch = 1; ch <= 11; ch++) {
            channelCongestion[ch] = 0;
        }

        networks.forEach(net => {
            for (let ch = net.channel - 2; ch <= net.channel + 2; ch++) {
                if (ch >= 1 && ch <= 11) {
                    channelCongestion[ch] += Math.abs(net.signal);
                }
            }
        });

        let bestChannel = 1;
        let minCongestion = Infinity;

        Object.entries(channelCongestion).forEach(([ch, congestion]) => {
            if (congestion < minCongestion) {
                minCongestion = congestion;
                bestChannel = parseInt(ch);
            }
        });

        return bestChannel;
    };

    const bestChannel = getBestChannel();

    return (
        <AnimatedCard>
            <View style={styles.header}>
                <MaterialCommunityIcons name="wifi-strength-4" size={28} color={theme.colors.primary.deepOrange} />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Channel Analysis ({band})</Text>
                    <MarathiText style={styles.subtitle}>चॅनेल विश्लेषण</MarathiText>
                </View>
            </View>

            <Text style={styles.description}>
                Visualizes WiFi channel congestion to find the best channel
            </Text>

            <View style={styles.chartContainer}>
                <VictoryChart
                    width={SCREEN_WIDTH - 64}
                    height={250}
                    theme={VictoryTheme.material}
                    padding={{ top: 20, bottom: 40, left: 50, right: 20 }}
                >
                    <VictoryAxis
                        label="Channel"
                        style={{
                            axisLabel: { fontSize: 12, padding: 30 },
                            tickLabels: { fontSize: 10 },
                        }}
                    />
                    <VictoryAxis
                        dependentAxis
                        label="Signal (dBm)"
                        style={{
                            axisLabel: { fontSize: 12, padding: 35 },
                            tickLabels: { fontSize: 10 },
                        }}
                    />

                    {networks.map((network, idx) => (
                        <VictoryArea
                            key={idx}
                            data={generateBellCurve(network.channel, network.signal)}
                            style={{
                                data: {
                                    fill: network.color,
                                    fillOpacity: 0.4,
                                    stroke: network.color,
                                    strokeWidth: 2,
                                },
                            }}
                        />
                    ))}
                </VictoryChart>
            </View>

            <View style={styles.legendContainer}>
                {networks.map((network, idx) => (
                    <View key={idx} style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: network.color }]} />
                        <Text style={styles.legendText}>Ch {network.channel}: {network.ssid}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.recommendationContainer}>
                <MaterialCommunityIcons name="lightbulb-on" size={24} color={theme.colors.status.safe} />
                <View style={styles.recommendationText}>
                    <Text style={styles.recommendationTitle}>Best Channel: {bestChannel}</Text>
                    <MarathiText style={styles.recommendationSubtitle}>
                        सर्वोत्तम चॅनेल: {bestChannel}
                    </MarathiText>
                </View>
            </View>

            <GradientButton onPress={scanChannels} loading={scanning}>
                {scanning ? 'Scanning...' : 'Rescan Channels'}
            </GradientButton>
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
    chartContainer: {
        alignItems: 'center',
        marginVertical: theme.spacing.md,
    },
    legendContainer: {
        marginVertical: theme.spacing.md,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: theme.spacing.xs,
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: theme.spacing.sm,
    },
    legendText: {
        fontSize: theme.typography.fontSize.sm,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.neutral.darkGray,
    },
    recommendationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.status.safe + '20',
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.md,
    },
    recommendationText: {
        marginLeft: theme.spacing.sm,
    },
    recommendationTitle: {
        fontSize: theme.typography.fontSize.md,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.status.safe,
    },
    recommendationSubtitle: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.status.safe,
    },
});
