import {ErrorHandler, Injectable, Input} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {AlertsService} from '@jaspero/ng-alerts';

@Injectable()
export class SiamErrorHandler implements ErrorHandler {

  constructor(public alert2: AlertsService) {}

  handleError = (error: any): void => {
    console.log(error);
    let message: string;
    let title: string;
    if (error instanceof HttpErrorResponse) {
      message = error.message;
      title = error.statusText || 'Une erreur est survenue';
    } else {
      message = error.message;
      title = error.statusText || 'Une erreur est survenue';
    }

    this.alert2.create('error', message, title, {
      overlay: true,
      overlayClickToClose: true,
      showCloseButton: false,
      duration: 100000
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
