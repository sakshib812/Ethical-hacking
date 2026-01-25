import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text, Easing } from 'react-native';
import { useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function VerifiedStamp({ type }) {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const { colors } = useTheme();

    useEffect(() => {
        if (type) {
            // "Thud" animation: scale up and then settle with spring
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 3,
                    tension: 40,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                })
            ]).start();
        } else {
            scaleAnim.setValue(0);
            opacityAnim.setValue(0);
        }
    }, [type]);

    if (!type) return null;

    const isVerified = type === 'VERIFIED_PORTAL';

    return (
        <Animated.View pointerEvents="none" style={[styles.overlay, { opacity: opacityAnim }]}>
            {isVerified ? (
                <Animated.View style={[
                    styles.stamp,
                    {
                        transform: [{ scale: scaleAnim }, { rotate: '-15deg' }],
                        borderColor: colors.custom.saffron,
                    }
                ]}>
                    <MaterialCommunityIcons name="seal" size={50} color={colors.custom.saffron} />
                    <Text style={[styles.stampText, { color: colors.custom.saffron }]}>
                        VERIFIED (अधिकृत)
                    </Text>
                    <Text style={styles.subText}>Government of India Portal</Text>
                    {/* Gold Dust Particles Metaphor (Static) */}
                    <View style={styles.particles}>
                        <View style={[styles.dot, { left: -10, top: 0, backgroundColor: '#FFD700' }]} />
                        <View style={[styles.dot, { right: -10, bottom: 0, backgroundColor: '#FFD700' }]} />
                    </View>
                </Animated.View>
            ) : (
                <Animated.View style={[
                    styles.falsifiedContainer,
                    { transform: [{ scale: scaleAnim }] }
                ]}>
                    <MaterialCommunityIcons name="close-octagon" size={100} color={colors.error} />
                    <Text style={[styles.falsifiedText, { color: colors.error }]}>
                        FALSIFIED (बनावट)
                    </Text>
                    <View style={styles.warningBox}>
                        <Text style={styles.warningText}>
                            Caution! Do not enter any info. / सावधान! माहिती भरू नका.
                        </Text>
                    </View>
                </Animated.View>
            )}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 5000,
    },
    stamp: {
        borderWidth: 6,
        borderRadius: 15,
        padding: 30,
        backgroundColor: '#fff',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 15,
    },
    stampText: {
        fontSize: 34,
        fontFamily: 'Poppins_700Bold',
        textAlign: 'center',
    },
    subText: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        color: '#444',
        marginTop: 5,
    },
    particles: {
        position: 'absolute',
        width: '120%',
        height: '110%',
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        position: 'absolute',
    },
    falsifiedContainer: {
        padding: 40,
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 5,
        borderColor: '#EB5757',
    },
    falsifiedText: {
        fontSize: 40,
        fontFamily: 'Poppins_700Bold',
        marginTop: 10,
    },
    warningBox: {
        marginTop: 20,
        backgroundColor: '#EB575710',
        padding: 10,
        borderRadius: 10,
    },
    warningText: {
        fontSize: 14,
        fontFamily: 'Poppins_500Medium',
        color: '#333',
        textAlign: 'center',
    }
});
