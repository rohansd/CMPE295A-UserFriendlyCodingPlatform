import { Button } from '@mui/material';
import React, { Component } from 'react';
import {useHistory} from 'react-router-dom';

export default function Logout() {
    const history = useHistory();

    const logoutHandler = e => {
        localStorage.clear();
        history.push('/login');
    }
            return (<React.Fragment>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={logoutHandler}
                >Logout</Button>
            </React.Fragment>
            )
   
}
