import express from 'express';
import cors from 'cors';
import * as habitsService from './services/habitsService.js';
import { HABIT_STATUSES } from './types/types.js';
import { getToday } from './utils/date.js';

const app = express();
const PORT = 4444;

app.use(cors());
app.use(express.json());

// GET - All Habits
app.get('/habits', (req, res) => {
  try {
    const habits = habitsService.getAllHabits();
    return res.status(200).json(habits);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch habits' });
  }
});

// GET - One Habit
app.get('/habits/:id', (req, res) => {
  const { id } = req.params;

  try {
    const habit = habitsService.getHabitById(id);
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found.' });
    }
    return res.status(200).json(habit);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch habit' });
  }
});

// POST - Add a habit
app.post('/habits', (req, res) => {
  const { name, startDate, defaultStatus } = req.body;

  if (!name || !startDate || !defaultStatus) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    const newHabit = habitsService.createHabit(
      name,
      startDate,
      defaultStatus
    );
    return res.status(201).json(newHabit);
  } catch {
    return res.status(500).json({ error: 'Failed to create a habit' });
  }
});

// POST - Add/Update status of a habit entry
app.post('/habits/:id/status', (req, res) => {
  const { id } = req.params;
  const { date, status } = req.body;
  const today = getToday();

  if (!date || !status) {
    return res.status(400).json({ error: 'Missing date or habit status' });
  }

  if (!HABIT_STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Invalid habit entry status' });
  }

  if (date > today) {
    return res
      .status(400)
      .json({ error: 'Cannot set status for a future date' });
  }

  try {
    const updatedRecord = habitsService.updateHabitStatus(id, date, status);
    return res.status(200).json(updatedRecord);
  } catch {
    return res.status(500).json({ error: 'Failed to update habit status' });
  }
});

app.use('/', (req, res) => {
  return res.json({ message: 'Hello from the backend :)' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
