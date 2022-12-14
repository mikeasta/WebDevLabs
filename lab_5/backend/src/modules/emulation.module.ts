import { Module } from '@nestjs/common';
import { EmulationService } from "../providers/emulation.service";
import { SocketGateway } from "../providers/socket.gateway";
import { StocksModule } from "./stocks.module";
import { BrokersModule } from "./brokers.module";
import { QuotesModule } from "./quotes.module";
import { AuthModule } from "./auth.module";

@Module({
	imports: [
		StocksModule,
		BrokersModule,
		QuotesModule,
		AuthModule
	],
	providers: [
		EmulationService,
		SocketGateway
	],
	exports: [
		EmulationService,
		SocketGateway
	]
})
export class EmulationModule {}
