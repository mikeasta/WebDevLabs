import { Injectable } from '@angular/core';
import { Socket } from "ngx-socket-io";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
	constructor(
		private socket: Socket
	) {
	}

	subscribe() {
		this.socket.emit("subscribe");
	}

	user_logged() {
		this.socket.emit("login", sessionStorage.getItem("user"));
	}

}

var socket : Socket;