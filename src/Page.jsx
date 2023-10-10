import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import './App.css'
import { Typography } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import MicNoneIcon from '@mui/icons-material/MicNone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
const Page = () => {
  
        const [currentQuestion, setCurrentQuestion] = useState(0);
        const [data, setData] = useState(null);
        const [answers, setAnswers] = useState('');
        const [submitanser, setSubmitanser] = useState('');
        const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(1);
     
  useEffect(() => {
    const apiUrl = 'https://api.visionlanguageexperts.in/api/questions';

    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleAnswerChange = (event) => {
    setAnswers(event.target.value);
  };
  const handleNextClick = () => {
    if (currentQuestion <= data?.data?.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedQuestionIndex(currentQuestion + 2);
    }
  };

  const handlePreviousClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedQuestionIndex(currentQuestion );
    }
  };



  const handleQuestionSelect = (index) => {
    setCurrentQuestion(index);
    setSelectedQuestionIndex(index  + 1);
    setAnswers(submitanser);
  };

  const handleSubmit = (id) => {
   
    
    const apiUrl = ` https://api.visionlanguageexperts.in/api/store/?question_id=${id}&user_id=1&answers=${answers}`;

    axios
      .post(apiUrl)
      .then((response) => {
        console.log('Response:', response.data);
        setSubmitanser(answers)
        return toast.success( `${response.data.message}`);
        // toast("Sucess",response)
      })
      .catch((error) => {
        return toast.error('Error:', `${error}`)
      
      });
  };

  return (
    <div className='container'>

      <div className='questionListBox'>
        <Typography variant='h6'>Question List</Typography>

 
  {data?.data?.questions.map((question, index) => (


      <div
      key={index}
      onClick={() => handleQuestionSelect(index)}
      style={{
        backgroundColor: question.id === selectedQuestionIndex ? 'darkgrey' : 'transparent',
        cursor: 'pointer',
      }}
       >
         <MicNoneIcon color='primary'   />
         <Typography
       
         > Question {question.id} </Typography>
         <hr />
      </div>
   ))
 }



      </div>

      <div>      

 <div className='firstContainer'>
  

        <div className='firstBox'>
            
            <Typography  style={{fontWeight:'bold'}}> #{data?.data?.questions[currentQuestion].id} </Typography>
            <Typography style={{fontWeight:'bold'}}>  -{data?.data?.questions[currentQuestion].question_name}</Typography>
            
        </div>


<div className='dateTimeContainer'>
  



  <div>
  <AccessTimeIcon fontSize='small'/>
  
  
  <Typography variant='p'>12:00:00</Typography>

  </div>

  <div>
 
  
  
  <Typography variant='p'>({currentQuestion + 1}/{data?.data?.questions.length})</Typography>

  </div>
 
 


</div>

        </div>
        <hr/>

        <div className='secondBox' >

            
                <Typography >           {data?.data?.questions[currentQuestion].question}                                                                                             
 </Typography>
            
        </div>

        <div className='inputBox'>

        <TextField
        style={{width:'100%', }}
        abel="Multiline"
          multiline
          id="filled-multiline-static"
          label="Your Answer"
          
          rows={5}
         
          variant="filled"
          value={answers}
          onChange={handleAnswerChange}
        />
        </div>

        <div className='buttonsContainer'>

            <div className='btnFirstBox'>
           
                 
{currentQuestion > 0 &&  <button className='rightBtn' onClick={handlePreviousClick} > <KeyboardDoubleArrowLeftIcon/>Previous  </button>}
{currentQuestion < data?.data?.questions.length - 1 && ( <button className='nextBtn' onClick={handleNextClick}>  Next  <KeyboardDoubleArrowRightIcon/></button> )}

            </div>

            <div className='btnSecondBox'>
            <button onClick={() => handleSubmit(data?.data?.questions[currentQuestion].id)}>Submit</button>
           
            </div>
        </div>
        <hr />

        <div className='lastBox'>
            <Typography>Your Submitted Answser
</Typography>


<div>
    <Typography   style={{color:'gray', fontSize:'14px'}}>{submitanser}
</Typography>
</div>
        </div>
        </div>
    </div>

  )
}

export default Page