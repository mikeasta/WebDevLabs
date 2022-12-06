import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { User, DataService } from '../services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  	profile: User = new User;

  	constructor(
		private http: HttpClient,
		private router: Router,
		private auth_service : AuthService,
		private data_service: DataService
	) {
    	// Get current user data
    	const user = String(sessionStorage.getItem("user")).slice(1, -1)
		console.log(user);

    	// HTTP login request
		this.http.get<User>(
		    `https://localhost:5000/api/users/get_user/${user}`
		)
        .subscribe( 
		    data => {
			    console.log(data)
                this.profile = data;
		    },
		    error => alert(error.error)
		)
  	}

  	ngOnInit(): void {
  	}	

}