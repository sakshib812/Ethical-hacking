import React from 'react';
import { Text, StyleSheet } from 'react-native';
import theme from '../../theme';

export default function MarathiText({ children, style, english = false }) {
    return (
        <Text
            style={[
                styles.text,
                english ? styles.english : styles.marathi,
                style,
            ]}
        >
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: theme.typography.fontSize.base,
    },
    marathi: {
        fontFamily: theme.typography.fontFamily.marathi,
        lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.base,
    },
    english: {
        fontFamily: theme.typography.fontFamily.regular,
        lineHeight: theme.typography.lineHeight.normal * theme.typography.fontSize.base,
    },
});
