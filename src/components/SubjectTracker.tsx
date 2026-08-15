import React, { useState } from 'react';
import type { Subject, ChapterStatus } from '../types';
import {
  BookOpen,
  Search,
  CheckCircle,
  Clock,
  Circle,
  Layers,
  Calculator,
  FlaskConical,
  Feather,
  Laptop,
  Globe,
  Filter
} from 'lucide-react';

interface SubjectTrackerProps {
  subjects: Subject[];
  selectedSubjectId?: string;
  onUpdateChapterStatus: (subjectId: string, chapterId: string, status: ChapterStatus) => void;
}

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

export const SubjectTracker: React.FC<SubjectTrackerProps> = ({
  subjects,
  selectedSubjectId,
  onUpdateChapterStatus,
}) => {
  const [activeSubjectId, setActiveSubjectId] = useState<string>(selectedSubjectId || subjects[0]?.id || 'math');
  const [activeSubCategoryFilter, setActiveSubCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const currentSubject = subjects.find(s => s.id === activeSubjectId) || subjects[0];
  const Icon = getSubjectIcon(currentSubject.icon);

  // Filter chapters based on active subcategory, search query, and status
  const filteredChapters = currentSubject.chapters.filter(ch => {
    const matchesSubCat = activeSubCategoryFilter === 'All' || ch.subCategory === activeSubCategoryFilter;
    const matchesSearch = ch.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || ch.status === statusFilter;
    return matchesSubCat && matchesSearch && matchesStatus;
  });

  // Calculate subject progress stats
  const totalCh = currentSubject.chapters.length;
  const completedCh = currentSubject.chapters.filter(c => c.status === 'Completed').length;
  const inProgressCh = currentSubject.chapters.filter(c => c.status === 'In Progress').length;
  const notStartedCh = currentSubject.chapters.filter(c => c.status === 'Not Started').length;
  const percent = totalCh > 0 ? Math.round((completedCh / totalCh) * 100) : 0;

  return (
    <div className="space-y-6 pb-12">
      {/* 1. TOP SUBJECT SELECTOR TABS */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
        {subjects.map(subj => {
          const SubjIcon = getSubjectIcon(subj.icon);
          const isActive = subj.id === activeSubjectId;
          const total = subj.chapters.length;
          const completed = subj.chapters.filter(c => c.status === 'Completed').length;
          const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

          return (
            <button
              key={subj.id}
              onClick={() => {
                setActiveSubjectId(subj.id);
                setActiveSubCategoryFilter('All');
              }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all border whitespace-nowrap min-w-[200px] ${
                isActive
                  ? 'bg-slate-800 border-indigo-500/80 text-white shadow-lg shadow-indigo-500/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                style={{ backgroundColor: subj.color }}
              >
                <SubjIcon className="w-5 h-5" />
              </div>
              <div className="text-left overflow-hidden">
                <div className="text-sm font-bold truncate">{subj.name}</div>
                <div className="text-[11px] text-slate-400 flex items-center justify-between gap-2">
                  <span className="italic truncate">{subj.title}</span>
                  <span className="font-semibold text-indigo-400">{pct}%</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 2. ACTIVE SUBJECT HEADER & OVERVIEW */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ backgroundColor: currentSubject.color }}
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center space-x-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl flex-shrink-0"
              style={{ backgroundColor: currentSubject.color }}
            >
              <Icon className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-900 text-indigo-400 border border-slate-700">
                  Official NCERT Syllabus
                </span>
                {currentSubject.code && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
                    Code {currentSubject.code}
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-extrabold text-white mt-1">
                {currentSubject.name} <span className="text-slate-400 font-normal">("{currentSubject.title}")</span>
              </h1>
            </div>
          </div>

          {/* Quick Subject Progress Pill */}
          <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 flex items-center space-x-6">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Completed</span>
              <span className="text-xl font-bold text-emerald-400">{completedCh} / {totalCh}</span>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">In Progress</span>
              <span className="text-xl font-bold text-amber-400">{inProgressCh}</span>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Not Started</span>
              <span className="text-xl font-bold text-slate-400">{notStartedCh}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
            <span>Overall Progress</span>
            <span>{percent}% Completed</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-700">
            <div
              className="h-3 rounded-full transition-all duration-500 shadow-md"
              style={{ width: `${percent}%`, backgroundColor: currentSubject.color }}
            />
          </div>
        </div>
      </div>

      {/* 3. SUBCATEGORY SEPARATION TABS (Science: Bio, Phy, Chem / SST: His, Geo, Civ, Eco / IT etc) */}
      {currentSubject.subCategories && currentSubject.subCategories.length > 0 && (
        <div className="bg-slate-900/80 p-2 border border-slate-800 rounded-xl flex items-center space-x-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-slate-400 px-3 uppercase tracking-wider flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            Branches:
          </span>
          <button
            onClick={() => setActiveSubCategoryFilter('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeSubCategoryFilter === 'All'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            All Branches ({totalCh})
          </button>
          {currentSubject.subCategories.map(subCat => {
            const count = currentSubject.chapters.filter(c => c.subCategory === subCat).length;
            const subCompleted = currentSubject.chapters.filter(c => c.subCategory === subCat && c.status === 'Completed').length;
            return (
              <button
                key={subCat}
                onClick={() => setActiveSubCategoryFilter(subCat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeSubCategoryFilter === subCat
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/50'
                }`}
              >
                <span>{subCat}</span>
                <span className="px-1.5 py-0.2 rounded-full bg-slate-900/60 text-[10px] text-indigo-300">
                  {subCompleted}/{count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* 4. FILTERS AND SEARCH BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search chapters..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400 font-medium">Status:</span>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Not Started">Not Started</option>
          </select>
        </div>
      </div>

      {/* 5. CHAPTERS LIST & INTERACTIVE STATUS TOGGLES */}
      <div className="space-y-3">
        {filteredChapters.length === 0 ? (
          <div className="text-center py-12 bg-slate-800/40 rounded-2xl border border-dashed border-slate-700">
            <BookOpen className="w-10 h-10 text-slate-500 mx-auto mb-2 opacity-60" />
            <p className="text-sm font-medium text-slate-300">No chapters found matching filter criteria.</p>
            <button
              onClick={() => { setSearchQuery(''); setStatusFilter('All'); setActiveSubCategoryFilter('All'); }}
              className="mt-2 text-xs text-indigo-400 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredChapters.map((chapter, idx) => {
            return (
              <div
                key={chapter.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  chapter.status === 'Completed'
                    ? 'bg-emerald-950/20 border-emerald-500/30'
                    : chapter.status === 'In Progress'
                    ? 'bg-amber-950/20 border-amber-500/30'
                    : 'bg-slate-800/70 border-slate-700/60 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-start space-x-3.5">
                  <span className="text-xs font-bold text-slate-500 w-6 pt-1">
                    #{idx + 1}
                  </span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className={`font-semibold text-base ${chapter.status === 'Completed' ? 'text-emerald-200 line-through' : 'text-white'}`}>
                        {chapter.title}
                      </h4>
                    </div>
                    {chapter.subCategory && (
                      <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-indigo-300 border border-slate-700/60">
                        {chapter.subCategory}
                      </span>
                    )}
                  </div>
                </div>

                {/* Interactive Status Switcher Buttons */}
                <div className="flex items-center space-x-2 self-end sm:self-auto flex-shrink-0">
                  <button
                    onClick={() => onUpdateChapterStatus(currentSubject.id, chapter.id, 'Not Started')}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      chapter.status === 'Not Started'
                        ? 'bg-slate-700 text-white font-bold border border-slate-500 shadow'
                        : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                    }`}
                  >
                    <Circle className="w-3.5 h-3.5" />
                    <span>Not Started</span>
                  </button>

                  <button
                    onClick={() => onUpdateChapterStatus(currentSubject.id, chapter.id, 'In Progress')}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      chapter.status === 'In Progress'
                        ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/50 shadow'
                        : 'text-slate-400 hover:bg-amber-500/10 hover:text-amber-300'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>In Progress</span>
                  </button>

                  <button
                    onClick={() => onUpdateChapterStatus(currentSubject.id, chapter.id, 'Completed')}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      chapter.status === 'Completed'
                        ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/50 shadow'
                        : 'text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-300'
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Completed</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
