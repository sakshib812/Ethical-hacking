import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
} from '@expo-google-fonts/poppins';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import AnalysisScreen from './src/screens/AnalysisScreen';
import DevicesScreen from './src/screens/DevicesScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import SettingsScreen from './src/screens/SettingsScreen';

// Import navigation
import TabNavigator from './src/components/navigation/TabNavigator';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
    const [activeTab, setActiveTab] = useState('home');

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    const renderScreen = () => {
        switch (activeTab) {
            case 'home':
                return <HomeScreen />;
            case 'analysis':
                return <AnalysisScreen />;
            case 'devices':
                return <DevicesScreen />;
            case 'community':
                return <CommunityScreen />;
            case 'settings':
                return <SettingsScreen />;
            default:
                return <HomeScreen />;
        }
    };

    return (
        <SafeAreaProvider>
            <View style={styles.container} onLayout={onLayoutRootView}>
                {renderScreen()}
                <TabNavigator activeTab={activeTab} onTabChange={setActiveTab} />
                <StatusBar style="dark" />
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
