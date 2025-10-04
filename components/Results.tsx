
import React from 'react';
import type { UserAnswer } from '../types';

interface ResultsProps {
  userAnswers: UserAnswer[];
  totalQuestions: number;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ userAnswers, totalQuestions, onRestart }) => {
  const correctAnswersCount = userAnswers.filter(answer => answer.isCorrect).length;
  const scorePercentage = Math.round((correctAnswersCount / totalQuestions) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-800 rounded-2xl shadow-2xl p-8 text-center text-white flex flex-col items-center">
      <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-4">
        Quiz Finalizado!
      </h2>
      <p className="text-slate-300 text-lg mb-6">Seu desempenho final:</p>

      <div className="bg-slate-900 rounded-lg p-6 w-full mb-8">
        <div className="text-6xl font-bold text-purple-400 mb-2">{scorePercentage}%</div>
        <div className="text-xl text-slate-400">
          Você acertou <span className="font-bold text-green-400">{correctAnswersCount}</span> de <span className="font-bold text-slate-200">{totalQuestions}</span> questões.
        </div>
      </div>

      <button
        onClick={onRestart}
        className="w-full py-4 px-6 bg-purple-600 text-white font-bold rounded-lg text-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        Fazer Novo Quiz
      </button>
    </div>
  );
};

export default Results;