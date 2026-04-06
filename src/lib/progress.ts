// Persistence layer for tracking learning progress in localStorage
// All data stored under "chem12_progress" key

export interface PracticeSession {
  type: "practice" | "exam";
  timestamp: number; // Unix ms
  chapter: number | null; // null = mixed/all chapters
  mode?: string; // exam mode label
  score: number; // number correct
  total: number; // total questions
  pct: number; // percentage correct 0-100
  durationMinutes?: number;
}

const STORAGE_KEY = "chem12_progress";

function loadSessions(): PracticeSession[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSessions(sessions: PracticeSession[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function logPracticeSession(
  chapter: number | null,
  score: number,
  total: number
): void {
  const sessions = loadSessions();
  sessions.push({
    type: "practice",
    timestamp: Date.now(),
    chapter,
    score,
    total,
    pct: total > 0 ? Math.round((score / total) * 100) : 0,
  });
  saveSessions(sessions);
}

export function logExamSession(
  mode: string,
  score: number,
  total: number,
  durationMinutes?: number
): void {
  const sessions = loadSessions();
  sessions.push({
    type: "exam",
    timestamp: Date.now(),
    chapter: null,
    mode,
    score,
    total,
    pct: total > 0 ? Math.round((score / total) * 100) : 0,
    durationMinutes,
  });
  saveSessions(sessions);
}

export function getSessions(): PracticeSession[] {
  return loadSessions();
}

export function resetAllSessions(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
