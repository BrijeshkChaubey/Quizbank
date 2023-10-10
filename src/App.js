// App.js
import React, { useEffect, useState } from 'react';
import './App.css';
// import QuestionList from './QuestionList';
import Question from './Question';
// import AnswerBar from './AnswerBar';
import axios from 'axios';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  


  return (
    <div className="App">
      {/* <QuestionList questions={data} setCurrentQuestion={setCurrentQuestion} /> */}
      <Question />
      {/* <AnswerBar answers={answers} /> */}
    </div>
  );
}

export default App;
