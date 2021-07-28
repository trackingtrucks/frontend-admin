import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
import axios from 'axios';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class Chart extends Component {
    state = {
        diasCount: 0,
        diasArray: [],
        dataPoints: [],
        dataPointsFilter: [],
        filtrado: true,
        diaSeleccionado: "Ninguno"
    }
    getData = async () => {
        const chart = this.chart;
        // const { data } = await axios.get('http://localhost:5000/data/sample')
        const { data } = await axios.get('https://tracking-trucks.herokuapp.com/data/sample')
        const datos = data.coolant.chart;
        var dataPoints = [];

        for (var i = 0; i < datos.length; i++) {
            const dia = Math.floor(datos[i].x / 86400000)
            if (!this.state.diasArray.includes(dia)) {
                this.setState({
                    diasCount: this.state.diasCount + 1,
                    diasArray: [...this.state.diasArray, dia]
                })
            }
            dataPoints.push({
                x: new Date(datos[i].x),
                y: datos[i].y,
                dia
            });
        }
        this.setState({
            dataPoints: dataPoints,
            // dataPointsFilter: dataPoints
        })
        chart.render();
    }

    componentDidMount = () => {
        this.getData();
    }
    formatFecha = (timestamp) => {
        let d = new Date(timestamp);
        let ye = new Intl.DateTimeFormat('es-AR', { year: 'numeric' }).format(d)
        let mo = new Intl.DateTimeFormat('es-AR', { month: 'long' }).format(d)
        let da = new Intl.DateTimeFormat('es-AR', { day: '2-digit' }).format(d)
        return { ye, mo, da }
    }
    filtrar = (dia) => {

        const { ye, mo, da } = this.formatFecha(dia * 86400000 + 10800000);
        this.setState({
            dataPointsFilter: this.state.dataPoints.filter(point => point.dia === dia),
            filtrado: !this.state.filtrado,
            diaSeleccionado: `${da} de ${mo} del ${ye}`
        })


    }
    render() {
        const options = {
            theme: "light2",
            title: {
                text: `Temperatura del cooler`
            },
            axisX: {
                valueFormatString: "HH:MM:ss",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                },
                title: `Dia seleccionado: ${this.state.diaSeleccionado}`
            },
            axisY: {
                // title: "Temperatura del cooler",
                suffix: "°C"
            },
            culture: "es",
            animationEnabled: true,
            zoomEnabled: true,
            data: [{
                type: "line",
                xValueFormatString: "[DD MMM] HH:MM:ss ",
                yValueFormatString: "#°C",
                toolTipContent: "{x} - {y}",
                dataPoints: this.state.dataPointsFilter
            }],
        }
        const containerProps = {
            width: "100%",
            height: "450px",
            margin: "auto"
        };
        return (
            <div>
                <CanvasJSChart containerProps={containerProps} options={options}
                    onRef={ref => this.chart = ref}
                />
                {this.state.diasArray.map((dia) => {
                    const { ye, mo, da } = this.formatFecha(dia * 86400000 + 10800000);

                    return (
                        <div key={dia}>
                            <button onClick={() => { this.filtrar(dia) }}>Seleccionar {da} de {mo} del {ye}</button>
                            <br />
                            <br />
                        </div>
                    )
                })}
            </div>
        );
    }
}
export default Chart