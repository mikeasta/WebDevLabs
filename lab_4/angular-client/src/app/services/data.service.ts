import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";

export class User {
	public id: string;
	public name: string = "";
	public birth: string = "";
	public email: string = "";
	public img: string = "";
	public role: string = "";
	public status: string = "";
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

    posts   = this.socket.fromEvent<Post[]>("posts");
    friends = this.socket.fromEvent<User[]>("friends")

    constructor (
        private http: HttpClient,
        private socket: Socket
    ) {
    }

    get_current_user_id () {
        return String(sessionStorage.getItem("user")).slice(1, -1);
    }

    get_posts() {
        this.socket.emit("posts");
    }

    get_friends() {
        this.socket.emit("friends", this.get_current_user_id());
    }

    new_friend(friend_id: string) {
        this.socket.emit("new_friend", friend_id, this.get_current_user_id());
    }
}