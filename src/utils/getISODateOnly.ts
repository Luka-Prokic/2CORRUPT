export const getISODateOnly = (iso: string) => {
    return new Date(iso).toISOString().split("T")[0]; // "2025-12-03"
  };