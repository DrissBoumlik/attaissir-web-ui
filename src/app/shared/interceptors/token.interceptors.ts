import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { AuthenticationService } from '../../auth/_services/authentication.service';
import 'rxjs/add/operator/retry';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthenticationService,
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
    return next.handle(request).catch((error, caught) => {
      if (error.status === 401) {
        // logout users, redirect to login page
        this.auth.logout();
        // redirect to the signin page or show login modal here
        this.router.navigate(['/login']); // remember to import router class and declare it in the class
        return Observable.throw('Token est expiré!');
      }
    });
  }
}

