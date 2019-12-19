import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './chart.css';

class index extends Component {

  //Function to filter the graphdata and format it in Recharts format
  filterGraphData() {
    const datas = this.props.dataToSend; //Receiving the fetched value from graph component
    const stockNames = this.props.stockNames; //Receiving all the stocknames from graph component

    let custom_array = []
    if (custom_array !== null) {
      custom_array = []; //Making sure that this array is always empty
    }

    for (var i = 0; i < stockNames.length; i++) {
      let upperCase = stockNames[i].toUpperCase();   // Changing received stocknames from lowercase to uppercase, because the sends data in Uppercase format
   
      let formatData = {  //This array consists of formatted data needed to draw recharts
        name: upperCase, //Inserting name 
        color: this.get_random_color(), //Inserting random unique color to the stock
        data: datas[upperCase].chart //Formating the data and assigning to this element
      }

      custom_array.push(formatData); //Pushing the formatted data to custom array
    }
    return custom_array; //Returns custom_array
  }

  //Function to generate random color
  get_random_color() {
    function c() {
      var hex = Math.floor(Math.random() * 256).toString(16);
      return ("0" + String(hex)).substr(-2); // pad with zero
    }
    return "#" + c() + c() + c();
  }


  render() {
    const filteredArray = this.filterGraphData() //Filtering data on render

    return (
      <ResponsiveContainer width="80%" height={400}> 
        <LineChart                                               //Linechart from recharts
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>

          <XAxis dataKey="label" tick={false} allowDuplicatedCategory={false} />
          <YAxis dataKey="uClose" />
          <Tooltip />
          <Legend />

          {filteredArray.map(item => (                //Using linecharts, LinechartHasMultiSeries to draw multiple lines
            <Line type="monotone" dataKey="uClose" data={item.data} name={item.name} key={item.name} stroke={item.color} />
          ))}
        </LineChart>
      </ResponsiveContainer>

    );
  }
}

export default index;