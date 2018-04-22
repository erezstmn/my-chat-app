import React, {Component} from 'react';
import '../App.css';
// import uniqueid from 'lodash.uniqueid';  

class Login extends Component{   
    render(){
    return (
        <div 
        hidden={this.props.isHidden}
        className="login-form"    
        >
            <h1>Login Form</h1>                      
                <br/>
                <input type="text" id="userName" placeholder="username" autoFocus/> <br/>                
                <input type="text" id="roomFromInput" placeholder="New Chat room" /> <br/>                
                <button onClick={this.props.handleSubmitLogin}>submit</button>
        </div>
    );}
};

export default Login;