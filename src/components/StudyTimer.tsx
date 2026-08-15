import React, { useState, useEffect, useRef } from 'react';
import type { Subject, StudyLog } from '../types';
import {
  Play,
  Pause,
  RotateCcw,
  Timer as TimerIcon,
  Clock,
  Sliders,
  CheckCircle2,
  Flame,
  History
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TimerProps {
  subjects: Subject[];
  logs: StudyLog[];
  onAddStudyLog: (subjectId: string, durationMinutes: number, type: 'Pomodoro' | 'Stopwatch' | 'Custom') => void;
}

type Mode = 'pomodoro' | 'stopwatch' | 'custom';

export const StudyTimer: React.FC<TimerProps> = ({
  subjects,
  logs,
  onAddStudyLog,
}) => {
  const [mode, setMode] = useState<Mode>('pomodoro');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || 'math');

  // Pomodoro state: 25 mins focus (1500s) / 5 mins break (300s)
  const [isBreak, setIsBreak] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);

  // Custom Timer state
  const [customMins, setCustomMins] = useState<number>(30);

  // Stopwatch state
  const [stopwatchTime, setStopwatchTime] = useState<number>(0);

  // Common state
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showLogToast, setShowLogToast] = useState<string | null>(null);

  const timerRef = useRef<number | null>(null);

  // Handle countdowns / stopwatch intervals
  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        if (mode === 'stopwatch') {
          setStopwatchTime(prev => prev + 1);
        } else {
          setTimeLeft(prev => {
            if (prev <= 1) {
              if (timerRef.current) clearInterval(timerRef.current);
              setIsRunning(false);
              handleTimerCompletion();
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode]);

  // Mode Switcher handler
  const handleModeChange = (newMode: Mode) => {
    setIsRunning(false);
    setMode(newMode);
    if (newMode === 'pomodoro') {
      setIsBreak(false);
      setTimeLeft(25 * 60);
    } else if (newMode === 'custom') {
      setTimeLeft(customMins * 60);
    } else if (newMode === 'stopwatch') {
      setStopwatchTime(0);
    }
  };

  // Timer Completion Handler
  const handleTimerCompletion = () => {
    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    if (mode === 'pomodoro') {
      if (!isBreak) {
        // Log 25 minutes
        onAddStudyLog(selectedSubjectId, 25, 'Pomodoro');
        setShowLogToast('Great job! 25 min Pomodoro study session logged successfully.');
        // Switch to Break Mode
        setIsBreak(true);
        setTimeLeft(5 * 60);
      } else {
        // Break finished
        setShowLogToast('Break completed! Ready to study again?');
        setIsBreak(false);
        setTimeLeft(25 * 60);
      }
    } else if (mode === 'custom') {
      onAddStudyLog(selectedSubjectId, customMins, 'Custom');
      setShowLogToast(`Awesome! ${customMins} min custom study session logged.`);
    }

    setTimeout(() => setShowLogToast(null), 5000);
  };

  // Stopwatch manual save handler
  const handleSaveStopwatchSession = () => {
    const mins = Math.round(stopwatchTime / 60);
    if (mins < 1) {
      alert('Please run the stopwatch for at least 1 minute before logging.');
      return;
    }
    setIsRunning(false);
    onAddStudyLog(selectedSubjectId, mins, 'Stopwatch');
    setShowLogToast(`Success! ${mins} min stopwatch session logged to history.`);
    setStopwatchTime(0);

    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch {
      // ignore
    }

    setTimeout(() => setShowLogToast(null), 5000);
  };

  const handleReset = () => {
    setIsRunning(false);
    if (mode === 'pomodoro') {
      setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
    } else if (mode === 'custom') {
      setTimeLeft(customMins * 60);
    } else if (mode === 'stopwatch') {
      setStopwatchTime(0);
    }
  };

  // Custom Mins input change
  const handleCustomMinsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10) || 1;
    setCustomMins(val);
    if (!isRunning && mode === 'custom') {
      setTimeLeft(val * 60);
    }
  };

  // Time formatter
  const formatSeconds = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const selectedSubject = subjects.find(s => s.id === selectedSubjectId) || subjects[0];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Toast Notification */}
      {showLogToast && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 rounded-2xl shadow-xl flex items-center justify-between animate-bounce">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-6 h-6" />
            <span className="text-sm font-semibold">{showLogToast}</span>
          </div>
        </div>
      )}

      {/* Main Timer Display Card */}
      <div className="bg-slate-800/90 border border-slate-700/60 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-center">
        {/* Background Radial Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-500"
          style={{ backgroundColor: selectedSubject.color }}
        />

        {/* 1. Subject Selector */}
        <div className="relative z-10 max-w-sm mx-auto mb-8">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Target Study Subject
          </label>
          <select
            value={selectedSubjectId}
            onChange={e => setSelectedSubjectId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white text-sm font-semibold rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 shadow-inner"
          >
            {subjects.map(s => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.title})
              </option>
            ))}
          </select>
        </div>

        {/* 2. Mode Selector Pills */}
        <div className="relative z-10 inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-700/80 mb-8">
          <button
            onClick={() => handleModeChange('pomodoro')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              mode === 'pomodoro'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TimerIcon className="w-4 h-4" />
            <span>Pomodoro (25/5m)</span>
          </button>

          <button
            onClick={() => handleModeChange('custom')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              mode === 'custom'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Custom Timer</span>
          </button>

          <button
            onClick={() => handleModeChange('stopwatch')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              mode === 'stopwatch'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Stopwatch</span>
          </button>
        </div>

        {/* 3. Custom Duration Control (if custom mode) */}
        {mode === 'custom' && (
          <div className="relative z-10 max-w-xs mx-auto mb-6 bg-slate-900/60 p-4 rounded-2xl border border-slate-700/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300">Set Duration:</span>
              <span className="text-sm font-bold text-indigo-400">{customMins} Minutes</span>
            </div>
            <input
              type="range"
              min="1"
              max="180"
              value={customMins}
              onChange={handleCustomMinsChange}
              disabled={isRunning}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>
        )}

        {/* 4. Giant Time Counter Display */}
        <div className="relative z-10 my-6">
          {mode === 'pomodoro' && isBreak && (
            <span className="inline-block px-3 py-1 mb-3 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
              ☕ Short Break Time (5 Mins)
            </span>
          )}

          <div className="text-7xl sm:text-8xl font-black tracking-tight text-white font-mono drop-shadow-md">
            {mode === 'stopwatch' ? formatSeconds(stopwatchTime) : formatSeconds(timeLeft)}
          </div>

          <p className="text-xs text-slate-400 mt-2 font-medium">
            Studying <span className="text-indigo-300 font-bold">{selectedSubject.name}</span>
          </p>
        </div>

        {/* 5. Play / Pause / Reset Controls */}
        <div className="relative z-10 flex items-center justify-center space-x-4 mt-8">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center space-x-2 px-8 py-3.5 rounded-2xl text-base font-bold shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/20'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>Start Session</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-3.5 rounded-2xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {/* If Stopwatch, explicit save button */}
          {mode === 'stopwatch' && stopwatchTime > 0 && (
            <button
              onClick={handleSaveStopwatchSession}
              className="px-5 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-lg shadow-emerald-600/30 transition-all flex items-center space-x-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Log Session</span>
            </button>
          )}
        </div>
      </div>

      {/* 6. Recent Study Logs Table */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-white flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-400" />
            Study History & Logged Sessions
          </h3>
          <span className="text-xs text-slate-400 font-medium">Auto-recorded</span>
        </div>

        {logs.length === 0 ? (
          <div className="text-center py-8 bg-slate-900/50 rounded-xl border border-dashed border-slate-700">
            <Flame className="w-8 h-8 text-slate-500 mx-auto mb-2 opacity-60" />
            <p className="text-sm font-medium text-slate-300">No study sessions logged yet.</p>
            <p className="text-xs text-slate-500 mt-1">Complete a Pomodoro or Stopwatch timer above to record your time!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="text-xs uppercase bg-slate-900/80 text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Subject</th>
                  <th className="px-4 py-3">Mode</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3 rounded-r-lg">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {logs.slice(0, 8).map(log => (
                  <tr key={log.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="px-4 py-3 font-semibold text-white">{log.subjectName}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                        {log.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-emerald-400">{log.durationMinutes} mins</td>
                    <td className="px-4 py-3 text-xs text-slate-400">{log.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
