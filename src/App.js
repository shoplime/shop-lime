import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {

  startBroadcast = () => {
    axios.get('/startBroadcast')
    .then(res => console.log('boradcast started'))
  }
  
  stopBroadcast = () => {
    axios.get('/stopBroadcast')
    .then(res => console.log('broadcast ended'))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={() => {this.startBroadcast()}} >Start Broadcast</button>
          <button onClick={() => {this.stopBroadcast()}} >End Broadcast</button>
        </header>
      </div>
    );
  }
}

export default App;
