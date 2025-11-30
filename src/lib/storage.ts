// LocalStorage utilities for FocusForge

export interface HabitData {
  name: string;
  completedDays: number[];
  startDate: string;
  type: '21' | '90';
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface DailyGoal {
  id: string;
  text: string;
  completed: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface PomodoroSettings {
  workDuration: number;
  breakDuration: number;
  sessionsCompleted: number;
}

export interface WaterTrackerData {
  glasses: number;
  goal: number;
  date: string;
}

const STORAGE_KEYS = {
  HABIT_21: 'focusforge_habit_21',
  HABIT_90: 'focusforge_habit_90',
  TODOS: 'focusforge_todos',
  DAILY_GOALS: 'focusforge_daily_goals',
  NOTES: 'focusforge_notes',
  POMODORO: 'focusforge_pomodoro',
  WATER: 'focusforge_water',
  WISDOM_MODE: 'focusforge_wisdom_mode',
  STREAKS: 'focusforge_streaks',
};

// Generic storage functions
export function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
}

// Habit tracker functions
export function saveHabitProgress(type: '21' | '90', data: HabitData): void {
  const key = type === '21' ? STORAGE_KEYS.HABIT_21 : STORAGE_KEYS.HABIT_90;
  saveToStorage(key, data);
}

export function loadHabitProgress(type: '21' | '90'): HabitData | null {
  const key = type === '21' ? STORAGE_KEYS.HABIT_21 : STORAGE_KEYS.HABIT_90;
  return loadFromStorage<HabitData | null>(key, null);
}

export function resetHabitProgress(type: '21' | '90'): void {
  const key = type === '21' ? STORAGE_KEYS.HABIT_21 : STORAGE_KEYS.HABIT_90;
  localStorage.removeItem(key);
}

// Todo functions
export function saveTodos(todos: TodoItem[]): void {
  saveToStorage(STORAGE_KEYS.TODOS, todos);
}

export function loadTodos(): TodoItem[] {
  return loadFromStorage<TodoItem[]>(STORAGE_KEYS.TODOS, []);
}

// Daily goals functions
export function saveDailyGoals(goals: DailyGoal[]): void {
  saveToStorage(STORAGE_KEYS.DAILY_GOALS, goals);
}

export function loadDailyGoals(): DailyGoal[] {
  return loadFromStorage<DailyGoal[]>(STORAGE_KEYS.DAILY_GOALS, []);
}

// Notes functions
export function saveNotes(notes: Note[]): void {
  saveToStorage(STORAGE_KEYS.NOTES, notes);
}

export function loadNotes(): Note[] {
  return loadFromStorage<Note[]>(STORAGE_KEYS.NOTES, []);
}

// Pomodoro functions
export function savePomodoroSettings(settings: PomodoroSettings): void {
  saveToStorage(STORAGE_KEYS.POMODORO, settings);
}

export function loadPomodoroSettings(): PomodoroSettings {
  return loadFromStorage<PomodoroSettings>(STORAGE_KEYS.POMODORO, {
    workDuration: 25,
    breakDuration: 5,
    sessionsCompleted: 0,
  });
}

// Water tracker functions
export function saveWaterData(data: WaterTrackerData): void {
  saveToStorage(STORAGE_KEYS.WATER, data);
}

export function loadWaterData(): WaterTrackerData {
  const today = new Date().toISOString().split('T')[0];
  const stored = loadFromStorage<WaterTrackerData>(STORAGE_KEYS.WATER, {
    glasses: 0,
    goal: 8,
    date: today,
  });
  
  // Reset if it's a new day
  if (stored.date !== today) {
    return { glasses: 0, goal: stored.goal, date: today };
  }
  return stored;
}

// Wisdom mode
export function saveWisdomMode(enabled: boolean): void {
  saveToStorage(STORAGE_KEYS.WISDOM_MODE, enabled);
}

export function loadWisdomMode(): boolean {
  return loadFromStorage<boolean>(STORAGE_KEYS.WISDOM_MODE, false);
}

// Streak calculation
export function calculateStreak(completedDays: number[]): number {
  if (completedDays.length === 0) return 0;
  
  const sorted = [...completedDays].sort((a, b) => a - b);
  let streak = 1;
  
  for (let i = sorted.length - 1; i > 0; i--) {
    if (sorted[i] - sorted[i - 1] === 1) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
