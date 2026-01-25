import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Text, Platform } from 'react-native';
import { useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const NAV_ITEMS = [
    { id: 'home', icon: 'home', label_en: 'Home', label_mr: 'मुख्य पान' },
    { id: 'signals', icon: 'wifi-marker', label_en: 'Signals', label_mr: 'लहरी' },
    { id: 'shield', icon: 'shield-check', label_en: 'Shield', label_mr: 'सुरक्षा' },
    { id: 'web', icon: 'web', label_en: 'Web', label_mr: 'संकेतस्थळ' },
];

export default function Navbar({ activeTab, onTabPress }) {
    const { colors } = useTheme();
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.15,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [activeTab]);

    return (
        <View style={styles.container}>
            <View style={[styles.navContent, { backgroundColor: 'rgba(255, 255, 255, 0.85)', borderTopColor: colors.outlineVariant }]}>
                {NAV_ITEMS.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.navItem}
                            onPress={() => onTabPress(item.id)}
                            activeOpacity={0.7}
                        >
                            <Animated.View style={isActive ? { transform: [{ scale: pulseAnim }] } : {}}>
                                <MaterialCommunityIcons
                                    name={item.icon}
                                    size={28}
                                    color={isActive ? colors.primary : colors.onSurfaceVariant}
                                />
                            </Animated.View>
                            {isActive && (
                                <Text style={[styles.label, { color: colors.primary, fontFamily: 'Poppins_600SemiBold' }]}>
                                    {item.label_mr}
                                </Text>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        borderRadius: 30,
        overflow: 'hidden',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
    },
    blurContainer: {
        width: '100%',
        paddingVertical: 10,
    },
    navContent: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 70,
    },
    label: {
        fontSize: 10,
        marginTop: 4,
    },
});
