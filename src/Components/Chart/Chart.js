import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dataPoints = [];

class Chart extends Component {
    async componentDidMount() {
        var chart = this.chart;
        await fetch('https://tracking-trucks.herokuapp.com/data/sample')
            .then(function (response) {
                return response.json();
            }).catch(() => {
                console.error("fail!");
                const chartApi = [
                    {
                        "x": 1626706523000,
                        "y": 0
                    },
                    {
                        "x": 1626706530000,
                        "y": 25
                    },
                    {
                        "x": 1626706537000,
                        "y": 61
                    },
                    {
                        "x": 1626706544000,
                        "y": 61
                    },
                    {
                        "x": 1626706551000,
                        "y": 62
                    },
                    {
                        "x": 1626706558000,
                        "y": 62
                    },
                    {
                        "x": 1626706565000,
                        "y": 63
                    },
                    {
                        "x": 1626706571000,
                        "y": 64
                    },
                    {
                        "x": 1626706579000,
                        "y": 64
                    },
                    {
                        "x": 1626706586000,
                        "y": 64
                    },
                    {
                        "x": 1626706592000,
                        "y": 65
                    },
                    {
                        "x": 1626706599000,
                        "y": 0
                    },
                    {
                        "x": 1626706600000,
                        "y": 66
                    },
                    {
                        "x": 1626706606000,
                        "y": 0
                    },
                    {
                        "x": 1626706607000,
                        "y": 66
                    },
                    {
                        "x": 1626706613000,
                        "y": 66
                    },
                    {
                        "x": 1626706620000,
                        "y": 68
                    },
                    {
                        "x": 1626706627000,
                        "y": 69
                    },
                    {
                        "x": 1626706633000,
                        "y": 69
                    },
                    {
                        "x": 1626706640000,
                        "y": 69
                    },
                    {
                        "x": 1626706647000,
                        "y": 70
                    },
                    {
                        "x": 1626706653000,
                        "y": 0
                    },
                    {
                        "x": 1626706654000,
                        "y": 70
                    },
                    {
                        "x": 1626706660000,
                        "y": 71
                    },
                    {
                        "x": 1626706668000,
                        "y": 71
                    },
                    {
                        "x": 1626706674000,
                        "y": 72
                    },
                    {
                        "x": 1626706681000,
                        "y": 72
                    },
                    {
                        "x": 1626706688000,
                        "y": 72
                    },
                    {
                        "x": 1626706695000,
                        "y": 73
                    },
                    {
                        "x": 1626706702000,
                        "y": 73
                    },
                    {
                        "x": 1626706709000,
                        "y": 74
                    },
                    {
                        "x": 1626706716000,
                        "y": 75
                    },
                    {
                        "x": 1626706723000,
                        "y": 75
                    },
                    {
                        "x": 1626706730000,
                        "y": 75
                    },
                    {
                        "x": 1626706736000,
                        "y": 75
                    },
                    {
                        "x": 1626706743000,
                        "y": 75
                    },
                    {
                        "x": 1626706750000,
                        "y": 75
                    },
                    {
                        "x": 1626706756000,
                        "y": 75
                    },
                    {
                        "x": 1626706763000,
                        "y": 77
                    },
                    {
                        "x": 1626706770000,
                        "y": 0
                    },
                    {
                        "x": 1626706771000,
                        "y": 78
                    },
                    {
                        "x": 1626706777000,
                        "y": 0
                    },
                    {
                        "x": 1626706778000,
                        "y": 78
                    },
                    {
                        "x": 1626706784000,
                        "y": 78
                    },
                    {
                        "x": 1626706792000,
                        "y": 78
                    },
                    {
                        "x": 1626706799000,
                        "y": 78
                    },
                    {
                        "x": 1626706805000,
                        "y": 78
                    },
                    {
                        "x": 1626706812000,
                        "y": 78
                    },
                    {
                        "x": 1626706818000,
                        "y": 78
                    },
                    {
                        "x": 1626706825000,
                        "y": 78
                    },
                    {
                        "x": 1626706832000,
                        "y": 79
                    },
                    {
                        "x": 1626816952000,
                        "y": 24
                    },
                    {
                        "x": 1626816958000,
                        "y": 26
                    },
                    {
                        "x": 1626816965000,
                        "y": 27
                    },
                    {
                        "x": 1626816971000,
                        "y": 28
                    },
                    {
                        "x": 1626816977000,
                        "y": 29
                    },
                    {
                        "x": 1626816983000,
                        "y": 30
                    },
                    {
                        "x": 1626816990000,
                        "y": 30
                    },
                    {
                        "x": 1626816997000,
                        "y": 31
                    },
                    {
                        "x": 1626817003000,
                        "y": 32
                    },
                    {
                        "x": 1626817009000,
                        "y": 33
                    },
                    {
                        "x": 1626817015000,
                        "y": 33
                    }
                ]
                console.log(chartApi);
                const datos = chartApi
                console.log(chartApi.length);
                for (var i = 0; i < chartApi.length; i++) {
                    dataPoints.push({
                        x: new Date(datos[i].x),
                        y: datos[i].y
                    });
                }
                chart.render();
            })
            .then(function (data) {
                const datos = data.coolant.chart
                console.log(data.coolant.chart.length);
                for (var i = 0; i < data.coolant.chart.length; i++) {
                    dataPoints.push({
                        x: new Date(datos[i].x),
                        y: datos[i].y
                    });
                }
                chart.render();
            });
    }

    render() {
        const options = {
            theme: "light2",
            title: {
                text: "Temperatura del cooler"
            },
            axisY: {
                title: "Temperatura del cooler",
                suffix: "°C"
            },
            animationEnabled: true,
            zoomEnabled: true,
            data: [{
                type: "line",
                xValueFormatString: "DD MMM YYYY HH MM",
                yValueFormatString: "#°C",
                dataPoints: dataPoints
            }]
        }
        return (
            <div>
                <CanvasJSChart options={options}
                    onRef={ref => this.chart = ref}
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}
export default Chart
