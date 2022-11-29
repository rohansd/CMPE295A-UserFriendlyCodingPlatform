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

const theme = createTheme();

export default function CodeScreen() {
  
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState([])

  var data1 = {
    "title" : localStorage.getItem('questionTitle')
  }

  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:5000/get_problem_by_title', data1);
        console.log("********** question :", response.data);
        setQuestion(response.data) 
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
                    defaultValue="
                    Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.

                    You have the following three operations permitted on a word:

                    Insert a character
                    Delete a character
                    Replace a character
                    

                    Example 1:

                    Input:
                    word1 = 'horse',
                            word2 = 'ros'
                    Output: 3
                    Explanation: 
                    horse =: rorse (replace 'h' with 'r')
                    rorse =: rose (remove 'r')
                    rose =: ros (remove 'e')"
                    inputProps={
                        { readOnly: true, }
                    }
                >
                </TextField>
                <Box component="span" sx={{ display: 'block' }}>Acceptance rate : {question.Acceptance}</Box>
                <Box component="span" sx={{ display: 'block' }}>Difficulty level : {question.Difficulty}</Box>
                <Box component="span" sx={{ display: 'block' }}>Frequency : {question.Frequency}</Box>
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
              
              {/* <iframe src="https://trinket.io/embed/python/3d8d7ce66b" width="100%" height="356" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe> */}
                {/* <div>
                    <TextField
                    id="standard-multiline-static"
                    label="Input Code"
                    multiline
                    rows={18}
                    defaultValue="Insert code"
                    />
                </div>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                        //  sx={{ mt: 3, mb: 2 }}
                > 
                Submit
                </Button>
                <div>
                <TextField
                    id="standard-multiline-static"
                    label="Result"
                    multiline
                    rows={4}
                    defaultValue="Result"
                    inputProps={
                        { readOnly: true, }
                    }
                    sx={{
                
                        backgroundColor: (t) =>
                          t.palette.mode === 'light' ? t.palette.grey[200] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                </div> */}
                </Box>
            </Grid>
            </Grid>
        </ThemeProvider>
  );
}