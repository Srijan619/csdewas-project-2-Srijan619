import React, { Component } from 'react';
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
        this.stockID = 0;

        this.initialState = {
            portfolioID: '',
            ids: '',
            stockName: '',
            datePurchase: '',
            purchaseValue: '',
            currentValue: '',
            quantity: '',
            totalValue: '',
            portfolioValue:'',
            stockArray: [],
            currencyOption: 'EUR',
            currencySign: '€',
            showGraph: false,

        };
       
        this.state = this.initialState
        this.state.portfolioValue = this.calculateTotalValue();

        this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
        this.hanleAdd = this.handleAdd.bind(this);
        this.hanleShowGraph = this.handleShowGraph.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);

    }

    handleCurrencyChange(event) {
        this.setState({ currencyOption: event.target.value });
        this.changeCurrency(event.target.value)
    }
    changeCurrency(curr) {
        const usd_rate = 1.10
        const cparray = Object.assign([], this.state.stockArray); // Getting the stock data to convert
        const apparray = Object.assign([], this.props.usersArray); // Getting the portfolio value total

        let unit = [];
        let portfolioTotal = [];
        switch (curr) {
            case "USD":
                unit.length = 0;
                portfolioTotal.length = 0;
                cparray.map((posts) => {
                    let array = {
                        "purchaseValue": (posts.purchaseValue * usd_rate).toFixed(2),
                        "currentValue": (posts.currentValue * usd_rate).toFixed(2),
                        "totalValue": (posts.totalValue * usd_rate).toFixed(2),
                    }
                    unit.push(array);
                })

                apparray.map(post => {
                    let arr = { "portfolioValue": ((post.portfolioValue * usd_rate).toFixed(2)) }
                    portfolioTotal.push(arr);
                })

                this.setState({ currencySign: "$" });

                break;
            case "EUR":
                unit.length = 0;
                portfolioTotal.length = 0;
                cparray.map((posts) => {

                    let array = {
                        "purchaseValue": (posts.purchaseValue / usd_rate).toFixed(2),
                        "currentValue": (posts.currentValue / usd_rate).toFixed(2),
                        "totalValue": (posts.totalValue / usd_rate).toFixed(2),
                    }
                    unit.push(array);

                }) 
                apparray.map(post => {
                    let arr = { "portfolioValue": ((post.portfolioValue / usd_rate).toFixed(2)) }
                    portfolioTotal.push(arr);
                })
                this.setState({ currencySign: "€" });
                break;
        }
       
        cparray.map((posts, index) => {
            unit.map((data, id) => {
                if (index === id) {

                    posts.purchaseValue = data.purchaseValue,
                        posts.currentValue = data.currentValue,
                        posts.totalValue = data.totalValue

                }
            })

        })

        apparray.map((posts, index) => {
            portfolioTotal.map((data, id) => {
                if (index === id) {
                    posts.portfolioValue = data.portfolioValue
                }
            })

        })
        console.log(apparray);
        this.setState({
            stockArray: cparray,
        })
      
    }
    calculateTotalValue() {
        let cparray = Object.assign([], this.state.stockArray);
        let data = JSON.parse(localStorage.getItem("stockData"));

        cparray=data;
        console.log(cparray);
        if(cparray!==null){
       // let apparray = Object.assign([], this.props.usersArray);


      
        let total = 0;
     //   let data = JSON.parse(localStorage.getItem("portfolio"));
       // apparray = data;

        for (var i = 0; i < cparray.length; i++) {
            if (cparray[i].portfolioID === this.props.id) {
                total += parseFloat(cparray[i].totalValue);
            }
        }

        return total;}
        /*
        apparray.map(posts => {
            if (posts.id === this.props.id) {
                posts.portfolioValue = total.toFixed(2);
            }
        })
       
       this.setState({
           portfolioValue:total.toFixed(2)
       })
        localStorage.setItem("portfolio", JSON.stringify(apparray));*/


    }
    handleFormChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    handleAdd = async (event) => {
        event.preventDefault();

        this.stockID = this.stockID + 1;

        let cparray = Object.assign([], this.state.stockArray);
       
        let data = JSON.parse(localStorage.getItem("stockData"));
        try {
            var value = await this.fetchingData();
            const total = (this.state.quantity * value.currentValue).toFixed(2);

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
                let last_id = parseInt(data[data.length - 1].ids);
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
            alert("Invalid format of data/ check that the dates are not the weekends? ");
        }

        this.setState({
            stockArray: JSON.parse(localStorage.getItem("stockData")),
            portfolioValue:this.calculateTotalValue()
        })
    }

    handleDelete = (index) => {
        event.preventDefault();
        let list = JSON.parse(localStorage.getItem("stockData"));
        list.splice(index, 1);
        this.setState({
            stockArray: list,
        })

        this.setState((state) =>({
            portfolioValue:this.calculateTotalValue()
        }));
        localStorage.setItem("stockData", JSON.stringify(list));
    }

    async fetchingData() {
        const apiKey = "pk_bc5ad08f5b3a4b7ab7f0e1eff882d6de";
        const url = "https://cloud.iexapis.com//stable/stock/";
        const dateFormat = this.state.datePurchase.split("-").join("");
        const stockName = this.state.stockName;
        const currentValueUrl = url + stockName + "/quote/latestPrice?token=" + apiKey;
        const purchaseValueUrl = url + stockName + "/chart/date/" + dateFormat + "?chartByDay=true&token=" + apiKey;

        //Getting the current Value from the URL

        const response_currentValue = await fetch(currentValueUrl);
        const currentValue = await response_currentValue.json();

        //Getting the purchase Value from the URL
        const response_purchaseValue = await fetch(purchaseValueUrl);
        const purchaseValue = await response_purchaseValue.json();

        console.log(currentValue + "and" + purchaseValue[0].uHigh);

        return await {
            currentValue: currentValue,
            purchaseValue: purchaseValue[0].uHigh,
        };


    }

    handleShowGraph = (event) => {
        event.preventDefault();
        this.setState({
            showGraph: true
        })
    }
    componentWillMount() {
        let data = JSON.parse(localStorage.getItem("stockData"));

        if (data !== null) {

            this.setState({
                stockArray: data,

            })
        }
    }

    shou

    render() {
        const { stockArray, stockName, quantity, datePurchase, currencyOption, currencySign, showGraph } = this.state;
        const isEnabled = (stockName.length && quantity.length && datePurchase.length) > 0;
        return (
            <div className="container">
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
                                        <Stock
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
                        <button onClick={"this.handleRemove"} className="button buttonAdd" type="submit">Refresh</button>
                    </div>
                </form>
                <Graph
                    show={showGraph}
                    portfolioName={this.props.name}
                    portfolioId={this.props.id}
                    stockArray={stockArray}
                    onClose={(e) => this.setState({ showGraph: false })}
                >
                </Graph>
            </div>
        );
    }
}

export default index;