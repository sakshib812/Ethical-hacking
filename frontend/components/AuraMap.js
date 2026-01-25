import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import Svg, { Circle, RadialGradient, Defs, Stop, Polygon, G, Path } from 'react-native-svg';
import { useTheme } from 'react-native-paper';

export default function AuraMap({ snr, congestion, status }) {
    const pulseAnim = useRef(new Animated.Value(0)).current;
    const waveAnim = useRef(new Animated.Value(0)).current;
    const { colors } = useTheme();

    useEffect(() => {
        // Continuous wave/pulse animation
        Animated.loop(
            Animated.timing(pulseAnim, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true,
            })
        ).start();

        Animated.loop(
            Animated.timing(waveAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const auraColor = status === 'DANGER' ? colors.error : (status === 'WARNING' ? colors.secondary : colors.primary);

    // Wave shader simulation: Concentric circles expanding
    const waves = [0, 0.3, 0.6].map((offset) => {
        const scale = pulseAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [offset, 1 + offset],
            extrapolate: 'clamp',
        });
        const opacity = pulseAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.6 - offset, 0],
            extrapolate: 'clamp',
        });
        return { scale, opacity };
    });

    // Jagged spikes for danger state
    const spikePoints = [];
    if (status === 'DANGER') {
        const numSpikes = 12;
        for (let i = 0; i < numSpikes; i++) {
            const angle = (i / numSpikes) * 2 * Math.PI;
            const innerRadius = 35;
            const outerRadius = 45 + Math.random() * 10;
            const x1 = 50 + Math.cos(angle) * innerRadius;
            const y1 = 50 + Math.sin(angle) * innerRadius;
            const x2 = 50 + Math.cos(angle + 0.1) * outerRadius;
            const y2 = 50 + Math.sin(angle + 0.1) * outerRadius;
            spikePoints.push(`${x1},${y1} ${x2},${y2}`);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: colors.onSurfaceVariant }]}>The Aura Map (सिग्नल कवच)</Text>
            <View style={{ width: 220, height: 220, justifyContent: 'center', alignItems: 'center' }}>
                <Svg height="220" width="220" viewBox="0 0 100 100">
                    <Defs>
                        <RadialGradient id="auraGrad" cx="50" cy="50" rx="50" ry="50" fx="50" fy="50" gradientUnits="userSpaceOnUse">
                            <Stop offset="0%" stopColor={auraColor} stopOpacity="0.8" />
                            <Stop offset="50%" stopColor={auraColor} stopOpacity="0.3" />
                            <Stop offset="100%" stopColor={auraColor} stopOpacity="0" />
                        </RadialGradient>
                    </Defs>

                    {/* Animated Waves */}
                    {waves.map((wave, index) => (
                        <AnimatedCircle
                            key={index}
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke={auraColor}
                            strokeWidth="1"
                            style={{
                                transform: [{ scale: wave.scale }],
                                opacity: wave.opacity,
                            }}
                        />
                    ))}

                    {/* Central Glow */}
                    <Circle cx="50" cy="50" r="40" fill="url(#auraGrad)" opacity="0.4" />

                    {/* Jagged Red Spikes (Only in DANGER) */}
                    {status === 'DANGER' && spikePoints.map((points, i) => (
                        <Polyline
                            key={i}
                            points={points}
                            stroke={colors.error}
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    ))}

                    {/* Central Device Icon Metaphor */}
                    <Circle cx="50" cy="50" r="6" fill={colors.onSurface} />
                    <Circle cx="50" cy="50" r="10" stroke={auraColor} strokeWidth="2" fill="none" opacity="0.8" />
                </Svg>
            </View>
            <View style={styles.infoBox}>
                <Text style={[styles.infoText, { color: auraColor }]}>
                    {status === 'DANGER' ? "Jagged Signal / संशयास्पद सिग्नल" : "Calm Environment / सुरक्षित वातावरण"}
                </Text>
            </View>
            <View style={styles.stats}>
                <Text style={styles.statText}>SNR: {snr}dB</Text>
                <Text style={styles.statText}>Congestion: {congestion}%</Text>
            </View>
        </View>
    );
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const Polyline = (props) => <Path {...props} d={`M ${props.points.replace(/ /g, ' L ')}`} />;

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
    infoBox: {
        marginTop: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 15,
    },
    infoText: {
        fontSize: 12,
        fontFamily: 'Poppins_600SemiBold',
    },
    stats: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'space-around',
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: '#efefef',
        paddingTop: 10,
    },
    statText: {
        fontSize: 13,
        fontFamily: 'Poppins_500Medium',
        color: '#555',
    }
});
