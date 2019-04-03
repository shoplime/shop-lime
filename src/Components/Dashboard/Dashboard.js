import React, { Component } from "react";
import io from "socket.io-client";
// const socket = openSocket('http://localhost:4000')

// const io = require('socketIOClient');
// const socket = io();

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:4000",
      
      ///
      counter: ''
      ///
      
    };
  };


  // sending sockets
  // componentDidMount = () => {
  //   const socket = io(this.state.endpoint);
  //   socket.on('connect', () => {
  //     if(window.location.hash) {
  //       const hashID = window.location.hash.substring(1)
  //       socket.emit('hello', {hashID})
  //       socket.on('stats', hits => {
  //         document.getElementById('hitCount').innerText= hits
  //       })
  //     }
  //   } ) 
  // }

  componentDidMount = () => {
   this.socket=io()
   this.socket.emit("someoneConnected")
   this.socket.on("connectCounter", data => {
     this.setState({counter: data})
   })
  }



  // receive = () => { 
  //   const socket = socketIOClient(this.state.endpoint);
  //   socket.on('count', function(messageNum) {
  //   console.log(messageNum)
  // })}
  ///
  
  // adding the function
  setColor = (color) => {
    this.setState({ color })
  }
  
  ///

  render() {
    // testing for socket connections

    // const socket = socketIOClient(this.state.endpoint);
    // socket.on('change color', (col) => {
    //   document.body.style.backgroundColor = col
    // })

    return (
      <div style={{ textAlign: "center" }}>
        <button onClick={() => this.send() }>Change Color</button>

        <p>{this.state.counter}</p>

        

      </div>
    )
  }
}
export default App;