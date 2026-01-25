import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from 'victory-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../theme';
import AnimatedCard from '../shared/AnimatedCard';
import StatusBadge from '../shared/StatusBadge';
import PulseIndicator from '../shared/PulseIndicator';
import MarathiText from '../shared/MarathiText';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function PacketLossMonitor() {
    const [monitoring, setMonitoring] = useState(true);
    const [packetData, setPacketData] = useState([]);
    const [stats, setStats] = useState({
        sent: 0,
        received: 0,
        lost: 0,
        lossPercentage: 0,
    });

    useEffect(() => {
        if (!monitoring) return;

        const interval = setInterval(() => {
            // Simulate packet monitoring
            const newPacket = {
                time: Date.now(),
                loss: Math.random() > 0.95 ? 1 : 0, // 5% packet loss
            };

            setPacketData(prev => {
                const updated = [...prev, newPacket].slice(-20); // Keep last 20 data points

                // Calculate stats
                const sent = updated.length;
                const lost = updated.filter(p => p.loss === 1).length;
                const received = sent - lost;
                const lossPercentage = sent > 0 ? ((lost / sent) * 100).toFixed(1) : 0;

                setStats({ sent, received, lost, lossPercentage });

                return updated;
            });
        }, 1000); // Update every second

        return () => clearInterval(interval);
    }, [monitoring]);

    const getChartData = () => {
        return packetData.map((packet, idx) => ({
            x: idx,
            y: packet.loss === 1 ? 100 : 0,
        }));
    };

    const getStatus = () => {
        if (stats.lossPercentage === 0) return 'safe';
        if (stats.lossPercentage < 5) return 'warning';
        return 'danger';
    };

    return (
        <AnimatedCard>
            <View style={styles.header}>
                <MaterialCommunityIcons name="chart-timeline-variant" size={28} color={theme.colors.primary.deepOrange} />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Packet Loss Monitor</Text>
                    <MarathiText style={styles.subtitle}>पॅकेट लॉस मॉनिटर</MarathiText>
                </View>
                <PulseIndicator active={monitoring} color={theme.colors.status.safe} size={12} />
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statValue}>{stats.sent}</Text>
                    <Text style={styles.statLabel}>Sent</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={[styles.statValue, { color: theme.colors.status.safe }]}>{stats.received}</Text>
                    <Text style={styles.statLabel}>Received</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={[styles.statValue, { color: theme.colors.status.danger }]}>{stats.lost}</Text>
                    <Text style={styles.statLabel}>Lost</Text>
                </View>
            </View>

            <View style={styles.lossContainer}>
                <Text style={styles.lossLabel}>Packet Loss:</Text>
                <Text style={[styles.lossValue, { color: theme.colors.status[getStatus()] }]}>
                    {stats.lossPercentage}%
                </Text>
                <StatusBadge status={getStatus()} size="small" />
            </View>

            {packetData.length > 0 && (
                <View style={styles.chartContainer}>
                    <VictoryChart
                        width={SCREEN_WIDTH - 64}
                        height={150}
                        theme={VictoryTheme.material}
                        padding={{ top: 10, bottom: 30, left: 40, right: 20 }}
                    >
                        <VictoryAxis
                            label="Time"
                            style={{
                                axisLabel: { fontSize: 10, padding: 20 },
                                tickLabels: { fontSize: 8 },
                            }}
                        />
                        <VictoryAxis
                            dependentAxis
                            label="Loss"
                            style={{
                                axisLabel: { fontSize: 10, padding: 25 },
                                tickLabels: { fontSize: 8 },
                            }}
                        />
                        <VictoryLine
                            data={getChartData()}
                            style={{
                                data: {
                                    stroke: theme.colors.status.danger,
                                    strokeWidth: 2,
                                },
                            }}
                        />
                    </VictoryChart>
                </View>
            )}

            <Text style={styles.info}>
                {monitoring ? 'Monitoring active - Updates every second' : 'Monitoring paused'}
            </Text>
            <MarathiText style={styles.infoMarathi}>
                {monitoring ? 'निरीक्षण सक्रिय - दर सेकंदाला अपडेट' : 'निरीक्षण थांबवले'}
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
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: theme.spacing.md,
        padding: theme.spacing.sm,
        backgroundColor: theme.colors.neutral.offWhite,
        borderRadius: theme.borderRadius.md,
    },
    statBox: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: theme.typography.fontSize.xl,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.neutral.charcoal,
    },
    statLabel: {
        fontSize: theme.typography.fontSize.xs,
        fontFamily: theme.typography.fontFamily.medium,
        color: theme.colors.neutral.gray,
        marginTop: theme.spacing.xs,
    },
    lossContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing.sm,
        marginBottom: theme.spacing.md,
    },
    lossLabel: {
        fontSize: theme.typography.fontSize.base,
        fontFamily: theme.typography.fontFamily.semiBold,
        color: theme.colors.neutral.darkGray,
    },
    lossValue: {
        fontSize: theme.typography.fontSize.xxl,
        fontFamily: theme.typography.fontFamily.bold,
    },
    chartContainer: {
        alignItems: 'center',
        marginVertical: theme.spacing.md,
    },
    info: {
        fontSize: theme.typography.fontSize.sm,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.neutral.darkGray,
        textAlign: 'center',
    },
    infoMarathi: {
        fontSize: theme.typography.fontSize.xs,
        color: theme.colors.neutral.gray,
        textAlign: 'center',
        marginTop: theme.spacing.xs,
    },
});
