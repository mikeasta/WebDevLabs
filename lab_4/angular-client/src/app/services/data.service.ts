import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export class User {
	public id: number = 0;
	public name: string = "";
	public birth: string = "";
	public email: string = "";
	public img: string | null = null;
	public role: string = "";
	public status: string = "";
    public friends: [string];
}

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor (
        private http: HttpClient
    ) {
    }

    // Get user profile object
    get_user_profile (user_id: string) {
        
    }
}