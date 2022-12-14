import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { StockDto, StockQuoteDto } from "../dto";
import { QuotesService } from "./quotes.service";
import * as path from "path";

@Injectable()
export class StocksService 
{
	private static stocks_path: string = "./src/data/stocks.json";
	private stocks: StockDto[] = [];
	private quoted_stocks: StockQuoteDto[] = [];
	private loading: boolean = false;

	constructor(private quotes: QuotesService)
	{
		this.stocks = require(
			path.join(process.cwd(), StocksService.stocks_path)
		);
	}

	all(): StockDto[]
	{
		return this.stocks;
	}

	findOne(id: number): StockDto | undefined
	{
		return this.stocks.find(stock => +stock.id === +id);
	}

	async get_stock_quotes(): Promise<StockQuoteDto[]>
	{
		if (this.quoted_stocks.length)
			return this.quoted_stocks;
		if (this.loading)
		{
			while (this.loading)
			{
				await new Promise(resolve => setTimeout(resolve, 50));
			}
		} else
		{
			this.loading = true;
			for (let stock of this.stocks)
			{
				this.quoted_stocks.push({
					...stock,
					quotes: (await this.quotes.findOne(stock.id))?.quotes || []
				});
			}
			this.loading = false;
		}
		return this.quoted_stocks;
	}
}
