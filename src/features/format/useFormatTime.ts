import { useCallback } from "react";

interface UseFormatTimeProps {
  seconds: number;
  format?: "mm:ss" | "hh:mm:ss" | "auto" | "auto+";
}

export const useFormatTime = useCallback(
  ({ seconds, format = "mm:ss" }: UseFormatTimeProps): string => {
    if (format === "mm:ss") {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }

    if (format === "hh:mm:ss") {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }

    if (format === "auto") {
      if (seconds < 60) return `${seconds}s`;
      else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, "0")}`;
      } else {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}:${minutes.toString().padStart(2, "0")}`;
      }
    }

    if (format === "auto+") {
      if (seconds < 60) return `${seconds}s`;

      if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        if (secs === 0) return `${minutes} min`;
        return `${minutes} min ${secs}s`;
      }

      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;

      let result = "";
      if (hours > 0) result += `${hours} h`;
      if (minutes > 0) result += `${result ? " " : ""}${minutes} min`;
      if (secs > 0) result += `${result ? " " : ""}${secs}s`;

      return result;
    }

    return seconds.toString();
  },
  []
);
