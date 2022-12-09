import { Component, Input, OnInit } from '@angular/core';
import { DataService, User } from '../services/data.service';

@Component({
  	selector: 'tbody',
  	templateUrl: './friend.component.html'
})
export class FriendComponent{

	@Input() user: User = new User;

  	constructor(
		private data: DataService
  	) { }

}
