import { Module } from '@nestjs/common';
import { EmulationModule } from "./emulation.module";

@Module({
	imports: [
		EmulationModule
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
