export type Habit = {
  id: string;
  name: string;
  history: HabitRecord[];
}

type HabitRecord = {
  date: string;
  status: HabitStatus; 
}

export type HabitStatus = 'done' | 'missed' | 'skipped' | 'inProgress';