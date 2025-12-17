import { useSettingsStore } from "../../stores/settingsStore";

export function useCorrectTime(input: number | string | Date) {
  const { timeFormat } = useSettingsStore();

  if (!input) return null;

  return toDate(input).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: timeFormat === "12h",
  });
}

export function useSystemTime(input: number | string | Date) {
  return toDate(input).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

//quick helper
function toDate(input: number | string | Date): Date {
  if (input instanceof Date) return input;

  // If string is already a time like "14:30", return today with that time
  if (typeof input === "string" && /^\d{1,2}:\d{2}/.test(input)) {
    const [h, m] = input.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d;
  }

  return new Date(input);
}
