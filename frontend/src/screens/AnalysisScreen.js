import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import analysis components
import DNSLeakTest from '../components/analysis/DNSLeakTest';
import SSLStripDetector from '../components/analysis/SSLStripDetector';
import PublicIPCard from '../components/analysis/PublicIPCard';
import SignalMeter from '../components/technical/SignalMeter';

// Import from Phase 1
import AnimatedCard from '../components/shared/AnimatedCard';
import StatusBadge from '../components/shared/StatusBadge';
import MarathiText from '../components/shared/MarathiText';

export default function AnalysisScreen() {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', label: 'Overview', icon: 'view-dashboard' },
        { id: 'security', label: 'Security Tests', icon: 'shield-search' },
        { id: 'technical', label: 'Technical', icon: 'chart-line' },
    ];

    const renderOverview = () => (
        <View>
            <AnimatedCard>
                <View style={styles.statsGrid}>
                    <View style={styles.statItem}>
                        <MaterialCommunityIcons name="shield-check" size={32} color={theme.colors.status.safe} />
                        <Text style={styles.statValue}>3/5</Text>
                        <Text style={styles.statLabel}>Tests Passed</Text>
                    </View>
                    <View style={styles.statItem}>
                        <MaterialCommunityIcons name="alert" size={32} color={theme.colors.status.warning} />
                        <Text style={styles.statValue}>2</Text>
                        <Text style={styles.statLabel}>Warnings</Text>
                    </View>
                </View>
            </AnimatedCard>

            <PublicIPCard />
            <SignalMeter signalDbm={-65} ssid="CyberCafe_Free" />
        </View>
    );

    const renderSecurityTests = () => (
        <View>
            <DNSLeakTest />
            <SSLStripDetector />

            <AnimatedCard>
                <View style={styles.testHeader}>
                    <MaterialCommunityIcons name="shield-lock-outline" size={24} color={theme.colors.primary.deepOrange} />
                    <Text style={styles.testTitle}>ARP Spoofing Monitor</Text>
                </View>
                <StatusBadge status="safe" text="MONITORING" />
                <Text style={styles.testDescription}>
                    Continuously watching for gateway MAC changes
                </Text>
                <MarathiText style={styles.testDescriptionMarathi}>
                    गेटवे MAC बदलांसाठी सतत निरीक्षण
                </MarathiText>
            </AnimatedCard>
        </View>
    );

    const renderTechnical = () => (
        <View>
            <SignalMeter signalDbm={-65} ssid="CyberCafe_Free" />

            <AnimatedCard>
                <Text style={styles.sectionTitle}>Encryption Details</Text>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Type:</Text>
                    <Text style={styles.detailValue}>OPEN (No Encryption)</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Protocol:</Text>
                    <Text style={styles.detailValue}>802.11n</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Channel:</Text>
                    <Text style={styles.detailValue}>6 (2.4 GHz)</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Bandwidth:</Text>
                    <Text style={styles.detailValue}>20 MHz</Text>
                </View>
            </AnimatedCard>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Network Analysis</Text>
                <MarathiText style={styles.subtitle}>नेटवर्क विश्लेषण</MarathiText>
            </View>

            {/* Tab Navigation */}
            <View style={styles.tabContainer}>
                {tabs.map(tab => (
                    <TouchableOpacity
                        key={tab.id}
                        style={[styles.tab, activeTab === tab.id && styles.activeTab]}
                        onPress={() => setActiveTab(tab.id)}
                    >
                        <MaterialCommunityIcons
                            name={tab.icon}
                            size={20}
                            color={activeTab === tab.id ? theme.colors.primary.deepOrange : theme.colors.neutral.gray}
                        />
                        <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Content */}
            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {activeTab === 'overview' && renderOverview()}
                {activeTab === 'security' && renderSecurityTests()}
                {activeTab === 'technical' && renderTechnical()}
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
    tabContainer: {
        flexDirection: 'row',
        paddingHorizontal: theme.spacing.md,
        marginBottom: theme.spacing.sm,
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: theme.spacing.sm,
        gap: theme.spacing.xs,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: theme.colors.primary.deepOrange,
    },
    tabText: {
        fontSize: theme.typography.fontSize.sm,
        fontFamily: theme.typography.fontFamily.medium,
        color: theme.colors.neutral.gray,
    },
    activeTabText: {
        color: theme.colors.primary.deepOrange,
        fontFamily: theme.typography.fontFamily.semiBold,
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        padding: theme.spacing.md,
        paddingBottom: theme.spacing.xxxl,
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: theme.typography.fontSize.xxl,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.neutral.charcoal,
        marginTop: theme.spacing.xs,
    },
    statLabel: {
        fontSize: theme.typography.fontSize.sm,
        fontFamily: theme.typography.fontFamily.medium,
        color: theme.colors.neutral.gray,
    },
    testHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
        marginBottom: theme.spacing.sm,
    },
    testTitle: {
        fontSize: theme.typography.fontSize.md,
        fontFamily: theme.typography.fontFamily.semiBold,
        color: theme.colors.neutral.charcoal,
    },
    testDescription: {
        fontSize: theme.typography.fontSize.sm,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.neutral.darkGray,
        marginTop: theme.spacing.sm,
    },
    testDescriptionMarathi: {
        fontSize: theme.typography.fontSize.xs,
        color: theme.colors.neutral.gray,
        marginTop: theme.spacing.xs,
    },
    sectionTitle: {
        fontSize: theme.typography.fontSize.lg,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.neutral.charcoal,
        marginBottom: theme.spacing.md,
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
});
