import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text, Easing } from 'react-native';
import Svg, { Path, G, Rect, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useTheme } from 'react-native-paper';

export default function IdentityLens({ status, latency }) {
    const scanAnim = useRef(new Animated.Value(0)).current;
    const crackAnim = useRef(new Animated.Value(0)).current;
    const { colors } = useTheme();

    useEffect(() => {
        // Laser scanning bar animation
        Animated.loop(
            Animated.timing(scanAnim, {
                toValue: 1,
                duration: 2500,
                easing: Easing.inOut(Easing.quad),
                useNativeDriver: true,
            })
        ).start();

        if (status === 'DANGER') {
            Animated.timing(crackAnim, {
                toValue: 1,
                duration: 400,
                easing: Easing.bounce,
                useNativeDriver: true,
            }).start();
        } else {
            crackAnim.setValue(0);
        }
    }, [status]);

    const scanY = scanAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 130, 0],
    });

    const lensColor = status === 'DANGER' ? colors.error : colors.primary;

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: colors.onSurfaceVariant }]}>Identity Lens (ओळख तपासणी)</Text>
            <View style={[styles.lensFrame, { borderColor: lensColor + '40' }]}>
                <Svg height="150" width="150" viewBox="0 0 100 100">
                    <Defs>
                        <LinearGradient id="laserGrad" x1="0" y1="0" x2="0" y2="1">
                            <Stop offset="0%" stopColor={lensColor} stopOpacity="0" />
                            <Stop offset="50%" stopColor={lensColor} stopOpacity="0.8" />
                            <Stop offset="100%" stopColor={lensColor} stopOpacity="0" />
                        </LinearGradient>
                    </Defs>

                    {/* Fingerprint Icon */}
                    <G opacity={crackAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.3] })}>
                        <Path
                            d="M30,70 Q35,40 50,40 Q65,40 70,70 M20,70 Q25,30 50,30 Q75,30 80,70 M40,70 Q45,55 50,55 Q55,55 60,70"
                            stroke={lensColor}
                            strokeWidth="2.5"
                            fill="none"
                            strokeLinecap="round"
                        />
                        <Circle cx="50" cy="50" r="45" stroke={lensColor} strokeWidth="1" fill="none" opacity="0.2" />
                    </G>

                    {/* Glass Crack Pieces (DANGER) */}
                    {status === 'DANGER' && (
                        <Animated.View style={{ transform: [{ scale: crackAnim }], position: 'absolute', width: '100%', height: '100%' }}>
                            <Svg height="100%" width="100%" viewBox="0 0 100 100">
                                <Path d="M50,50 L20,30 M50,50 L80,20 M50,50 L70,80 M50,50 L30,85 M20,30 L10,50 M80,20 L90,40" stroke="#fff" strokeWidth="1.5" opacity="0.7" />
                                <Path d="M48,48 L22,32 M52,52 L78,82" stroke={colors.error} strokeWidth="1" />
                            </Svg>
                        </Animated.View>
                    )}

                    {/* Laser Scanning Line */}
                    <Animated.View style={{ transform: [{ translateY: scanY }], position: 'absolute', width: '90%', left: '5%' }}>
                        <Rect x="0" y="0" width="100" height="3" fill="url(#laserGrad)" />
                    </Animated.View>
                </Svg>
            </View>
            <View style={styles.statusBadge}>
                <Text style={[styles.statusText, { color: lensColor }]}>
                    {status === 'DANGER' ? "FAKE DETECTED! / बनावट आढळले!" : "Verifying Identity... / तपासणी सुरू..."}
                </Text>
            </View>
            <Text style={styles.latencyText}>Router Health: {latency < 100 ? "Excellent" : "Suspicious"} ({latency}ms)</Text>
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
        marginBottom: 10,
    },
    lensFrame: {
        width: 160,
        height: 160,
        borderWidth: 3,
        borderRadius: 20,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111', // Dark background for contrast
        padding: 5,
    },
    statusBadge: {
        marginTop: 15,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    statusText: {
        fontSize: 12,
        fontFamily: 'Poppins_700Bold',
    },
    latencyText: {
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
        marginTop: 8,
        color: '#666',
    }
});
