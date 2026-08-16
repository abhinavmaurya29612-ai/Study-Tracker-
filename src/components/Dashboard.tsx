import React from 'react';
import type { Subject, StudyLog, Task } from '../types';
import {
  Clock,
  Calendar,
  Flame,
  CheckCircle2,
  Award,
  ArrowRight,
  Zap,
  Sparkles,
  X,
  Brain,
  Calculator,
  FlaskConical,
  BookOpen,
  Feather,
  Laptop,
  Globe,
  RotateCcw
} from 'lucide-react';

interface DashboardProps {
  subjects: Subject[];
  logs: StudyLog[];
  tasks: Task[];
  streak: number;
  onNavigate: (tab: 'subjects' | 'timer' | 'quiz' | 'tasks', subjectId?: string) => void;
  showQuizBanner: boolean;
  onCloseQuizBanner: () => void;
  onToggleTask: (taskId: string) => void;
  onResetToDefaults: () => void;
}

// Icon mapping helper
const getSubjectIcon = (iconName: string) => {
  switch (iconName) {
    case 'Calculator': return Calculator;
    case 'FlaskConical': return FlaskConical;
    case 'BookOpen': return BookOpen;
    case 'Feather': return Feather;
    case 'Laptop': return Laptop;
    case 'Globe': return Globe;
    default: return BookOpen;
  }
};

