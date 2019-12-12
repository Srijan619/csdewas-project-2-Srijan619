import React, { Component } from 'react';
import './graph.css';
import Cancel from '../../assets/cancel.svg';
import ReactSVG from 'react-svg';


class Index extends Component {

    constructor(props) {
        super(props);

        this.initialState = {
        };

        this.state = this.initialState
    }
    render() {
        let dialog = (
            <div className="mainContainer">
                <div className="graphContainer">
                    <div className="portfolioName">
                        <span>Portfolio 1 performance chart</span>
                        <ReactSVG id="cancel" src={Cancel} onClick={this.props.onClose} />
                    </div>

                    <br></br>
                    <div className="graphCollection">
                        <div className="stockCollection">
                            <span><input type="checkbox" name="data" value="NOK" />NOK</span>
                            <span><input type="checkbox" name="data" value="NOK" />THOR</span>
                        </div>
                        <div className="graphBox">

                        </div>
                    </div>
                    <div className="timeCollection">
                        <div>
                            <span>Starting time </span>
                            <input type="date"></input>
                        </div>
                        <div>
                            <span>Ending time </span>
                            <input type="date"></input>
                        </div>
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