import React, {useContext} from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import {signup} from '../services/authenticationService';

const theme = createTheme();

export default function Signup() {
  let history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');
  const [idCreated, setidCreated] = useState(0);

  // const {setUser, setAuthState, updateLocalStorage} = authContext;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // var user = data.get('user');
    // var admin = data.get('admin');
    // var persona;
    // if (user === 'on') persona = "user";
    // if (admin === 'on') persona = "admin";
    // eslint-disable-next-line no-console
    var data1= {
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
    };
    console.log(data1.username);
    const res = await axios
      .post("http://localhost:5000/register", data1
      //   , {
      //   headers: {
      //     'content-type': 'application/json',
      //     'Access-Control-Allow-Origin': '*'
      //   }
      // }
    )
      .then((response) => {
        console.log("Status Code : ", response.status);
        console.log("returned message :", response.data);
        if (response.status === 200 && response.data === "You have successfully registered !") {
          // localStorage.setItem("c_id", response.data.CustomerID);
          // localStorage.setItem('customerEmail', this.state.email);
          // localStorage.setItem('username', this.state.persona);
          // this.setState({
          //   authFlag: true,
          //   idCreated: (
          //     <Redirect to="/problems"></Redirect>
          //   ),
          // })
          console.log("signed up", data1.username);
          history.push("/problems");
        }
        else {
          console.log("INVALID CREDENTIALS");
          setErrorMessage('Invalid Credentials. Please Try Again');
        }
      });
              
    // const response = await signup(data1);
    // console.log(response.data);
    // console.log(response.status);
    // if(response.status === 200){
    //   setUser(response.data);
    //   setAuthState(true);
    //   updateLocalStorage(response.data); //Need to call after setUser
    // }
    // else{
    //   setAuthState(false);
    //   console.log('Error', response);
    // }
  };

  // if(idCreated){
  //   return <Redirect to="/profile" />
  // } else  if (idCreated==="Email ID already exists"){
  //   return (
  //   <div> Email ID already exists </div>
  // );
  // }
  return (
    
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://www.thestatesman.com/wp-content/uploads/2018/05/Code.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <br></br>
            {/* <Grid item xs={12}>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="user" id="user"/>
                    <label class="form-check-label" for="user">
                    User
                    </label>
                  </div>
                
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="admin" id="admin"/>
                    <label class="form-check-label" for="admin">
                    Admin
                    </label>
                  </div>
              </Grid> */}
              <br></br>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="Username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="./login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}