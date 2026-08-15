import React from 'react';
import {
  LayoutDashboard,
  BookOpenCheck,
  Timer,
  HelpCircle,
  CheckSquare,
  Flame,
  Bell,
  BookMarked
} from 'lucide-react';

export type TabType = 'dashboard' | 'subjects' | 'timer' | 'quiz' | 'tasks';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  streak: number;
  unreadQuizNotification: boolean;
  onOpenQuizNotification: () => void;
}

export const Navbar: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  streak,
  unreadQuizNotification,
  onOpenQuizNotification,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'subjects', label: 'Subjects & Syllabus', icon: BookOpenCheck },
    { id: 'timer', label: 'Study Timer', icon: Timer },
    { id: 'quiz', label: 'Quiz Generator', icon: HelpCircle },
    { id: 'tasks', label: 'Task Planner', icon: CheckSquare },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <BookMarked className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                Study Tracker
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-indigo-400 border border-slate-700">
                Class 9 • NEP 2020
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as TabType)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-inner'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Widgets (Streak & Notification) */}
          <div className="flex items-center space-x-3">
            {/* Daily Streak Badge */}
            <div
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 text-amber-400 shadow-sm"
              title="Daily Study Streak! Keep studying daily to maintain your momentum."
            >
              <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
              <span className="text-xs font-bold">{streak} Day Streak</span>
            </div>

            {/* In-App Quiz Notification Icon */}
            <button
              onClick={onOpenQuizNotification}
              className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none"
              title="Daily Revision Quiz Notification"
            >
              <Bell className="w-5 h-5" />
              {unreadQuizNotification && (
                <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Row */}
      <div className="md:hidden border-t border-slate-800 bg-slate-900/95 overflow-x-auto no-scrollbar">
        <div className="flex px-2 py-2 space-x-1 min-w-max">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as TabType)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
