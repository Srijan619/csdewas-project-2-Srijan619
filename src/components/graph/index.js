import React, { Component } from 'react';
import './graph.css';
import Cancel from '../../assets/cancel.svg';
import ReactSVG from 'react-svg';
import Chart from '../../components/Chart';


class Index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            timeSelected: "5d",
            fetchedValue: [],
            stockNames:[],

        };
        this.state.stockNames = this.filterStockNames();
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.graphDraw = this.graphDraw.bind(this);
    }


    graphDraw = async (event) => {
        var fetchedValue = await this.fetchingData();
        this.setState({
            fetchedValue: fetchedValue
        })

    }

    async fetchingData() {
      
        const test_apiKey = "Tpk_3f5f6e08c5864242aa0503c8d2ef115a";
        const test_url = "https://sandbox.iexapis.com/stable/stock/market/batch?symbols=";
        const range = this.state.timeSelected;
        const stockNames = this.state.stockNames;
        console.log(stockNames)
        if (stockNames !== "" ||stockNames.length!==0) {
            const fetchDataUrl = test_url + stockNames.toString() + "&types=chart&filter=uClose,date,label&range=" + range + "&last=5&token=" + test_apiKey;
           //Getting the current Value from the URL
            const response_currentValue = await fetch(fetchDataUrl);
            const fetchedValue = await response_currentValue.json();
            return await
                fetchedValue
        }
        else{
            this.state.stockNames = this.filterStockNames();
        }
     

    }
    filterStockNames() {
        let stockNames = [];
        const stockArray = this.props.stockArray //Getting all the stock array
       
        const portfolioId = this.props.portfolioId //Getting portfolioID to filter data
        const filterData = stockArray.map(post => {
            if (post!==null && post.portfolioID === portfolioId) {
                stockNames.push(post.stockName);
            }
        })

        let unique_stockname = [...new Set(stockNames)]

        return unique_stockname;
      
    }
    handleTimeChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    componentDidMount() {
    
        this.graphDraw();
    }

    render() {
        const { fetchedValue } = this.state;

        let dialog = (
            <div className="mainContainer">
                <div className="graphContainer">
                    <div className="portfolioName">
                        <span>{this.props.portfolioName} performance chart</span>
                        <ReactSVG id="cancel" src={Cancel} onClick={this.props.onClose} />
                    </div>

                    <br></br>
                    <div className="graphCollection">
                        
                        <Chart
                            dataToSend={fetchedValue}
                            stockNames={this.state.stockNames}
                        ></Chart>

                    </div>
                    <div className="timeCollection">
                        <div>
                            <span>Time Interval </span>
                            <select name="timeSelected" onChange={this.handleTimeChange}>
                                <option value="5d">5 days</option>
                                <option value="1m">1 month</option>
                                <option value="3m">3 month</option>
                                <option value="6m">6 month</option>
                                <option value="1y">1 year</option>
                                <option value="2y">2 year</option>
                                <option value="5y">5 year</option>
                            </select>
                        </div>
                        <button className="buttonAdd" onClick={this.graphDraw}>Draw</button>
                    </div>
                </div>

            </div>
        );

        if (!this.props.show) {
            dialog = null;
        }
        return (
            <div>
                {dialog}
            </div>
        );
    }
}

export default Index;