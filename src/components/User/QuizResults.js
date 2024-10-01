import React from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizResults.css';

function QuizResults({ quiz, userAnswers, score }) {
  const navigate = useNavigate();

  return (
    <div className="quiz-results-container">
      <div className="quiz-results-content">
        <h2>Quiz Completed</h2>
        <p className="quiz-score">Your score: {score.toFixed(2)}%</p>

        {quiz.questions.map((question, index) => (
          <div key={question.id} className="question-result">
            <h3>Question {index + 1}: {question.question_text}</h3>
            <ul className="options-list">
              {question.options.map((option, optionIndex) => (
                <li
                  key={option.id}
                  className={`option-item ${option.is_correct ? 'correct' :
                      (userAnswers[index] === optionIndex ? 'incorrect' : '')
                    } ${userAnswers[index] === optionIndex ? 'selected' : ''}`}
                >
                  {option.option_text}
                  {option.is_correct && ' ✓'}
                  {userAnswers[index] === optionIndex && !option.is_correct && ' ✗'}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <button className="back-button" onClick={() => navigate('/user')}>Back to Dashboard</button>
      </div>
    </div>
  );
}

export default QuizResults;
