import { Component } from "react"
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import "./quote-chart.css"

export default class QuoteChart extends Component {
    constructor (props) {
        super(props)


        ChartJS.register(
			CategoryScale,
			LinearScale,
			PointElement,
			LineElement,
			Title,
			Tooltip,
			Legend
		);

        this.options = {
			responsive: true,
			plugins: {
				legend: {
					position: 'top' ,
				},
				title: {
					display: true,
					text: 'Котировки акций',
				}
			},
			scales: {
				xAxis: {
					title: {
						display: true,
						text: "Дата"
					}
				},
				yAxis: {
					title: {
						display: true,
						text: "Цена, в $"
					}
				}
			}
		};
	}

    render() {
        const labels = this.props.quotes.map(quote => quote["Date"])
        const dataset = this.props.quotes.map(quote => quote["Open"])
        return (
            <Line 
                options={this.options}
                data={{
                    labels,
                    datasets: [{
                        label: "Цена акции",
                        data: dataset,
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    }]
                }}
            />
        )
    }
}