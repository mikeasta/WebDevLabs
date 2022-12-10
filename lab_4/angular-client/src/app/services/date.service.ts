import { Injectable } from "@angular/core";

// Converts data to different forms
@Injectable({
    providedIn: 'root'
})
export class DatePreprocessor {
    constructor() {};
    slashToDotDate  (date: string) { return date.split("/").join(".") }
    dotToSlashDate  (date: string) { return date.split(".").join("/") }
    invertedToSlash (date: string) { return date.split("-").reverse().join("/") }
    slashToInverted (date: string) { return date.split('/').reverse().join('-') }
}