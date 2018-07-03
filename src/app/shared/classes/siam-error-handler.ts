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
    if (/TypeError: You provided /g.test(error)) {
      message = 'Une erreur est survenue';
      title = '';
    } else if (error instanceof HttpErrorResponse) {
      message = error.message;
      title = error.statusText || 'Une erreur est survenue';
    } else {
      message = error.message;
      title = error.statusText || 'Une erreur est survenue';
    }

    if (title === 'Unprocessable Entity') {
      if (error.error.message === 'The given data was invalid.') {
        let errors = '<ul>';
        for (const err of error.error.errors) {
          errors += `<li>${err}</li>`;
        }
        errors += '</ul>';
        message = 'Les données sont incorrect!';
      }
    } else if (message.search('third_parties_cin_type_unique') !== -1) {
      message = 'CIN exist déjà!';
      title = '';
    }

    this.toastr.warning(message, title, {
      enableHtml: true,
      closeButton: true
    });

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
