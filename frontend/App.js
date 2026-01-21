import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import SurakshaChakra from './components/SurakshaChakra';
import AlertBox from './components/AlertBox';
import { analyzeNetwork } from './services/api';
import { initSarthi, playSecurityAlert } from './services/SarthiHelper';

export default function App() {
    const [scanning, setScanning] = useState(false);
    const [result, setResult] = useState(null);

    useEffect(() => {
        initSarthi();
    }, []);

    const handleScan = async () => {
        setScanning(true);
        setResult(null);
        try {
            // Simulate scanning by sending "current WiFi" data to backend
            // In real app, we would use a WiFi library to get this info.
            // For Demo: We send the "Test_Open_WiFi" data
            const mockWifiData = {
                ssid: "Village_Public_WiFi",
                bssid: "00:11:22:33:44:55",
                encryption: "OPEN", // Simulating a risky network
                signal_dbm: -65
            };

            const data = await analyzeNetwork(mockWifiData);
            setResult(data);

            // Trigger Sarthi Voice Alert
            if (data.status === 'DANGER' || data.status === 'WARNING') {
                playSecurityAlert('OPEN'); // Or map data.status
            } else {
                playSecurityAlert('SAFE');
            }

        } catch (error) {
            Alert.alert("Error", "Could not connect to backend. Make sure Flask is running.");
            console.log(error);
        } finally {
            setScanning(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Ethical Hacking Assistant</Text>
            <Text style={styles.subHeader}>Village Cyber Security</Text>

            <View style={styles.content}>
                {result ? (
                    <>
                        <SurakshaChakra status={result.status} />
                        <AlertBox alerts={result.alerts} />
                        <TouchableOpacity style={styles.button} onPress={handleScan}>
                            <Text style={styles.buttonText}>Scan Again / पुन्हा स्कॅन करा</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <View style={styles.placeholder}>
                            <Text style={styles.placeholderText}>
                                Connect to WiFi and press Scan
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={[styles.button, scanning && styles.buttonDisabled]}
                            onPress={handleScan}
                            disabled={scanning}
                        >
                            {scanning ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>SCAN NETWORK / स्कॅन करा</Text>
                            )}
                        </TouchableOpacity>
                    </>
                )}
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    subHeader: {
        fontSize: 16,
        color: '#666',
        marginBottom: 40,
    },
    content: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#2196f3',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        marginTop: 30,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonDisabled: {
        backgroundColor: '#b0bec5',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    placeholder: {
        height: 180,
        justifyContent: 'center',
        marginBottom: 20,
    },
    placeholderText: {
        fontSize: 16,
        color: '#aaa',
    }
});
