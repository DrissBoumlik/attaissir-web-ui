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
        if (error instanceof HttpErrorResponse) {
            // Server or connection error happened
            if (!navigator.onLine) {
                // Handle offline error
                this.toastr.warning('Pas de connexion Internet');
            } else {
                console.log(error.error);
                // this.toastr.warning(error);

                // Handle Http Error (error.status === 403, 404...)
                // this.toastr.warning(`${error.status} - ${error.message}`);
            }
        } else {
        }
        // Log the error anyway
        console.error('It happens: ');
        console.error(error);


    }
}
