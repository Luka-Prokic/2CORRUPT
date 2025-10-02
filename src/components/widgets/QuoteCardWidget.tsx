import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../../stores/themeStore';
import WidgetContainer from './WidgetContainer';

interface QuoteCardWidgetProps {
  quote?: string;
  author?: string;
  style?: ViewStyle;
  variant?: 'default' | 'compact' | 'expanded';
}

const defaultQuotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Success is not final, failure is not fatal.", author: "Winston Churchill" },
  { text: "The future belongs to those who believe in their dreams.", author: "Eleanor Roosevelt" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
];

export default function QuoteCardWidget({ 
  quote,
  author,
  style,
  variant = 'default'
}: QuoteCardWidgetProps) {
  const { theme } = useThemeStore();

  // Use provided quote or pick a random one
  const selectedQuote = quote || defaultQuotes[Math.floor(Math.random() * defaultQuotes.length)];
  const displayQuote = selectedQuote.text;
  const displayAuthor = author || selectedQuote.author;

  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          container: styles.compactContainer,
          quote: styles.compactQuote,
          author: styles.compactAuthor,
          icon: styles.compactIcon,
        };
      case 'expanded':
        return {
          container: styles.expandedContainer,
          quote: styles.expandedQuote,
          author: styles.expandedAuthor,
          icon: styles.expandedIcon,
        };
      default:
        return {
          container: styles.defaultContainer,
          quote: styles.defaultQuote,
          author: styles.defaultAuthor,
          icon: styles.defaultIcon,
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <WidgetContainer style={[style, variantStyles.container]} variant="inset">
      <View style={styles.content}>
        <View style={styles.quoteContainer}>
          <Ionicons 
            name="alert-circle" 
            size={variant === 'compact' ? 16 : variant === 'expanded' ? 24 : 20} 
            color={theme.accent}
            style={[styles.quoteIcon, variantStyles.icon]}
          />
          <Text style={[styles.quote, { color: theme.text }, variantStyles.quote]}>
            "{displayQuote}"
          </Text>
        </View>

        <View style={styles.authorContainer}>
          <View style={[styles.authorLine, { backgroundColor: theme.border }]} />
          <Text style={[styles.author, { color: theme.grayText }, variantStyles.author]}>
            — {displayAuthor}
          </Text>
        </View>
      </View>
    </WidgetContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultContainer: {
    padding: 16,
  },
  compactContainer: {
    padding: 12,
  },
  expandedContainer: {
    padding: 20,
  },
  quoteContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  quoteIcon: {
    marginBottom: 8,
    opacity: 0.7,
  },
  defaultIcon: {},
  compactIcon: {
    marginBottom: 6,
  },
  expandedIcon: {
    marginBottom: 12,
  },
  quote: {
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  defaultQuote: {
    fontSize: 14,
  },
  compactQuote: {
    fontSize: 12,
    lineHeight: 16,
  },
  expandedQuote: {
    fontSize: 16,
    lineHeight: 24,
  },
  authorContainer: {
    alignItems: 'center',
    width: '100%',
  },
  authorLine: {
    height: 1,
    width: 40,
    marginBottom: 8,
    opacity: 0.3,
  },
  author: {
    textAlign: 'center',
    fontWeight: '500',
  },
  defaultAuthor: {
    fontSize: 12,
  },
  compactAuthor: {
    fontSize: 10,
  },
  expandedAuthor: {
    fontSize: 14,
  },
});
