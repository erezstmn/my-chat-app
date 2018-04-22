import React, {Component} from 'react';
import uniqueid from 'lodash.uniqueid';
import '../App.css';

class ChatRoom extends Component{
    constructor(props){
        super(props); 
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state ={
            messages:[],
            isHidden:props.isHidden
        }
        this.props.socket.on('news',  (data) => {        
            this.setState((prevState)=>{
                let messages = prevState.messages;
                messages.push(data);               
                return{
                    messages
                }
            })
        })        
    }
    componentWillMount(){
        document.addEventListener("keypress", this.handleKeyPress);
      }
    componentWillUnmount() {
        document.removeEventListener("keypress", this.handleKeyPress);
    }
    handleKeyPress(e){       
        if (e.key ==='Enter'){
            this.props.handleSendMessage();
        }
    }    
    componentWillReceiveProps(nextProps){    
        
        this.setState(() =>{
            return {
                isHidden:nextProps.isHidden             
            }
        })
    }       
    render(){

    return(
            <div 
            className="login-form"
            hidden={this.state.isHidden}>
                <h1>Welcome to: {this.props.currentRoom}</h1>
                <h3>You are logged in as: {this.props.currentUser}</h3>
                <div>
                    {this.state.messages.map((message) =>{
                        return <p key={uniqueid()}>{message.user + ' says: ' + message.message}</p>                        
                    })}
                    <input type="text" id="text" />
                    <button onClick={this.props.handleSendMessage}>Send!</button>
                    <button onClick={this.props.handleLeaveRoom}>Leave Room</button>
                </div>
            </div>
        )    
    }
}
export default ChatRoom;