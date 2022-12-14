import React from "react";
import { Table, Pagination } from "react-bootstrap";

class InfoTable extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			page: 1,
			pageSize: this.props.pageSize || 10
		}
		this.pagination = [];
	}

	changePage(page)
	{
		if (page <= 0 || page > Math.ceil((this.props.items?.length || 0) / this.state.pageSize))
			return;
		this.setState({page: page});
	}

	updatePagination()
	{
		this.pagination.length = 0;
		const pagesCount = Math.ceil((this.props.items?.length || 0) / this.state.pageSize);
		if (!pagesCount)
			return;

		const visibleRadius = 1;		

		const from	= (this.state.page - visibleRadius) >= 2 ? 
			this.state.page - visibleRadius - 1 : 1;
		const to	= (this.state.page + visibleRadius) < pagesCount - 1 ? 
			this.state.page + visibleRadius - 1 : pagesCount - 2;

		this.pagination.push(
			<Pagination.Prev key="pagination-prev" onClick={() => this.changePage(this.state.page - 1)} />
		);
		if (pagesCount > 0)
			this.pagination.push(
				this.getPaginationItem(0)
			);
		if (from > 1)
			this.pagination.push(
				<Pagination.Ellipsis key="pagination-before" />
			);

		for (let i = from; i <= to; ++i)
		{
			this.pagination.push(
				this.getPaginationItem(i)
			);
		}

		if (pagesCount - to - 1 > 1)
			this.pagination.push(
				<Pagination.Ellipsis key="pagination-after" />
			);
		if (pagesCount > 1)
			this.pagination.push(
				this.getPaginationItem(pagesCount - 1.0)
			);
		this.pagination.push(
			<Pagination.Next key="pagination-next" onClick={() => this.changePage(this.state.page + 1)} />
		);
	}

	getPaginationItem(page)
	{
		return (
			<Pagination.Item key={page + 1} active={page + 1 === this.state.page} onClick={() => this.changePage(page + 1)}>
				{page + 1}
			</Pagination.Item>
		);
	}

	render()
	{
		this.updatePagination();
		return (
			<>
				<Table 
					striped
					bordered
					responsive
					className="mt-3"
				>
					{this.props.headers?.length ? (
						<thead>
							<tr>
								<th>#</th>
								{this.props.headers.map(header => <th key={ header.label }>{ header.label }</th>)}
							</tr>		
						</thead>
					) : null}
					<tbody>
						{
							!this.props.items?.length ? (
								<tr>
									<td colSpan={ this.props.headers.length + 1 } className="text-center">
										Нет данных
									</td>
								</tr>
							) : null
						}
						{
							this.props.items?.filter((_, index) => {
								return	index >= (this.state.page - 1) * this.state.pageSize &&
										index < this.state.page * this.state.pageSize;
							}).map((item, index) =>
								<tr key={`tr-${index + 1}`}>
									<td>
										{ (this.state.page - 1) * this.state.pageSize + index + 1 }
									</td>
									{this.props.headers.map(header => 
										<td key={`td-${index + 1}-${header.name}`}>
											{ item[header.name] }
										</td>
									)}
								</tr>
							)
						}	
					</tbody>
				</Table>
				<Pagination>
					{ this.pagination }
				</Pagination>
			</>
		)
	}
};

export default InfoTable;
