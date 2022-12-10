import { Injectable } from "@angular/core";

// Map of statuses
const access = {
    "banned": "Заблокирован",
    "confirmed": "Подтвержден",
    "unconfirmed": "Неподтвержден"
}

// Class that converts data to representable string
@Injectable({
    providedIn: 'root'
})
export class StringPreprocessor {
    constructor() {}

    getRole (role: string ) { 
        switch(role) {
            case "admin": return "Администратор";
            case "user": return "Пользователь";
            case "guest": return "Гость"
            default: return "Неизвестная роль"
        }
    }
    getStatus (status: string) { 
        switch(status) {
            case "banned": return "Заблокирован";
            case "confirmed": return "Подтвержден";
            case "unconfirmed": return "Неподтвержден"
            default: return "Неизвестный статус"
        } 
    }
}
