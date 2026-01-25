import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../theme';
import AnimatedCard from '../shared/AnimatedCard';
import MarathiText from '../shared/MarathiText';

const BADGES = [
    {
        id: 'guardian',
        icon: 'shield-account',
        color: theme.colors.primary.saffron,
        name: 'Cyber Guardian',
        nameMarathi: 'सायबर रक्षक',
        description: 'Scan 50 networks',
        earned: true,
        progress: 50,
        total: 50,
    },
    {
        id: 'scout',
        icon: 'radar',
        color: theme.colors.status.info,
        name: 'Network Scout',
        nameMarathi: 'नेटवर्क स्काउट',
        description: 'Discover 20 new networks',
        earned: true,
        progress: 20,
        total: 20,
    },
    {
        id: 'expert',
        icon: 'certificate',
        color: theme.colors.status.safe,
        name: 'Security Expert',
        nameMarathi: 'सुरक्षा तज्ञ',
        description: 'Find 10 security threats',
        earned: false,
        progress: 7,
        total: 10,
    },
    {
        id: 'helper',
        icon: 'hand-heart',
        color: theme.colors.primary.deepOrange,
        name: 'Community Helper',
        nameMarathi: 'समुदाय मदतनीस',
        description: 'Share 5 safety reports',
        earned: false,
        progress: 3,
        total: 5,
    },
    {
        id: 'champion',
        icon: 'trophy',
        color: '#FFD700',
        name: 'Safety Champion',
        nameMarathi: 'सुरक्षा विजेता',
        description: 'Reach top 10 on leaderboard',
        earned: false,
        progress: 12,
        total: 10,
    },
    {
        id: 'educator',
        icon: 'school',
        color: theme.colors.secondary.teal,
        name: 'Cyber Educator',
        nameMarathi: 'सायबर शिक्षक',
        description: 'Help 25 people stay safe',
        earned: false,
        progress: 15,
        total: 25,
    },
];

export default function UserBadges() {
    const earnedCount = BADGES.filter(b => b.earned).length;
    const totalBadges = BADGES.length;

    const renderBadge = (badge) => (
        <View key={badge.id} style={[styles.badgeCard, !badge.earned && styles.lockedBadge]}>
            <View style={[styles.badgeIcon, { backgroundColor: badge.color + '20' }]}>
                <MaterialCommunityIcons
                    name={badge.icon}
                    size={40}
                    color={badge.earned ? badge.color : theme.colors.neutral.gray}
                />
                {badge.earned && (
                    <View style={styles.checkmark}>
                        <MaterialCommunityIcons name="check-circle" size={20} color={theme.colors.status.safe} />
                    </View>
                )}
            </View>

            <Text style={[styles.badgeName, !badge.earned && styles.lockedText]}>{badge.name}</Text>
            <MarathiText style={[styles.badgeNameMarathi, !badge.earned && styles.lockedText]}>
                {badge.nameMarathi}
            </MarathiText>

            <Text style={styles.badgeDescription}>{badge.description}</Text>

            {!badge.earned && (
                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View
                            style={[
                                styles.progressFill,
                                { width: `${(badge.progress / badge.total) * 100}%`, backgroundColor: badge.color }
                            ]}
                        />
                    </View>
                    <Text style={styles.progressText}>{badge.progress}/{badge.total}</Text>
                </View>
            )}
        </View>
    );

    return (
        <AnimatedCard>
            <View style={styles.header}>
                <MaterialCommunityIcons name="trophy-award" size={28} color={theme.colors.primary.saffron} />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Your Badges</Text>
                    <MarathiText style={styles.subtitle}>तुमचे बॅजेस</MarathiText>
                </View>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statValue}>{earnedCount}/{totalBadges}</Text>
                    <Text style={styles.statLabel}>Earned</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statValue}>{Math.round((earnedCount / totalBadges) * 100)}%</Text>
                    <Text style={styles.statLabel}>Complete</Text>
                </View>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.badgesContainer}
            >
                {BADGES.map(renderBadge)}
            </ScrollView>

            <Text style={styles.infoText}>
                Keep scanning and helping your community to unlock more badges!
            </Text>
            <MarathiText style={styles.infoTextMarathi}>
                अधिक बॅजेस अनलॉक करण्यासाठी स्कॅनिंग आणि मदत करत रहा!
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
        fontSize: theme.typography.fontSize.xxl,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.primary.deepOrange,
    },
    statLabel: {
        fontSize: theme.typography.fontSize.xs,
        fontFamily: theme.typography.fontFamily.medium,
        color: theme.colors.neutral.gray,
        marginTop: theme.spacing.xs,
    },
    badgesContainer: {
        paddingVertical: theme.spacing.md,
        gap: theme.spacing.md,
    },
    badgeCard: {
        width: 140,
        padding: theme.spacing.md,
        backgroundColor: theme.colors.neutral.white,
        borderRadius: theme.borderRadius.lg,
        alignItems: 'center',
        ...theme.shadows.sm,
    },
    lockedBadge: {
        opacity: 0.6,
    },
    badgeIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.sm,
        position: 'relative',
    },
    checkmark: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: theme.colors.neutral.white,
        borderRadius: 10,
    },
    badgeName: {
        fontSize: theme.typography.fontSize.sm,
        fontFamily: theme.typography.fontFamily.semiBold,
        color: theme.colors.neutral.charcoal,
        textAlign: 'center',
    },
    badgeNameMarathi: {
        fontSize: theme.typography.fontSize.xs,
        color: theme.colors.neutral.gray,
        textAlign: 'center',
        marginTop: theme.spacing.xs / 2,
    },
    lockedText: {
        color: theme.colors.neutral.gray,
    },
    badgeDescription: {
        fontSize: theme.typography.fontSize.xs,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.neutral.gray,
        textAlign: 'center',
        marginTop: theme.spacing.xs,
    },
    progressContainer: {
        width: '100%',
        marginTop: theme.spacing.sm,
    },
    progressBar: {
        height: 4,
        backgroundColor: theme.colors.neutral.lightGray,
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 2,
    },
    progressText: {
        fontSize: theme.typography.fontSize.xs - 1,
        fontFamily: theme.typography.fontFamily.medium,
        color: theme.colors.neutral.gray,
        textAlign: 'center',
        marginTop: theme.spacing.xs / 2,
    },
    infoText: {
        fontSize: theme.typography.fontSize.sm,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.neutral.darkGray,
        textAlign: 'center',
        marginTop: theme.spacing.md,
    },
    infoTextMarathi: {
        fontSize: theme.typography.fontSize.xs,
        color: theme.colors.neutral.gray,
        textAlign: 'center',
        marginTop: theme.spacing.xs,
    },
});
