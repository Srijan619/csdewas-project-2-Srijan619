import React, { Component } from 'react';
import Portfolio from './portfolio';
import './App.css';
import './box.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolioName:'',
      users: []
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
    this.setState({
      users: [...this.state.users, <Portfolio dataFromParent={this.state.portfolioName} />]
    });
    
  }
  handleDelete  = (event) =>{
    event.preventDefault();
    const array= [...this.state.users, <Portfolio dataFromParent={this.state.portfolioName} />];
    array.pop();
    console.log(array)
  }
  render() {
    const {portfolioName}=this.state
    return (
      <div className="App">
       <form>
        <div className="portfolioAdd">
        
        <button onClick={this.handleSubmit} className="button buttonAdd" type="submit">Add new portfolio</button>
          <input id="inputPorfolio" type="text" value={portfolioName}
           onChange={this.handlePortfolioName} 
           placeholder="Name of the portfolio">
           </input>
         
        </div>
           <button onClick={this.handleDelete}>Delete</button>
        </form>
       
        <div className="content">
          
           {this.state.users}
          
        </div>
      </div>
    );
  }
}

export default App;
