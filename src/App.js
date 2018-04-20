import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FlagPicker from './components/FlagPicker/FlagPicker';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FlagPicker />
      </div>
    );
  }
}

export default App;
