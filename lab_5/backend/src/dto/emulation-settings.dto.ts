import { StockDto } from "./stock.dto";

export default class EmulationSettingsDto {
	emulation: boolean;
	startDate: string;
	updateRate: number;
	emulatedStocks: any[];
	stocksInfo?: StockDto[];
};