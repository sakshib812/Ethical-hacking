import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../theme';
import AnimatedCard from '../shared/AnimatedCard';
import StatusBadge from '../shared/StatusBadge';
import PulseIndicator from '../shared/PulseIndicator';
import MarathiText from '../shared/MarathiText';

const getDeviceIcon = (type) => {
    const icons = {
        phone: 'cellphone',
        laptop: 'laptop',
        desktop: 'desktop-tower',
        tablet: 'tablet',
        router: 'router-wireless',
        camera: 'cctv',
        tv: 'television',
        unknown: 'help-circle',
    };
    return icons[type] || icons.unknown;
};

export default function DeviceList({ onDevicePress }) {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDevices();
        const interval = setInterval(fetchDevices, 10000); // Refresh every 10s
        return () => clearInterval(interval);
    }, []);

    const fetchDevices = async () => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockDevices = [
                { id: '1', name: 'Samsung Galaxy', ip: '192.168.1.101', mac: 'A4:B2:C3:D4:E5:F6', type: 'phone', is_intruder: false, is_online: true },
                { id: '2', name: 'HP Laptop', ip: '192.168.1.102', mac: 'B5:C6:D7:E8:F9:A0', type: 'laptop', is_intruder: false, is_online: true },
                { id: '3', name: 'Unknown Device', ip: '192.168.1.105', mac: 'FF:EE:DD:CC:BB:AA', type: 'unknown', is_intruder: true, is_online: true },
                { id: '4', name: 'Smart TV', ip: '192.168.1.110', mac: 'C7:D8:E9:F0:A1:B2', type: 'tv', is_intruder: false, is_online: false },
            ];

            setDevices(mockDevices);
        } catch (error) {
            console.error('Device fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderDevice = ({ item }) => (
        <TouchableOpacity
            style={styles.deviceCard}
            onPress={() => onDevicePress && onDevicePress(item)}
        >
            <View style={styles.deviceIcon}>
                <MaterialCommunityIcons
                    name={getDeviceIcon(item.type)}
                    size={32}
                    color={item.is_intruder ? theme.colors.status.danger : theme.colors.primary.deepOrange}
                />
                {item.is_online && (
                    <View style={styles.onlineIndicator}>
                        <PulseIndicator active size={8} color={theme.colors.status.safe} />
                    </View>
                )}
            </View>

            <View style={styles.deviceInfo}>
                <Text style={styles.deviceName}>{item.name}</Text>
                <Text style={styles.deviceIP}>{item.ip}</Text>
                <Text style={styles.deviceMAC}>{item.mac}</Text>
            </View>

            {item.is_intruder && (
                <StatusBadge status="danger" text="INTRUDER" size="small" />
            )}
        </TouchableOpacity>
    );

    return (
        <AnimatedCard>
            <View style={styles.header}>
                <MaterialCommunityIcons name="devices" size={28} color={theme.colors.primary.deepOrange} />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Connected Devices</Text>
                    <MarathiText style={styles.subtitle}>कनेक्ट केलेली उपकरणे</MarathiText>
                </View>
                <Text style={styles.count}>{devices.filter(d => d.is_online).length}</Text>
            </View>

            {loading ? (
                <Text style={styles.loading}>Scanning network...</Text>
            ) : (
                <FlatList
                    data={devices}
                    renderItem={renderDevice}
                    keyExtractor={item => item.id}
                    scrollEnabled={false}
                />
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
    count: {
        fontSize: theme.typography.fontSize.xl,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.primary.deepOrange,
    },
    loading: {
        fontSize: theme.typography.fontSize.base,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.neutral.gray,
        textAlign: 'center',
        paddingVertical: theme.spacing.md,
    },
    deviceCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.sm,
        backgroundColor: theme.colors.neutral.offWhite,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.sm,
    },
    deviceIcon: {
        position: 'relative',
        marginRight: theme.spacing.md,
    },
    onlineIndicator: {
        position: 'absolute',
        top: -4,
        right: -4,
    },
    deviceInfo: {
        flex: 1,
    },
    deviceName: {
        fontSize: theme.typography.fontSize.base,
        fontFamily: theme.typography.fontFamily.semiBold,
        color: theme.colors.neutral.charcoal,
    },
    deviceIP: {
        fontSize: theme.typography.fontSize.sm,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.neutral.darkGray,
        marginTop: theme.spacing.xs / 2,
    },
    deviceMAC: {
        fontSize: theme.typography.fontSize.xs,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.neutral.gray,
    },
});
