import { v4 as uuidv4 } from 'uuid';
import { runQuery, getAll, getOne } from '../db/db.js';
import type { Habit, HabitRecord, HabitStatus } from '../types/types.js';

export const getAllHabits = (): Habit[] => {
  const habitRows = getAll<Habit>('SELECT * FROM habits');
  return habitRows.map((habit) => {
    const history: HabitRecord[] = getAll<HabitRecord>(
      'SELECT * FROM habit_history WHERE habit_id = ? ORDER BY date DESC',
      [habit.id]
    );
    return { ...habit, history };
  });
};

export const getHabitById = (id: string): Habit | null => {
  const habit = getOne<Habit>('SELECT * FROM habits WHERE id = ?', [id]);
  if (!habit) return null;

  const history: HabitRecord[] = getAll<HabitRecord>(
    'SELECT * FROM habit_history WHERE habit_id = ? ORDER BY date DESC',
    [habit.id]
  );
  return { ...habit, history };
};

export const createHabit = (
  name: string,
  startDate: string,
  defaultStatus: HabitStatus
): Habit => {
  const id = uuidv4();
  runQuery('INSERT INTO habits (id, name) VALUES (?, ?)', [id, name]);

  runQuery(
    'INSERT INTO habit_history (id, habit_id, date, status) VALUES (?, ?, ?, ?)',
    [uuidv4(), id, startDate, defaultStatus]
  );

  return {
    id,
    name,
    history: [
      {
        date: startDate,
        status: defaultStatus,
      },
    ],
  };
};

export const updateHabitStatus = (
  habitId: string,
  date: string,
  status: HabitStatus
): HabitRecord => {
  // Check if a record already exists
  const existingRecord = getOne<HabitRecord>(
    'SELECT * FROM habit_history WHERE habit_id = ? AND date = ?',
    [habitId, date]
  );

  if (existingRecord) {
    // Update the existing record
    runQuery(
      'UPDATE habit_history SET status = ? WHERE habit_id = ? AND date = ?',
      [status, habitId, date]
    );
    return { ...existingRecord, status };
  } else {
    // Insert a new record
    const newRecord: HabitRecord = {
      date,
      status,
    };
    runQuery(
      'INSERT INTO habit_history (id, habit_id, date, status) VALUES (?, ?, ?, ?)',
      [uuidv4(), habitId, date, status]
    );
    return newRecord;
  }
};
