export type ChapterStatus = 'Not Started' | 'In Progress' | 'Completed';
export type SyllabusVersion = 'New Syllabus' | 'Old Syllabus';

export interface Chapter {
  id: string;
  title: string;
  subCategory?: string; // e.g. "Physics", "Chemistry", "Biology" for Science; "History", "Geography", "Civics", "Economics" for SST; "Employability Skills", "Subject Specific Skills" for IT
  syllabusVersion?: SyllabusVersion; // "New Syllabus" | "Old Syllabus"
  status: ChapterStatus;
  notes?: string;
}

export interface Subject {
  id: string;
  name: string;
  title: string;
  code?: string;
  icon: string;
  color: string;
  subCategories?: string[];
  chapters: Chapter[];
}

export interface StudyLog {
  id: string;
  subjectId: string;
  subjectName: string;
  durationMinutes: number;
  date: string; // YYYY-MM-DD
  timestamp: number;
  type: 'Pomodoro' | 'Stopwatch' | 'Custom';
}

export interface Task {
  id: string;
  title: string;
  subjectId?: string;
  completed: boolean;
  dueDate: string; // YYYY-MM-DD
  priority: 'low' | 'medium' | 'high';
}

export interface QuizQuestion {
  id: string;
  subjectId: string;
  category?: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizResult {
  id: string;
  date: string;
  timestamp: number;
  score: number;
  total: number;
  subjectId: string;
}
