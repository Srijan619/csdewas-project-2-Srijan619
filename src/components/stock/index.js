import React, { Component } from 'react'
import ReactSVG from 'react-svg'
import Cancel from '../../assets/cancel.svg';
import './stock.css';

export default class index extends Component {
    render() {
        return (
            <div>
                <tbody>
                    <tr key={this.props.key}>
                        <td id="name">{this.props.stockName} </td>
                        <td>{this.props.purchaseValue}{this.props.currencySign}</td>
                        <td>{this.props.quantity}</td>
                        <td>{this.props.currentValue}{this.props.currencySign}</td>
                        <td>{this.props.totalValue}{this.props.currencySign}</td>
                        <td>{this.props.purchaseDate}</td>
                        <td>  <div>
                        <ReactSVG id="cancel" src={Cancel} onClick={this.props.delete} />

                    </div></td>
                    </tr>
                </tbody>
            </div>
        )
    }
}
