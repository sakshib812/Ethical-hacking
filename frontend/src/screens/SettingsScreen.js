import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import components
import AnimatedCard from '../components/shared/AnimatedCard';
import GradientButton from '../components/shared/GradientButton';
import MarathiText from '../components/shared/MarathiText';

export default function SettingsScreen() {
    const [settings, setSettings] = useState({
        voiceAlerts: true,
        marathiLanguage: true,
        autoScan: false,
        notifications: true,
        darkMode: false,
    });

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const SettingItem = ({ icon, title, subtitle, value, onToggle }) => (
        <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
                <MaterialCommunityIcons name={icon} size={24} color={theme.colors.primary.deepOrange} />
                <View style={styles.settingText}>
                    <Text style={styles.settingTitle}>{title}</Text>
                    <Text style={styles.settingSubtitle}>{subtitle}</Text>
                </View>
            </View>
            <Switch
                value={value}
                onValueChange={onToggle}
                trackColor={{ false: theme.colors.neutral.lightGray, true: theme.colors.primary.deepOrange }}
                thumbColor={value ? theme.colors.neutral.white : theme.colors.neutral.gray}
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Settings</Text>
                <MarathiText style={styles.subtitle}>सेटिंग्ज</MarathiText>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Alert Preferences */}
                <AnimatedCard>
                    <Text style={styles.sectionTitle}>Alert Preferences</Text>
                    <MarathiText style={styles.sectionSubtitle}>सूचना प्राधान्ये</MarathiText>

                    <SettingItem
                        icon="volume-high"
                        title="Voice Alerts"
                        subtitle="Enable Marathi voice warnings"
                        value={settings.voiceAlerts}
                        onToggle={() => toggleSetting('voiceAlerts')}
                    />

                    <SettingItem
                        icon="bell"
                        title="Push Notifications"
                        subtitle="Get alerts for security threats"
                        value={settings.notifications}
                        onToggle={() => toggleSetting('notifications')}
                    />
                </AnimatedCard>

                {/* Language & Display */}
                <AnimatedCard>
                    <Text style={styles.sectionTitle}>Language & Display</Text>
                    <MarathiText style={styles.sectionSubtitle}>भाषा आणि प्रदर्शन</MarathiText>

                    <SettingItem
                        icon="translate"
                        title="Marathi Language"
                        subtitle="Show Marathi translations"
                        value={settings.marathiLanguage}
                        onToggle={() => toggleSetting('marathiLanguage')}
                    />

                    <SettingItem
                        icon="theme-light-dark"
                        title="Dark Mode"
                        subtitle="Use dark theme (Coming Soon)"
                        value={settings.darkMode}
                        onToggle={() => toggleSetting('darkMode')}
                    />
                </AnimatedCard>

                {/* Network Scanning */}
                <AnimatedCard>
                    <Text style={styles.sectionTitle}>Network Scanning</Text>
                    <MarathiText style={styles.sectionSubtitle}>नेटवर्क स्कॅनिंग</MarathiText>

                    <SettingItem
                        icon="radar"
                        title="Auto-Scan"
                        subtitle="Automatically scan on network change"
                        value={settings.autoScan}
                        onToggle={() => toggleSetting('autoScan')}
                    />
                </AnimatedCard>

                {/* Trusted Networks */}
                <AnimatedCard>
                    <View style={styles.trustedHeader}>
                        <MaterialCommunityIcons name="shield-check" size={24} color={theme.colors.status.safe} />
                        <Text style={styles.sectionTitle}>Trusted Networks</Text>
                    </View>
                    <MarathiText style={styles.sectionSubtitle}>विश्वसनीय नेटवर्क</MarathiText>

                    <View style={styles.trustedList}>
                        <View style={styles.trustedItem}>
                            <Text style={styles.trustedName}>Home_WiFi</Text>
                            <MaterialCommunityIcons name="check-circle" size={20} color={theme.colors.status.safe} />
                        </View>
                        <View style={styles.trustedItem}>
                            <Text style={styles.trustedName}>Office_Network</Text>
                            <MaterialCommunityIcons name="check-circle" size={20} color={theme.colors.status.safe} />
                        </View>
                    </View>

                    <GradientButton onPress={() => console.log('Add network')}>
                        Add Trusted Network
                    </GradientButton>
                </AnimatedCard>

                {/* About */}
                <AnimatedCard>
                    <Text style={styles.sectionTitle}>About</Text>
                    <MarathiText style={styles.sectionSubtitle}>बद्दल</MarathiText>

                    <View style={styles.aboutItem}>
                        <Text style={styles.aboutLabel}>Version:</Text>
                        <Text style={styles.aboutValue}>1.0.0</Text>
                    </View>
                    <View style={styles.aboutItem}>
                        <Text style={styles.aboutLabel}>Build:</Text>
                        <Text style={styles.aboutValue}>Phase 3 Advanced</Text>
                    </View>
                    <View style={styles.aboutItem}>
                        <Text style={styles.aboutLabel}>Features:</Text>
                        <Text style={styles.aboutValue}>30+ Implemented</Text>
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
    sectionTitle: {
        fontSize: theme.typography.fontSize.lg,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.neutral.charcoal,
        marginBottom: theme.spacing.xs,
    },
    sectionSubtitle: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.neutral.gray,
        marginBottom: theme.spacing.md,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.neutral.lightGray,
    },
    settingInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingText: {
        marginLeft: theme.spacing.md,
        flex: 1,
    },
    settingTitle: {
        fontSize: theme.typography.fontSize.base,
        fontFamily: theme.typography.fontFamily.semiBold,
        color: theme.colors.neutral.charcoal,
    },
    settingSubtitle: {
        fontSize: theme.typography.fontSize.sm,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.neutral.gray,
        marginTop: theme.spacing.xs / 2,
    },
    trustedHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    trustedList: {
        marginVertical: theme.spacing.md,
    },
    trustedItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing.sm,
        backgroundColor: theme.colors.status.safe + '20',
        borderRadius: theme.borderRadius.sm,
        marginBottom: theme.spacing.sm,
    },
    trustedName: {
        fontSize: theme.typography.fontSize.base,
        fontFamily: theme.typography.fontFamily.medium,
        color: theme.colors.neutral.charcoal,
    },
    aboutItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: theme.spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.neutral.lightGray,
    },
    aboutLabel: {
        fontSize: theme.typography.fontSize.base,
        fontFamily: theme.typography.fontFamily.medium,
        color: theme.colors.neutral.darkGray,
    },
    aboutValue: {
        fontSize: theme.typography.fontSize.base,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.neutral.charcoal,
    },
});
