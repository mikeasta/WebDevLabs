import { PurchasedStockDto } from "./stock.dto";
import UserDto from "./user.dto";

export class BrokerDto
{
	user_id: number;
	balance: number;
	stocks: PurchasedStockDto[];
};

export class UserBrokerDto extends UserDto
{
	balance: number;
	stocks: PurchasedStockDto[];
};
