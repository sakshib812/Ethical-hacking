import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence,
} from 'react-native-reanimated';
import theme from '../../theme';

export default function PulseIndicator({ active = true, color = theme.colors.status.safe, size = 12 }) {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);

    useEffect(() => {
        if (active) {
            scale.value = withRepeat(
                withSequence(
                    withTiming(1.5, { duration: 1000 }),
                    withTiming(1, { duration: 1000 })
                ),
                -1,
                false
            );

            opacity.value = withRepeat(
                withSequence(
                    withTiming(0.3, { duration: 1000 }),
                    withTiming(1, { duration: 1000 })
                ),
                -1,
                false
            );
        } else {
            scale.value = 1;
            opacity.value = 1;
        }
    }, [active]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.pulse,
                    { backgroundColor: color, width: size, height: size, borderRadius: size / 2 },
                    animatedStyle,
                ]}
            />
            <View
                style={[
                    styles.dot,
                    { backgroundColor: color, width: size, height: size, borderRadius: size / 2 },
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    pulse: {
        position: 'absolute',
    },
    dot: {
        position: 'absolute',
    },
});
