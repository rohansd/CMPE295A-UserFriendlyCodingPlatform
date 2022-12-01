import React from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";

export const Form = ({ onSubmit }) => {

  let history = useHistory();

  var data = {
    "userId" : localStorage.getItem('userId'),
    "Title" : localStorage.getItem('questionTitle'),
    "dataStructure" : localStorage.getItem('dataStructure')
  }

  const incrementScore = async (event) => {
    event.preventDefault();
    try{
      const response = await axios.post('http://127.0.0.1:5000/increment_score', data);
    } catch (error) {
      console.error("***********",error.message);
    }
    history.push("/feedback");
  }

  const decrementScore = async (event) => {
    event.preventDefault();
    try{
      const response = await axios.post('http://127.0.0.1:5000/decrement_score', data);
    } catch (error) {
      console.error("***********",error.message);
    }
    history.push("/feedback");
  }


  return (
      <>
        <div className="form-group">
          <label htmlFor="name">Did you solve the question correctly ?</label>
        </div>
        <div className="form-group">
          <button className="form-control btn btn-outline-success" onClick={e => incrementScore(e)} >
            Yes
          </button>
          <div> </div>
          <button className="form-control btn btn-outline-danger" onClick={e => decrementScore(e)}>
            No
          </button>
        </div>
      </>
  );
};
export default Form;
