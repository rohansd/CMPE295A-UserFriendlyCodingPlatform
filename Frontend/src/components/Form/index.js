import React from "react";
import { useHistory } from "react-router-dom";

export const Form = ({ onSubmit }) => {

  let history = useHistory();

  const onSubmitonSubmit = (event) => {
    event.preventDefault();
    console.log(localStorage);
    // history.push("/feedback");
    console.log("is this running");
  };

  return (
      <>
        <div className="form-group">
          <label htmlFor="name">Did you solve the question correctly ?</label>
        </div>
        <div className="form-group">
          <button className="form-control btn btn-outline-success" onClick={e => onSubmitonSubmit(e)} >
            Yes
          </button>
          <div> </div>
          <button className="form-control btn btn-outline-danger" type="submit">
            No
          </button>
        </div>
      </>
  );
};
export default Form;
