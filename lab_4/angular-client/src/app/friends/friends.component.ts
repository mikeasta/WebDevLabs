import { Component, OnInit } from '@angular/core';
import { DataService, User } from '../services/data.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.less']
})
export class FriendsComponent implements OnInit {

    friends: User[] = [
        {
            name: "Squirtle",
            birth: "2000-01-01",
            role: "user",
            status: "unconfirmed",
            email: "squirtle@email.com",
            id: "squirtleID001",
            img: "https://images.cults3d.com/ohDbrtof_pCOGsPevQ2ANdz0Jno=/https://files.cults3d.com/uploaders/16165612/illustration-file/f9b9e757-0919-4d63-86c8-2061878fb7ae/Squirtle_Stand02.jpg",
        },
        {
            name: "Bulbasaur",
            birth: "2001-02-02",
            role: "admin",
            status: "confirmed",
            email: "bulbasaur@email.com",
            id: "bulbasaurID002",
            img: "https://images.cults3d.com/AqYDhkzTwZfLIog_ipsyo_q1WAU=/https://files.cults3d.com/uploaders/16165612/illustration-file/2bc70fa4-f03c-4173-93a7-560b522dc2b7/Bulbasaur_Pose01.jpg",
        },
        {
            name: "Charmander",
            birth: "2002-03-03",
            role: "guest",
            status: "banned",
            email: "charmander@email.com",
            id: "charmanderID003",
            img: "https://images.cults3d.com/6ae3V9d-o6sDartEK7UC1i_RUaw=/516x516/https://files.cults3d.com/uploaders/16165612/illustration-file/25e33bd3-e8ba-4366-9962-0605c6f8f526/Charmander_Sit01.jpg",
        }
    ];

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
