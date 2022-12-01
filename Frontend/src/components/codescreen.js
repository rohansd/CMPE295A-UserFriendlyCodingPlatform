import React, { useContext, useEffect, useState} from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from "react-router-dom";
import { Container } from "./Container";

const theme = createTheme();

export default function CodeScreen() {

  const triggerText = "Submit";
  const onSubmit = (event) => {
    event.preventDefault(event);
  };


  let history = useHistory();
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState([]);
  const [content, setContent] = useState("");

  var data1 = {
    "title" : localStorage.getItem('questionTitle')
  }

  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      try {
        console.log(data1);
        const response = await axios.post('http://127.0.0.1:5000/getProblemContent', data1);
        console.log("**********????????????????????????? question :", response.data);
        setQuestion(response.data);
        console.log("<><><>",response.data["Content"]);
        setContent(response.data["Content"]);
        console.log("questionquestionquestionquestionquestion",question)
      } catch (error) {
        console.error("***********",error.message);
      }
      setLoading(false);
    }

    fetchData();
  }, []);
    
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" >
            <CssBaseline />
            <Grid
            item
            sx={{
                
                backgroundColor: (t) =>
                  t.palette.mode === 'light' ? t.palette.grey[200] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '60ch' },
                }}
                noValidate
                autoComplete="off"
                >
              <div>
                <Box component="span" sx={{ display: 'block' }}>{question.Id}.  {question.Title}</Box>

                <TextField
                    id="standard-multiline-static"
                    label="Question"
                    multiline
                  // rows={25}
                    defaultValue={content}
                    inputProps={
                        { readOnly: true, }
                    }
                >
                </TextField>
                </div>
                </Box>
          </Grid>
          
          <Grid>
                <Box
              component="iframe"
              src='https://trinket.io/embed/python/3d8d7ce66b?toggleCode=true&showInstructions=true'
              sx={{
                width: 850,
                height: 600
              }}
              allowfullscreen
            >
            </Box>
            <Box>
            <Grid container spacing={2}>
              <Grid item xs={20}>
                <div>
                  <Container triggerText={triggerText} onSubmit={onSubmit} />
                </div>
              </Grid>
            </Grid>
            </Box>
            </Grid>
            </Grid>
        </ThemeProvider>
  );
}