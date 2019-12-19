import React, { Component, Fragment } from 'react';
import './graph.css';
import Cancel from '../../assets/cancel.svg';
import ReactSVG from 'react-svg';
import Chart from '../../components/Chart';


class Index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            timeSelected: "5d",    //By defaulting 5 days set
            fetchedValue: [],
            stockNames: [],

        };
        this.state.stockNames = this.filterStockNames(); //Filtering the stocknames on the fly when this component is called
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.graphDraw = this.graphDraw.bind(this);
    }

   //Handles the graph drawing feature
    graphDraw = async (event) => {
        try {
            var fetchedValue = await this.fetchingData(); //Waiting for fetching data to send the data
        }
        catch (error) {
            console.log(error);  //Catching error
        }

        this.setState({
            fetchedValue: fetchedValue
        })

    }
   
    //Function to fetch the data
    async fetchingData() {

        const test_apiKey = "Tpk_3f5f6e08c5864242aa0503c8d2ef115a"; //API key
        const test_url = "https://sandbox.iexapis.com/stable/stock/market/batch?symbols="; //Default url
        const range = this.state.timeSelected; //Selecting the selected time range
        const stockNames = this.state.stockNames; //Filter stocknames collection

        if (stockNames !== "" || stockNames.length !== 0) { //Checking if stocknames is not empty
            const fetchDataUrl = test_url + stockNames.toString() + "&types=chart&filter=uClose,date,label&range=" + range + "&last=5&token=" + test_apiKey;
            //Getting the current Value from the URL
            const response_currentValue = await fetch(fetchDataUrl);
            const fetchedValue = await response_currentValue.json();
            return await
                fetchedValue
        }



    }

    //Function filters the stockname from the clicked component and removes the duplicate stocknames
    filterStockNames() {
        let stockNames = [];//Initializing empty array
        const stockArray = this.props.stockArray //Getting all the stock array

        const portfolioId = this.props.portfolioId //Getting portfolioID to filter data
        const filterData = stockArray.map(post => {
            if (post !== null && post.portfolioID === portfolioId) {
                stockNames.push(post.stockName); //This filters only stocknames from whole stock array
            }
        })

        let unique_stockname = [...new Set(stockNames)] //It filters and removes duplicated stocknames

        return unique_stockname;

    }
    //Handles the time range selection drop down menu
    handleTimeChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    
    componentDidMount() {
        this.graphDraw() //Draws the graph when component is mounted
    }
    render() {
        const { fetchedValue } = this.state;
        let chartDialog;
        if (fetchedValue.length !== 0) { //Showing the chart only when there is some fetched values
            chartDialog = (
                <Fragment>
                    <Chart        //Calling chart component
                        dataToSend={fetchedValue}
                        stockNames={this.state.stockNames}
                    ></Chart>
                </Fragment>)
        } 

        let dialog = ( //Default container which contains chart , time range and draw button
            <div className="mainContainer">
                <div className="graphContainer">
                    <div className="portfolioName">
                        <span>{this.props.portfolioName} performance chart</span>
                        <ReactSVG id="cancel" src={Cancel} onClick={this.props.onClose} />
                    </div>

                    <br></br>
                    <div className="graphCollection">
                        {chartDialog}

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

        return (
            <div>
                {dialog} 
            </div>
        );
    }
}

export default Index;