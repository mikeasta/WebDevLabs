import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { User, DataService } from '../services/data.service';
import { StringPreprocessor } from '../services/string_prep.service';
import { DatePreprocessor } from '../services/date.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  	profile: User = new User;
	currentUser: boolean;

  	constructor(
		private http: HttpClient,
		private route: ActivatedRoute,
		private data: DataService,
		private string_prep: StringPreprocessor,
		private date_prep: DatePreprocessor
	) {
		this.currentUser = !Boolean(this.route.snapshot.paramMap.get('user_id')) || 
			(this.route.snapshot.paramMap.get('user_id') == this.data.get_current_user_id())
    	const user = this.route.snapshot.paramMap.get('user_id') || this.data.get_current_user_id()

    	// HTTP login request
		this.http.get<User>(
		    `https://localhost:5000/api/users/get_user/${user}`
		)
        .subscribe( 
		    data => {
                this.profile = data;
				this.profile.birth  = this.date_prep.invertedToSlash(this.profile.birth);
				this.profile.role   = this.string_prep.getRole(this.profile.role);
				this.profile.status = this.string_prep.getStatus(this.profile.status);
		    },
		    error => alert(error.error)
		)
  	}

  	ngOnInit(): void {
  	}	

}