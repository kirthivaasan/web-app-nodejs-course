import React, {Component} from 'react';
import Axios from 'axios';
import Auth from './Auth';

class Login  extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '',password:''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
          this.setState({[event.target.name]: event.target.value});
      }

      handleSubmit(event) {
        event.preventDefault();
        const {name,password} = this.state;
        // Send a post request
        
        Axios.post('/login',{name,password}).then((response)=>{
            // access response
            console.log('Result:',response);
            // save the token
            Auth.authenticateUser(response.data.token);
            console.log('token:',Auth.getToken());
            this.setState({name:'',password:''});
            //windows.location.reload();
        },
        (error)=>{
          console.log(error);
        });
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.name} onChange={this.handleChange} name="name" required/>
            </label>
            <label>
              Password:
              <input type="password" value={this.state.password} onChange={this.handleChange} name="password" required/>
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
}

export default Login;
