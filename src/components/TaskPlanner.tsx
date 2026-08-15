import React, { useState } from 'react';
import type { Task, Subject } from '../types';
import {
  CheckSquare,
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  Tag
} from 'lucide-react';

interface TaskPlannerProps {
  tasks: Task[];
  subjects: Subject[];
  onAddTask: (title: string, subjectId?: string, priority?: 'low' | 'medium' | 'high') => void;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TaskPlanner: React.FC<TaskPlannerProps> = ({
  tasks,
  subjects,
  onAddTask,
  onToggleTask,
  onDeleteTask,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('general');
  const [selectedPriority, setSelectedPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddTask(newTitle.trim(), selectedSubjectId, selectedPriority);
    setNewTitle('');
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const completionPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* 1. Header & Quick Input Form */}
      <div className="bg-slate-800/90 border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-6">
          <div>
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                <CheckSquare className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-white">Daily Task Planner</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">Set daily targets (e.g., "Complete Chapter 1 in Ganita Manjari")</p>
          </div>

          {/* Progress Badge */}
          <div className="bg-slate-900 border border-slate-700 rounded-2xl px-5 py-3 text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Targets Met</span>
            <span className="text-xl font-bold text-emerald-400">{completedCount} / {totalCount} ({completionPercent}%)</span>
          </div>
        </div>

        {/* Add New Task Form */}
        <form onSubmit={handleCreateTask} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Add a new study target or chapter goal..."
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
            />

            <select
              value={selectedSubjectId}
              onChange={e => setSelectedSubjectId(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="general">General Goal</option>
              {subjects.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            <select
              value={selectedPriority}
              onChange={e => setSelectedPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>

            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center space-x-2 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Add Goal</span>
            </button>
          </div>
        </form>
      </div>

      {/* 2. Tasks Checklist List */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="font-bold text-lg text-white mb-4">Today's Target List</h3>

        {tasks.length === 0 ? (
          <div className="text-center py-10 bg-slate-900/40 rounded-xl border border-dashed border-slate-700">
            <CheckSquare className="w-10 h-10 text-slate-500 mx-auto mb-2 opacity-60" />
            <p className="text-sm font-medium text-slate-300">No tasks in your planner yet.</p>
            <p className="text-xs text-slate-500 mt-1">Type a task above to organize your study schedule!</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {tasks.map(task => {
              const matchedSubject = subjects.find(s => s.id === task.subjectId);

              return (
                <div
                  key={task.id}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                    task.completed
                      ? 'bg-slate-900/40 border-slate-800 text-slate-500'
                      : 'bg-slate-900/80 border-slate-700/80 text-slate-200 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center space-x-3.5 flex-1 min-w-0">
                    <button
                      onClick={() => onToggleTask(task.id)}
                      className="focus:outline-none flex-shrink-0"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-400 hover:text-indigo-400" />
                      )}
                    </button>

                    <span className={`text-sm font-medium truncate ${task.completed ? 'line-through text-slate-500' : 'text-white'}`}>
                      {task.title}
                    </span>
                  </div>

                  {/* Metadata Tags */}
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    {matchedSubject && (
                      <span
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white shadow-sm flex items-center gap-1"
                        style={{ backgroundColor: matchedSubject.color }}
                      >
                        <Tag className="w-3 h-3" />
                        {matchedSubject.name}
                      </span>
                    )}

                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                      task.priority === 'high'
                        ? 'bg-rose-950/60 border-rose-800 text-rose-300'
                        : task.priority === 'medium'
                        ? 'bg-amber-950/60 border-amber-800 text-amber-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}>
                      {task.priority}
                    </span>

                    <button
                      onClick={() => onDeleteTask(task.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                      title="Delete Task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
