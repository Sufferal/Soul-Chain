export type Habit = {
  id: string;
  name: string;
  history: HabitRecord[];
}

type HabitRecord = {
  date: string;
  status: HabitStatus; 
}

export const HABIT_STATUSES = [
  'done',
  'missed',
  'skipped',
  'inProgress',
  'unknown'
] as const;

export type HabitStatus = (typeof HABIT_STATUSES)[number];