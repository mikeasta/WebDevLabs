import React from "react";
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

class InfoChart extends React.Component
{
	constructor(props)
	{
		super(props);

		ChartJS.register(
			CategoryScale,
			LinearScale,
			PointElement,
			LineElement,
			Title,
			Tooltip,
			Legend
		);

		const xAxisName = this.props.headers?.find(
			header => header.name === this.props.xFieldName
		)?.label;
		const yAxisName = this.props.headers?.find(
			header => header.name === this.props.yFieldName
		)?.label;

		this.options = {
			responsive: true,
			plugins: {
				legend: {
					position: this.props.name ? 'top' : 'none',
				},
				title: {
					display: true,
					text: 'Stock quotes',
				}
			},
			scales: {
				xAxis: {
					title: {
						display: !!xAxisName,
						text: xAxisName
					}
				},
				yAxis: {
					title: {
						display: !!yAxisName,
						text: yAxisName
					}
				}
			}
		};
	}

	render()
	{
		const labels = this.props.items?.map(item => item[this.props.xFieldName]);
		const dataset = this.props.items?.map(item => item[this.props.yFieldName]);
		return (
			<div>
				<Line 
					options={this.options}
					data={{
						labels,
						datasets: [{
							label: this.props.name,
							data: dataset,
							borderColor: 'rgb(53, 162, 235)',
							backgroundColor: 'rgba(53, 162, 235, 0.5)',
						}]
					}}
				/>
			</div>
		);
	}
};

export default InfoChart;
