import { Injectable } from '@nestjs/common';
import { QuoteDto } from "../dto";
import * as path from "path";

@Injectable()
export class QuotesService 
{
	private static quotes_path: string = "./src/data/quotes.json";
	private quotes: QuoteDto[] = [];

	constructor()
	{
		this.quotes = require(
			path.join(process.cwd(), QuotesService.quotes_path)
		);
	}

	all(): QuoteDto[]
	{
		return this.quotes;
	}

	async findOne(stock_id: number): Promise<QuoteDto | undefined>
	{
		return this.quotes.find(quote => +quote.stock_id === +stock_id);
	}
}
