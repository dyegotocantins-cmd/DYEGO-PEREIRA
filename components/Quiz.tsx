
import React, { useState, useMemo } from 'react';
import type { Question, UserAnswer } from '../types';

interface QuizProps {
  questions: Question[];
  onFinish: (answers: UserAnswer[]) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);

  const handleAnswerSelect = (option: string) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);
    const isCorrect = option === currentQuestion.correctAnswer;
    setUserAnswers(prev => [
      ...prev,
      {
        question: currentQuestion.question,
        selectedAnswer: option,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect,
      }
    ]);
  };

  const handleNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      onFinish(userAnswers);
    }
  };

  const getButtonClass = (option: string) => {
    if (!isAnswered) {
      return "bg-slate-700 hover:bg-purple-600";
    }
    if (option === currentQuestion.correctAnswer) {
      return "bg-green-600 scale-105";
    }
    if (option === selectedOption && option !== currentQuestion.correctAnswer) {
      return "bg-red-600";
    }
    return "bg-slate-700 opacity-60";
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-slate-800 rounded-2xl shadow-2xl p-6 md:p-10 text-white">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-purple-400">Questão {currentQuestionIndex + 1} de {questions.length}</h2>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2.5">
          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-xl md:text-2xl font-medium text-slate-200" dangerouslySetInnerHTML={{ __html: currentQuestion.question }}></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            disabled={isAnswered}
            className={`p-4 rounded-lg text-left text-lg font-medium transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-4 focus:ring-blue-400 ${getButtonClass(option)}`}
          >
            {option}
          </button>
        ))}
      </div>

      {isAnswered && (
        <div className="p-4 rounded-lg bg-slate-900 mb-6 text-left">
          {selectedOption === currentQuestion.correctAnswer ? (
            <div>
              <h3 className="text-lg font-bold text-green-400 mb-2">Correto!</h3>
              <p className="text-slate-300">{currentQuestion.explanation}</p>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-bold text-red-400 mb-2">Incorreto.</h3>
              <p className="text-slate-300">A resposta correta é: <span className="font-semibold">{currentQuestion.correctAnswer}</span></p>
            </div>
          )}
        </div>
      )}

      {isAnswered && (
        <div className="text-center">
          <button
            onClick={handleNextQuestion}
            className="w-full md:w-auto py-3 px-10 bg-blue-600 text-white font-bold rounded-lg text-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Próxima Questão' : 'Ver Resultados'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
