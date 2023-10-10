// AnswerBar.js
import React from 'react';

function AnswerBar({ answers }) {
  return (
    <div className="answer-bar">
      <h2>Answers</h2>
      <ul>
        {answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
    </div>
  );
}

export default AnswerBar;
