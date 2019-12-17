import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import './chart.css';

//<Line type="monotone" dataKey="uClose"  name="NOK" stroke="#8884d8" />

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


    const datas = Object.assign([], this.props.dataToSend);

    return (

      <ResponsiveContainer width="80%" height={400}>


        <LineChart
          data={datas}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>

          <XAxis dataKey="label" tick={false} />
          <YAxis />
          <Tooltip />
          <Legend />

          {
            datas.map(data => {
              <Line type="linear" dataKey={data["chart"]["uClose"]} name={data} stroke="#8884d8" />
            })
          }

        </LineChart>

      </ResponsiveContainer>

    );
  }
}

export default index;