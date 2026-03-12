export type Subject = 'Matematika' | 'Fisika' | 'Biologi' | 'Kimia' | 'Informatika';
export type Difficulty = 'Mudah' | 'Sedang' | 'Sulit';

export interface Question {
  id?: string;
  question: string;
  options: string[];
  answer: string; // The correct option (e.g., "A", "B", "C", "D", "E")
  explanation: string;
}

export interface QuizResult {
  subject: Subject;
  score: number;
  correct: number;
  wrong: number;
  total: number;
  date: string;
}

export interface QuizConfig {
  subject: Subject;
  count: number;
  difficulty: Difficulty;
  topic: string;
}
