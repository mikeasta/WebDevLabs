import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})

export class AuthService {
	constructor() {
		socket = io("http://localhost:8000");
		this.subscribe();
	}

	subscribe() {
		socket.emit("subscribe");
	}

	user_logged() {
		socket.emit("login", sessionStorage.getItem("user"));
	}

}

var socket : Socket;