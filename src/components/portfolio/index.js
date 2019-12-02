import React, { Component } from 'react';
import ReactSVG from 'react-svg'
import './portfolio.css';
import Cancel from '../../assets/cancel.svg';

class index extends Component {
    render() {
        return (
            <div className="container">
                <div className="Header">
                    <span>Portfolio 1</span>
                    <select id="currency" name="currency">
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                    </select>
                   <div>
                   <ReactSVG id="cancel" src={Cancel} />
                      
                   </div>
                </div>
                <div className="tableWrapper">
                    <table id="customers">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Unit value</th>
                            <th>Quantity</th>
                            <th>Total Value</th>
                            <th>Select</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>NOK</td>
                            <td>4.72 $</td>
                            <td>10</td>
                            <td>47.20 $</td>
                            <td><input type="checkbox"></input></td>
                        </tr>
                        <tr>
                            <td>NOK</td>
                            <td>4.72 $</td>
                            <td>10</td>
                            <td>47.20 $</td>
                            <td><input type="checkbox"></input></td>
                        </tr>
                        <tr>
                            <td>NOK</td>
                            <td>4.72 $</td>
                            <td>10</td>
                            <td>47.20 $</td>
                            <td><input type="checkbox"></input></td>
                        </tr>
                        <tr>
                            <td>NOK</td>
                            <td>4.72 $</td>
                            <td>10</td>
                            <td>47.20 $</td>
                            <td><input type="checkbox"></input></td>
                        </tr>
                        <tr>
                            <td>NOK</td>
                            <td>4.72 $</td>
                            <td>10</td>
                            <td>47.20 $</td>
                            <td><input type="checkbox"></input></td>
                        </tr>
                        <tr>
                            <td>NOK</td>
                            <td>4.72 $</td>
                            <td>10</td>
                            <td>47.20 $</td>
                            <td><input type="checkbox"></input></td>
                        </tr>
                        <tr>
                            <td>NOK</td>
                            <td>4.72 $</td>
                            <td>10</td>
                            <td>47.20 $</td>
                            <td><input type="checkbox"></input></td>
                        </tr>
                        <tr>
                            <td>NOK</td>
                            <td>4.72 $</td>
                            <td>10</td>
                            <td>47.20 $</td>
                            <td><input type="checkbox"></input></td>
                        </tr>
                     </tbody>
                    </table>
                </div>
                <div className="Header">
                    <span>Total value of Portfolio 1:<span id="amount"></span> 968.20 $</span>
                </div>
                <div className="Header">
                    <button>Add Stock</button>
                    <button>Perf graph</button>
                    <button>Remove selected</button>
                </div>
            </div>
        );
    }
}

export default index;