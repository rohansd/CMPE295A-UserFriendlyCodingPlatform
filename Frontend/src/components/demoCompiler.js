import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
export default function DemoCompiler() {
    // constructor(props) {
    //     super(props);
    //     this.state = {
        
    //     }
    // }
    // componentDidMount() {
        const handle = e => {
            var myForm = document.getElementById("myForm");
            var formData = new FormData(myForm);
            var url =
                "http://compiler-env.i3hveummcp.ap-southeast-1.elasticbeanstalk.com/";
            var options = {
                method: "POST",
                body: formData
            };
            fetch(url, options)
                .then(res => res.json())
                .then(json => {
                console.log(json);
                //Do whatever you want with this JSON response
                });
        }
    // }
    // render() {
        return(
        <div>
        
                <Form encType="multipart/form-data" onSubmit={(e)=>this.handle(e)} id="myForm">
            <div class="entrypoint">
                <label htmlFor="entrypoint">Enter entry point</label>
                <input type="text" name="entrypoint"/>
            </div>

            <div class="input_text">
                <label htmlFor="input_text">Enter stdin</label>
                <textarea type="text" name="input_text"></textarea>
            </div>

            <div class="language">
                <label htmlFor="language">Choose Language</label>
                <select name="language">
                    <option value="python">Python</option>
                    <option value="C">C</option>
                    <option value="C++">C++</option>
                    <option value="java">Java</option>
                </select>
            </div>

            <div class="myCode">
                <label htmlFor="myCode">Upload Zip File</label>
                <input type="file" name="myCode"/>
            </div>

            <button type="submit">Submit</button>
        </Form>
    </div >)
// }
}