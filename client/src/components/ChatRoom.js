import React, {Component} from 'react';
import uniqueid from 'lodash.uniqueid';
export default class ChatRoom extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName:'',
            messages:[]
        }
    }
    handleEnterUserName(e){
        console.log(e);
    }
    componentDidMount(){       
        this.props.socket.on('message',(data) =>{                
            this.setState((prevState, props) =>{
                let messages = prevState.messages.map((message) => message);
                messages.push(data);
                return{
                    messages
                }
            })
        });     
    }
    render(){
        return(
            <div>
                <h1>Chat Room</h1>                
                {this.state.messages.map((message) => {
                    return(
                        <p key={uniqueid()}>{message.sender + ': ' + message.body}</p>
                    );
                })}
                <input id="text" type="text"/>
                <button onClick={this.props.handleSendMessage}>Send Message</button>
            </div>
        )
    }
}