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
    this.handleLeaveRoom = this.handleLeaveRoom.bind(this);
    this.state ={
      userName:'',      
      currentRoom:'',      
      isChatRoomHidden:true,
      isLoginFormHidden:false    
    }
  }
  handleSendMessage(e){    
    let val = document.getElementById('text').value;
    socket.emit('message',{message:val, sender:this.state.userName, room:this.state.currentRoom});
    document.getElementById('text').value="";
    }
  handleSubmitLogin(e){
    let user = document.getElementById('userName').value;
    let room = document.getElementById('roomFromInput').value;
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
          currentRoom:room,
          isChatRoomHidden:false,
          isLoginFormHidden:true
        }
      })
      socket.emit('message',{message:`${this.state.userName} joined the room`, sender:'Admin', room:this.state.currentRoom});    
    })
    .catch((err) =>{      
      console.log(err);
    })
    
  }
  handleLeaveRoom(e){
    let room = this.state.currentRoom;    
    axios.post('/logout', {room}).then((res) => {      
      this.setState(() =>{
        return{
        userName:'',      
        currentRoom:'',
        messages:[],
        isChatRoomHidden:true,
        isLoginFormHidden:false 
        }
      })
    }).catch((e)=>{
      console.log(e);
    })
  }  
  render() {
    return (
      <div className="App">
        <Login 
          isHidden={this.state.isLoginFormHidden}
          handleSubmitLogin={this.handleSubmitLogin} 
          chatRooms={this.state.chatRooms}
          userName={this.state.userName}
          currentRoom={this.state.currentRoom}
          />
        <ChatRoom
          isHidden={this.state.isChatRoomHidden}  
          currentRoom={this.state.currentRoom}
          currentUser={this.state.userName}
          handleSendMessage={this.handleSendMessage}
          handleLeaveRoom={this.handleLeaveRoom} 
          socket={socket}
          />                
      </div>
    );
  }
}

export default App;
