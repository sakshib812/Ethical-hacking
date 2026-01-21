import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RiskMeter({ score, level }) {
    let color = '#4caf50'; // Green
    if (level === 'WARNING') color = '#ff9800'; // Orange
    if (level === 'DANGER' || level === 'CRITICAL') color = '#f44336'; // Red

    return (
        <View style={[styles.container, { borderColor: color }]}>
            <Text style={[styles.score, { color: color }]}>{score}</Text>
            <Text style={styles.label}>Safety Score</Text>
            <Text style={[styles.level, { backgroundColor: color }]}>{level}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
        borderWidth: 5,
        borderRadius: 100, // Circular feel
        width: 180,
        height: 180,
        justifyContent: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    score: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 14,
        color: '#666',
    },
    level: {
        marginTop: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
        color: '#fff',
        fontWeight: 'bold',
        overflow: 'hidden',
    },
});
