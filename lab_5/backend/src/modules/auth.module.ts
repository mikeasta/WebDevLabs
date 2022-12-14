import { Module, Global } from '@nestjs/common';
import { UsersModule } from "./users.module";
import { AuthService } from "../providers/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { jwt_config } from "../configs/jwt-config";

const jwt_module = JwtModule.register(jwt_config);

@Module({
	imports: [
		jwt_module,
		UsersModule
	],
	exports: [jwt_module, UsersModule],
	providers: [AuthService]
})
export class AuthModule {}
