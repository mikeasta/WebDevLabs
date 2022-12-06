import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, AfterViewInit {
	@ViewChild('loginEmail') login_email: ElementRef;
	@ViewChild('loginPassword') login_password: ElementRef;

  	constructor(
		private http: HttpClient,
		private router: Router,
		private auth_service : AuthService
	) {
  	}

  	ngOnInit(): void {}

	
	ngAfterViewInit() {}

	// Login user
	async signIn() {
		// Create login body
		const user: Object = {
			email: 	  this.login_email.nativeElement.value,
			password: this.login_password.nativeElement.value
		}

		// Define headers
		const headers = { "Content-Type": "application/json"};

		// HTTP login request
		this.http.post<User>(
			'https://localhost:5000/api/auth/login', 
			{ user },
			{ headers}
			).subscribe( 
				data => {
					alert(data.id)
					sessionStorage.setItem("user", JSON.stringify(data.id))
					this.router.navigate(["/profile"])
					this.auth_service.user_logged();
				},
				error => alert(error.error)
			)
	}
}

export interface User {
	name: string,
	birth: string,
	role: string,
	status: string,
	email: string,
	id: string,
	img: string,
	friends: [string]
}
