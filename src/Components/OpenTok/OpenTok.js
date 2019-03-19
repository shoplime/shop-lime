import React, { Component } from 'react';
import axios from 'axios'

class OpenTok extends Component {

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
        <div>
            <button onClick={() => {this.startBroadcast()}} >Start Broadcast</button>
            <button onClick={() => {this.stopBroadcast()}} >End Broadcast</button>
        </div>
          
    );
  }
}

export default OpenTok;
