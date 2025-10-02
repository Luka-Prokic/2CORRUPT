import React from 'react';
import { ViewStyle } from 'react-native';
import { useThemeStore } from '../../stores/themeStore';
import ThreeDWidget from './ThreeDWidget';

interface Example3DWidgetProps {
  style?: ViewStyle;
}

// Example of how to use ThreeDWidget for future 3D models
export default function Example3DWidget({ style }: Example3DWidgetProps) {
  const { theme } = useThemeStore();

  return (
    <ThreeDWidget 
      style={style}
      width={150}
      height={150}
      variant="default"
      elevation={2}
    >
      {/* Add your 3D model components here */}
      {/* Example: <Your3DModel color={theme.accent} /> */}
    </ThreeDWidget>
  );
}

// Usage example:
// <Example3DWidget style={{ margin: 10 }} />
