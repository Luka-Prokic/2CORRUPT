import { useCallback } from "react";
import { useSettingsStore } from "../../stores/settingsStore";

export const useDisplayedWeight = () => {
  const { units } = useSettingsStore();
  const unit = units.weight;

  const fromKg = useCallback(
    (kg: number): string => {
      const converted = unit === "lbs" ? kg * 2.20462 : kg;
      return unit === "lbs"
        ? `${converted.toFixed(0)}`
        : `${Math.round(converted)}`;
    },
    [unit]
  );

  const toKg = useCallback(
    (value: number | string): number => {
      const num = typeof value === "string" ? parseFloat(value) : value;
      return unit === "lbs" ? num / 2.20462 : num;
    },
    [unit]
  );

  return { unit, fromKg, toKg };
};
