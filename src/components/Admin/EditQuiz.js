import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditQuiz.css';

function EditQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState({
    title: '',
    time_limit: 0,
    questions: []
  });

  useEffect(() => {
    fetchQuizData();
  }, [id]);

  const fetchQuizData = async () => {
    try {
      const response = await axios.get(`/api/quizzes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const formattedData = {
        ...response.data,
        questions: response.data.questions.map(question => ({
          ...question,
          options: question.options.map(option => ({
            id: option.id,
            text: option.option_text,
            is_correct: option.is_correct
          })),
          correctAnswer: question.options.findIndex(option => option.is_correct)
        }))
      };
      setQuizData(formattedData);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  const handleQuizDataChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index][field] = value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].options[optionIndex].text = value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleCorrectAnswerChange = (questionIndex, optionIndex) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].correctAnswer = optionIndex;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [...quizData.questions, { question_text: '', options: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }], correctAnswer: 0 }]
    });
  };

  const removeQuestion = (index) => {
    const updatedQuestions = quizData.questions.filter((_, i) => i !== index);
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const formattedData = {
        ...quizData,
        questions: quizData.questions.map(question => ({
          ...question,
          options: question.options.map((option, index) => ({
            ...option,
            text: option.text || '', // Ensure option text is never null
            is_correct: index === question.correctAnswer
          }))
        }))
      };

      await axios.put(`/api/quizzes/${id}`, formattedData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      navigate('/admin');
    } catch (error) {
      console.error('Error updating quiz:', error.response?.data || error);
    }
  };

  return (
    <div className="edit-quiz-container">
      <form onSubmit={handleSubmit} className="edit-quiz-form">
        <h1>Edit Quiz</h1>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={quizData.title}
            onChange={handleQuizDataChange}
          />
        </div>
        <div className="form-group">
          <label>Time Limit (seconds):</label>
          <input
            type="number"
            name="time_limit"
            value={quizData.time_limit}
            onChange={handleQuizDataChange}
          />
        </div>
        {quizData.questions.map((question, questionIndex) => (
          <div key={questionIndex} className="question-container">
            <h3>Question {questionIndex + 1}</h3>
            <input
              type="text"
              value={question.question_text}
              onChange={(e) => handleQuestionChange(questionIndex, 'question_text', e.target.value)}
            />
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="option-container">
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                />
                <label>
                  <input
                    type="radio"
                    checked={question.correctAnswer === optionIndex}
                    onChange={() => handleCorrectAnswerChange(questionIndex, optionIndex)}
                  />
                  Correct Answer
                </label>
              </div>
            ))}
            <button type="button" onClick={() => removeQuestion(questionIndex)} className="remove-question">Remove Question</button>
          </div>
        ))}
        <button type="button" onClick={addQuestion} className="add-question">Add Question</button>
        <button type="submit" className="save-changes">Save Changes</button>
      </form>
    </div>
  );
}

export default EditQuiz;
