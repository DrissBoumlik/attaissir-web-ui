import { ErrorHandler, Inject, Injectable, Injector, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class SiamErrorHandler implements ErrorHandler {

  constructor(@Inject(Injector) private injector: Injector) { }

  private get toastr(): ToastrService {
    return this.injector.get(ToastrService);
  }

  handleError = (error: any): void => {
    let message: string;
    let title: string;
    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (!navigator.onLine) {
        // Handle offline error
        this.toastr.warning('Pas de connexion Internet');
      } else {
        // Handle Http Error (error.status === 403, 404...)
        // this.toastr.warning(`${error.status} - ${error.message}`);
      }
    } else {
      /*this.toastr.warning(error, '', {
        enableHtml: true
      });*/
    }
    // Log the error anyway
    console.error('It happens: ', error);


  }

  message = (msg) => {
    if (!msg.hasOwnProperty('message')) {
      if (msg.search('The server response does not provide the totalCount value.') !== -1) {
        return 'The server response does not provide the totalCount value.';
      }
      return msg;
    }
    return msg.message;
  }

  getMessage = (code: number): any => {
    if (code === 400) {
      return {
        title: 'Syntaxe invalide',
        message: 'Le serveur n\'a pas pu comprendre la requête à cause d\'une syntaxe invalide.'
      };
    }
  }
}
