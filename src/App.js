import React, { Component } from 'react';
import {HashRouter as Router} from 'react-router-dom'
import routes from './routes'
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
      <Router>
      <div className="App">
          {/* {routes} */}
        <header className="App-header">
          <button onClick={() => {this.startBroadcast()}} >Start Broadcast</button>
          <button onClick={() => {this.stopBroadcast()}} >End Broadcast</button>
          ShopLime has never looked better!
        </header>
      </div>
      </Router>
    );
  }
}

export default App;
