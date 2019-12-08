import React, { Component } from 'react';
import ReactSVG from 'react-svg'
import './portfolio.css';
import '../App.css';
import Cancel from '../../assets/cancel.svg';

class index extends Component {
    constructor(props) {
        super(props);
        this.stockID = 0;

        this.state = {
            ids: '',
            stockName: '',
            unitValue: '',
            quantity: '',
            totalValue: '',
            portfolioValue: '',
            checkbox: false,
            stockArray: [],
            checkedItems: []

        };


        this.handleChecked = this.handleChecked.bind(this);
        this.handleFormReset = this.handleFormReset.bind(this);
        this.hanleAdd = this.handleAdd.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this, this.state.index);

    }
    handleFormReset = () => {
        this.setState(({
            stockName: "",
            unitValue: "",
            quantity: "",
            totalValue: "",
        }))
    }

    calculateTotalValue(total_value) {
        const cparray = Object.assign([], this.state.stockArray);

        for (var i = 0; i < cparray.length; i++) {

            total_value = total_value + parseFloat(cparray[i].totalValue);
        }
        console.log(total_value)
        this.setState({
            portfolioValue: total_value
        })
    }
    handleFormChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    handleAdd = (event) => {
        event.preventDefault();
        this.stockID = this.stockID + 1;
        const cparray = Object.assign([], this.state.stockArray);
        const total = this.state.quantity * this.state.unitValue;
        this.calculateTotalValue(total);
        cparray.push({
            ids: this.stockID,
            checkbox: this.state.checkbox,
            stockName: this.state.stockName,
            unitValue: this.state.unitValue,
            quantity: this.state.quantity,
            totalValue: total,
            portfolioValue: this.state.portfolioValue
        })

        this.setState({
            stockArray: cparray
        })


    }

    handleChecked(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        const cparray = Object.assign([], this.state.stockArray);
        for(var i=0;i<cparray.length;i++)
        {
        cparray[i].checkbox=value
        this.setState({
           
        })
    }
    }
    handleRemove = (index) => {
        event.preventDefault();
        /*
        const cparray = Object.assign([], this.state.stockArray);
        const selectedData=[];
        for(var i=0;i<cparray.length;i++)
        {
          if(cparray[i].checkbox===true)
          {
            console.log("Selected"+cparray[i].stockName);
            selectedData.push(cparray[i])
          
          }  
        }
        this.setState({
            selectedData:[],
            stockArray: selectedData
        })

        */
        for (var i = 0; i < this.state.checkedItems.length; i++) {
            // Convert id from string back to integer.
            let index = parseInt(this.state.checkedItems[i])
            // Replace the item to delete with empty string, so that every
            // other element remains in place.
            this.state.checkbox[index] = '';
        }
        // Re-render the component by calling setState.
        this.setState({
            checkedItems: [],
            checkbox: this.state.checkbox
        });

    }


    render() {
        const { stockArray, stockName, quantity, unitValue, portfolioValue } = this.state;
        const isEnabled = (stockName.length && quantity.length && unitValue.length) > 0;
        return (
            <div className="container">
                <div className="Header">
                    <span>{this.props.name}</span>
                    <select id="currency" name="currency">
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                    </select>
                    <div>
                        <ReactSVG id="cancel" src={Cancel} onClick={this.props.delete} />

                    </div>
                </div>
                <div>
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
                            {stockArray.map((post, index) => {
                                return (


                                    <tbody key={post.ids}>
                                        <tr>
                                            <td style={{textTransform:"uppercase"}}>{post.stockName} </td>
                                            <td>{post.unitValue}</td>
                                            <td>{post.quantity}</td>
                                            <td>{post.totalValue}</td>
                                            <td><input type="checkbox" name="checkbox" onChange={this.handleChecked}  ></input></td>
                                        </tr>
                                    </tbody>
                                )
                            })}

                        </table>
                    </div>
                </div>
                <form ref="stock">
                    <div className="tableWrapper" style={{ overflow: "hidden" }}>

                        <input type="text" name="stockName" onChange={this.handleFormChange} placeholder="Name" id="name"></input>
                        <input type="number" name="unitValue" onChange={this.handleFormChange} placeholder="Unit Value"></input>
                        <input type="number" name="quantity" onChange={this.handleFormChange} placeholder="Quantity"></input>

                    </div>
                    <div className="Header">
                        <span>Total value of Portfolio 1:<span id="amount"></span> {portfolioValue}</span>
                    </div>
                    <div className="Header">
                        <button onClick={this.handleAdd} disabled={!isEnabled} className="button buttonAdd" type="submit">Add Stock</button>
                        <button onClick={""} className="button buttonAdd" type="submit">Perf graph</button>
                        <button onClick={this.handleRemove} className="button buttonAdd" type="submit">Remove selected</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default index;