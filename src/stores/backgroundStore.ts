import { create } from 'zustand';
import { BackgroundType } from '../components/backgrounds/BackgroundManager';

interface BackgroundState {
  type: BackgroundType;
  color: string;
  lineColor: string;
  dotColor: string;
  gridSize: number;
  lineWidth: number;
  dotSize: number;
  dotSpacing: number;
  setType: (type: BackgroundType) => void;
  setColor: (color: string) => void;
  setLineColor: (lineColor: string) => void;
  setDotColor: (dotColor: string) => void;
  setGridSize: (gridSize: number) => void;
  setLineWidth: (lineWidth: number) => void;
  setDotSize: (dotSize: number) => void;
  setDotSpacing: (dotSpacing: number) => void;
  resetToDefaults: () => void;
}

const defaultValues = {
  type: 'blank' as BackgroundType,
  color: '#000000',
  lineColor: '#333333',
  dotColor: '#333333',
  gridSize: 44,
  lineWidth: 1,
  dotSize: 2,
  dotSpacing: 20,
};

export const useBackgroundStore = create<BackgroundState>((set) => ({
  ...defaultValues,
  
  setType: (type) => set({ type }),
  setColor: (color) => set({ color }),
  setLineColor: (lineColor) => set({ lineColor }),
  setDotColor: (dotColor) => set({ dotColor }),
  setGridSize: (gridSize) => set({ gridSize }),
  setLineWidth: (lineWidth) => set({ lineWidth }),
  setDotSize: (dotSize) => set({ dotSize }),
  setDotSpacing: (dotSpacing) => set({ dotSpacing }),
  
  resetToDefaults: () => set(defaultValues),
}));
