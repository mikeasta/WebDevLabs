import { Module } from '@nestjs/common';
import { StocksService } from "../providers/stocks.service";
import { QuotesService } from "../providers/quotes.service";

@Module({
	providers: [StocksService, QuotesService],
	exports: [StocksService, QuotesService]
})
export class StocksModule {}
