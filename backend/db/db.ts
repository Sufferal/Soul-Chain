import path from 'path';
import Database from 'better-sqlite3';

const dbPath = path.resolve('./db/habits.db'); 
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS habits (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL
  );  

  CREATE TABLE IF NOT EXISTS habit_history (
    id TEXT PRIMARY KEY,
    habit_id TEXT NOT NULL,
    date TEXT NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY(habit_id) REFERENCES habits(id)
  );
`);

export const runQuery = (sql: string, params: unknown[] = []) => {
  return db.prepare(sql).run(...params);
};

export const getAll = <T = unknown>(
  sql: string,
  params: unknown[] = []
): T[] => {
  return db.prepare(sql).all(...params) as T[];
};

export const getOne = <T = unknown>(
  sql: string,
  params: unknown[] = []
): T | null => {
  const result = db.prepare(sql).get(...params) as T | undefined;
  return result ?? null;
};
