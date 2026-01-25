import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../theme';
import AnimatedCard from '../shared/AnimatedCard';
import MarathiText from '../shared/MarathiText';

export default function SessionTimer({ startTime = null }) {
  const [elapsed, setElapsed] = useState(0);
  
  useEffect(() => {
    if (!startTime) return;
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const start = new Date(startTime).getTime();
      const diff = Math.floor((now - start) / 1000); // seconds
      setElapsed(diff);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [startTime]);
  
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };
  
  const getWarningColor = () => {
    if (elapsed > 3600) return theme.colors.status.danger; // > 1 hour
    if (elapsed > 1800) return theme.colors.status.warning; // > 30 min
    return theme.colors.status.safe;
  };
  
  if (!startTime) {
    return null;
  }
  
  return (
    <AnimatedCard style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons 
          name="timer-outline" 
          size={24} 
          color={getWarningColor()} 
        />
        <Text style={styles.title}>Session Duration</Text>
      </View>
      
      <Text style={[styles.time, { color: getWarningColor() }]}>
        {formatTime(elapsed)}
      </Text>
      
      <MarathiText style={styles.subtitle}>सत्र कालावधी</MarathiText>
      
      {elapsed > 1800 && (
        <View style={styles.warning}>
          <Text style={styles.warningText}>
            ⚠️ Long session on public WiFi
          </Text>
          <MarathiText style={styles.warningTextMarathi}>
            सार्वजनिक वाय-फायवर दीर्घ सत्र
          </MarathiText>
        </View>
      )}
    </AnimatedCard>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  title: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.semiBold,
    marginLeft: theme.spacing.sm,
    color: theme.colors.neutral.darkGray,
  },
  time: {
    fontSize: theme.typography.fontSize.xxxl,
    fontFamily: theme.typography.fontFamily.bold,
    textAlign: 'center',
    marginVertical: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.sm,
    textAlign: 'center',
    color: theme.colors.neutral.gray,
  },
  warning: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.status.warning + '20',
    borderRadius: theme.borderRadius.sm,
  },
  warningText: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.status.warning,
    textAlign: 'center',
  },
  warningTextMarathi: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.status.warning,
    textAlign: 'center',
  },
});
