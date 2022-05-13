import React, {useContext} from 'react';
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
    const [value, setValue] = React.useState('Controlled');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        var user = data.get('user');
        var admin = data.get('admin');
        var persona;
        if (user === 'on') persona = "user";
        if (admin === 'on') persona = "admin";
        // eslint-disable-next-line no-console
        console.log("logging in credentials :");
        console.log({
          email: data.get('email'),
          password: data.get('password'),
          persona: persona
        });
    
        // const response = await signin({
        //   email: data.get('email'),
        //   password: data.get('password'),
        //   persona: persona,
        // })
        // console.log("login response", response);
        // console.log(response.status);
    }
    
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" >
            <CssBaseline />
            {/* <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                
                backgroundColor: (t) =>
                  t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
                />
                hi
            </Grid> */}
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
                    <TextField
                    id="standard-multiline-static"
                    label="Question"
                    multiline
                    rows={25}
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
                </div>
                </Box>
            </Grid>
            <Grid>        
                <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '95ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <div>
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
                </div>
                </Box>
            </Grid>
            </Grid>
        </ThemeProvider>
  );
}