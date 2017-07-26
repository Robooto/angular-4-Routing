import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, CanLoad } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private authService: AuthService, private router: Router) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.checkLoggedIn(state.url);
    }

    canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
        return this.checkLoggedIn(route.path);
    }

    checkLoggedIn(url: string): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        this.authService.redirectUrl = url;
        this.router.navigate(['login']);
        return false;
    }
}