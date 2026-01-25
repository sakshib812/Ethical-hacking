import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../theme';

export default function TabNavigator({ activeTab, onTabChange }) {
    const tabs = [
        { id: 'home', label: 'Home', icon: 'home', marathiLabel: 'होम' },
        { id: 'analysis', label: 'Analysis', icon: 'chart-line', marathiLabel: 'विश्लेषण' },
        { id: 'devices', label: 'Devices', icon: 'devices', marathiLabel: 'उपकरणे' },
        { id: 'community', label: 'Community', icon: 'account-group', marathiLabel: 'समुदाय' },
        { id: 'settings', label: 'Settings', icon: 'cog-outline', marathiLabel: 'सेटिंग्ज' },
    ];

    return (
        <View style={styles.container}>
            {tabs.map(tab => (
                <TouchableOpacity
                    key={tab.id}
                    style={[styles.tab, activeTab === tab.id && styles.activeTab]}
                    onPress={() => onTabChange(tab.id)}
                    activeOpacity={0.7}
                >
                    <MaterialCommunityIcons
                        name={tab.icon}
                        size={24}
                        color={activeTab === tab.id ? theme.colors.primary.deepOrange : theme.colors.neutral.gray}
                    />
                    <Text style={[styles.label, activeTab === tab.id && styles.activeLabel]}>
                        {tab.label}
                    </Text>
                    <Text style={[styles.marathiLabel, activeTab === tab.id && styles.activeMarathiLabel]}>
                        {tab.marathiLabel}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: theme.colors.neutral.white,
        paddingBottom: theme.spacing.sm,
        paddingTop: theme.spacing.xs,
        borderTopWidth: 1,
        borderTopColor: theme.colors.neutral.lightGray,
        ...theme.shadows.md,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: theme.spacing.xs,
    },
    activeTab: {
        borderTopWidth: 2,
        borderTopColor: theme.colors.primary.deepOrange,
    },
    label: {
        fontSize: theme.typography.fontSize.xs,
        fontFamily: theme.typography.fontFamily.medium,
        color: theme.colors.neutral.gray,
        marginTop: theme.spacing.xs / 2,
    },
    activeLabel: {
        color: theme.colors.primary.deepOrange,
        fontFamily: theme.typography.fontFamily.semiBold,
    },
    marathiLabel: {
        fontSize: theme.typography.fontSize.xs - 2,
        fontFamily: theme.typography.fontFamily.marathi,
        color: theme.colors.neutral.gray,
    },
    activeMarathiLabel: {
        color: theme.colors.primary.deepOrange,
    },
});
