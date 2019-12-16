import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './chart.css';

const data = [
  {
    "NOK": 27.49,
    "name": "Dec 12"
  },
  {
    "NOK": 28.49,
    "name": "Dec 13"
  },
  {
    "NOK": 29.49,
    "name": "Dec 14"
  },
  {
    "NOK": 25.49,
    "name": "Dec 15"
  },
  {
    "NOK": 4.49,
    "name": "Dec 16"
  },
  {
    "NOK": 17.49,
    "name": "Dec 17"
  },
  {
    "NOK": 18.49,
    "name": "Dec 18"
  }
]

class index extends Component {
  render() {
   
    return (
  
      <ResponsiveContainer width="80%" height={400}>
        <LineChart data={this.props.fetchedValue.NOK}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>

          <XAxis dataKey={this.props.label} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={this.props.uClose} stroke="#8884d8" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

    );
  }
}

export default index;