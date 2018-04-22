import React, {Component} from 'react';
import '../App.css';
// import uniqueid from 'lodash.uniqueid';  

class Login extends Component{
    constructor(props){
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    
    componentWillMount(){
        document.addEventListener("keypress", this.handleKeyPress);
      }
    componentWillUnmount() {
        document.removeEventListener("keypress", this.handleKeyPress);
    }
    handleKeyPress(e){       
        if (e.key ==='Enter'){
            this.props.handleSubmitLogin();
        }
    }
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