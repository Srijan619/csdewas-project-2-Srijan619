import React, { Component } from 'react';
import ReactSVG from 'react-svg'
import './portfolio.css';
import '../App.css';
import Cancel from '../../assets/cancel.svg';
import Stock from '../../components/stock';
import Currency from '../../components/currency';

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
            portfolioValue: '',
            stockArray: [],
            checkedItems: [],
            currencyOption: 'EUR',
            currencySign: '$',

        };

        this.state = this.initialState

        this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
        this.hanleAdd = this.handleAdd.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);

    }

    handleCurrencyChange(event) {
        this.setState({ currencyOption: event.target.value });
        this.changeCurrency(event.target.value)
    }
    changeCurrency(curr) {
        const usd_rate = 1.10
        const cparray = Object.assign([], this.state.stockArray);


        let unit = [];
        switch (curr) {
            case "USD":
                cparray.map((posts) => {
                    unit = []
                    unit = (posts.unitValue * usd_rate).toFixed(2);
                })
                break;
            case "EUR":
                cparray.map((posts) => {
                    unit = []
                    unit = posts.unitValue;
                })
                break;
        }
        cparray.map((posts) => {
            posts.unitValue = unit
        })
        this.setState({
            stockArray: cparray
        })

        console.log(unit)
    }
    calculateTotalValue() {
        const cparray = Object.assign([], this.state.stockArray);
        let total_value = 0;
        for (var i = 0; i < cparray.length; i++) {

            total_value = total_value + parseFloat(cparray[i].totalValue);
        }
        this.setState({
            portfolioValue: total_value.toFixed(2)
        })
    }
    handleFormChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }
     handleAdd = async (event) => {
        event.preventDefault();

        this.stockID = this.stockID + 1;

        let cparray = Object.assign([], this.state.stockArray);
        let data = JSON.parse(localStorage.getItem("stockData"));
        var value = await this.fetchingData();
        console.log(value.currentValue);

        if (data === null || data.length === 0) {
            cparray.push({
                portfolioID: this.props.id,
                ids: this.stockID,
                stockName: this.state.stockName,
                datePurchase: this.state.datePurchase,
                quantity: this.state.quantity,
                currentValue:value.currentValue,
                purchaseValue:value.purchaseValue

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
                currentValue:value.currentValue,
                purchaseValue:value.purchaseValue

            })
            localStorage.setItem("stockData", JSON.stringify(cparray));
        }

        this.setState({
            stockArray: JSON.parse(localStorage.getItem("stockData")),
        })
    }

    handleDelete = (index) => {
        event.preventDefault();
        let list = JSON.parse(localStorage.getItem("stockData"));
        list.splice(index, 1);
        this.setState({
            stockArray: list
        })
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


        //const cparray = Object.assign([], this.state.stockArray);
        // let data=JSON.parse(localStorage.getItem("stockData"));
        const total = (this.state.quantity * currentValue).toFixed(2);
        console.log(this.state.quantity + " and " + total);
        console.log(currentValue + "and" + purchaseValue[0].uHigh);

        return await {
            currentValue: currentValue,
            purchaseValue: purchaseValue[0].uHigh,
        };
        /* 
        cparray.map((posts) => {
            
            if (posts.portfolioID === this.props.id && posts.ids=== id) {
                console.log(id+ "and "+posts.ids);
                console.log("Hello"+posts.portfolioID+" "+currentValue+" "+ purchaseValue[0].uHigh);
                posts.currentValue = currentValue;
                posts.purchaseValue = purchaseValue[0].uHigh;
                posts.totalValue = total;
            }
        })
        localStorage.setItem("stockData",JSON.stringify(cparray));
        this.setState({
            stockArray: data
        })
        this.calculateTotalValue();*/

    }
    componentWillMount() {
        let data = JSON.parse(localStorage.getItem("stockData"));

        if (data !== null) {

            this.setState({
                stockArray: data
            })
        }

    }


    render() {
        const { stockArray, stockName, quantity, datePurchase, portfolioValue, currencyOption, currencySign } = this.state;
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
                        <span>Total value of Portfolio 1:<span id="amount"></span> {portfolioValue}</span><span>{currencySign}</span>
                    </div>
                    <div className="Header">
                        <button onClick={this.handleAdd} disabled={!isEnabled} className="button buttonAdd" type="submit">Add Stock</button>
                        <button onClick={""} className="button buttonAdd" type="submit">Perf graph</button>
                        <button onClick={"this.handleRemove"} className="button buttonAdd" type="submit">Refresh</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default index;