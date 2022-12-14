export class QuoteDateDto
{
	"Date": string;
	"Open": string;
}

export class QuoteDto
{
	stock_id: number;
	quotes: QuoteDateDto[]
};

export class StockDto
{
	id: number;
	label: string;
	name: string;
}

export class StockQuoteDto extends StockDto
{
	quotes: QuoteDateDto[];
}

export class PurchasedStockDto extends StockDto
{
	price: number;
	count: number;
}
