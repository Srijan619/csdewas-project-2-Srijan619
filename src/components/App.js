import React, { Component } from 'react';
import Portfolio from './portfolio'
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
        <button className="button buttonAdd">Add new portfolio</button>
        </div>
     
       <Portfolio></Portfolio>
      </div>
    );
  }
}

export default App;
