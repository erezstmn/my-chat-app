import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';
import ChatRoom from './components/ChatRoom';
import Login from './components/Login';
import axios from 'axios';


const socket = io.connect('http://localhost:5000');
class App extends Component {
  constructor(props){
    super(props);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    this.state ={
      userName:'',      
      currentRoom:'',
      messages:[]      
    }
  }
  handleSendMessage(e){ 
    let val = document.getElementById('text').value;
      socket.emit('my other event',{message:val, sender:this.state.userName});
    }
  handleSubmitLogin(e){
    let user = document.getElementById('userName').value;
    let room = document.getElementById('roomFromInput').value || document.getElementById('roomFromOption').value;
    let loginInfo = {
      user,
      room
    };
    axios.post('/login', loginInfo,{
      validateStatus : (status) =>{
        if (status===400){
          alert(`username ${user} is not available`);
          return false;
        }
        return status >= 200 && status < 300;
      }
    })   
    .then((res) => { 
      this.setState(()=>{
        return {
          userName:user,
          currentRoom:room
        }
      })    
    })
    .catch((err) =>{      
      console.log(err);
    })
  }  
  render() {
    return (
      <div className="App">
        <Login 
          handleSubmitLogin={this.handleSubmitLogin} 
          chatRooms={this.state.chatRooms}
          />
        <ChatRoom 
          messages={this.state.messages}
          currentRoom={this.state.currentRoom}
          handleSendMessage={this.handleSendMessage} 
          socket={socket}/>        
      </div>
    );
  }
}

export default App;
