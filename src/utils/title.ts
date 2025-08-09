import type { HabitStatus } from "@/types/habit";

export const formatHabitStatus = (status: HabitStatus): string => {
  // Insert a space before each uppercase letter
  const spacedTitle = status.replace(/([A-Z])/g, ' $1');
  return spacedTitle.charAt(0).toUpperCase() + spacedTitle.slice(1);
};