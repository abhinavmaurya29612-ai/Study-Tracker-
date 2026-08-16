import { useState, useEffect } from 'react';
import type { Subject, StudyLog, Task, QuizResult, ChapterStatus } from '../types';
import { INITIAL_SUBJECTS } from '../data/ncertData';

const STORAGE_KEYS = {
  SUBJECTS: 'study_tracker_subjects_v2',
  LOGS: 'study_tracker_logs_v2',
  TASKS: 'study_tracker_tasks_v2',
  QUIZ_RESULTS: 'study_tracker_quiz_results_v2',
  LAST_ACTIVE_DATE: 'study_tracker_last_active_date_v2',
  STREAK_COUNT: 'study_tracker_streak_count_v2',
};

const DEFAULT_CLEAN_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Complete "Orienting Yourself: Coordinates" in Ganita Manjari',
    subjectId: 'math',
    completed: false,
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'high'
  },
  {
    id: 'task-2',
    title: 'Revise Chemistry Chapter 1 - Matter in Our Surroundings',
    subjectId: 'science',
    completed: false,
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'medium'
  },
  {
    id: 'task-3',
    title: 'Attempt 5-question Daily Quiz on Class 9 Concepts',
    subjectId: 'general',
    completed: false,
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'high'
  }
];

export function useStudyApp() {
  // 1. Subjects & Chapters State (Default all chapters Not Started)
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SUBJECTS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved subjects from LocalStorage', e);
    }
    return INITIAL_SUBJECTS;
  });

  // 2. Study Logs State (Default empty for fresh user start)
  const [logs, setLogs] = useState<StudyLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LOGS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse study logs', e);
    }
    return [];
  });

  // 3. Tasks State
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse tasks', e);
    }
    return DEFAULT_CLEAN_TASKS;
  });

  // 4. Quiz Results State
  const [quizResults, setQuizResults] = useState<QuizResult[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse quiz results', e);
    }
    return [];
  });

  // 5. Streak Counter State (Default 0 for new user start)
  const [streak, setStreak] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STREAK_COUNT);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  // Save changes to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify(quizResults));
  }, [quizResults]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STREAK_COUNT, streak.toString());
  }, [streak]);

  // Daily Streak update logic on study log addition
  const recordStreakActivity = () => {
    const today = new Date().toISOString().split('T')[0];
    const lastActive = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVE_DATE);

    if (!lastActive) {
      setStreak(1);
      localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE_DATE, today);
    } else if (lastActive !== today) {
      const lastDate = new Date(lastActive);
      const currentDate = new Date(today);
      const diffDays = Math.round((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

      if (diffDays === 1) {
        setStreak(prev => prev + 1);
      } else if (diffDays > 1) {
        setStreak(1);
      }
      localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE_DATE, today);
    } else if (streak === 0) {
      setStreak(1);
    }
  };

  // --- ACTIONS ---

  // Chapter Status Update
  const updateChapterStatus = (subjectId: string, chapterId: string, status: ChapterStatus) => {
    recordStreakActivity();
    setSubjects(prev =>
      prev.map(subj => {
        if (subj.id !== subjectId) return subj;
        return {
          ...subj,
          chapters: subj.chapters.map(ch => (ch.id === chapterId ? { ...ch, status } : ch))
        };
      })
    );
  };

  // Add Study Time Log
  const addStudyLog = (subjectId: string, durationMinutes: number, type: 'Pomodoro' | 'Stopwatch' | 'Custom') => {
    if (durationMinutes <= 0) return;
    recordStreakActivity();
    const subject = subjects.find(s => s.id === subjectId);
    const subjectName = subject ? subject.name : 'General Study';
    const today = new Date().toISOString().split('T')[0];

    const newLog: StudyLog = {
      id: `log-${Date.now()}`,
      subjectId,
      subjectName,
      durationMinutes,
      date: today,
      timestamp: Date.now(),
      type
    };

    setLogs(prev => [newLog, ...prev]);
  };

  // Task Actions
  const addTask = (title: string, subjectId: string = 'general', priority: 'low' | 'medium' | 'high' = 'medium') => {
    const today = new Date().toISOString().split('T')[0];
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title,
      subjectId,
      completed: false,
      dueDate: today,
      priority
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (taskId: string) => {
    recordStreakActivity();
    setTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  // Quiz Result Recording
  const recordQuizResult = (subjectId: string, score: number, total: number) => {
    recordStreakActivity();
    const today = new Date().toISOString().split('T')[0];
    const newResult: QuizResult = {
      id: `quiz-${Date.now()}`,
      subjectId,
      score,
      total,
      date: today,
      timestamp: Date.now()
    };
    setQuizResults(prev => [newResult, ...prev]);
  };

  // Reset to default clean state zero
  const resetToDefaults = () => {
    setSubjects(INITIAL_SUBJECTS);
    setTasks(DEFAULT_CLEAN_TASKS);
    setLogs([]);
    setQuizResults([]);
    setStreak(0);
    localStorage.clear();
  };

  return {
    subjects,
    logs,
    tasks,
    quizResults,
    streak,
    updateChapterStatus,
    addStudyLog,
    addTask,
    toggleTask,
    deleteTask,
    recordQuizResult,
    resetToDefaults
  };
}
