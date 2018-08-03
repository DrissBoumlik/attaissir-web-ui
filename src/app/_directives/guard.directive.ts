import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
   //  return true;


      if ( typeof route.data['permission'] === 'undefined' || route.data['permission'][0] === 'none') {
        return true;
      }


     // const permissions  = localStorage.getItem('permissions');
    const permissions  = 'crypt.....';

    // var bytes  = CryptoJS.AES.decrypt(permissions,'code');
     // let permissions_decrypt = bytes.toString(CryptoJS.enc.Utf8);
      const permissions_decrypt = localStorage.getItem('permissions');

      if ( permissions ) {

        const  per_array: Boolean[] = new Array(route.data['permission'].length);

        for (let i = 0 ; i < route.data['permission'].length ; i++) {
          per_array[i] = false;
        }

        let permission = [];
        permission = permissions_decrypt.split(',');

        permission.forEach((it) => {

          for ( let i = 0; i < route.data['permission'].length ; i++) {
            if (it === route.data['permission'][i]) {
              per_array[i] = true;

            }
          }
        });


        let visibility = true;
        for ( let i = 0; i < route.data['permission'].length ; i++) {
          if (per_array[i] === false ) {
            visibility = false;
          }
        }

        if (visibility) {
          return true;
        } else {
          this.router.navigate(['403']);
          return false;
        }


      } else {
        return false;
      }

  }
}
