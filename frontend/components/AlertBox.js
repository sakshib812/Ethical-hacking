import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AlertBox({ alerts }) {
    if (!alerts || alerts.length === 0) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>⚠️ Alerts / धोक्याची सूचना</Text>
            {alerts.map((alert, index) => (
                <View key={index} style={styles.alertItem}>
                    <Text style={styles.marathiText}>{alert.msg_mr}</Text>
                    <Text style={styles.englishText}>{alert.msg_en}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        backgroundColor: '#ffebee',
        borderRadius: 10,
        marginTop: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#d32f2f',
        marginBottom: 10,
        textAlign: 'center',
    },
    alertItem: {
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ffcdd2',
    },
    marathiText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#b71c1c',
    },
    englishText: {
        fontSize: 14,
        color: '#555',
        fontStyle: 'italic',
    },
});
