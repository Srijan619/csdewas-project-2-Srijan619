import React, { Component } from 'react';
import Portfolio from './portfolio';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolioName:''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handlePortfolioName = (event) =>{
   this.setState({
     portfolioName:event.target.value
   })
  }
  handleSubmit  = (event) =>{
    event.preventDefault();
    return this.state.portfolioName;
  }
  render() {
    const {portfolioName}=this.state
    return (
      <div className="App">
        <form>
        <div className="portfolioAdd">
        <button onSubmit={this.handleSubmit} className="button buttonAdd" type="submit">Add new portfolio</button>
          <input id="inputPorfolio" type="text" value={portfolioName}
           onChange={this.handlePortfolioName} 
           placeholder="Name of the portfolio">
           </input>
        </div>
        {console.log(this.handleSubmit)}
        </form>
        <Portfolio parentData={this.handleSubmit}></Portfolio>
      </div>
    );
  }
}

export default App;
