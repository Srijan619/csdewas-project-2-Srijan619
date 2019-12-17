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
  }

  handlePortfolioName = (event) =>{
   this.setState({
     portfolioName:event.target.value
   })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.postID = this.postID + 1;
    let cparray = Object.assign([], this.state.users);
    const name = this.state.portfolioName;
    let data=JSON.parse(localStorage.getItem("portfolio"));
    if (data===null||data.length===0) {
      cparray.push({
        id: this.postID,
        portfolioName: name,
  
      })
      localStorage.setItem("portfolio", JSON.stringify(cparray));
    }
    else {
      let  last_id = parseInt(data[data.length - 1].id);
      this.postID=this.postID+last_id;
      cparray = data;
      cparray.push({
         id: this.postID,
         portfolioName: name,
      })
      localStorage.setItem("portfolio", JSON.stringify(cparray));
    }
    this.setState({
      name: "",
      users: JSON.parse(localStorage.getItem("portfolio"))
    })
    this.handleFormReset()

  }
  handleDelete = (index,id) => {
    event.preventDefault();
  
    
    let list = JSON.parse(localStorage.getItem("portfolio"));

    let stockData=JSON.parse(localStorage.getItem("stockData"));
    let modifiedStockData=[];
   
    if(stockData!==null){
    modifiedStockData = stockData.filter(stock => {
      return stock.portfolioID !==id;
    });}
    localStorage.setItem("stockData",JSON.stringify(modifiedStockData));
    
    list.splice(index, 1);
    this.setState({
      users: list
    })
    localStorage.setItem("portfolio", JSON.stringify(list));
    
    
  }
  componentWillMount() {
    let data = localStorage.getItem("portfolio");
    
    if(data!==null){
    this.setState({
      users: JSON.parse(data)
    })}
  }

  handleFormReset = () => {
    this.setState(({
      portfolioName:""
    }))
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
              delete={this.handleDelete.bind(this,index,post.id)}
              usersArray={this.state.users}></Portfolio>
            )
          })}
          
        </div>
      </div>
    );
  }
}

export default App;
