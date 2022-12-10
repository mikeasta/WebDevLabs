import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService, User} from './services/data.service';

@Component({
  	selector: 'app-root',
  	templateUrl: './app.component.html',
  	styleUrls: ['./app.component.less']
})
export class AppComponent {
	constructor (
		private http: HttpClient,
		private router: Router,
		private data: DataService
	) {}

	redirect_to_admin() {
		// href="https://localhost:5000/control_panel"
		// HTTP login request
		this.http.get<User>(
			`https://localhost:5000/api/users/get_user/${this.data.get_current_user_id()}`
			).subscribe( 
				data => {
					data.role == "admin" ? 
						window.location.href = "https://localhost:5000/control_panel" :
						this.router.navigate(["/profile"]);
				},
				error => alert(error.error)
			)
	}
}