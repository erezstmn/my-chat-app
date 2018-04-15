import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';
import ChatRoom from './components/ChatRoom';

const socket = io.connect('http://localhost:5000');


class App extends Component {
  constructor(props){
    super(props);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.state ={
      userName:''
    }
  }
  componentDidMount() {
    let userName = prompt('Please enter your user name');    
    this.setState((prevState, props) =>{
      return{
        userName
      }
    })
    socket.on('from server', (data) => {
      console.log(data);
  })};
  handleSendMessage(e){ 
    let val = document.getElementById('text').value;
      socket.emit('my other event',{message:val, sender:this.state.userName});
    }  
  render() {
    return (
      <div className="App">
        <ChatRoom handleSendMessage={this.handleSendMessage} socket={socket}/>        
      </div>
    );
  }
}

export default App;
