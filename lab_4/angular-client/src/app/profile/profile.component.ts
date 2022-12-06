import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
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
	notCurrentUser: boolean;

  	constructor(
		private http: HttpClient,
		private route: ActivatedRoute,
		private auth_service : AuthService,
		private data_service: DataService
	) {
		console.log(this.route.snapshot.paramMap.get('user_id'))
		this.notCurrentUser = Boolean(this.route.snapshot.paramMap.get('user_id'))

    	const user = this.route.snapshot.paramMap.get('user_id') || String(sessionStorage.getItem("user")).slice(1, -1)
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