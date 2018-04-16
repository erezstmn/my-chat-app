import React from 'react';
// import uniqueid from 'lodash.uniqueid';  

const Login = (props) =>{
    return (
        <div>            
                user name: <br/>
                <input type="text" id="userName" placeholder="username" /> <br/>
                Create new chat room or choose from the list: <br/>
                <input type="text" id="roomFromInput" placeholder="New Chat room" /> <br/>                
                <button onClick={props.handleSubmitLogin}>submit</button>
        </div>
    );
};

export default Login;