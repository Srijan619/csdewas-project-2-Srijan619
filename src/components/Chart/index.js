import React, { Component } from 'react';
import { LineChart, Line,XAxis,YAxis,Tooltip,Legend } from 'recharts';
import './chart.css';

const data = [
    {
      "uv": 4000,
      "pv": 2400,
      "amt": 2400
    },
    {
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    },
    {
      "uv": 2780,
      "pv": 3908,
      "amt": 2000
    },
    {
      "uv": 1890,
      "pv": 4800,
      "amt": 2181
    },
    {
      "uv": 2390,
      "pv": 3800,
      "amt": 2500
    },
    {
      "uv": 3490,
      "pv": 4300,
      "amt": 2100
    }
  ]

class index extends Component {
    render() {
        return (
            <div className="graphBox">
            <LineChart width={730} height={400} data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
        </div>
        );
    }
}

export default index;