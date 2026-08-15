import React, { useState } from 'react';
import type { Subject, QuizQuestion, QuizResult } from '../types';
import { QUIZ_BANK } from '../data/ncertData';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Brain,
  Award,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizGeneratorProps {
  subjects: Subject[];
  quizResults: QuizResult[];
  onRecordQuizResult: (subjectId: string, score: number, total: number) => void;
}

export const QuizGenerator: React.FC<QuizGeneratorProps> = ({
  subjects,
  quizResults,
  onRecordQuizResult,
}) => {
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // Generate 5 questions randomly or by subject filter
  const startNewQuiz = (subjectIdFilter: string = selectedSubjectFilter) => {
    let availableQuestions = QUIZ_BANK;
    if (subjectIdFilter !== 'all') {
      availableQuestions = QUIZ_BANK.filter(q => q.subjectId === subjectIdFilter);
      if (availableQuestions.length === 0) {
        availableQuestions = QUIZ_BANK; // fallback if no specific questions
      }
    }

    // Shuffle and pick 5
    const shuffled = [...availableQuestions].sort(() => 0.5 - Math.random());
    const selectedFive = shuffled.slice(0, Math.min(5, shuffled.length));

    setQuestions(selectedFive);
    setUserAnswers(new Array(selectedFive.length).fill(null));
    setCurrentQuestionIndex(0);
    setShowExplanation(false);
    setQuizFinished(false);
    setScore(0);
    setQuizStarted(true);
  };

  // Select Option
  const handleSelectOption = (optionIdx: number) => {
    if (userAnswers[currentQuestionIndex] !== null) return; // already answered

    const updated = [...userAnswers];
    updated[currentQuestionIndex] = optionIdx;
    setUserAnswers(updated);
    setShowExplanation(true);

    if (optionIdx === questions[currentQuestionIndex].correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  // Next Question or Finish
  const handleNext = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Finish Quiz
      setQuizFinished(true);
      onRecordQuizResult(selectedSubjectFilter, score, questions.length);

      if (score >= 3) {
        try {
          confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
        } catch {
          // ignore
        }
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Quiz Welcome / Start Screen */}
      {!quizStarted ? (
        <div className="bg-slate-800/90 border border-slate-700/60 rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center mx-auto shadow-xl shadow-indigo-500/30 mb-4">
            <Brain className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-3xl font-extrabold text-white">Interactive Class 9 MCQ Quiz Generator</h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mt-2">
            Practice concepts from Mathematics, Science (Physics/Chem/Bio), Social Science (His/Geo/Civ/Eco), IT Code 402, and English/Hindi according to the new NCERT NEP 2020 framework.
          </p>

          {/* Subject Filter Selector */}
          <div className="mt-8 max-w-md mx-auto">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Choose Quiz Subject
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedSubjectFilter('all')}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  selectedSubjectFilter === 'all'
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                All Subjects
              </button>
              {subjects.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSubjectFilter(s.id)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all truncate ${
                    selectedSubjectFilter === s.id
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => startNewQuiz(selectedSubjectFilter)}
            className="mt-8 px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 hover:from-indigo-600 hover:to-pink-700 text-white text-base font-bold rounded-2xl shadow-xl shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center space-x-2 mx-auto"
          >
            <Sparkles className="w-5 h-5" />
            <span>Generate 5-Question Quiz</span>
          </button>
        </div>
      ) : quizFinished ? (
        /* Quiz Results Screen */
        <div className="bg-slate-800/90 border border-slate-700/60 rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/30 mb-4">
            <Award className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-3xl font-extrabold text-white">Quiz Completed!</h2>
          <p className="text-sm text-slate-300 mt-1">Here is your real-time performance summary:</p>

          {/* Score Badge */}
          <div className="my-6 inline-block bg-slate-900 border border-slate-700/80 rounded-2xl px-8 py-4 shadow-inner">
            <div className="text-5xl font-black text-indigo-400">
              {score} / {questions.length}
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">
              {Math.round((score / questions.length) * 100)}% Accuracy
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center space-x-4 mt-6">
            <button
              onClick={() => startNewQuiz(selectedSubjectFilter)}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Another Quiz</span>
            </button>
            <button
              onClick={() => setQuizStarted(false)}
              className="px-6 py-3 bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 text-sm font-bold rounded-xl transition-colors"
            >
              Back to Quiz Setup
            </button>
          </div>
        </div>
      ) : (
        /* Active Quiz Question Screen */
        <div className="bg-slate-800/90 border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Header Progress */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 border-b border-slate-700/60 pb-4">
            <span className="uppercase tracking-wider">Question {currentQuestionIndex + 1} of {questions.length}</span>
            {questions[currentQuestionIndex].category && (
              <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-indigo-300 border border-slate-700">
                {questions[currentQuestionIndex].category}
              </span>
            )}
            <span className="text-indigo-400">Score: {score}</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-indigo-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="py-2">
            <h3 className="text-xl font-bold text-white leading-relaxed">
              {questions[currentQuestionIndex].question}
            </h3>
          </div>

          {/* Option Buttons */}
          <div className="space-y-3">
            {questions[currentQuestionIndex].options.map((opt, idx) => {
              const selectedIdx = userAnswers[currentQuestionIndex];
              const isSelected = selectedIdx === idx;
              const isCorrect = idx === questions[currentQuestionIndex].correctAnswerIndex;

              let optionStyle = 'bg-slate-900/80 border-slate-700 text-slate-200 hover:border-indigo-500/80 hover:bg-slate-800';
              if (selectedIdx !== null) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-500/10';
                } else if (isSelected) {
                  optionStyle = 'bg-rose-950/60 border-rose-500 text-rose-200 shadow-md shadow-rose-500/10';
                } else {
                  optionStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={selectedIdx !== null}
                  className={`w-full p-4 rounded-2xl border text-left font-medium text-sm transition-all flex items-center justify-between ${optionStyle}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                  {selectedIdx !== null && (
                    <div>
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-rose-400" />
                      ) : null}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Real-time Score Feedback & Explanation */}
          {showExplanation && (
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/30 text-sm text-slate-300 space-y-2 animate-fadeIn">
              <div className="flex items-center space-x-2 font-bold text-indigo-400">
                <HelpCircle className="w-4 h-4" />
                <span>Explanation:</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-300">
                {questions[currentQuestionIndex].explanation}
              </p>
            </div>
          )}

          {/* Next / Finish Button */}
          {userAnswers[currentQuestionIndex] !== null && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center space-x-2"
              >
                <span>{currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'View Results'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Previous Quiz History */}
      {quizResults.length > 0 && !quizStarted && (
        <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl">
          <h3 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            Recent Quiz History
          </h3>
          <div className="space-y-2">
            {quizResults.slice(0, 5).map(res => (
              <div key={res.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-700/50">
                <div>
                  <span className="text-xs font-bold text-white uppercase">{res.subjectId === 'all' ? 'General Class 9' : res.subjectId}</span>
                  <span className="block text-[10px] text-slate-400">{res.date}</span>
                </div>
                <div className="text-sm font-bold text-emerald-400">
                  {res.score} / {res.total} ({Math.round((res.score / res.total) * 100)}%)
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
