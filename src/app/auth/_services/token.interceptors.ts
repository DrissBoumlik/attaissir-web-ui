import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
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
        // 'Content-Type': 'application/json',
        charset: 'UTF-8'
      };
      /*headers['Content-Type'] = (request.headers.get('Content-Type') !== 'multipart/form-data')
        ? 'application/json' : 'multipart/form-data';*/

      console.log(request.headers.get('Content-Type'));

      /*if(request.headers.get('Content-Type') === 'text/plain') {
        headers['Content-Type'] = 'application/json';
        // headers['Content-Type'] = undefined;
      //} /*else {
        //headers['Content-Type'] = 'application/json';
     // }*/
      request = request.clone({
        setHeaders: headers
      });
    }
    return next.handle(request);
  }
}

