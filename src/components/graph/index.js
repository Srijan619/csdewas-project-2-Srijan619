import React, { Component } from 'react';
import './graph.css';
import Cancel from '../../assets/cancel.svg';
import ReactSVG from 'react-svg';
import Chart from '../../components/Chart';
import StockName from '../../components/StockName';

class Index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            timeSelected: "5d",
            fetchedValue: [],
           
        };

        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.graphDraw = this.graphDraw.bind(this);
    }


    calculateDays() {
        let startDate = this.state.startingDate;

        let endDate = this.state.endingDate;
        var Difference_In_Days;
        if (startDate && endDate !== null) {
            var Difference_In_Time = new Date(endDate).getTime() - new Date(startDate).getTime();
            Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        }
        if (Difference_In_Days <= 0) {
            alert("Wrong formatted date")
        } else {
            return Difference_In_Days;
        }
    }

    graphDraw = async (event) => {
        var fetchedValue = await this.fetchingData();
        
        const stockSymbol=this.filterStockNames();
        console.log(typeof(fetchedValue.NOK.chart))
        console.log(fetchedValue)   

        let graphData=[];
      
        /** 
        for(var symbol in fetchedValue){
            for(var chart in symbol){
                console.log(chart)
                for(var item in chart){
                    console.log(item);
                    graphData.push({
                        date:item["label"],
                        stockName:item["uClose"],
        
                    })
                }
              
            }
         
        }*/
        const data= await Object.keys(fetchedValue).map(key => (
            Object.keys(key["chart"]).map((chart, i) =>{
               console.log(chart);
            })
         ));
     
        
        this.setState({
            fetchedValue: fetchedValue
        })

    }
    
    async fetchingData() {
        const test_apiKey = "Tpk_3f5f6e08c5864242aa0503c8d2ef115a";
        const test_url = "https://sandbox.iexapis.com/stable/stock/market/batch?symbols=";
        const range = this.state.timeSelected;
        const stockNames = this.filterStockNames().toString();
        const fetchDataUrl = test_url + stockNames + "&types=chart&filter=uClose,date,label&range=" + range + "&last=5&token=" + test_apiKey;


        //Getting the current Value from the URL

        const response_currentValue = await fetch(fetchDataUrl);
        const fetchedValue = await response_currentValue.json();


        return await
            fetchedValue

    }
    filterStockNames(){
        let stockNames = [];
        const filterData = this.props.stockArray.map(post => {
            if (post.portfolioID == this.props.portfolioId) {
                stockNames.push(post.stockName);
            }
        })

        let unique_stockname = [...new Set(stockNames)]

       return unique_stockname;
    }
    handleTimeChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    componentWillMount() {

        this.graphDraw();
    }

    render() {
        var stockArray = this.props.stockArray //Getting all the stock array
        const portfolioId = this.props.portfolioId //Getting portfolioID to filter data
        
      
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
                        <div className="stockCollection">

                            {this.filterStockNames().map((post) => {
                                return (
                                    <StockName
                                        stockName={post}
                                    ></StockName>
                                )
                            })
                            }</div>

                        <Chart
                            dataToSend={fetchedValue}
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
                        <button /*disabled={!isEnabled}*/ className="buttonAdd" onClick={this.graphDraw}>Draw</button>
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