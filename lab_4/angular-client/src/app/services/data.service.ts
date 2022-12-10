import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";

export class User {
	public id:     string = "";
	public name:   string = "";
	public birth:  string = "";
	public email:  string = "";
	public img:    string = "";
	public role:   string = "";
	public status: string = "";
}

export class Post {
    public date:      string = "";
    public text:      string = "";
    public id  :      string = "";
    public user_id:   string = "";
    public user_name: string = "";
    public user_img:  string = "";
}

@Injectable({
    providedIn: 'root'
})
export class DataService {

    posts    = this.socket.fromEvent<Post[]>("posts");
    friends  = this.socket.fromEvent<User[]>("friends");

    constructor (
        private socket: Socket
    ) {
        socket.on("update_friends", (bool: boolean) => {
            this.get_friends();
        })

        socket.on("update_posts", (bool: boolean) => {
            this.get_posts();
        })

        socket.on("new_user", (user_id: string) => {
            console.log(`User ${user_id} logged`)
        })
    }

    get_current_user_id () {
        return String(sessionStorage.getItem("user")).slice(1, -1);
    }

    get_friends() {
        this.socket.emit("friends", this.get_current_user_id());
    }

    new_friend(friend_id: string) {
        this.socket.emit("new_friend", friend_id, this.get_current_user_id());
        this.get_friends();
    }

    remove_friend(friend_id: string) {
        this.socket.emit("remove_friend", friend_id, this.get_current_user_id());
        this.get_friends();
    }

    get_posts() {
        this.socket.emit("posts", this.get_current_user_id());
    }

    new_post(post: Post) {
        this.socket.emit("new_post", post);
    }
}