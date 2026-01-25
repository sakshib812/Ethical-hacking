import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import community components
import Leaderboard from '../components/community/Leaderboard';
import UserBadges from '../components/community/UserBadges';

// Import shared components
import AnimatedCard from '../components/shared/AnimatedCard';
import GradientButton from '../components/shared/GradientButton';
import MarathiText from '../components/shared/MarathiText';

export default function CommunityScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Community</Text>
                <MarathiText style={styles.subtitle}>समुदाय</MarathiText>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Welcome Card */}
                <AnimatedCard gradient>
                    <View style={styles.welcomeCard}>
                        <MaterialCommunityIcons name="account-group" size={48} color={theme.colors.neutral.white} />
                        <Text style={styles.welcomeTitle}>Join the Digital Guard Community!</Text>
                        <MarathiText style={styles.welcomeSubtitle}>
                            डिजिटल गार्ड समुदायात सामील व्हा!
                        </MarathiText>
                        <Text style={styles.welcomeText}>
                            Help protect your village from cyber threats and earn rewards
                        </Text>
                    </View>
                </AnimatedCard>

                {/* User Profile Summary */}
                <AnimatedCard>
                    <View style={styles.profileHeader}>
                        <View style={styles.avatar}>
                            <MaterialCommunityIcons name="account-circle" size={64} color={theme.colors.primary.deepOrange} />
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileName}>Vaish</Text>
                            <Text style={styles.profileLevel}>Level 5 Guardian</Text>
                            <MarathiText style={styles.profileLevelMarathi}>स्तर 5 रक्षक</MarathiText>
                        </View>
                    </View>

                    <View style={styles.profileStats}>
                        <View style={styles.profileStat}>
                            <MaterialCommunityIcons name="radar" size={24} color={theme.colors.status.info} />
                            <Text style={styles.profileStatValue}>45</Text>
                            <Text style={styles.profileStatLabel}>Scans</Text>
                        </View>
                        <View style={styles.profileStat}>
                            <MaterialCommunityIcons name="shield-check" size={24} color={theme.colors.status.safe} />
                            <Text style={styles.profileStatValue}>12</Text>
                            <Text style={styles.profileStatLabel}>Threats Found</Text>
                        </View>
                        <View style={styles.profileStat}>
                            <MaterialCommunityIcons name="share-variant" size={24} color={theme.colors.primary.amber} />
                            <Text style={styles.profileStatValue}>8</Text>
                            <Text style={styles.profileStatLabel}>Shared</Text>
                        </View>
                    </View>
                </AnimatedCard>

                {/* User Badges */}
                <UserBadges />

                {/* Leaderboard */}
                <Leaderboard />

                {/* Community Actions */}
                <AnimatedCard>
                    <Text style={styles.sectionTitle}>Community Actions</Text>
                    <MarathiText style={styles.sectionSubtitle}>समुदाय क्रिया</MarathiText>

                    <GradientButton
                        onPress={() => console.log('Share report')}
                        colors={theme.colors.gradients.primary}
                        style={styles.actionButton}
                    >
                        📊 Share Safety Report
                    </GradientButton>

                    <GradientButton
                        onPress={() => console.log('Find WiFi')}
                        colors={theme.colors.gradients.secondary}
                        style={styles.actionButton}
                    >
                        📡 Find Safe WiFi Nearby
                    </GradientButton>

                    <GradientButton
                        onPress={() => console.log('Rate network')}
                        colors={[theme.colors.primary.amber, theme.colors.primary.saffron]}
                        style={styles.actionButton}
                    >
                        ⭐ Rate a Network
                    </GradientButton>
                </AnimatedCard>

                {/* Community Tips */}
                <AnimatedCard>
                    <Text style={styles.tipTitle}>💡 Community Tips</Text>
                    <View style={styles.tipItem}>
                        <MaterialCommunityIcons name="lightbulb-on" size={20} color={theme.colors.status.warning} />
                        <Text style={styles.tipText}>
                            Share your safety reports to help others in your area
                        </Text>
                    </View>
                    <View style={styles.tipItem}>
                        <MaterialCommunityIcons name="trophy" size={20} color={theme.colors.primary.saffron} />
                        <Text style={styles.tipText}>
                            Climb the leaderboard by scanning more networks
                        </Text>
                    </View>
                    <View style={styles.tipItem}>
                        <MaterialCommunityIcons name="hand-heart" size={20} color={theme.colors.primary.deepOrange} />
                        <Text style={styles.tipText}>
                            Help educate your community about cyber safety
                        </Text>
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
    welcomeCard: {
        alignItems: 'center',
        padding: theme.spacing.md,
    },
    welcomeTitle: {
        fontSize: theme.typography.fontSize.lg,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.neutral.white,
        textAlign: 'center',
        marginTop: theme.spacing.sm,
    },
    welcomeSubtitle: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.neutral.white,
        textAlign: 'center',
        marginTop: theme.spacing.xs,
    },
    welcomeText: {
        fontSize: theme.typography.fontSize.sm,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.neutral.white,
        textAlign: 'center',
        marginTop: theme.spacing.sm,
        opacity: 0.9,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    avatar: {
        marginRight: theme.spacing.md,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: theme.typography.fontSize.xl,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.neutral.charcoal,
    },
    profileLevel: {
        fontSize: theme.typography.fontSize.base,
        fontFamily: theme.typography.fontFamily.medium,
        color: theme.colors.primary.deepOrange,
        marginTop: theme.spacing.xs / 2,
    },
    profileLevelMarathi: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.neutral.gray,
    },
    profileStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: theme.spacing.md,
        borderTopWidth: 1,
        borderTopColor: theme.colors.neutral.lightGray,
    },
    profileStat: {
        alignItems: 'center',
    },
    profileStatValue: {
        fontSize: theme.typography.fontSize.xl,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.neutral.charcoal,
        marginTop: theme.spacing.xs,
    },
    profileStatLabel: {
        fontSize: theme.typography.fontSize.xs,
        fontFamily: theme.typography.fontFamily.medium,
        color: theme.colors.neutral.gray,
        marginTop: theme.spacing.xs / 2,
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
    actionButton: {
        marginBottom: theme.spacing.sm,
    },
    tipTitle: {
        fontSize: theme.typography.fontSize.md,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.neutral.charcoal,
        marginBottom: theme.spacing.md,
    },
    tipItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.sm,
        gap: theme.spacing.sm,
    },
    tipText: {
        flex: 1,
        fontSize: theme.typography.fontSize.sm,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.neutral.darkGray,
        lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.sm,
    },
});
