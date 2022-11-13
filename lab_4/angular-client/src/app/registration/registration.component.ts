import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  	selector: 'app-registration',
  	templateUrl: './registration.component.html',
  	styleUrls: ['./registration.component.less']
})
export class RegistrationComponent implements OnInit, AfterViewInit {

	@ViewChild("registrationName") regName: ElementRef
	@ViewChild("registrationBirthdate") regBirth: ElementRef
	@ViewChild("registrationEmail") regEmail: ElementRef
	@ViewChild("registrationPassword") regPassword: ElementRef

  	constructor(
		private http: HttpClient,
		private router: Router
	) { }

  	ngOnInit(): void {}	

	ngAfterViewInit(): void {}

	async registerUser() {
		// Get DOM elements data
		const user: Object = {
			name: this.regName.nativeElement.value,
			email: this.regEmail.nativeElement.value,
			birth: this.regBirth.nativeElement.value,
			password: this.regPassword.nativeElement.value,
		}

		// Define headers
		const headers = {
			"Content-Type": "application/json"
		}

		// Create http request
		this.http.post(
			"https://localhost:5000/api/auth/register",
			{user},
			{headers}
		).subscribe( 
			data => this.router.navigate(["/login"]), 
			error => alert(error.error))
	}
}
