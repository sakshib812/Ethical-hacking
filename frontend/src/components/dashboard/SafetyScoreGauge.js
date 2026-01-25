import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedProps,
    withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import theme from '../../theme';
import MarathiText from '../shared/MarathiText';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function SafetyScoreGauge({ score = 0 }) {
    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withTiming(score / 100, { duration: 1500 });
    }, [score]);

    const animatedProps = useAnimatedProps(() => {
        const circumference = 2 * Math.PI * 70; // radius = 70
        return {
            strokeDashoffset: circumference - (circumference * progress.value),
        };
    });

    const getColor = () => {
        if (score >= 75) return theme.colors.status.safe;
        if (score >= 40) return theme.colors.status.warning;
        return theme.colors.status.danger;
    };

    const getStatus = () => {
        if (score >= 75) return { en: 'SAFE', mr: 'सुरक्षित' };
        if (score >= 40) return { en: 'WARNING', mr: 'सावधान' };
        return { en: 'DANGER', mr: 'धोका' };
    };

    const color = getColor();
    const status = getStatus();
    const circumference = 2 * Math.PI * 70;

    return (
        <View style={styles.container}>
            <View style={styles.gaugeContainer}>
                <Svg width={200} height={200}>
                    {/* Background circle */}
                    <Circle
                        cx={100}
                        cy={100}
                        r={70}
                        stroke={theme.colors.neutral.lightGray}
                        strokeWidth={12}
                        fill="none"
                    />
                    {/* Animated progress circle */}
                    <AnimatedCircle
                        cx={100}
                        cy={100}
                        r={70}
                        stroke={color}
                        strokeWidth={12}
                        fill="none"
                        strokeDasharray={circumference}
                        animatedProps={animatedProps}
                        strokeLinecap="round"
                        rotation="-90"
                        origin="100, 100"
                    />
                </Svg>

                {/* Score display */}
                <View style={styles.scoreContainer}>
                    <Text style={[styles.score, { color }]}>{score}</Text>
                    <Text style={styles.label}>Safety Score</Text>
                    <MarathiText style={styles.marathiLabel}>सुरक्षा स्कोअर</MarathiText>
                </View>
            </View>

            {/* Status badge */}
            <View style={[styles.statusBadge, { backgroundColor: color }]}>
                <Text style={styles.statusText}>{status.en}</Text>
                <MarathiText style={styles.statusTextMarathi}>{status.mr}</MarathiText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: theme.spacing.lg,
    },
    gaugeContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scoreContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    score: {
        fontSize: theme.typography.fontSize.display,
        fontFamily: theme.typography.fontFamily.bold,
    },
    label: {
        fontSize: theme.typography.fontSize.sm,
        fontFamily: theme.typography.fontFamily.medium,
        color: theme.colors.neutral.darkGray,
        marginTop: theme.spacing.xs,
    },
    marathiLabel: {
        fontSize: theme.typography.fontSize.xs,
        color: theme.colors.neutral.gray,
    },
    statusBadge: {
        marginTop: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.lg,
        borderRadius: theme.borderRadius.full,
    },
    statusText: {
        color: theme.colors.neutral.white,
        fontSize: theme.typography.fontSize.md,
        fontFamily: theme.typography.fontFamily.bold,
        textAlign: 'center',
    },
    statusTextMarathi: {
        color: theme.colors.neutral.white,
        fontSize: theme.typography.fontSize.sm,
        textAlign: 'center',
    },
});
