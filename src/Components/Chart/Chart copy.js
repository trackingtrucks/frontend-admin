import React, { Component } from 'react';
import axios from 'axios';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export class Chart extends Component {
    state = {
        coolant: {
            "promedio": 0,
            "chart": [],
            "datos": {}
        }
    }
    getData = async () =>{
        const {data} = await axios.get('http://localhost:5000/data/sample')
        console.log(data.coolant);
        this.setState({coolant: data.coolant})
    }
    componentDidMount = () => {
           this.getData();
    }
    render() {
        console.log(this.state);
        const options = {
            theme: "light2", // "light1", "dark1", "dark2"
            animationEnabled: true,
            zoomEnabled: true,
            title: {
                text: "Try Zooming and Panning"
            },
            data: [{
				type: "line",
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "$#,##0.00",
				dataPoints: this.state.coolant.chart
			}]
        }
        return this.state.coolant.chart !== null ?
            (
                <div>
                    <CanvasJSChart options={options}
                    /* onRef={ref => this.chart = ref} */
                    />
                    {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
                </div>
            ) : (
                <div>
                    cargando
                </div>
            )
    }
}

export default Chart