export const Dashboard: React.FC<DashboardProps> = ({
  subjects,
  logs,
  tasks,
  streak,
  onNavigate,
  showQuizBanner,
  onCloseQuizBanner,
  onToggleTask,
  onResetToDefaults
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  // Calculate Today's Study Time (in Minutes)
  const todayLogs = logs.filter(l => l.date === todayStr);
  const todayMinutes = todayLogs.reduce((acc, curr) => acc + curr.durationMinutes, 0);

  // Calculate Weekly Study Time (Last 7 Days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  const sevenDaysAgoStr = sevenDaysAgo.toISOString().split('T')[0];

  const weeklyLogs = logs.filter(l => l.date >= sevenDaysAgoStr);
  const weeklyMinutes = weeklyLogs.reduce((acc, curr) => acc + curr.durationMinutes, 0);

  // Convert minutes to hours and minutes string
  const formatTimeHours = (totalMins: number) => {
    const hrs = (totalMins / 60).toFixed(1);
    return `${hrs} hrs`;
  };

  // Syllabus Completion Analytics
  let totalChapters = 0;
  let completedChapters = 0;
  let inProgressChapters = 0;

  subjects.forEach(subj => {
    subj.chapters.forEach(ch => {
      totalChapters++;
      if (ch.status === 'Completed') completedChapters++;
      if (ch.status === 'In Progress') inProgressChapters++;
    });
  });

  const overallProgressPercent = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;

  // Pending Tasks
  const pendingTasks = tasks.filter(t => !t.completed);

  return (
    <div className="space-y-8 pb-12">
      {/* 1. QUIZ REMINDER BANNER */}
      {showQuizBanner && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900/90 via-purple-900/90 to-slate-900 border border-indigo-500/40 p-6 shadow-xl text-white">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <button
            onClick={onCloseQuizBanner}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            title="Dismiss Banner"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-4 cursor-pointer" onClick={() => onNavigate('quiz')}>
              <div className="p-3 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-xl shadow-lg shadow-indigo-500/30 flex-shrink-0">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-2.5 py-0.5 rounded-full border border-indigo-800">
                    Daily Smart Revision
                  </span>
                  <span className="flex items-center text-xs font-medium text-amber-400">
                    <Sparkles className="w-3.5 h-3.5 mr-1" /> Quick 5-Min MCQ Test
                  </span>
                </div>
                <h3 className="text-xl font-bold mt-1 text-white hover:text-indigo-300 transition-colors">
                  Ready to test your Class 9 NCERT Knowledge?
                </h3>
                <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                  Daily retrieval practice boosts retention by up to 80%. Take today's 5-question quick quiz across Mathematics, Science, SST, and IT!
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('quiz')}
              className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            >
              <span>Take Daily Quiz Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. STATS OVERVIEW CARDS (FULLY CLICKABLE) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Today's Study Hours (Click -> Timer) */}
        <div
          onClick={() => onNavigate('timer')}
          className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-blue-500/50 rounded-2xl p-5 shadow-lg relative overflow-hidden cursor-pointer transition-all transform hover:-translate-y-1 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-blue-400 transition-colors">Today's Study</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white">{formatTimeHours(todayMinutes)}</span>
            <span className="text-xs font-medium text-slate-400">{todayMinutes} mins logged</span>
          </div>
          <div className="mt-3 w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (todayMinutes / 120) * 100)}%` }}
            />
          </div>
          <p className="text-[10px] text-blue-400 mt-2 font-semibold flex items-center justify-end">
            Click to start timer &rarr;
          </p>
        </div>

        {/* Weekly Study Hours (Click -> Timer / History) */}
        <div
          onClick={() => onNavigate('timer')}
          className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-purple-500/50 rounded-2xl p-5 shadow-lg relative overflow-hidden cursor-pointer transition-all transform hover:-translate-y-1 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-purple-400 transition-colors">Weekly Total</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white">{formatTimeHours(weeklyMinutes)}</span>
            <span className="text-xs font-medium text-slate-400">Last 7 Days</span>
          </div>
          <div className="mt-3 w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-purple-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (weeklyMinutes / 840) * 100)}%` }}
            />
          </div>
          <p className="text-[10px] text-purple-400 mt-2 font-semibold flex items-center justify-end">
            Click to view study history &rarr;
          </p>
        </div>

        {/* Daily Streak Counter (Click -> Quiz / Action) */}
        <div
          onClick={() => onNavigate('quiz')}
          className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-500/50 rounded-2xl p-5 shadow-lg relative overflow-hidden cursor-pointer transition-all transform hover:-translate-y-1 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-amber-400 transition-colors">Study Streak</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-110 transition-transform">
              <Flame className="w-5 h-5 text-amber-500" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-amber-400">{streak} Days</span>
            <span className="text-xs font-medium text-slate-400">Active Momentum</span>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Keep streak active by attempting daily quizzes!
          </p>
        </div>

        {/* Overall NCERT Progress (Click -> Subjects) */}
        <div
          onClick={() => onNavigate('subjects')}
          className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/50 rounded-2xl p-5 shadow-lg relative overflow-hidden cursor-pointer transition-all transform hover:-translate-y-1 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-emerald-400 transition-colors">Syllabus Covered</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <Award className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-emerald-400">{overallProgressPercent}%</span>
            <span className="text-xs font-medium text-slate-400">{completedChapters}/{totalChapters} Chapters</span>
          </div>
          <div className="mt-3 w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${overallProgressPercent}%` }}
            />
          </div>
          <p className="text-[10px] text-emerald-400 mt-2 font-semibold flex items-center justify-end">
            Click to track chapters &rarr;
          </p>
        </div>
      </div>

      {/* 3. SUBJECT-WISE PROGRESS CARDS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-400" />
              Class 9 Subjects Progress (NEP 2020)
            </h2>
            <p className="text-xs text-slate-400">Official NCERT curriculum with updated chapters and sub-categories</p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onResetToDefaults}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 transition-colors flex items-center gap-1"
              title="Reset all progress to zero for a fresh start"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data to Zero</span>
            </button>
            <button
              onClick={() => onNavigate('subjects')}
              className="text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
            >
              <span>View All Syllabus</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {subjects.map(subject => {
            const Icon = getSubjectIcon(subject.icon);
            const totalCh = subject.chapters.length;
            const completedCh = subject.chapters.filter(c => c.status === 'Completed').length;
            const inProgCh = subject.chapters.filter(c => c.status === 'In Progress').length;
            const percentage = totalCh > 0 ? Math.round((completedCh / totalCh) * 100) : 0;

            return (
              <div
                key={subject.id}
                onClick={() => onNavigate('subjects', subject.id)}
                className="bg-slate-800/80 border border-slate-700/60 hover:border-indigo-500/50 rounded-2xl p-5 shadow-md hover:shadow-indigo-500/10 transition-all cursor-pointer group hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: subject.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {subject.name}
                      </h3>
                      <p className="text-xs text-slate-400 italic">"{subject.title}"</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                    {percentage}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-5">
                  <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-medium">
                    <span>{completedCh} of {totalCh} Chapters Completed</span>
                    {inProgCh > 0 && <span className="text-amber-400">{inProgCh} In Progress</span>}
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-700/50">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%`, backgroundColor: subject.color }}
                    />
                  </div>
                </div>

                {/* Subcategories tags */}
                {subject.subCategories && subject.subCategories.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-700/40 flex flex-wrap gap-1.5">
                    {subject.subCategories.map(subCat => (
                      <span key={subCat} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-900/80 text-slate-400 border border-slate-700/60 group-hover:border-indigo-500/40 transition-colors">
                        {subCat}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. DAILY TARGETS / TO-DO SUMMARY & QUICK TIMER LINK */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Tasks Widget */}
        <div className="lg:col-span-2 bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                Daily Target Checklist
              </h3>
              <p className="text-xs text-slate-400">Click any target checkbox to toggle completion status</p>
            </div>
            <button
              onClick={() => onNavigate('tasks')}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 border border-indigo-500/30 transition-colors"
            >
              Manage Tasks
            </button>
          </div>

          {pendingTasks.length === 0 ? (
            <div className="text-center py-8 bg-slate-900/50 rounded-xl border border-dashed border-slate-700">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2 opacity-80" />
              <p className="text-sm font-medium text-slate-300">All daily targets completed!</p>
              <p className="text-xs text-slate-500 mt-1">Add new targets in the Task Planner.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {pendingTasks.slice(0, 4).map(task => (
                <div
                  key={task.id}
                  onClick={() => onToggleTask(task.id)}
                  className="flex items-center justify-between p-3 bg-slate-900/60 border border-slate-700/50 rounded-xl hover:bg-slate-900 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded border border-slate-600 group-hover:border-indigo-400 flex items-center justify-center transition-colors">
                      <div className="w-2 h-2 rounded-sm bg-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-sm text-slate-200 font-medium group-hover:text-white transition-colors">{task.title}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    task.priority === 'high'
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Pomodoro Launch Widget */}
        <div className="bg-gradient-to-br from-indigo-900/40 via-slate-800 to-purple-900/40 border border-indigo-500/30 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Focus Mode</span>
              <Clock className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Start Study Session</h3>
            <p className="text-xs text-slate-300 mt-2">
              Use the built-in Pomodoro timer (25 min focus / 5 min break) or Stopwatch to log your active study time automatically into daily analytics.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-700/50">
            <button
              onClick={() => onNavigate('timer')}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2"
            >
              <Clock className="w-4 h-4" />
              <span>Open Study Timer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
