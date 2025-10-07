import { useMemo } from "react";
import { WIDTH } from "../Dimensions";

interface WidgetUnitOptions {
  columns?: number;
  padding?: number;
  margin?: number;
}

/**
 * Hook for calculating widget dimensions based on screen width
 * @param options Configuration for widget calculations
 * @returns Object containing various widget size calculations
 */

export function useWidgetUnit(options: WidgetUnitOptions = {}) {
  const { columns = 2, padding = 40, margin = 8 } = options;

  const widgetUnit = useMemo(() => {
    return (WIDTH - padding) / columns;
  }, [WIDTH, columns, padding]);

  const halfWidget = useMemo(() => {
    return (widgetUnit - margin) / 2;
  }, [widgetUnit, margin]);

  const quarterWidget = useMemo(() => {
    return (widgetUnit - margin * 3) / 4;
  }, [widgetUnit, margin]);

  const fullWidth = useMemo(() => {
    return WIDTH - 32; // Full width with side padding
  }, [WIDTH]);

  return {
    widgetUnit,
    halfWidget,
    quarterWidget,
    fullWidth,
  };
}
