import { Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { DataService, User } from '../services/data.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.less']
})
export class FriendsComponent implements OnInit, AfterViewInit {
	@ViewChild('friendAddInput') friend_input:  ElementRef;

    friends: User[] = [];

  	constructor(
		private data: DataService
  	) { }

  	async ngOnInit(): Promise<void> {
		this.data.friends.subscribe(friends => {
			this.friends = friends;
		})

		this.fetch_friends();
  	}

	ngAfterViewInit() {}

	private async fetch_friends() {
		this.data.get_friends()
	}

	new_friend () {
		this.data.new_friend(this.friend_input.nativeElement.value)
	}
}
