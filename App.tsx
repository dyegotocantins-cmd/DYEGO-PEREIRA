
import React, { useState } from 'react';
import { generateQuizQuestions } from './services/geminiService';
import type { Question, UserAnswer } from './types';
import Quiz from './components/Quiz';
import LoadingSpinner from './components/LoadingSpinner';
import Logo from './components/Logo';
import Results from './components/Results';

enum AppState {
  START_SCREEN,
  LOADING,
  QUIZ,
  RESULTS,
  ERROR,
}

const SUBJECTS = [
  'Língua Portuguesa', 'Informática', 'Matemática', 'Raciocínio Lógico',
  'Conhecimentos Gerais', 'Atualidades', 'Direito Constitucional', 'Direito Administrativo',
  'Gestão Pública', 'Contabilidade Pública', 'Auditoria', 'Administração Financeira e Orçamentária',
  'Economia', 'Administração'
];
const DIFFICULTIES = [{ value: 'fácil', label: 'Fácil' }, { value: 'médio', label: 'Médio' }];
const QUESTION_COUNTS = [5, 10, 30, 50, 100, 150];


const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.START_SCREEN);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Quiz configuration state
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [numQuestions, setNumQuestions] = useState(0);

  const handleStartQuiz = async () => {
    setAppState(AppState.LOADING);
    setError(null);
    try {
      const fetchedQuestions = await generateQuizQuestions(subject, difficulty, numQuestions);
      if (fetchedQuestions && fetchedQuestions.length > 0) {
        setQuestions(fetchedQuestions);
        setUserAnswers([]);
        setAppState(AppState.QUIZ);
      } else {
        throw new Error("Não foi possível gerar as questões do quiz.");
      }
    } catch (err: any) {
      console.error(err);
      let errorMessage = "Ocorreu um erro ao buscar as questões. Verifique sua chave de API e tente novamente.";
      if (err.message.includes("API_KEY")) {
        errorMessage = "A chave da API do Gemini não foi configurada. Por favor, configure a variável de ambiente API_KEY."
      }
      setError(errorMessage);
      setAppState(AppState.ERROR);
    }
  };

  const handleQuizFinish = (finalAnswers: UserAnswer[]) => {
    setUserAnswers(finalAnswers);
    setAppState(AppState.RESULTS);
  };

  const handleRestart = () => {
    setAppState(AppState.START_SCREEN);
    setQuestions([]);
    setUserAnswers([]);
    setSubject('');
    setDifficulty('');
    setNumQuestions(0);
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.LOADING:
        return (
          <div className="text-center text-white">
            <LoadingSpinner />
            <p className="mt-4 text-xl">Gerando seu quiz personalizado...</p>
            <p className="text-slate-400">Isso pode levar alguns segundos.</p>
          </div>
        );
      case AppState.START_SCREEN:
        return (
          <div className="text-center bg-slate-800 p-8 md:p-10 rounded-2xl shadow-2xl max-w-xl mx-auto text-white">
            <Logo />
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-6 mb-2">Quiz de Concurso Público</h1>
            <p className="text-slate-300 mb-8 text-lg">Personalize seu teste e inicie sua preparação!</p>

            <div className="space-y-6 text-left">
              <div>
                <label htmlFor="subject" className="block mb-2 text-lg font-medium text-slate-300">Disciplina</label>
                <select id="subject" value={subject} onChange={e => setSubject(e.target.value)} className="bg-slate-700 border border-slate-600 text-white text-md rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-3">
                  <option value="">Selecione uma disciplina</option>
                  {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="difficulty" className="block mb-2 text-lg font-medium text-slate-300">Nível de Dificuldade</label>
                <select id="difficulty" value={difficulty} onChange={e => setDifficulty(e.target.value)} className="bg-slate-700 border border-slate-600 text-white text-md rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-3">
                  <option value="">Selecione o nível</option>
                  {DIFFICULTIES.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block mb-3 text-lg font-medium text-slate-300">Quantidade de Questões</label>
                <div className="grid grid-cols-3 gap-2">
                  {QUESTION_COUNTS.map(count => (
                    <button key={count} onClick={() => setNumQuestions(count)} className={`p-3 font-bold rounded-lg transition-colors ${numQuestions === count ? 'bg-purple-600 text-white ring-2 ring-purple-300' : 'bg-slate-700 hover:bg-slate-600'}`}>{count}</button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleStartQuiz}
              disabled={!subject || !difficulty || numQuestions === 0}
              className="w-full mt-10 py-4 px-6 bg-blue-600 text-white font-bold rounded-lg text-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:scale-100"
            >
              Iniciar Quiz
            </button>
          </div>
        );
      case AppState.QUIZ:
        return <Quiz questions={questions} onFinish={handleQuizFinish} />;
      case AppState.RESULTS:
        return <Results userAnswers={userAnswers} totalQuestions={questions.length} onRestart={handleRestart} />;
      case AppState.ERROR:
        return (
          <div className="text-center bg-red-900 border border-red-500 p-8 rounded-lg text-white max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Erro!</h2>
            <p className="mb-6">{error}</p>
            <button onClick={handleRestart} className="py-2 px-6 bg-slate-700 hover:bg-slate-600 font-bold rounded-lg">
                Tentar Novamente
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 bg-gradient-to-br from-slate-900 to-indigo-900 flex flex-col items-center justify-center p-4 font-sans">
      <main className="w-full">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
