/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  BookOpen, 
  Settings, 
  Play, 
  CheckCircle2, 
  XCircle, 
  Timer, 
  ChevronRight, 
  RotateCcw, 
  History,
  BrainCircuit,
  Loader2,
  Trophy,
  Home as HomeIcon,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Subject, Difficulty, Question, QuizResult, QuizConfig } from './types';
import { sampleQuestions } from './data/sampleQuestions';
import { generateQuestions } from './services/gemini';

// --- Components ---

const Header = ({ onGoHome }: { onGoHome: () => void }) => (
  <header className="border-b border-black/5 bg-white/80 backdrop-blur-md sticky top-0 z-50">
    <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
      <button 
        onClick={onGoHome}
        className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 hover:opacity-80 transition-opacity"
      >
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
          <BrainCircuit size={20} />
        </div>
        <span>OSN Master</span>
      </button>
      <div className="flex items-center gap-4">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-widest hidden sm:block">SMP Level</span>
      </div>
    </div>
  </header>
);

const Home = ({ onStart }: { onStart: (config: QuizConfig) => void }) => {
  const [subject, setSubject] = useState<Subject>('Matematika');
  const [count, setCount] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<Difficulty>('Sedang');
  const [topic, setTopic] = useState<string>('');
  const [history, setHistory] = useState<QuizResult[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('osn_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const subjects: Subject[] = ['Matematika', 'Fisika', 'Biologi', 'Kimia', 'Informatika'];
  const counts = [10, 20, 30];
  const difficulties: Difficulty[] = ['Mudah', 'Sedang', 'Sulit'];

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      <section className="text-center space-y-2 py-8">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Siap Juara OSN?</h1>
        <p className="text-slate-500">Latihan soal berkualitas tinggi dengan bantuan AI.</p>
      </section>

      <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-6 space-y-6">
        <div className="space-y-4">
          <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <BookOpen size={16} className="text-indigo-600" /> Pilih Mata Pelajaran
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {subjects.map((s) => (
              <button
                key={s}
                onClick={() => setSubject(s)}
                className={`py-3 px-4 rounded-xl text-sm font-medium transition-all border ${
                  subject === s 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200' 
                    : 'bg-slate-50 text-slate-600 border-transparent hover:border-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <Settings size={16} className="text-indigo-600" /> Jumlah Soal
            </label>
            <div className="flex gap-2">
              {counts.map((c) => (
                <button
                  key={c}
                  onClick={() => setCount(c)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border ${
                    count === c 
                      ? 'bg-slate-900 text-white border-slate-900' 
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <Trophy size={16} className="text-indigo-600" /> Kesulitan
            </label>
            <div className="flex gap-2">
              {difficulties.map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border ${
                    difficulty === d 
                      ? 'bg-slate-900 text-white border-slate-900' 
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            Topik Spesifik (Opsional)
          </label>
          <input 
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Contoh: Aljabar, Sel, Listrik Statis..."
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-indigo-600 focus:bg-white outline-none transition-all text-slate-900"
          />
        </div>

        <button
          onClick={() => onStart({ subject, count, difficulty, topic })}
          className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
        >
          <Play size={20} fill="currentColor" /> Mulai Latihan
        </button>
      </div>

      {history.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <History size={20} className="text-indigo-600" /> Riwayat Terakhir
          </h2>
          <div className="space-y-3">
            {history.slice(0, 3).map((res, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-black/5 flex items-center justify-between shadow-sm">
                <div>
                  <p className="font-bold text-slate-900">{res.subject}</p>
                  <p className="text-xs text-slate-500">{res.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-indigo-600">{res.score}</p>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400">Score</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Quiz = ({ config, onFinish, onCancel }: { config: QuizConfig, onFinish: (result: QuizResult) => void, onCancel: () => void }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(true);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      // Try AI generation first
      let generated = await generateQuestions(config.subject, config.count, config.difficulty, config.topic);
      
      // Fallback to sample data if AI fails or returns empty
      if (generated.length === 0) {
        const samples = sampleQuestions[config.subject] || [];
        // Shuffle and pick requested count
        generated = [...samples].sort(() => Math.random() - 0.5).slice(0, config.count);
      }
      
      setQuestions(generated);
      setLoading(false);
    };
    loadQuestions();
  }, [config]);

  useEffect(() => {
    if (loading || showExplanation || isTimeUp) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [loading, currentIndex, showExplanation, isTimeUp]);

  const handleTimeUp = () => {
    setIsTimeUp(true);
    setShowExplanation(true);
    setWrongCount(prev => prev + 1);
  };

  const handleAnswer = (option: string) => {
    if (showExplanation || isTimeUp) return;
    
    const letter = option.charAt(0);
    setSelectedAnswer(letter);
    setShowExplanation(true);

    if (letter === questions[currentIndex].answer) {
      setScore(prev => prev + (100 / config.count));
      setCorrectCount(prev => prev + 1);
    } else {
      setWrongCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setIsTimeUp(false);
      setTimer(60);
    } else {
      onFinish({
        subject: config.subject,
        score: Math.round(score),
        correct: correctCount,
        wrong: wrongCount,
        total: questions.length,
        date: new Date().toLocaleString('id-ID')
      });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">Menyiapkan soal-soal terbaik untukmu...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onCancel} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full text-sm font-bold text-slate-700">
            <Timer size={14} className={timer < 10 ? 'text-red-500 animate-pulse' : 'text-slate-500'} />
            <span className={timer < 10 ? 'text-red-500' : ''}>{timer}s</span>
          </div>
          <div className="text-sm font-bold text-slate-400">
            {currentIndex + 1} <span className="text-slate-300">/</span> {questions.length}
          </div>
        </div>
      </div>

      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <motion.div 
          className="bg-indigo-600 h-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      <motion.div 
        key={currentIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-black/5 p-6 sm:p-8 space-y-8"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
          {currentQuestion.question}
        </h2>

        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const letter = option.charAt(0);
            const isCorrect = letter === currentQuestion.answer;
            const isSelected = selectedAnswer === letter;
            
            let buttonClass = "w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between group ";
            
            if (showExplanation) {
              if (isCorrect) buttonClass += "bg-emerald-50 border-emerald-500 text-emerald-700";
              else if (isSelected) buttonClass += "bg-red-50 border-red-500 text-red-700";
              else buttonClass += "bg-slate-50 border-transparent text-slate-400";
            } else {
              buttonClass += "bg-slate-50 border-transparent hover:border-indigo-600 hover:bg-white text-slate-700";
            }

            return (
              <button
                key={idx}
                disabled={showExplanation}
                onClick={() => handleAnswer(option)}
                className={buttonClass}
              >
                <span className="font-medium">{option}</span>
                {showExplanation && isCorrect && <CheckCircle2 size={20} className="text-emerald-500" />}
                {showExplanation && isSelected && !isCorrect && <XCircle size={20} className="text-red-500" />}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {showExplanation && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-4 pt-4 border-t border-slate-100"
            >
              <div className="bg-indigo-50 p-4 rounded-xl space-y-2">
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Pembahasan</p>
                <p className="text-sm text-indigo-900 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
              <button
                onClick={handleNext}
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors"
              >
                {currentIndex === questions.length - 1 ? 'Lihat Hasil' : 'Soal Berikutnya'}
                <ChevronRight size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const Result = ({ result, onRestart }: { result: QuizResult, onRestart: () => void }) => {
  useEffect(() => {
    const saved = localStorage.getItem('osn_history');
    const history = saved ? JSON.parse(saved) : [];
    localStorage.setItem('osn_history', JSON.stringify([result, ...history]));
  }, [result]);

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8 py-12">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center space-y-4"
      >
        <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto text-indigo-600 mb-6">
          <Trophy size={48} />
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Latihan Selesai!</h1>
        <p className="text-slate-500">Kerja bagus! Teruslah berlatih untuk menjadi juara.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-black/5 text-center shadow-sm">
          <p className="text-4xl font-black text-indigo-600">{result.score}</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Total Skor</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-black/5 text-center shadow-sm">
          <p className="text-4xl font-black text-emerald-500">{result.correct}</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Benar</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-black/5 text-center shadow-sm">
          <p className="text-4xl font-black text-red-500">{result.wrong}</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Salah</p>
        </div>
      </div>

      <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-bold">Ringkasan Latihan</h3>
          <div className="flex justify-between text-slate-400 text-sm">
            <span>Mata Pelajaran</span>
            <span className="text-white font-medium">{result.subject}</span>
          </div>
          <div className="flex justify-between text-slate-400 text-sm">
            <span>Total Soal</span>
            <span className="text-white font-medium">{result.total}</span>
          </div>
          <div className="flex justify-between text-slate-400 text-sm">
            <span>Waktu Selesai</span>
            <span className="text-white font-medium">{result.date}</span>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="w-full py-4 bg-white text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
        >
          <RotateCcw size={20} /> Kembali ke Menu
        </button>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<'home' | 'quiz' | 'result'>('home');
  const [config, setConfig] = useState<QuizConfig | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);

  const startQuiz = (newConfig: QuizConfig) => {
    setConfig(newConfig);
    setView('quiz');
  };

  const finishQuiz = (newResult: QuizResult) => {
    setResult(newResult);
    setView('result');
  };

  const reset = () => {
    setView('home');
    setConfig(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Header onGoHome={reset} />
      
      <main className="pb-20">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Home onStart={startQuiz} />
            </motion.div>
          )}

          {view === 'quiz' && config && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Quiz 
                config={config} 
                onFinish={finishQuiz} 
                onCancel={reset}
              />
            </motion.div>
          )}

          {view === 'result' && result && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <Result result={result} onRestart={reset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Navigation for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-black/5 px-6 py-3 sm:hidden flex justify-around items-center z-50">
        <button onClick={reset} className={`flex flex-col items-center gap-1 ${view === 'home' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <HomeIcon size={20} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
        </button>
        <button onClick={() => {}} className="flex flex-col items-center gap-1 text-slate-400">
          <History size={20} />
          <span className="text-[10px] font-bold uppercase tracking-widest">History</span>
        </button>
        <button onClick={() => {}} className="flex flex-col items-center gap-1 text-slate-400">
          <Settings size={20} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Settings</span>
        </button>
      </nav>
    </div>
  );
}
