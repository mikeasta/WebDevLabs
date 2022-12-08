import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";

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

export class Post {
    public date:    string = "";
    public text:    string = "";
    public id  :    string = "";
    public user_id: string = "";
}

@Injectable({
    providedIn: 'root'
})
export class DataService {

    posts = this.socket.fromEvent<Post[]>("posts");
    friends = this.socket.fromEvent<User[]>("friends")

    constructor (
        private http: HttpClient,
        private socket: Socket
    ) {
    }

    get_posts() {
        this.socket.emit("posts");
    }

    get_friends() {
        this.socket.emit("friends");
    }

    new_friend(friend_id: string) {
        this.socket.emit("new_friend", friend_id);
    }
}