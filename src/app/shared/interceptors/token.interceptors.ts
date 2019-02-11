import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {AuthenticationService} from '../../auth/_services';

import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import { throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: AuthenticationService,
                private toastr: ToastrService,
                public router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (JSON.parse(localStorage.getItem('currentUser'))) {
            const headers = {
                Authorization: `Bearer ${this.auth.getToken()}`,
                Tenant: this.auth.getTanent(),
                charset: 'UTF-8'
            };
            request = request.clone({
                setHeaders: headers
            });
        }
        return next.handle(request).pipe(catchError((error, caught) => {
            if (error.status === 401) {
                // logout users, redirect to login page
                this.auth.logout();
                // redirect to the signin page or show login modal here
                // Observable.throwError(error);
                this.router.navigate(['/login']); // remember to import router class and declare it in the class
                // this.toastr.warning('Token est expiré!');

            } else {
                return throwError(error);
            }
        }));
    }
}

