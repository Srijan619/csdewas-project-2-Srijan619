import React, { Component } from 'react'
import './stock.css';

export default class index extends Component {
    render() {
        return (
            <div>
                <tbody>
                    <tr>
                        <td id="name">{this.props.stockName} </td>
                        <td>"Purchased"</td>
                        <td>{this.props.quantity}</td>
                        <td>"Current"</td>
                        <td>{this.props.totalValue}</td>
                        <td>{this.props.purchaseDate}</td>
                        <td><input type="checkbox" name="checkbox" onChange={this.props.handleChecked}  ></input></td>
                    </tr>
                </tbody>
            </div>
        )
    }
}
