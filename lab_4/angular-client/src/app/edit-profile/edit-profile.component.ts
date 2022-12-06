import { Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../services/data.service';

@Component({
  	selector: 'app-root',
  	templateUrl: './edit-profile.component.html',
  	styleUrls: ['./edit-profile.component.less']
})
export class EditProfileComponent implements OnInit, AfterViewInit {

	@ViewChild('InputUsername')    input_name:  ElementRef;
	@ViewChild('InputBirthdate')   input_birth: ElementRef;
	@ViewChild('InputEmail') 	   input_email: ElementRef;
	@ViewChild('load_image_input') input_img:   ElementRef;


  	profile: User = new User;
	user_id: string = ''; 

  	constructor(
		private http: HttpClient
	) { 
		// Define if this page is current user page
		//console.log(this.route.snapshot.paramMap.get('user_id'), String(sessionStorage.getItem("user")).slice(1, -1))
		this.user_id = String(sessionStorage.getItem("user")).slice(1, -1)

    	// HTTP profile get request
		this.http.get<User>(
		    `https://localhost:5000/api/users/get_user/${this.user_id}`
		)
        .subscribe( 
			data => {
                this.profile = data;
		    },
		    error => alert(error.error)
		)
  	}


  	ngOnInit(): void {}

	ngAfterViewInit() {}


	// Update user data
	update_data () {
		// Save data
		this.profile.name  = this.input_name.nativeElement.value;
		this.profile.birth = this.input_birth.nativeElement.value;
		this.profile.email = this.input_email.nativeElement.value;
		this.profile.img   = this.input_img.nativeElement.value || this.profile.img;

		const user = this.profile;

		// Define headers
		const headers = { "Content-Type": "application/json"};

		// Update profile request
		this.http.put<User>(
			`https://localhost:5000/api/users/edit_user/${this.user_id}`, 
			{ user },
			{ headers }
			).subscribe( 
				() => {
					alert("User updated")
					window.location.reload()
				},
				error => alert(error.error)
			)
	}
}
