import React, { Component } from 'react';
import Portfolio from './portfolio';
import './App.css';



class App extends Component {
  constructor(props) {
    super(props);
    this.postID=0;

    this.state = {
      id:"",
      portfolioName:'',
      users: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete=this.handleDelete.bind(this,this.state.index);

  }
  handlePortfolioName = (event) =>{
   this.setState({
     portfolioName:event.target.value
   })
  }
  handleSubmit  = (event) =>{
    event.preventDefault();
    this.postID=this.postID+1;
    const cparray= Object.assign([],this.state.users);
    cparray.push({
      id :this.postID,
      portfolioName: this.state.portfolioName
    })
    this.setState({
      users:cparray
    })
  
  }
  handleDelete  = (index) =>{
    event.preventDefault();
    const cparray= Object.assign([],this.state.users);
    cparray.splice(index,1);
    this.setState({
       users:cparray 
    })
    
  }
  render() {
    const {users}=this.state
    return (
      <div className="App">
       <form>
        <div className="portfolioAdd">
        <button onClick={this.handleSubmit} className="button buttonAdd" type="submit">Add new portfolio</button>
          <input id="inputPorfolio" type="text" 
           onBlur={this.handlePortfolioName} 
           placeholder="Name of the portfolio">
           </input>
         
        </div>
        </form>
       
        <div className="content">
          
          {users.map((post,index)=>{
            return(
              <Portfolio
              key={post.id}
              id={post.id}
              name={post.portfolioName}
              delete={this.handleDelete}></Portfolio>
            )
          })}
          
        </div>
      </div>
    );
  }
}

export default App;
