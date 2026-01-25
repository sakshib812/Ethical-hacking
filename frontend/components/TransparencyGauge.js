import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text, Easing } from 'react-native';
import Svg, { Rect, G, Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useTheme } from 'react-native-paper';

export default function TransparencyGauge({ entropy, encryption }) {
    const fillAnim = useRef(new Animated.Value(0)).current;
    const sloshAnim = useRef(new Animated.Value(0)).current;
    const eyeAnim = useRef(new Animated.Value(0)).current;
    const { colors } = useTheme();

    useEffect(() => {
        // Fill level animation
        Animated.timing(fillAnim, {
            toValue: entropy,
            duration: 2000,
            easing: Easing.out(Easing.quad),
            useNativeDriver: false,
        }).start();

        // Continuous sloshing animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(sloshAnim, { toValue: 1, duration: 1500, easing: Easing.inOut(Easing.sin), useNativeDriver: false }),
                Animated.timing(sloshAnim, { toValue: -1, duration: 1500, easing: Easing.inOut(Easing.sin), useNativeDriver: false }),
            ])
        ).start();

        if (encryption === 'OPEN' || encryption === 'NONE') {
            Animated.timing(eyeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
        } else {
            eyeAnim.setValue(0);
        }
    }, [entropy, encryption]);

    const isSafe = encryption !== 'OPEN' && encryption !== 'NONE';
    const waterColor = isSafe ? '#27AE60' : 'rgba(235, 87, 87, 0.3)'; // Opaque Green vs Crystal Clear Red

    const sloshRotate = sloshAnim.interpolate({
        inputRange: [-1, 1],
        outputRange: ['-5deg', '5deg'],
    });

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: colors.onSurfaceVariant }]}>Transparency Gauge (पारदर्शकता मापक)</Text>
            <View style={styles.gaugeContainer}>
                {/* Visual Metadata */}
                <View style={styles.labelsLeft}>
                    <Text style={styles.sideLabel}>OPAQUE / सुरक्षित</Text>
                    <Text style={styles.sideLabel}>CLEAR / धोका</Text>
                </View>

                {/* The Tank */}
                <View style={[styles.tank, { borderColor: colors.outline }]}>
                    {/* Hacker's Eye (Visible only when clear) */}
                    {!isSafe && (
                        <Animated.View style={[styles.eyeContainer, { opacity: eyeAnim }]}>
                            <Svg height="40" width="40" viewBox="0 0 100 100">
                                <Path d="M10,50 Q50,10 90,50 Q50,90 10,50" stroke="#EB5757" strokeWidth="2" fill="none" />
                                <Circle cx="50" cy="50" r="15" fill="#EB5757" />
                                <Circle cx="55" cy="45" r="4" fill="#fff" />
                            </Svg>
                        </Animated.View>
                    )}

                    {/* The Liquid */}
                    <Animated.View
                        style={[
                            styles.liquid,
                            {
                                height: fillAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['10%', '100%'],
                                }),
                                backgroundColor: waterColor,
                                transform: [{ rotate: sloshRotate }],
                            }
                        ]}
                    />
                </View>
            </View>
            <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                    {isSafe ? "Your data is OPAQUE (Private) / माहिती लपवलेली आहे" : "Your data is CLEAR (Visible) / माहिती काचेसारखी आरपार दिसत आहे"}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 25,
        padding: 20,
        width: '95%',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    label: {
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
        marginBottom: 15,
    },
    gaugeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    labelsLeft: {
        height: 150,
        justifyContent: 'space-between',
        marginRight: 20,
    },
    sideLabel: {
        fontSize: 9,
        fontFamily: 'Poppins_600SemiBold',
        color: '#888',
    },
    tank: {
        width: 80,
        height: 150,
        borderWidth: 4,
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'relative',
    },
    liquid: {
        width: '120%', // Wider to cover rotation gaps
        position: 'absolute',
        bottom: -10,
    },
    eyeContainer: {
        position: 'absolute',
        top: '40%',
        zIndex: 0,
    },
    infoBox: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.03)',
        borderRadius: 15,
    },
    infoText: {
        fontSize: 12,
        textAlign: 'center',
        fontFamily: 'Poppins_500Medium',
        color: '#444',
    }
});
