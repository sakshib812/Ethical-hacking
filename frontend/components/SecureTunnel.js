import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text, Easing } from 'react-native';
import Svg, { Path, Circle, G, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useTheme } from 'react-native-paper';

export default function SecureTunnel({ status }) {
    const particleAnims = useRef([new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)]).current;
    const breakAnim = useRef(new Animated.Value(0)).current;
    const { colors } = useTheme();

    useEffect(() => {
        // Continuous particle flow
        particleAnims.forEach((anim, index) => {
            Animated.loop(
                Animated.timing(anim, {
                    toValue: 1,
                    duration: 2000,
                    delay: index * 600,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            ).start();
        });

        if (status === 'DANGER') {
            Animated.spring(breakAnim, {
                toValue: 1,
                friction: 3,
                tension: 40,
                useNativeDriver: true,
            }).start();
        } else {
            breakAnim.setValue(0);
        }
    }, [status]);

    const tunnelColor = status === 'DANGER' ? colors.error : colors.primary;
    const neonColor = status === 'DANGER' ? '#ff0000' : '#00ffcc';

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: colors.onSurfaceVariant }]}>Secure Tunnel (माहितीचा मार्ग)</Text>
            <View style={styles.tunnelFrame}>
                <Svg height="120" width="280" viewBox="0 0 100 40">
                    <Defs>
                        <LinearGradient id="neonGrad" x1="0" y1="0" x2="1" y2="0">
                            <Stop offset="0%" stopColor={neonColor} stopOpacity="0.2" />
                            <Stop offset="50%" stopColor={neonColor} stopOpacity="1" />
                            <Stop offset="100%" stopColor={neonColor} stopOpacity="0.2" />
                        </LinearGradient>
                    </Defs>

                    {/* Device Icons */}
                    <G transform="translate(5, 20)">
                        <Circle cx="0" cy="0" r="4" fill={colors.onSurface} />
                        <Text style={styles.iconLabel}>USER</Text>
                    </G>
                    <G transform="translate(95, 20)">
                        <Circle cx="0" cy="0" r="6" fill={colors.custom.chakraBlue} />
                        <Text style={styles.iconLabel}>BANK</Text>
                    </G>

                    {/* The Neon Path */}
                    {status !== 'DANGER' ? (
                        <Path
                            d="M10,20 L90,20"
                            stroke="url(#neonGrad)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            opacity="0.6"
                        />
                    ) : (
                        <G>
                            <Path d="M10,20 L45,20" stroke={colors.error} strokeWidth="4" strokeLinecap="round" opacity="0.4" />
                            <Path d="M55,20 L90,20" stroke={colors.error} strokeWidth="4" strokeLinecap="round" opacity="0.4" />
                        </G>
                    )}

                    {/* Flowing Data Particles */}
                    {status !== 'DANGER' && particleAnims.map((anim, i) => {
                        const translateX = anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [10, 90],
                        });
                        return (
                            <AnimatedG key={i} style={{ transform: [{ translateX }] }}>
                                <Circle cx="0" cy="20" r="1.5" fill={neonColor} />
                            </AnimatedG>
                        );
                    })}

                    {/* Lightning Bolt and Broken Particles (DANGER) */}
                    {status === 'DANGER' && (
                        <G>
                            <Path d="M48,10 L52,15 L48,20 L52,25 L48,30" stroke={colors.error} strokeWidth="2" fill="none" />
                            {/* Particles falling away */}
                            <Circle cx="50" cy="25" r="1.5" fill={colors.error} opacity="0.6" />
                            <Circle cx="45" cy="30" r="1.5" fill={colors.error} opacity="0.4" />
                            <Circle cx="55" cy="35" r="1.5" fill={colors.error} opacity="0.2" />
                        </G>
                    )}
                </Svg>
            </View>
            <View style={[styles.statusBox, { backgroundColor: tunnelColor + '10' }]}>
                <Text style={[styles.statusText, { color: tunnelColor }]}>
                    {status === 'DANGER' ? "PATH INTERCEPTED! / मार्ग अडवला गेला!" : "Safe Tunnel Active / सुरक्षित मार्ग सुरू"}
                </Text>
            </View>
        </View>
    );
}

const AnimatedG = Animated.createAnimatedComponent(G);

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
    tunnelFrame: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconLabel: {
        fontSize: 8,
        fill: '#999',
    },
    statusBox: {
        marginTop: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 15,
    },
    statusText: {
        fontSize: 12,
        fontFamily: 'Poppins_600SemiBold',
    }
});
