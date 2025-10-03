import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useSettingsStore } from '../../../stores/settingsStore';
import WidgetContainer from './WidgetContainer';

interface ProgressChartWidgetProps {
  progress?: number;
  label?: string;
  style?: ViewStyle | ViewStyle[];
  variant?: 'circular' | 'linear' | 'mini';
}

export default function ProgressChartWidget({ 
  progress = 0.75,
  label = 'Progress',
  style,
  variant = 'linear'
}: ProgressChartWidgetProps) {
  const { theme } = useSettingsStore();

  const getVariantStyles = () => {
    switch (variant) {
      case 'circular':
        return {
          container: styles.circularContainer,
          text: styles.circularText,
        };
      case 'mini':
        return {
          container: styles.miniContainer,
          text: styles.miniText,
        };
      default:
        return {
          container: styles.linearContainer,
          text: styles.linearText,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const progressPercentage = Math.min(Math.max(progress * 100, 0), 100);

  const renderCircularProgress = () => {
    const radius = 30;
    const strokeWidth = 4;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (progress * circumference);

    return (
      <View style={styles.circularWrapper}>
        <View style={[styles.circularTrack, { borderColor: theme.border }]}>
          <View 
            style={[
              styles.circularProgress,
              { 
                borderColor: theme.accent,
                transform: [{ rotate: '-90deg' }],
                borderWidth: strokeWidth,
                width: radius * 2,
                height: radius * 2,
                borderRadius: radius,
              }
            ]}
          />
        </View>
        <Text style={[styles.percentage, { color: theme.text }]}>
          {Math.round(progressPercentage)}%
        </Text>
      </View>
    );
  };

  const renderLinearProgress = () => (
    <View style={styles.linearWrapper}>
      <View style={[styles.progressTrack, { backgroundColor: theme.border }]}>
        <View 
          style={[
            styles.progressBar,
            { 
              backgroundColor: theme.accent,
              width: `${progressPercentage}%`,
            }
          ]}
        />
      </View>
      <Text style={[styles.percentage, { color: theme.text }]}>
        {Math.round(progressPercentage)}%
      </Text>
    </View>
  );

  const renderMiniProgress = () => (
    <View style={styles.miniWrapper}>
      <View style={[styles.miniTrack, { backgroundColor: theme.border }]}>
        <View 
          style={[
            styles.miniBar,
            { 
              backgroundColor: theme.accent,
              width: `${progressPercentage}%`,
            }
          ]}
        />
      </View>
    </View>
  );

  return (
    <WidgetContainer style={[style, variantStyles.container]} variant="inset">
      <View style={styles.content}>
        <Text style={[styles.label, { color: theme.text }, variantStyles.text]}>
          {label}
        </Text>
        
        {variant === 'circular' && renderCircularProgress()}
        {variant === 'linear' && renderLinearProgress()}
        {variant === 'mini' && renderMiniProgress()}
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
  linearContainer: {
    padding: 16,
  },
  circularContainer: {
    padding: 20,
  },
  miniContainer: {
    padding: 12,
  },
  label: {
    fontWeight: '600',
    marginBottom: 12,
  },
  linearText: {
    fontSize: 14,
  },
  circularText: {
    fontSize: 16,
  },
  miniText: {
    fontSize: 12,
  },
  linearWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  circularWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniWrapper: {
    width: '100%',
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    width: '100%',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  miniTrack: {
    height: 4,
    borderRadius: 2,
    width: '100%',
    overflow: 'hidden',
  },
  miniBar: {
    height: '100%',
    borderRadius: 2,
  },
  circularTrack: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularProgress: {
    position: 'absolute',
    borderWidth: 4,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  percentage: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
  },
});
