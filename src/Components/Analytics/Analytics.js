import React, { Component } from "react";
import io from "socket.io-client";
// const socket = openSocket('http://localhost:4000')

// const io = require('socketIOClient');
// const socket = io();
import './analytics.scss';


class Analytics extends Component {
    constructor(props) {
        super(props);

        this._isMounted = false;
        this.state = {
            ready: false,
        };
    }

    componentDidMount() {
        this._isMounted = true;
        window.gapi.analytics.ready(() => {
            console.log('Ready to do fireworks');
            if (this._isMounted) {
                 this.setState({ ready: true });
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

  render() {



    
    return (
       
      <div>
        <iframe className="frame" src='admin.html'></iframe>
        
        
      </div>
      
    );
  }
}
export default Analytics;
