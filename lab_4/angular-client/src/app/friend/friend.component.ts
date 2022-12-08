import { Component, OnInit } from '@angular/core';
import { DataService, User } from '../services/data.service';

@Component({
  	selector: 'friends-component',
  	templateUrl: './friend.component.html'
})
export class FriendComponent implements OnInit {

  friends: User[] = [];
  user: User = new User;

  	constructor(
		private data: DataService
  	) { }

  	async ngOnInit(): Promise<void> {
		this.data.friends.subscribe(friends => {
			this.friends = friends;
		})


		this.fetch_friends();
  	}

	private async fetch_friends() {
		this.data.get_friends()
	}
}
