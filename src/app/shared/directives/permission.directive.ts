import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

import * as CryptoJS from 'crypto-js';

@Directive({
  selector: '[appPermissionHidden]'
})
export class PermissionDirective implements OnInit {

  @Input() appPermissionHidden: string[];

  constructor(private el: ElementRef) {

    this.el.nativeElement.style.display = 'none';
  }

  ngOnInit() {

    const permissions_ = localStorage.getItem('permissions');

    if (permissions_) {

      try {

        const bytes = CryptoJS.AES.decrypt(permissions_, 'Gra61884546585_55');
        const permissions_decrypt = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

       // console.log(permissions_decrypt);
        if (this.appPermissionHidden[0] === 'none') {
          this.el.nativeElement.style.display = 'initial';
          return;
        }

        const per_array: Boolean[] = new Array(this.appPermissionHidden.length);

        for (let i = 0; i < this.appPermissionHidden.length; i++) {
          per_array[i] = false;
        }



        permissions_decrypt.forEach((it) => {
          for (let i = 0; i < this.appPermissionHidden.length; i++) {

            if (it === this.appPermissionHidden[i]) {
              per_array[i] = true;
            }
          }
        });

        console.log(per_array);

        let visibility = true;
        for (let i = 0; i < this.appPermissionHidden.length; i++) {
          if (per_array[i] === false) {
            visibility = false;
          }
        }

        if (visibility) {
          this.el.nativeElement.style.display = 'initial';
        }

      } catch (err) {
        return false;

      }

    } else {
      return false;
    }

  }


}
