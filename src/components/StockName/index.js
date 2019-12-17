import React, { Component } from 'react';
import './stockName.css';
class index extends Component {
    render() {
        
        return (
            <div className="stockCollection">
                <div>
                <span><input type="checkbox" name="data" value="NOK" checked="true"/>{this.props.stockName}</span>
                </div>
            </div>
        );
    }
}

export default index;