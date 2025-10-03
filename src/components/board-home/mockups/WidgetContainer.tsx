import React from 'react';
import { View, StyleSheet, ViewStyle, DimensionValue } from 'react-native';
import { useSettingsStore } from '../../../stores/settingsStore';
import hexToRGBA from '../../../features/HEXtoRGB';

interface WidgetContainerProps {
  children: React.ReactNode;
  width?: DimensionValue;
  height?: DimensionValue;
  style?: ViewStyle | ViewStyle[];
  variant?: 'default' | 'elevated' | 'inset';
}

export default function WidgetContainer({ 
  children, 
  width = '100%', 
  height = '100%', 
  style,
  variant = 'default'
}: WidgetContainerProps) {
  const { theme } = useSettingsStore();

  const getVariantStyle = () => {
    switch (variant) {
      case 'elevated':
        return {
          shadowColor: theme.shadow,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 6,
        };
      case 'inset':
        return {
          shadowColor: theme.shadow,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: -2,
        };
      default:
        return {
          shadowColor: theme.shadow,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 4,
        };
    }
  };

  return (
    <View 
      style={[
        styles.container,
        {
          backgroundColor: hexToRGBA(theme.thirdBackground, 0.5),
          borderColor: theme.border,
          width,
          height,
        },
        getVariantStyle(),
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 32,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
  },
});
