import { Injectable } from '@nestjs/common';
import { BrokerDto, UserBrokerDto } from "../dto";
import { UsersService } from "./users.service";
import * as path from "path";

@Injectable()
export class BrokersService 
{
	private static brokers_path: string = "./src/data/brokers.json";
	private brokers: BrokerDto[] = [];
	private user_brokers: UserBrokerDto[] = [];
	private loading: boolean = false;

	constructor(private users: UsersService)
	{
		this.brokers = require(
			path.join(process.cwd(), BrokersService.brokers_path)
		);
	}

	async update_broker(data: any): Promise<boolean>
	{
		let id = +data.id;
		if (id === -1)
		{
			/* create */
			id = this.brokers.length ?
				this.brokers[this.brokers.length - 1].user_id + 1 : 0;
			this.users.create({
				id,
				name: data.name,
				email: data.email,
				password: data.password
			});
			this.brokers.push({
				user_id: id,
				balance: +data.balance,
				stocks: []
			});
		} else
		{
			/* update */
			const broker = this.brokers.find(
				_broker => +_broker.user_id === +id
			);
			if (!broker)
				return false;
			const user = await this.users.findById(+id);
			if (!user)
				return false;

			broker.balance = +data.balance;
			user.name = data.name;
			user.email = data.email;
			user.password = data.password;
		}

		this.user_brokers.length = 0;
		return true;
	}

	async remove_broker(id: number): Promise<boolean>
	{
		const bid = this.brokers.findIndex(
			broker => +broker.user_id === +id
		);
		if (bid === -1)
			return false;
		if (!this.users.remove(id))
			return false;
		this.brokers.splice(bid, 1);
		if (this.user_brokers.length)
		{
			this.user_brokers.splice(
				this.user_brokers.findIndex(
					broker => +broker.id === +id
				),
				1
			);
		}
		return true;
	}

	async get_user_brokers(): Promise<UserBrokerDto[]>
	{
		if (this.user_brokers.length)
			return this.user_brokers;
		if (this.loading)
		{
			while (this.loading)
			{
				await new Promise(resolve => setTimeout(resolve, 50));
			}
		} else
		{
			this.loading = true;
			for (let broker of this.brokers)
			{
				this.user_brokers.push({
					balance: broker.balance,
					stocks: broker.stocks,
					...(await this.users.findById(+broker.user_id))
				});
			}
			this.loading = false;
		}
		return this.user_brokers;
	}
}
