import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import Logout from './logout';
import { Typography } from '@mui/material';
import { Row,Col } from 'react-bootstrap';
class NavBar extends React.Component {
    render() { 
        return <div >
            <Navbar className="nav" expand="lg">
            <Container>
            <Navbar.Brand href="#home">
                <Row>
                    <Col style={{"marginTop":'30px'}}>
                    <Typography>
                    <span className="logoText">USER FRIENDLY CODING PLATFORM</span>
                    </Typography>
                    </Col>
                    <Col style={{"marginLeft":'480px'}}>
                    <Typography>
                    {/* <Logout/> */}
                    </Typography>
                    </Col>
                </Row>
            </Navbar.Brand>
            </Container>
            </Navbar>
        </div>;
    }
}


 
export default NavBar;