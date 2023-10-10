import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  ButtonGroup as MuiButtonGroup,
  List,
  ListItem,
  ListItemText,
  Paper,
  Grid,
  CssBaseline,
  TextareaAutosize,
} from '@mui/material';
import axios from 'axios';

function Question() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [data, setData] = useState(null);
  const [answers, setAnswers] = useState();
  const [submitanser,setSubmitanser]  = useState();

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

//   const questions = data?.data?.questions;
 

  const handleAnswerChange = (event) => {
  
    setAnswers( event.target.value);
  };

  const handleNextClick = () => {
    if (currentQuestion < data?.data?.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleQuestionSubmit = () => {
    // You can process and submit answers here
    console.log(answers);
  };

  const handleQuestionSelect = (index) => {
    setCurrentQuestion(index);
  };
  const handleSubmit = (id) => {
   
    setSubmitanser(answers)
 
    const apiUrl = ` https://api.visionlanguageexperts.in/api/store/?question_id=${id}&user_id=1&answers=${answers}`; // Replace with your API endpoint

    axios
      .post(apiUrl)
      .then((response) => {
        console.log('Response:', response.data);
      
      })
      .catch((error) => {
        console.error('Error:', error);
      
      });
  };

  return (
    <Container maxWidth="lg">
      <CssBaseline />
      {data?.data?.questions && (
        <Typography variant="h4" align="center" gutterBottom>
          #{data?.data?.questions[currentQuestion].id} - {data?.data?.questions[currentQuestion].question_name} ({currentQuestion + 1}/{data?.data?.questions.length})
        </Typography>
      )}
      <Grid container justifyContent="center">
      <Grid item xs={12} md={3}>
          {data?.data?.questions && (
            <Paper elevation={3} style={{ padding: '16px' }}>
              <Typography variant="h6" gutterBottom>
                Questions List
              </Typography>
              <List>
                {data?.data?.questions.map((question, index) => (
                  <ListItem button key={index} onClick={() => handleQuestionSelect(index)}>
                    <ListItemText primary={`Question ${question.id}`} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Grid>
        <Grid item xs={12} md={8}>
          {data?.data?.questions && (
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {data?.data?.questions[currentQuestion].question}
                </Typography>
                <TextareaAutosize
                  minRows={4}
                  placeholder="Type your answer here..."
                  style={{ width: '100%', padding: '8px', fontSize: '16px' }}
                  value={answers}
                  onChange={handleAnswerChange}
                />
                <MuiButtonGroup fullWidth>
                  {currentQuestion > 0 && <Button onClick={handlePreviousClick}>Previous</Button>}
                  {currentQuestion < data?.data?.questions.length - 1 && <Button onClick={handleNextClick}>Next</Button>}
                   <Button onClick={()=>handleSubmit(data?.data?.questions[currentQuestion].id)}>Submit</Button>
                </MuiButtonGroup>
                <Typography variant="h5" component="div" gutterBottom>
                Your Submitted Answser
                </Typography>
                <TextareaAutosize
                  minRows={4}
                  placeholder="Your Submitted Answser"
                  style={{ width: '100%', padding: '8px', fontSize: '16px' ,height:'55px'}}
                  value={submitanser}
                 
                />
              </CardContent>
            </Card>
          )}
        </Grid>
       
      </Grid>
    </Container>
  );
}

export default Question;
