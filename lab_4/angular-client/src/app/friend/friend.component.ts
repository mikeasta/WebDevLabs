import { Component, Input, OnInit } from '@angular/core';
import { DataService, User } from '../services/data.service';

@Component({
  	selector: 'tbody',
  	templateUrl: './friend.component.html',
	  styleUrls: ['./friend.component.less']
})
export class FriendComponent{

	@Input() user: User = new User;

  	constructor(
		private data: DataService
  	) { }

	remove_friend () {
		this.data.remove_friend(this.user.id)
	}
}
