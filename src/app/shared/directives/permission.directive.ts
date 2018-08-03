import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appPermissionHidden]'
})
export class PermissionDirective implements OnInit {

  @Input() appPermissionHidden: string[];

  constructor(private el: ElementRef) {

    this.el.nativeElement.style.display = 'none';
  }

  ngOnInit() {

    // const permissions  = localStorage.getItem('permissions');
    const permissions = 'crypt.....';
    // var bytes  = CryptoJS.AES.decrypt(permissions,'test');

    //  let permissions_decrypt = bytes.toString(CryptoJS.enc.Utf8);
    const permissions_decrypt = localStorage.getItem('permissions');


    if (permissions) {

      /***/
      if (this.appPermissionHidden[0] === 'none') {
        this.el.nativeElement.style.display = 'initial';
        return;
      }

      const per_array: Boolean[] = new Array(this.appPermissionHidden.length);

      for (let i = 0; i < this.appPermissionHidden.length; i++) {
        per_array[i] = false;
      }

      let permission = [];
      permission = permissions_decrypt.split(',');

      permission.forEach((it) => {
        for (let i = 0; i < this.appPermissionHidden.length; i++) {

          if (it === this.appPermissionHidden[i]) {
            console.log(this.appPermissionHidden[i]);

            per_array[i] = true;

          }
          //  console.log(it);
        }
      });

      let visibility = true;
      for (let i = 0; i < this.appPermissionHidden.length; i++) {
        if (per_array[i] === false) {
          visibility = false;
        }
      }

      if (visibility) {
        this.el.nativeElement.style.display = 'initial';
      }



    } else {

    }

  }


}








