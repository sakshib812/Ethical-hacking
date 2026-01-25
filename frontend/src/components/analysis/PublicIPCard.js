import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Clipboard } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../theme';
import AnimatedCard from '../shared/AnimatedCard';
import MarathiText from '../shared/MarathiText';

export default function PublicIPCard() {
    const [ipInfo, setIpInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        fetchIPInfo();
    }, []);

    const fetchIPInfo = async () => {
        setLoading(true);
        try {
            // Simulate API call - in production, call backend
            await new Promise(resolve => setTimeout(resolve, 1000));

            setIpInfo({
                public_ip: '103.21.58.' + Math.floor(Math.random() * 255),
                isp: 'Airtel India',
                location: 'Mumbai, Maharashtra',
                is_vpn: Math.random() > 0.8,
                is_proxy: false,
            });
        } catch (error) {
            console.error('IP fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (ipInfo) {
            Clipboard.setString(ipInfo.public_ip);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <AnimatedCard>
            <View style={styles.header}>
                <MaterialCommunityIcons name="ip-network" size={28} color={theme.colors.primary.deepOrange} />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Public IP Address</Text>
                    <MarathiText style={styles.subtitle}>सार्वजनिक IP पत्ता</MarathiText>
                </View>
            </View>

            {loading ? (
                <Text style={styles.loading}>Fetching IP...</Text>
            ) : ipInfo ? (
                <>
                    <TouchableOpacity onPress={copyToClipboard} style={styles.ipContainer}>
                        <Text style={styles.ipAddress}>{ipInfo.public_ip}</Text>
                        <MaterialCommunityIcons
                            name={copied ? 'check' : 'content-copy'}
                            size={20}
                            color={copied ? theme.colors.status.safe : theme.colors.neutral.gray}
                        />
                    </TouchableOpacity>

                    <View style={styles.detailsContainer}>
                        <View style={styles.detailRow}>
                            <MaterialCommunityIcons name="router-wireless" size={16} color={theme.colors.neutral.gray} />
                            <Text style={styles.detailText}>{ipInfo.isp}</Text>
                        </View>

                        <View style={styles.detailRow}>
                            <MaterialCommunityIcons name="map-marker" size={16} color={theme.colors.neutral.gray} />
                            <Text style={styles.detailText}>{ipInfo.location}</Text>
                        </View>

                        {ipInfo.is_vpn && (
                            <View style={[styles.detailRow, styles.warningRow]}>
                                <MaterialCommunityIcons name="shield-alert" size={16} color={theme.colors.status.warning} />
                                <Text style={styles.warningText}>VPN Detected</Text>
                            </View>
                        )}
                    </View>
                </>
            ) : (
                <Text style={styles.error}>Failed to fetch IP information</Text>
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
    loading: {
        fontSize: theme.typography.fontSize.base,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.neutral.gray,
        textAlign: 'center',
        paddingVertical: theme.spacing.md,
    },
    ipContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.neutral.offWhite,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.md,
    },
    ipAddress: {
        fontSize: theme.typography.fontSize.xl,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.primary.deepOrange,
    },
    detailsContainer: {
        gap: theme.spacing.sm,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    detailText: {
        fontSize: theme.typography.fontSize.base,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.neutral.darkGray,
    },
    warningRow: {
        backgroundColor: theme.colors.status.warning + '20',
        padding: theme.spacing.sm,
        borderRadius: theme.borderRadius.sm,
    },
    warningText: {
        fontSize: theme.typography.fontSize.base,
        fontFamily: theme.typography.fontFamily.semiBold,
        color: theme.colors.status.warning,
    },
    error: {
        fontSize: theme.typography.fontSize.base,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.status.danger,
        textAlign: 'center',
        paddingVertical: theme.spacing.md,
    },
});
