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
  handleFormReset = () => {
    this.setState(({
      portfolioName:""
    }))
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
    const name=this.state.portfolioName;
    cparray.push({
      id :this.postID,
      portfolioName: name
    })
    this.setState({
      name:"",
      users:cparray
    })
    this.handleFormReset()
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
    const {users,portfolioName}=this.state;
    const isEnabled=this.state.portfolioName.length>0;
    return (
      <div className="App">
       <form onSubmit={this.handleSubmit}>
        <div className="portfolioAdd">
        <button disabled={!isEnabled} className="button buttonAdd" type="submit">Add new portfolio</button>
          <input id="inputPorfolio" type="text" 
           value={portfolioName}
           onChange={this.handlePortfolioName} 
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
