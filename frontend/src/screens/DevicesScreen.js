import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import device components
import DeviceList from '../components/devices/DeviceList';

// Import from Phase 1
import AnimatedCard from '../components/shared/AnimatedCard';
import MarathiText from '../components/shared/MarathiText';

export default function DevicesScreen() {
    const handleDevicePress = (device) => {
        console.log('Device pressed:', device);
        // In production, navigate to device details
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Device Manager</Text>
                <MarathiText style={styles.subtitle}>डिव्हाइस व्यवस्थापक</MarathiText>
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
                            Devices are automatically scanned every 10 seconds
                        </Text>
                    </View>
                </AnimatedCard>

                <DeviceList onDevicePress={handleDevicePress} />

                <AnimatedCard>
                    <Text style={styles.tipTitle}>💡 Security Tip</Text>
                    <Text style={styles.tipText}>
                        If you see unknown devices, change your WiFi password immediately.
                    </Text>
                    <MarathiText style={styles.tipTextMarathi}>
                        जर तुम्हाला अज्ञात उपकरणे दिसली तर ताबडतोब तुमचा वाय-फाय पासवर्ड बदला.
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
    },
    tipTextMarathi: {
        fontSize: theme.typography.fontSize.xs,
        color: theme.colors.neutral.gray,
        marginTop: theme.spacing.xs,
    },
});
