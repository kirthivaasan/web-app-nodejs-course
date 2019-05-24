import React, {Component} from 'react';
import Axios from 'axios';
import "./signup.css"

class Signup  extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '', email:'', password:'', repeat_password:'', message:''};
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const {name,password, repeat_password, email} = this.state;
        if(password != repeat_password){
            this.setState({message : 'Password does not match with repeat password field!<br/>'});
        }
        /*
          if(validateEmail(email)){
          this.state.message += 'Email is not valid!<br/>';
          }
        */
        // Send a post request
        
        Axios.post('/register',{name,email,password}).then((result)=>{
            // access results
            console.log(result);
        }).then(
            (response) =>{
                console.log(response.data);
                
                // redirect signed in user to dashboard
                document.location.reload(true);
            },
            (error)=>{
                console.log(error);
                document.location.reload(true);          }
        );
        
    }
    
    render() {
        return (
            <div id="signup">
              <form onSubmit={this.handleSubmit}>
                <label>
                  Name:
                  <input type="text" value={this.state.name} onChange={this.handleChange} name="name" required/>
                </label><br/>
                <label>
                  Email:
                  <input type="text" value={this.state.email} onChange={this.handleChange} name="email" required/>
                </label><br/>
                <label>
                  Password: 
                  <input type="password" value={this.state.password} onChange={this.handleChange} name="password" required/>
                </label><br/>
                <label>
                  Repeat-Password:
                  <input type="password" value={this.state.repeat_password} onChange={this.handleChange} name="repeat_password" required/>
                </label><br/>
                <input type="submit" value="Submit" />
                
              </form>
              <div id="message">{this.state.message}</div>
            </div>
        );
    }
}

export default Signup;
