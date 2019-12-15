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
            startingDate:"",
            endingDate:"",
        };

        this.handleChange=this.handleChange.bind(this);
        this.calculateDays=this.calculateDays.bind(this);
    }

    handleChange(evt){
        this.setState({ [evt.target.name]: evt.target.value });
      
    }
    calculateDays(){
        let startDate=this.state.startingDate;
       
        let endDate=this.state.endingDate;
        var Difference_In_Days;
        if(startDate && endDate!==null){
            var Difference_In_Time = new Date(endDate).getTime()- new Date(startDate).getTime() ; 
            Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
        }
        if(Difference_In_Days<=0){
            alert("Wrong formatted date")
        }else{
        return Difference_In_Days;}
    }
    render() {
        var stockArray = this.props.stockArray //Getting all the stock array

        const portfolioId = this.props.portfolioId //Getting portfolioID to filter data
      
      //Getting distinct names not done yet
        /*        const distinctNames = [];
        const map = new Map();
        for (const item of stockArray) {
            if (!map.has(item.stockName)) {
                map.set(item.stockName, true);    // set any value to Map
                distinctNames.push({
                    id: item.portfolioID,
                    name: item.stockName
                });
            }
        } */
        const { startingDate,endingDate} = this.state;
        const isEnabled = (startingDate.length && endingDate.length ) > 0;
     
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
                           
                            {stockArray.map((post, index) => {
                                //const distinctNames=[...new Set(stockArray.map((x,y) => {(x.stockName,y.portfolioID)}))];
                                //const distinctID=[...new Set(stockArray.map(x => x.portfolioID))];

                                 
                                if (post !== null && post.portfolioID === portfolioId) {
                                        return (
                                            <StockName
                                                key={post.ids}
                                                stockName={post.stockName}
                                            ></StockName>

                                        )
                                }
                            })}</div>

                        <Chart></Chart>
                    </div>
                    <div className="timeCollection">
                        <div>
                            <span>Starting time </span>
                            <input type="date" name="startingDate" value={this.value} onChange={this.handleChange}></input>
                        </div>
                        <div>
                            <span>Ending time </span>
                            <input type="date" name="endingDate"  value={this.value} onChange={this.handleChange}></input>
                        </div>
                        <button disabled={!isEnabled}  className="buttonAdd" onClick= {this.calculateDays}>Caclulate</button>
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