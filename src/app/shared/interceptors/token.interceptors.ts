import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../auth/_services/authentication.service';
import 'rxjs/add/operator/retry';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthenticationService) {
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
    return next.handle(request);
  }
}

