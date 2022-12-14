import { 
	SubscribeMessage, 
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from "socket.io";
import { JwtService } from "@nestjs/jwt";
import { jwt_config } from "../configs/jwt-config";
import { StocksService } from "./stocks.service";
import { BrokersService } from "./brokers.service";
import { EmulationService } from "./emulation.service";
import { EmulationSettingsDto } from "../dto";
import { forwardRef, Inject } from '@nestjs/common';

export class AuthSocket extends Socket
{
	uid?: number;
}

@WebSocketGateway({ cors: true })
export class SocketGateway
{
	@WebSocketServer()
	server: Server;

	constructor(
		private jwtService: JwtService,
		private stocksService: StocksService,
		private brokersService: BrokersService,
		@Inject(forwardRef(() => EmulationService))
		private emulationService: EmulationService
	)
	{}

	broadcast(message: string, payload?: any)
	{
		this.server.emit(message, payload);
	}

	@SubscribeMessage("authorization")
	authorization(client: AuthSocket, payload: string): void
	{
		client.uid = 0;
		try
		{
			const auth_payload = this.jwtService.verify(payload);
			if (!auth_payload)
				throw "Invalid token";
			client.uid = auth_payload.id;
		} catch (e)
		{
			client.emit("error", "Invalid authorization token");
		}
	}

	@SubscribeMessage("stocks")
	async stocks(client: AuthSocket): Promise<void>
	{
		client.emit("stocks", await this.stocksService.get_stock_quotes());
	}

	@SubscribeMessage("brokers")
	async brokers(client: AuthSocket): Promise<void>
	{
		client.emit("brokers", await this.brokersService.get_user_brokers());
	}

	@SubscribeMessage("updateBroker")
	async updateBroker(client: AuthSocket, data: any): Promise<void>
	{
		const updated = await this.brokersService.update_broker(data);
		if (updated)
			this.broadcast("brokers", await this.brokersService.get_user_brokers());
	}

	@SubscribeMessage("removeBroker")
	async removeBroker(client: AuthSocket, id: number): Promise<void>
	{
		const removed = await this.brokersService.remove_broker(id);
		if (removed)
			this.broadcast("brokers", await this.brokersService.get_user_brokers());
	}

	@SubscribeMessage("getSettings")
	async getSettings(client: AuthSocket): Promise<void>
	{
		client.emit("getSettings", this.emulationService.get_settings());
	}

	@SubscribeMessage("startExchange")
	async startExchange(client: AuthSocket, settings: EmulationSettingsDto): Promise<void>
	{
		this.emulationService.set_settings(settings);
		this.emulationService.start_emulation();
	}

	@SubscribeMessage("stopExchange")
	async stopExchange(client: AuthSocket): Promise<void>
	{
		this.emulationService.end_emulation();
	}
}
