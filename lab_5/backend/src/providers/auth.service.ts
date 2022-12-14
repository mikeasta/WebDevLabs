import { Injectable } from '@nestjs/common';
import { UsersService } from "./users.service";
import { JwtService } from "@nestjs/jwt";
import { UserDto } from "../dto"; 

@Injectable()
export class AuthService 
{
	constructor(
		private users: UsersService,
		private jwt: JwtService
	)
	{}

	async validate_user(email: string, password: string): Promise<any>
	{
		const user: UserDto | undefined = await this.users.findOne(email);
		if (user && user.password === password)
		{
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async login(user: any)
	{
		const payload = { email: user.email, id: user.id };
		return {
			access_token: this.jwt.sign(payload)
		};
	}
}
