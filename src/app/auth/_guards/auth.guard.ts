import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router, private _userService: UserService, private auth: AuthenticationService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser === null) {
            this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }

        return true;
        /*return this._userService.verify().map(
          data => {
            if (data !== null) {
              // logged in so return true
              return true;
            }
            // error when verify so redirect to login page with the return url
            this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
          },
          error => {
            // error when verify so redirect to login page with the return url
            this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
          });*/
    }
}
