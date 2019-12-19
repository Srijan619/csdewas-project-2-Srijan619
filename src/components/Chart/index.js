import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './chart.css';

class index extends Component {

  filterGraphData() {
    const datas = this.props.dataToSend;
    const stockNames = this.props.stockNames;

    let custom_array = []
    if (custom_array !== null) {
      custom_array = [];
    }

    for (var i = 0; i < stockNames.length; i++) {
      let upperCase = stockNames[i].toUpperCase();
 
      let formatData = {
        name: upperCase,
        color: this.get_random_color(),
        data: datas[upperCase].chart
      }

      custom_array.push(formatData);
    }
    return custom_array;
  }
  get_random_color() {
    function c() {
      var hex = Math.floor(Math.random() * 256).toString(16);
      return ("0" + String(hex)).substr(-2); // pad with zero
    }
    return "#" + c() + c() + c();
  }


  render() {
    const filteredArray = this.filterGraphData()

    return (
      <ResponsiveContainer width="80%" height={400}>
        <LineChart
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>

          <XAxis dataKey="label" tick={false} allowDuplicatedCategory={false} />
          <YAxis dataKey="uClose" />
          <Tooltip />
          <Legend />

          {filteredArray.map(item => (
            <Line type="monotone" dataKey="uClose" data={item.data} name={item.name} key={item.name} stroke={item.color} />
          ))}
        </LineChart>
      </ResponsiveContainer>

    );
  }
}

export default index;