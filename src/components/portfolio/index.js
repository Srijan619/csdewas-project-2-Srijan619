/* eslint-disable no-unused-expressions */
import React, { Component, Fragment } from 'react';
import ReactSVG from 'react-svg'
import './portfolio.css';
import '../App.css';
import Cancel from '../../assets/cancel.svg';
import Stock from '../../components/stock';
import Currency from '../../components/currency';
import Graph from '../../components/graph';

class index extends Component {
    constructor(props) {
        super(props);
        this.stockID = 0; //Setting stating stock id

        this.initialState = {
            portfolioID: '',
            ids: '',
            stockName: '',
            datePurchase: '',
            purchaseValue: '',
            currentValue: '',
            quantity: '',
            totalValue: '',
            portfolioValue: '',
            stockArray: [],
            currencyOption: 'EUR',
            currencySign: '€',
            showGraph: false,

        };
            
        this.state = this.initialState
        this.state.portfolioValue = this.calculateTotalValue(); //Calculating portfolio value on the fly

        //Binding all the functions
        this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
        this.hanleAdd = this.handleAdd.bind(this);
        this.hanleShowGraph = this.handleShowGraph.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);

    }
    
    //Function toggles the currency option
    handleCurrencyChange(event) {
        this.setState({ currencyOption: event.target.value }); //Sets the selected currency option
        this.changeCurrency(event.target.value) //call the change currency function 
    }

    //Function changes the currency according to the selected the currency option
    changeCurrency(curr) {
        const usd_rate = 1.10 //Setting default change rate
        const cparray = Object.assign([], this.state.stockArray); // Getting the stock data to convert


        let unit = []; //creating empty array
        const portfolioTotal = this.state.portfolioValue;//Getting the current portfolio value
       
        //switching between the currencies
        switch (curr) {
            case "USD":
                unit.length = 0; 
                
                //Changing the stock's value on the fly
                cparray.map((posts) => {
                    let array = {
                        "purchaseValue": (posts.purchaseValue * usd_rate).toFixed(2),
                        "currentValue": (posts.currentValue * usd_rate).toFixed(2),
                        "totalValue": (posts.totalValue * usd_rate).toFixed(2),
                    }
                    unit.push(array);
                })

                this.setState({
                    currencySign: "$",  //Setting the state of sign according to the selected currency
                    portfolioValue: (portfolioTotal * usd_rate).toFixed(2) //Changing the portfolio's total value also

                }
                );

                break;
                //Switching for similar things to EURO
            case "EUR":
                unit.length = 0;
                cparray.map((posts) => {

                    let array = {
                        "purchaseValue": (posts.purchaseValue / usd_rate).toFixed(2),
                        "currentValue": (posts.currentValue / usd_rate).toFixed(2),
                        "totalValue": (posts.totalValue / usd_rate).toFixed(2),
                    }
                    unit.push(array);

                })
                this.setState({
                    currencySign: "€",
                    portfolioValue: (portfolioTotal / usd_rate).toFixed(2)
                });
                break;
        }

        //This method maps according to which currency is selected
        cparray.map((posts, index) => {
            unit.map((data, id) => {
                if (index===id) { //it checks if the index is matched
                        posts.purchaseValue = data.purchaseValue,
                        posts.currentValue = data.currentValue,
                        posts.totalValue = data.totalValue

                }
            })

        })
        this.setState({
            stockArray: cparray,
        })

    }
    //Function to calculate total value of the portfolio
    calculateTotalValue() {
        let cparray = Object.assign([], this.state.stockArray); //Copying the array's data
        let data = JSON.parse(localStorage.getItem("stockData"));

        cparray = data; //setting the state of array from the local storage's data

        if (cparray !== null) {

            let total = 0;

            for (var i = 0; i < cparray.length; i++) {
                if (cparray[i].portfolioID === this.props.id) {
                    total += parseFloat(cparray[i].totalValue);
                }
            }

            return total.toFixed(2); //Returning the total value
        }

    }
    //Function handles the input text and datefield and catches the data from them
    handleFormChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    //Function adds the stock to the array
    handleAdd = async (event) => {
        event.preventDefault(); //preventing the page from refreshing when user clicks the add stock button

        this.stockID = this.stockID + 1; //Creating unique ID

        let cparray = Object.assign([], this.state.stockArray);

        let data = JSON.parse(localStorage.getItem("stockData"));
        try {
            var value = await this.fetchingData(); //waiting for the fetchingData function to send the data
            const total = (this.state.quantity * value.currentValue).toFixed(2); //Calculating total for each stock according to it's quantity

            if (data === null || data.length === 0) {
                cparray.push({
                    portfolioID: this.props.id,
                    ids: this.stockID,
                    stockName: this.state.stockName,
                    datePurchase: this.state.datePurchase,
                    quantity: this.state.quantity,
                    currentValue: value.currentValue,
                    purchaseValue: value.purchaseValue,
                    totalValue: total

                })

                localStorage.setItem("stockData", JSON.stringify(cparray));
            }
            else {
                let last_id = parseInt(data[data.length - 1].ids); //Checking the last id from the stored stock, to create new unique id for new stock to be added
                this.stockID = this.stockID + last_id;

                cparray = data;
                cparray.push({
                    portfolioID: this.props.id,
                    ids: this.stockID,
                    stockName: this.state.stockName,
                    datePurchase: this.state.datePurchase,
                    quantity: this.state.quantity,
                    currentValue: value.currentValue,
                    purchaseValue: value.purchaseValue,
                    totalValue: total

                })
                localStorage.setItem("stockData", JSON.stringify(cparray));
            }

        }
        catch (error) {
            alert("Invalid format of data/ check that the dates are not the weekends? ");//Sending error if no data is available
        }

        this.setState({
            stockArray: JSON.parse(localStorage.getItem("stockData")),
            portfolioValue: this.calculateTotalValue() //Calculating total portfoliovalue on the fly
        })


    }

    //Function handles the deletion of each stocks seperately
    handleDelete = (index) => {
        
        let list = JSON.parse(localStorage.getItem("stockData"));
        list.splice(index, 1); //Deleting the stock by it's index
        this.setState({
            stockArray: list,
        })

        this.setState((state) => ({
            portfolioValue: this.calculateTotalValue() //Overriding the setstate method to recalculate total portfoliovalue after deletion of a stock
        }));
        localStorage.setItem("stockData", JSON.stringify(list));
    }

    //Function fetches data from the server
    async fetchingData() {
        const apiKey = "Tpk_3f5f6e08c5864242aa0503c8d2ef115a";//API key
        const url = "https://sandbox.iexapis.com/stable/stock/"; //Default sandbox url to fetch data
        const dateFormat = this.state.datePurchase.split("-").join(""); //formatting the date to use in fetching
        const stockName = this.state.stockName; //Getting the current stockname to fetch data
        const currentValueUrl = url + stockName + "/quote/latestPrice?token=" + apiKey; //Custom url to fetch the latest stock price
        const purchaseValueUrl = url + stockName + "/chart/date/" + dateFormat + "?chartByDay=true&token=" + apiKey;//Custom url to fetch from the inputted date

        //Getting the current Value from the URL

        const response_currentValue = await fetch(currentValueUrl);
        const currentValue = await response_currentValue.json();

        //Getting the purchase Value from the URL
        const response_purchaseValue = await fetch(purchaseValueUrl);
        const purchaseValue = await response_purchaseValue.json();
        
        //Returns the data when promise is resolved
        return await {
            currentValue: currentValue,
            purchaseValue: purchaseValue[0].uHigh,
        };


    }
   
    //Toggle when user clicks the perf graph button
    handleShowGraph = (event) => {
        event.preventDefault();
        this.setState({
            showGraph: !this.state.showGraph
        })
    }
    //Component mounted from the local storage
    componentWillMount() {
        let data = JSON.parse(localStorage.getItem("stockData"));

        if (data !== null) {

            this.setState({
                stockArray: data,
            })
        }
    }

    render() {
        const { stockArray, stockName, quantity, datePurchase, currencyOption, currencySign, showGraph } = this.state;
        const isEnabled = (stockName.length && quantity.length && datePurchase.length) > 0; //Disbaling the add button when input field is empty

        let view = (<div className="container">
        <div className="Header">
            <span>{this.props.name}</span>
            <Currency currencyOption={currencyOption} changeData={this.handleCurrencyChange} ></Currency>
            <div>
                <ReactSVG id="cancel" src={Cancel} onClick={this.props.delete} /> 

            </div>
        </div>

        <div className="tableWrapper">
            <table id="customers">
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Purchase Value</th>
                        <th>Quantity</th>
                        <th>Current Value</th>
                        <th>Total Value</th>
                        <th>Purchased Date</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <div>
                    {stockArray.map((post, index) => {
                        if (post !== null && post.portfolioID === this.props.id) {
                            return (
                                <Stock                  //Sending props to the stock component
                                    key={post.ids}
                                    stockName={post.stockName}
                                    currentValue={post.currentValue}
                                    purchaseValue={post.purchaseValue}
                                    quantity={post.quantity}
                                    totalValue={post.totalValue}
                                    purchaseDate={post.datePurchase}
                                    delete={this.handleDelete.bind(this, index)}
                                    currencySign={currencySign}
                                ></Stock>

                            )
                        }
                    })}
                </div>
            </table>
        </div>

        <form ref="stock">
            <div className="tableWrapper" style={{ overflow: "hidden" }}>

                <input type="text" name="stockName" onChange={this.handleFormChange} placeholder="Symbol" id="name"></input>
                <input type="date" name="datePurchase" onChange={this.handleFormChange} placeholder="Unit Value"></input>
                <input type="number" name="quantity" onChange={this.handleFormChange} placeholder="Quantity"></input>

            </div>
            <div className="Header" style={{ width: "fit-content" }}>
                <span>Total value of {this.props.name} :<span id="amount"></span> {this.state.portfolioValue}</span><span>{currencySign}</span>
            </div>
            <div className="Header">
                <button onClick={this.handleAdd} disabled={!isEnabled} className="button buttonAdd" type="submit">Add Stock</button>
                <button onClick={this.handleShowGraph} className="button buttonAdd" type="submit">Perf graph</button>
            </div>
        </form>
    </div>);
     //Creating a graph variable to toggle when to show the graph component
        let graph = (<div>
            <Graph
               
                portfolioName={this.props.name}
                portfolioId={this.props.id}
                stockArray={stockArray}
                onClose={this.handleShowGraph}
            />
        </div>)  ;
        
        if (showGraph) { //Checking if user presses the show graph button
            return (
                <Fragment>
                    {view}
                    {graph}
                </Fragment>
            );
        } else { //By default showing only the index view 
            return view;
        }   
    }
}

export default index;