import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate 
{
	constructor(
        private router: Router
    ) {}

    // Check if there user info
    // in local storage (which means, that user logined)
    isAuth(): boolean {
        return !!localStorage.getItem("user")
    }

    // Check if user can use header routes
	canActivate(): boolean
	{
        if (!this.isAuth())
            this.router.navigate(["/login"]);

        return this.isAuth()
	}
}