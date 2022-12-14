import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { SocketGateway } from "./socket.gateway";
import { QuotesService } from "./quotes.service";
import { StocksService } from "./stocks.service";
import { EmulationSettingsDto } from "../dto";
import * as path from "path";
import * as moment from "moment";

@Injectable()
export class EmulationService 
{
	private static settings_path: string = "./src/data/settings.json";
	private settings: EmulationSettingsDto;

	private max_date: string;

	private emulation_date: Date = new Date();
	private emulation: NodeJS.Timer;

	constructor(
		@Inject(forwardRef(() => SocketGateway))
		private socket: SocketGateway,
		private quotes: QuotesService,
		private stocks: StocksService
	)
	{
		this.settings = require(
			path.join(process.cwd(), EmulationService.settings_path)
		);
		this.max_date = "11/05/2022";
	}

	get_settings(): EmulationSettingsDto
	{
		return this.settings;
	}

	set_settings(settings: EmulationSettingsDto): void
	{
		this.settings = settings;
	}

	private async emulate(): Promise<void>
	{
		const quotes: any = [];
		const date = moment(this.emulation_date).format("MM/DD/YYYY");

		if (date == this.max_date)
			return this.end_emulation();

		for (let stock_id of this.settings.emulatedStocks)
		{
			const quote = (await this.quotes.findOne(stock_id)).quotes.find(
				_quote => _quote["Date"] === date
			);
			if (quote)
			{
				quotes.push({
					stock_id,
					price: quote["Open"]
				});
			}
		}

		this.socket.broadcast("exchangeUpdate", {
			date,
			quotes
		});
		/* change date */
		this.emulation_date = new Date(
			this.emulation_date.getTime() + 60 * 60 * 24 * 1000
		);
	}

	start_emulation(): void
	{
		this.settings.emulation = true;
		this.emulation_date = moment(
			this.settings.startDate, "MM/DD/YYYY"
		).toDate();
		this.settings.stocksInfo = this.settings.emulatedStocks.map(
			stock => this.stocks.findOne(stock)
		);

		this.emulation = setInterval(
			() => this.emulate(), 
			this.settings.updateRate * 1000
		);
		this.socket.broadcast("getSettings", this.settings);
	}

	end_emulation(): void
	{
		this.settings.emulation = false;
		clearInterval(this.emulation);
		this.socket.broadcast("getSettings", this.settings);
	}
}
