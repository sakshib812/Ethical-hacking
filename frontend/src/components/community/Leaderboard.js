import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../theme';
import AnimatedCard from '../shared/AnimatedCard';
import MarathiText from '../shared/MarathiText';

const BADGES = {
    guardian: { icon: 'shield-account', color: theme.colors.primary.saffron, name: 'Cyber Guardian', nameMarathi: 'सायबर रक्षक' },
    scout: { icon: 'radar', color: theme.colors.status.info, name: 'Network Scout', nameMarathi: 'नेटवर्क स्काउट' },
    expert: { icon: 'certificate', color: theme.colors.status.safe, name: 'Security Expert', nameMarathi: 'सुरक्षा तज्ञ' },
    helper: { icon: 'hand-heart', color: theme.colors.primary.deepOrange, name: 'Community Helper', nameMarathi: 'समुदाय मदतनीस' },
    champion: { icon: 'trophy', color: '#FFD700', name: 'Safety Champion', nameMarathi: 'सुरक्षा विजेता' },
};

export default function Leaderboard() {
    const [timeframe, setTimeframe] = useState('week');
    const [leaders, setLeaders] = useState([
        { id: '1', name: 'Rajesh Kumar', points: 1250, scans: 45, badge: 'champion', rank: 1 },
        { id: '2', name: 'Priya Sharma', points: 1100, scans: 38, badge: 'expert', rank: 2 },
        { id: '3', name: 'Amit Patel', points: 950, scans: 32, badge: 'guardian', rank: 3 },
        { id: '4', name: 'Sunita Desai', points: 820, scans: 28, badge: 'scout', rank: 4 },
        { id: '5', name: 'Vikram Singh', points: 750, scans: 25, badge: 'helper', rank: 5 },
    ]);

    const userRank = 12;
    const userPoints = 450;

    const renderLeader = ({ item }) => {
        const badge = BADGES[item.badge];
        const isTopThree = item.rank <= 3;

        return (
            <TouchableOpacity style={[styles.leaderCard, isTopThree && styles.topThreeCard]}>
                <View style={styles.rankContainer}>
                    {isTopThree ? (
                        <MaterialCommunityIcons
                            name={item.rank === 1 ? 'trophy' : item.rank === 2 ? 'medal' : 'medal-outline'}
                            size={32}
                            color={item.rank === 1 ? '#FFD700' : item.rank === 2 ? '#C0C0C0' : '#CD7F32'}
                        />
                    ) : (
                        <Text style={styles.rankNumber}>{item.rank}</Text>
                    )}
                </View>

                <View style={styles.leaderInfo}>
                    <Text style={styles.leaderName}>{item.name}</Text>
                    <View style={styles.leaderStats}>
                        <MaterialCommunityIcons name="star" size={14} color={theme.colors.primary.amber} />
                        <Text style={styles.points}>{item.points} pts</Text>
                        <Text style={styles.scans}> • {item.scans} scans</Text>
                    </View>
                </View>

                <MaterialCommunityIcons
                    name={badge.icon}
                    size={28}
                    color={badge.color}
                />
            </TouchableOpacity>
        );
    };

    return (
        <AnimatedCard>
            <View style={styles.header}>
                <MaterialCommunityIcons name="trophy" size={28} color={theme.colors.primary.saffron} />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Leaderboard</Text>
                    <MarathiText style={styles.subtitle}>लीडरबोर्ड</MarathiText>
                </View>
            </View>

            {/* Timeframe Selector */}
            <View style={styles.timeframeContainer}>
                {['week', 'month', 'all'].map(tf => (
                    <TouchableOpacity
                        key={tf}
                        style={[styles.timeframeButton, timeframe === tf && styles.activeTimeframe]}
                        onPress={() => setTimeframe(tf)}
                    >
                        <Text style={[styles.timeframeText, timeframe === tf && styles.activeTimeframeText]}>
                            {tf === 'week' ? 'Week' : tf === 'month' ? 'Month' : 'All Time'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* User's Rank */}
            <View style={styles.userRankCard}>
                <Text style={styles.userRankLabel}>Your Rank:</Text>
                <Text style={styles.userRankValue}>#{userRank}</Text>
                <Text style={styles.userPoints}>{userPoints} points</Text>
            </View>

            {/* Leaders List */}
            <FlatList
                data={leaders}
                renderItem={renderLeader}
                keyExtractor={item => item.id}
                scrollEnabled={false}
                style={styles.list}
            />

            <Text style={styles.infoText}>
                Earn points by scanning networks and helping your community stay safe!
            </Text>
            <MarathiText style={styles.infoTextMarathi}>
                नेटवर्क स्कॅन करून आणि तुमच्या समुदायाला सुरक्षित ठेवण्यास मदत करून गुण मिळवा!
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
    timeframeContainer: {
        flexDirection: 'row',
        marginBottom: theme.spacing.md,
        gap: theme.spacing.sm,
    },
    timeframeButton: {
        flex: 1,
        paddingVertical: theme.spacing.sm,
        alignItems: 'center',
        borderRadius: theme.borderRadius.sm,
        backgroundColor: theme.colors.neutral.lightGray,
    },
    activeTimeframe: {
        backgroundColor: theme.colors.primary.deepOrange,
    },
    timeframeText: {
        fontSize: theme.typography.fontSize.sm,
        fontFamily: theme.typography.fontFamily.medium,
        color: theme.colors.neutral.darkGray,
    },
    activeTimeframeText: {
        color: theme.colors.neutral.white,
        fontFamily: theme.typography.fontFamily.semiBold,
    },
    userRankCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.md,
        backgroundColor: theme.colors.primary.deepOrange + '20',
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.md,
        gap: theme.spacing.sm,
    },
    userRankLabel: {
        fontSize: theme.typography.fontSize.base,
        fontFamily: theme.typography.fontFamily.medium,
        color: theme.colors.neutral.darkGray,
    },
    userRankValue: {
        fontSize: theme.typography.fontSize.xl,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.primary.deepOrange,
    },
    userPoints: {
        fontSize: theme.typography.fontSize.sm,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.neutral.gray,
    },
    list: {
        marginBottom: theme.spacing.md,
    },
    leaderCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.sm,
        backgroundColor: theme.colors.neutral.offWhite,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.sm,
    },
    topThreeCard: {
        backgroundColor: theme.colors.primary.saffron + '10',
        borderWidth: 1,
        borderColor: theme.colors.primary.saffron + '30',
    },
    rankContainer: {
        width: 40,
        alignItems: 'center',
        marginRight: theme.spacing.sm,
    },
    rankNumber: {
        fontSize: theme.typography.fontSize.lg,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.neutral.darkGray,
    },
    leaderInfo: {
        flex: 1,
    },
    leaderName: {
        fontSize: theme.typography.fontSize.base,
        fontFamily: theme.typography.fontFamily.semiBold,
        color: theme.colors.neutral.charcoal,
    },
    leaderStats: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: theme.spacing.xs / 2,
    },
    points: {
        fontSize: theme.typography.fontSize.sm,
        fontFamily: theme.typography.fontFamily.medium,
        color: theme.colors.primary.amber,
        marginLeft: theme.spacing.xs / 2,
    },
    scans: {
        fontSize: theme.typography.fontSize.sm,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.neutral.gray,
    },
    infoText: {
        fontSize: theme.typography.fontSize.sm,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.neutral.darkGray,
        textAlign: 'center',
    },
    infoTextMarathi: {
        fontSize: theme.typography.fontSize.xs,
        color: theme.colors.neutral.gray,
        textAlign: 'center',
        marginTop: theme.spacing.xs,
    },
});
