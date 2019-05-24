import React, {Component} from 'react';
import Axios from 'axios';
import Auth from './Auth';
import Login from './login';
import Signup from './signup';
import Profile from './profile';

class Homepage  extends Component {
    constructor(props) {
        super(props);
        this.state = {show: false};
    }

    toggle() {
		this.setState({
			shown: !this.state.shown
		});
    }

    logout(){
        alert('logout');

        // Add this token to blacklist 
        Axios.post('/logout',{token:Auth.getToken()}).then((result)=>{
            // access results
            console.log(result);
        })

        // Delete token from browser
        Auth.deauthenticateUser();

        
    }
    
    render() {
        var shown = {
			display: this.state.shown ? "none" : "block"
		};
		
		var hidden = {
            display: this.state.shown ? "block" : "none"
        };
        
        return (
            <div>
            {Auth.isUserAuthenticated() ? (
                <div>
                    <div id="logout"><button onClick={this.logout.bind(this)}>LogOut</button></div>
                  <Profile/>
                </div>
             ) : (
               <div id="login">
                 <div style={ shown }>
                    <Login/><br/>
                 </div>
                 <div>Register</div>
                 <div style={ shown }>
                    <Signup/>
                </div>
                  
               </div>
           )}
           </div>
        );
    }
}

export default Homepage;
