// QuestionList.js
import React from 'react';

function QuestionList({ questions, setCurrentQuestion }) {
  return (
    <div className="question-list">
      <ul>
        {questions.map((question, index) => (
          <li key={index} onClick={() => setCurrentQuestion(index)}>
            Question {question.id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;
