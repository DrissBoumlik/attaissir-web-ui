import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';


@Directive({
  selector: '[permissionHidden]'
})
export class PermissionDirective  implements  OnInit {

  @Input() permissionHidden: string[];

  constructor(private el: ElementRef) {

    this.el.nativeElement.style.display = 'none';
  }

  ngOnInit() {

    // const permissions  = localStorage.getItem('permissions');
    const permissions  = 'crypt.....';
    // var bytes  = CryptoJS.AES.decrypt(permissions,'test');

    //  let permissions_decrypt = bytes.toString(CryptoJS.enc.Utf8);
    const permissions_decrypt = localStorage.getItem('permissions');


    if ( permissions) {

      /***/
      if (this.permissionHidden[0] === 'none' ) {
        this.el.nativeElement.style.display = 'initial';
        return;
      }

      const  per_array: Boolean[] = new Array(this.permissionHidden.length);

      for (let i = 0 ; i < this.permissionHidden.length ; i++) {
        per_array[i] = false;
      }

      let permission = new Array();
      permission = permissions_decrypt.split(',');

      permission.forEach((it) => {
        for ( let i = 0; i < this.permissionHidden.length ; i++) {

          if ( it === this.permissionHidden[i]) {
            console.log(this.permissionHidden[i]);

            per_array[i] = true;

          }
          //  console.log(it);
        }
      });

      let visibility = true;
      for (let i = 0; i < this.permissionHidden.length ; i++) {
        if ( per_array[i] === false ) {
          visibility = false;
        }
      }

      if ( visibility) {
        this.el.nativeElement.style.display = 'initial';
      }



    } else {

    }

  }


}








