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
            isChecked: false,
            stockArray: []

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


    handleFormChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    handleAdd = (event) => {
        event.preventDefault();
        this.stockID = this.stockID + 1;
        const cparray = Object.assign([], this.state.stockArray);

        cparray.push({
            ids: this.stockID,
            isChecked: this.state.select,
            stockName: this.state.stockName,
            unitValue: this.state.unitValue,
            quantity: this.state.quantity,
        })
        this.setState({
            stockArray: cparray
        })
    }

    handleChecked () {
        this.setState({
            id:this.state.id,
            isChecked: !this.state.isChecked,
           });
       
      }
    handleRemove = (index) => {
        event.preventDefault();
        const cparray = Object.assign([], this.state.stockArray);
        for(var i=0;i<cparray.length;i++)
        {
          if(cparray[i].isChecked===true)
          {
            cparray.splice(index, 1);
            this.setState({
                stockArray: cparray
            })
          }  
        }
       

    }

    render() {
        const { stockArray, stockName, quantity, unitValue } = this.state;
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
                                 return(
                            <tbody>
                                <tr key={post.id}>
                                    <td id="name">{post.stockName}</td>
                                    <td>{post.unitValue}</td>
                                    <td>{post.quantity}</td>
                                    <td>{this.props.totalValue}</td>
                                    <td><input type="checkbox" name="checkbox" onChange={this.handleChecked} checked={this.state.isChecked} ></input></td>
                                </tr>
                            </tbody>
                                 )
                            })}
                              
                        </table>
                    </div>
                </div>
                <form ref="stock">
                    <div className="tableWrapper">

                        <input type="text" name="stockName" onChange={this.handleFormChange} placeholder="Name" id="name"></input>
                        <input type="number" name="unitValue" onChange={this.handleFormChange} placeholder="Unit Value"></input>
                        <input type="number" name="quantity" onChange={this.handleFormChange} placeholder="Quantity"></input>

                    </div>
                    <div className="Header">
                        <span>Total value of Portfolio 1:<span id="amount"></span> 968.20 $</span>
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