import { Component, OnInit } from '@angular/core';
import { DataService, User } from '../services/data.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.less']
})
export class FriendsComponent implements OnInit {

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
		console.log("Friend fetch");
		this.data.get_friends()
	}
}
