import React, { Component } from 'react'

export default class index extends Component {
   
    render() {
        return (
            <div>
                <select value={this.props.currencyOption} onChange={this.props.changeData}>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                </select>
            </div>
        )
    }
}
