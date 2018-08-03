import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import * as CryptoJS from 'crypto-js';


@Injectable()
export class PermissionGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    //  return true;


    if (typeof route.data['permission'] === 'undefined' || route.data['permission'][0] === 'none') {
      return true;
    }

    const permissions_  = localStorage.getItem('permissions');


    if (permissions_) {

      try {
        const bytes  = CryptoJS.AES.decrypt(permissions_, 'Gra61884546585_55');
        const permissions_decrypt = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));


        const per_array: Boolean[] = new Array(route.data['permission'].length);

        for (let i = 0; i < route.data['permission'].length; i++) {
          per_array[i] = false;
        }

        permissions_decrypt.forEach((it) => {

          for (let i = 0; i < route.data['permission'].length; i++) {
            if (it === route.data['permission'][i]) {
              per_array[i] = true;

            }
          }
        });

        let visibility = true;
        for (let i = 0; i < route.data['permission'].length; i++) {
          if (per_array[i] === false) {
            visibility = false;
          }
        }

        if (visibility) {
          return true;
        } else {
          this.router.navigate(['403']);
          return false;
        }


      } catch (err) {
        this.router.navigate(['403']);
        return false;

      }




    } else {
      this.router.navigate(['403']);
      return false;
    }

  }
}
