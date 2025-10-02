# 3D Widgets for React Native

This folder contains reusable 3D widgets built with @react-three/fiber for the "Corrupt" app.

## Components

### ThreeDWidget
A reusable container component for 3D models with:
- 150x150 default size with dark background
- Rounded corners (12px border radius)
- Built-in lighting (ambient + directional)
- Shadow support
- Multiple variants (default, compact, detailed, expanded)
- Elevation support

### TriangleModel
A 3D triangle model component with:
- 15° tilt on X-axis
- Z-axis rotation animation
- Customizable color, size, and rotation speed
- Metallic material with emissive glow

### AwardsWidget
Example implementation using ThreeDWidget and TriangleModel:
- 150x150 widget size
- Rotating triangle with theme-based colors
- Reusable for future 3D models

## Usage

```tsx
import { ThreeDWidget, TriangleModel } from '../components/widgets';

// Basic usage
<ThreeDWidget width={150} height={150}>
  <TriangleModel color="#FFD700" size={0.4} rotationSpeed={0.5} />
</ThreeDWidget>

// With custom styling
<ThreeDWidget 
  style={{ margin: 10 }}
  variant="detailed"
  elevation={3}
>
  <Your3DModel />
</ThreeDWidget>
```

## Future 3D Models

To add new 3D models:
1. Create a new model component (e.g., `CubeModel.tsx`)
2. Use `useFrame` for animations
3. Wrap in `ThreeDWidget` for consistent styling
4. Export from `index.ts`

## Dependencies

- @react-three/fiber
- @react-three/drei
- three
- expo-gl
- expo-three
