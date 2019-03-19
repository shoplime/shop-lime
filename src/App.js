import React, { Component } from 'react';
import {HashRouter as Router} from 'react-router-dom'
import routes from './routes'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
          {/* {routes} */}
        <header className="App-header">
          ShopLime has never looked better!
        </header>
      </div>
      </Router>
    );
  }
}

export default App;
