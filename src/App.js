// App.js
import React, { useEffect, useState } from 'react';
import './App.css';


import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Page from './Page';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  


  return (
    <div className="App">
       <ToastContainer />
     
      <Page/>
     
    </div>
  );
}

export default App;
