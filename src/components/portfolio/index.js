import React, { Component } from 'react';
import './portfolio.css';

class index extends Component {
    render() {
        return (
            <div className="container">
              <div className="Header">
                  <h6>Portfolio 1</h6>
                  <select id="currency" name="currency">
                      <option  value="EUR">EUR</option>
                      <option  value="USD">USD</option>
                  </select>
              </div> 
            </div>
        );
    }
}

export default index;