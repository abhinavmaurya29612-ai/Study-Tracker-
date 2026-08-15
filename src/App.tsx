import { useState } from 'react';
import { Navbar } from './components/Navbar';
import type { TabType } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { SubjectTracker } from './components/SubjectTracker';
import { StudyTimer } from './components/StudyTimer';
import { QuizGenerator } from './components/QuizGenerator';
import { TaskPlanner } from './components/TaskPlanner';
import { useStudyApp } from './hooks/useStudyApp';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | undefined>(undefined);
  const [showQuizBanner, setShowQuizBanner] = useState<boolean>(true);

  const {
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
    recordQuizResult
  } = useStudyApp();

  const handleNavigate = (tab: TabType, subjectId?: string) => {
    if (subjectId) {
      setSelectedSubjectId(subjectId);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header & Navigation Shell */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        streak={streak}
        unreadQuizNotification={showQuizBanner}
        onOpenQuizNotification={() => {
          setShowQuizBanner(true);
          setActiveTab('quiz');
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            subjects={subjects}
            logs={logs}
            tasks={tasks}
            streak={streak}
            onNavigate={handleNavigate}
            showQuizBanner={showQuizBanner}
            onCloseQuizBanner={() => setShowQuizBanner(false)}
          />
        )}

        {activeTab === 'subjects' && (
          <SubjectTracker
            subjects={subjects}
            selectedSubjectId={selectedSubjectId}
            onUpdateChapterStatus={updateChapterStatus}
          />
        )}

        {activeTab === 'timer' && (
          <StudyTimer
            subjects={subjects}
            logs={logs}
            onAddStudyLog={addStudyLog}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizGenerator
            subjects={subjects}
            quizResults={quizResults}
            onRecordQuizResult={recordQuizResult}
          />
        )}

        {activeTab === 'tasks' && (
          <TaskPlanner
            tasks={tasks}
            subjects={subjects}
            onAddTask={addTask}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-6 text-center text-xs text-slate-500">
        <p className="max-w-7xl mx-auto px-4">
          Study Tracker • Official NCERT NEP 2020 Class 9 Framework • Ganita Manjari, Exploration, Kaveri, Ganga, IT 402, SST
        </p>
      </footer>
    </div>
  );
}

export default App;
