// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';

// eslint-disable-next-line no-undef
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    // fetch('http://127.0.0.1:5000')
    fetch('http://127.0.0.1:5000')
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => {
        console.log("server api in App.js error", err)
      });
  }

  componentWillMount() {
    this.callAPI();
  }
  render() {
    return (
      <div className="App">
        <Main></Main>
      </div>
    );
  };
}
export default App;
