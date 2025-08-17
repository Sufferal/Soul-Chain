// Example: 2025-
export const getToday = (): string => {
  return new Date().toISOString().split("T")[0]!;
};