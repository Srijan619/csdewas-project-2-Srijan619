/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import Portfolio from './portfolio';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.postID=0;

    /* Initialising initial state for the portfolio data*/
    this.state = {
      id:"",
      portfolioName:'',
      users: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);// Binds the add button to add the portfolio
  }

  //The below function changes the state of the text field of adding the portfolio
  handlePortfolioName = (event) =>{
   this.setState({
     portfolioName:event.target.value
   })
  }

  // This function handles the addition of portfolio
  handleSubmit = (event) => {
    event.preventDefault();
    this.postID = this.postID + 1; //Changing the id of the portfolio to a unique id everytime new portfolio is added
    let cparray = Object.assign([], this.state.users); //Copying the array of portfolios to add new portfolio to that one
    const name = this.state.portfolioName;// getting the portfolioname
    let data=JSON.parse(localStorage.getItem("portfolio"));// gettting the portfolio array from the local storage
    if (data===null||data.length===0) { // checking the condition inf there are any data in the local storage
      cparray.push({                // pushing data to new array
        id: this.postID, 
        portfolioName: name,
  
      })
      localStorage.setItem("portfolio", JSON.stringify(cparray)); // setting the  data to localstorage
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
      users: JSON.parse(localStorage.getItem("portfolio")) //Setting the state of the newly changed localstorage to the state array
    })
    this.handleFormReset() // reseting the input field after a succesful entry

  }

  //This function handles the deletion of the portfolio
  handleDelete = (index,id) => {
    
    let list = JSON.parse(localStorage.getItem("portfolio"));

    let stockData=JSON.parse(localStorage.getItem("stockData"));
    let modifiedStockData=[];
   
    if(stockData!==null){
    modifiedStockData = stockData.filter(stock => {
      return stock.portfolioID !==id;
    });}
    localStorage.setItem("stockData",JSON.stringify(modifiedStockData));
    
    list.splice(index, 1);  // Deleting the portfolio by the index
    this.setState({
      users: list
    })
    localStorage.setItem("portfolio", JSON.stringify(list));
    
    
  }
  // This function makes sure the component is mounted with the items from the local storage
  componentWillMount() {
    let data = localStorage.getItem("portfolio");
    
    if(data!==null){
    this.setState({
      users: JSON.parse(data)
    })}
  }

  //This function reset the input field for user to input new portfolio name
  handleFormReset = () => {
    this.setState(({
      portfolioName:""
    }))
  }

  render() {
    const {users,portfolioName}=this.state; // getting the current state of portfolio array and the portfolio name
    const isEnabled=this.state.portfolioName.length>0;// Checking if user has input any data to the input field to toggle it to enabled or disabled
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
          
          {users.map((post,index)=>{ //Mapping all the data from the portfolio array to the display
            return(
              <Portfolio
              // passing props to the portfolio component
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
