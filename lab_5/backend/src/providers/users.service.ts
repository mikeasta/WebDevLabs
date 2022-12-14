import { Injectable } from '@nestjs/common';
import { UserDto } from "../dto";
import * as path from "path";

@Injectable()
export class UsersService 
{
	private static users_path: string = "./src/data/users.json";
	private users: UserDto[] = [];

	constructor()
	{
		this.users = require(
			path.join(process.cwd(), UsersService.users_path)
		);
	}

	all(): UserDto[]
	{
		return this.users;
	}

	create(user: UserDto): void
	{
		this.users.push(user);
	}

	remove(id: number): boolean
	{
		const index = this.users.findIndex(user => +user.id === +id);
		if (index === -1)
			return false;
		this.users.splice(index, 1);
		return true;
	}

	async findOne(email: string): Promise<UserDto | undefined>
	{
		return this.users.find(user => user.email === email);
	}

	async findById(id: number): Promise<UserDto | undefined>
	{
		return this.users.find(user => user.id === id);
	}
}
