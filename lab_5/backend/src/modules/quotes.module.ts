import { Module } from '@nestjs/common';
import { QuotesService } from "../providers/quotes.service";

@Module({
	providers: [QuotesService],
	exports: [QuotesService]
})
export class QuotesModule {}
