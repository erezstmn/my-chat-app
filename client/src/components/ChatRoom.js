import React, {Component} from 'react';
import uniqueid from 'lodash.uniqueid';

class ChatRoom extends Component{
    constructor(props){
        super(props);       
        this.state ={
            messages:[]
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
   
    render(){
        return(
            <div>
                <h1>{this.props.currentRoom || 'please select your room'}</h1>
                <div>
                    {this.state.messages.map((message) =>{
                        return <p key={uniqueid()}>{Object.keys(message) + 'says: ' + message.Admin}</p>
                    })}    
                </div>
            </div>
        )    }
}
export default ChatRoom;