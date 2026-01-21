import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { useTheme } from 'react-native-paper';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function SurakshaChakra({ status }) {
    // status: 'SAFE' (Green), 'WARNING' (Yellow), 'DANGER' (Red)

    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        startSpinning();
    }, []);

    const startSpinning = () => {
        spinValue.setValue(0);
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 3000, // 3 seconds per rotation
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    };

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const { colors } = useTheme();
    let color = colors.primary; // Green
    if (status === 'WARNING') color = colors.secondary; // Amber
    if (status === 'DANGER' || status === 'CRITICAL') color = colors.error; // Red

    return (
        <View style={styles.container}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <Svg height="200" width="200" viewBox="0 0 100 100">
                    <G rotation="-90" origin="50, 50">
                        {/* Background Circle */}
                        <Circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="#e0e0e0"
                            strokeWidth="2.5"
                            fill="transparent"
                        />
                        {/* Dynamic Chakra Ring */}
                        <AnimatedCircle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke={color}
                            strokeWidth="5"
                            strokeDasharray="283" // Circumference ~ 2*pi*45
                            strokeDashoffset="75" // Part of the ring open
                            strokeLinecap="round"
                            fill="transparent"
                        />
                        {/* Decorative Spikes for Chakra look */}
                        <Circle cx="50" cy="5" r="2" fill={color} />
                        <Circle cx="95" cy="50" r="2" fill={color} />
                        <Circle cx="50" cy="95" r="2" fill={color} />
                        <Circle cx="5" cy="50" r="2" fill={color} />
                    </G>
                </Svg>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
});
