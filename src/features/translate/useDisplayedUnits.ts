import { useCallback } from "react";
import { useSettingsStore } from "../../stores/settingsStore";

export const useDisplayedUnits = () => {
  const { units } = useSettingsStore();

  // Unit conversion functions for each unit type
  const fromKg = useCallback(
    (kg: number): string => {
      const converted = units.weight === "lbs" ? kg * 2.20462 : kg;
      return units.weight === "lbs"
        ? `${converted.toFixed(0)}`
        : `${Math.round(converted)}`;
    },
    [units.weight]
  );

  const toKg = useCallback(
    (value: number | string): number => {
      const num = typeof value === "string" ? parseFloat(value) : value;
      return units.weight === "lbs" ? num / 2.20462 : num;
    },
    [units.weight]
  );

  const fromCm = useCallback(
    (cm: number): string => {
      const converted = units.length === "in" ? cm / 2.54 : cm;
      return units.length === "in"
        ? `${converted.toFixed(2)}`
        : `${Math.round(converted)}`;
    },
    [units.length]
  );

  const toCm = useCallback(
    (value: number | string): number => {
      const num = typeof value === "string" ? parseFloat(value) : value;
      return units.length === "in" ? num * 2.54 : num;
    },
    [units.length]
  );

  const fromKm = useCallback(
    (km: number): string => {
      const converted = units.distance === "mi" ? km * 0.621371 : km;
      return units.distance === "mi"
        ? `${converted.toFixed(2)}`
        : `${Math.round(converted)}`;
    },
    [units.distance]
  );

  const toKm = useCallback(
    (value: number | string): number => {
      const num = typeof value === "string" ? parseFloat(value) : value;
      return units.distance === "mi" ? num / 0.621371 : num;
    },
    [units.distance]
  );

  const fromMl = useCallback(
    (ml: number): string => {
      if (units.volume === "fl.oz") {
        return `${Math.round(ml * 0.033814)}`;
      }

      return `${Math.round(ml)}`;
    },
    [units.volume]
  );

  const toMl = useCallback(
    (value: number | string): number => {
      const num = typeof value === "string" ? parseFloat(value) : value;
      return units.volume === "fl.oz" ? num / 0.033814 : num;
    },
    [units.volume]
  );

  const fromCelsius = useCallback(
    (celsius: number): string => {
      const converted =
        units.temperature === "°F" ? (celsius * 9) / 5 + 32 : celsius;
      return units.temperature === "°F"
        ? `${converted.toFixed(1)}`
        : `${Math.round(converted)}`;
    },
    [units.temperature]
  );

  const toCelsius = useCallback(
    (value: number | string): number => {
      const num = typeof value === "string" ? parseFloat(value) : value;
      return units.temperature === "°F" ? ((num - 32) * 5) / 9 : num;
    },
    [units.temperature]
  );

  return {
    units,
    fromKg,
    toKg,
    fromCm,
    toCm,
    fromKm,
    toKm,
    fromMl,
    toMl,
    fromCelsius,
    toCelsius,
  };
};
