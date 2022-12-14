import { Module } from '@nestjs/common';
import { BrokersService } from "../providers/brokers.service";
import { UsersModule } from "./users.module";

@Module({
	imports: [UsersModule],
	providers: [BrokersService],
	exports: [BrokersService]
})
export class BrokersModule {}
